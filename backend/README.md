# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

## To deploy a local blockchain:
- each time you down the network it reverts to the original state, so if you want to run a contract it has to be deployed each time

npx hardhat node

## To compile contracts:
Create a contract in the contracts folder then:

npx hardhat compile

## To deploy a contract:
The script has to be modified for each new contract

npx hardhat run scripts/deploy.js --network localhost

## Once deployed
There will be a contract adress, it is then used to interact with the contract, it needs to be supplied to FE

## Other commands
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```