// Import Hardhat runtime environment
const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const TrainingStatusFactory = await ethers.getContractFactory("TrainingStatusManager");

  console.log("Deploying contract...");

  // Deploy the contract
  const trainingStatus = await TrainingStatusFactory.deploy();

  // Wait for the contract to be deployed
  await trainingStatus.deployTransaction;

  console.log(trainingStatus.target);
  //   console.log(`Deployed contract to: ${trainingStatus.target}`);
}

// Run the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
