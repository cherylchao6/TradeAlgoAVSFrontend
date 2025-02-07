import { ethers } from "hardhat";

async function main() {
  const TradingAlgoAVS = await ethers.getContractFactory("TradingAlgoAVS");
  const contract = await TradingAlgoAVS.deploy();

  await contract.waitForDeployment();
  console.log(
    `✅ Contract deployed at address: ${await contract.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
