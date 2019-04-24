pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol";

contract YadonToken is ERC721Full, ERC721Mintable {

    constructor() public ERC721Full("CryptoYadon", "CY") {}

    uint256 internal nextTokenId = 0;

    function mint() external {
        uint256 tokenId = nextTokenId;
        nextTokenId = nextTokenId.add(1);
        super._mint(msg.sender, tokenId);
    }

    function setTokenURI(uint256 _tokenId, string _message) external {
        super._setTokenURI(_tokenId, _message);
    } 

    function burn(uint256 _tokenId) external {
        super._burn(msg.sender, _tokenId);
    }
}