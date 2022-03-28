//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol"; //defualt 0
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TinderERC721 is ERC721URIStorage {

    using Counters for Counters.Counter;

    Counters.Counter public TINDER_TOKEN_ID;

    constructor() ERC721("TinderBlock","TBC"){}

    function mintNFT(address _userOne, address _userTwo, string memory tokenURI) public {
        _mint(_userOne, TINDER_TOKEN_ID.current());
        _setTokenURI(TINDER_TOKEN_ID.current(), tokenURI);
        TINDER_TOKEN_ID.increment();

        _mint(_userTwo, TINDER_TOKEN_ID.current());
        _setTokenURI(TINDER_TOKEN_ID.current(), tokenURI);
        TINDER_TOKEN_ID.increment();
    }
}