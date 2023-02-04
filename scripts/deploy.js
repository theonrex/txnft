const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

  const metadataURL = "ipfs/QmRtxXYv7wT7fJnPDx5riNS6EZmPK7b8wgsWe9J5JuSeFe/";


  const TXCollection = await ethers.getContractFactory("TX");
  const deployedtxcollection = await TXCollection.deploy(metadataURL);
  await deployedtxcollection.deployed();
  console.log("Contract deployed to address:", deployedtxcollection.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
