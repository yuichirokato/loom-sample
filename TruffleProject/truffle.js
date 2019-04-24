/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

const fs = require('fs');
const LoomTruffleProvider = require('loom-truffle-provider');
const LoomUnityBuildUtility = require("./LoomUnityBuildUtility");

const chainId = 'default';
const writeUrl = 'http://127.0.0.1:9999/rpc';
const readUrl = 'http://127.0.0.1:9999/query';

// ./privateKey file contains a base64 encoded key generated by the command:
// loom genkey -a publicKey -k privateKey
const privateKey = fs.readFileSync('./privateKey', 'utf-8');
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);

// Create 10 extra accounts, useful for tests
loomTruffleProvider.createExtraAccounts(10);

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        loom_dapp_chain: {
            provider: loomTruffleProvider,
            network_id: '*'
        }
    },
    build: function (options, callback) {
        options.searchContractsInDestinationDirectory = true;
        new LoomUnityBuildUtility(options, [], "../UnityClient/Assets/Contracts/", "../DAppChain/build/contracts/").copyFiles();
    }
};
