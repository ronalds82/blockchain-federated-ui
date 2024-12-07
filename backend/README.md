## To deploy a local blockchain:
- each time you down the network it reverts to the original state, so if you want to run a contract it has to be deployed each time
- make sure to be in the backend folder

npx hardhat node

## To compile contracts:
Create a contract in the contracts folder then:

npx hardhat compile

- This will create an file in the artifacts/contracts folder, you will need to copy out the abi and put it in a new constants file.

## To deploy a contract:

npx hardhat run scripts/deploy.js --network localhost

- To add a new contract, supply the neccessary variables in the contractsToDeploy constant in deploy.js, then deploy the contract.