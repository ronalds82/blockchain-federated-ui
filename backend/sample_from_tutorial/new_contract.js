export const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" 
export const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "enum TrainingStatusManager.Status",
          "name": "oldStatus",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "enum TrainingStatusManager.Status",
          "name": "newStatus",
          "type": "uint8"
        }
      ],
      "name": "StatusChanged",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "currentStatus",
      "outputs": [
        {
          "internalType": "enum TrainingStatusManager.Status",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getStatus",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum TrainingStatusManager.Status",
          "name": "_newStatus",
          "type": "uint8"
        }
      ],
      "name": "updateStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]