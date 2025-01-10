## First time using hardhat makse sure to pull the dependecy

npm install

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

## The app requires a connection to metamask - full tutorial avaiable:
https://www.youtube.com/watch?v=gyMwXuJrbJQ  - Lesson 8: HTML / Javascript Fund Me 
This lesson has a section that explains how to connect to metamask

### Once connected to metamask you will need to connect to the blockchain network 
watch the video to see the steps how, but our RPC server is defined in hardhat.config
For now it is:
http://127.0.0.1:8545/ 

### To launch IPFS
from backend/scripts dir:

node upload.mjs

from main dir:

npx json-server --watch src/demo.json --port 3000