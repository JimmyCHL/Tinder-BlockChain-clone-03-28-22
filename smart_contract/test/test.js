const { expect } = require("chai");
const { ethers } = require("hardhat");
const assert = require("assert");

describe("TinderERC721", function() {
    it("Should mint the NFT", async function() {
        const TinderFac = await ethers.getContractFactory("TinderERC721");
        const TinderCon = await TinderFac.deploy();
        await TinderCon.deployed();

        expect(
            await TinderCon.TINDER_TOKEN_ID().then((result) => result.toString())
        ).to.equal("0");

        const [caller, user1, user2] = await ethers.getSigners();

        console.log(caller.address, user1.address, user2.address);

        const tx = await TinderCon.connect(caller).mintNFT(
            user1.address,
            user2.address,
            "https://example.com"
        );

        await tx.wait();

        const currentTokenId = await TinderCon.TINDER_TOKEN_ID().then((result) =>
            result.toString()
        );

        console.log(currentTokenId);

        assert.equal(
            Number(currentTokenId),
            2,
            "Current available tokeId should be 2!"
        );
    });
});