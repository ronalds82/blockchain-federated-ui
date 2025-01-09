export const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // Replace with your deployed contract address
export const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "enum ParticipantsManager.Role",
        "name": "_role",
        "type": "uint8"
      }
    ],
    "name": "join",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "leave",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getParticipants",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "hospitalId",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "enum ParticipantsManager.Role",
            "name": "role",
            "type": "uint8"
          },
          {
            "internalType": "enum ParticipantsManager.Vote",
            "name": "vote",
            "type": "uint8"
          }
        ],
        "internalType": "struct ParticipantsManager.Participant[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
