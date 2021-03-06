const { ethers } = require("hardhat");

const main = async() => {
    const tinderFactory = await ethers.getContractFactory("TinderERC721");
    const TinderContract = await tinderFactory.deploy();

    await TinderContract.deployed();

    console.log("TinderContract deployed to: ", TinderContract.address);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });