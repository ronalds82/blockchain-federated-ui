// Import Hardhat runtime environment
const { ethers } = require("hardhat");
const fs = require("fs");

/**
 * Updates the contractAddress in the specified JS file.
 * @param {string} filePath - The path to the JS file to be updated.
 * @param {string} newAddress - The new contract address to set.
 */
function updateContractAddress(filePath, newAddress) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Updated regex to precisely match `export const contractAddress = "value";`
    const updatedContent = fileContent.replace(
      /export const contractAddress = ["'](.*)["'];/,
      `export const contractAddress = "${newAddress}";`
    );

    if (updatedContent === fileContent) {
      console.log(
        "No match found for `export const contractAddress`. Please ensure the file contains the expected constant definition."
      );
    } else {
      fs.writeFileSync(filePath, updatedContent, "utf8");
      console.log(`Updated contract address in ${filePath} to ${newAddress}`);
    }
  } catch (error) {
    console.error(`Failed to update contract address in ${filePath}:`, error);
  }
}

/**
 * Dynamically deploys a contract and updates the address in a specified file.
 * @param {string} contractName - The name of the contract to deploy.
 * @param {string} filePath - The file path to update with the deployed contract address.
 */
async function deployContract(contractName, filePath) {
  try {
    // Get the contract factory
    const ContractFactory = await ethers.getContractFactory(contractName);
    console.log(`Deploying ${contractName} contract...`);

    // Deploy the contract
    const contract = await ContractFactory.deploy();

    // Wait for the contract to be deployed
    await contract.deployTransaction;

    console.log(`Deployed ${contractName} to: ${contract.target}`);

    // Update the contract address in the specified file
    updateContractAddress(filePath, contract.target);
  } catch (error) {
    console.error(`Failed to deploy ${contractName}:`, error);
  }
}

async function main() {
  // Define contracts and their configurations
  const contractsToDeploy = [
    {
      name: "TrainingStatusManager",
      filePath: "./constants/training_status_contract.js",
    },
    // {
    //   name: "ExampleContract",
    //   filePath: "./scripts/example_contract.js",
    // },
  ];

  // Loop through and deploy each contract
  for (const contractConfig of contractsToDeploy) {
    await deployContract(
      contractConfig.name,
      contractConfig.filePath,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
