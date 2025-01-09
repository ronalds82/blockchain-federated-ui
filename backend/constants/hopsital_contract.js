export const contractAddress = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c";
export const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "hospitalAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "enum HospitalManager.Role",
          "name": "role",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "enum HospitalManager.Vote",
          "name": "vote",
          "type": "uint8"
        }
      ],
      "name": "HospitalCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "hospitalAddress",
          "type": "address"
        }
      ],
      "name": "ParticipantJoined",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "enum HospitalManager.Role",
          "name": "_role",
          "type": "uint8"
        }
      ],
      "name": "createHospital",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllHospitals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "hospitalAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "enum HospitalManager.Role",
              "name": "role",
              "type": "uint8"
            },
            {
              "internalType": "enum HospitalManager.Vote",
              "name": "vote",
              "type": "uint8"
            }
          ],
          "internalType": "struct HospitalManager.Hospital[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hospitals",
      "outputs": [
        {
          "internalType": "address",
          "name": "hospitalAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "enum HospitalManager.Role",
          "name": "role",
          "type": "uint8"
        },
        {
          "internalType": "enum HospitalManager.Vote",
          "name": "vote",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum HospitalManager.Role",
          "name": "_role",
          "type": "uint8"
        }
      ],
      "name": "setRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_addresses",
          "type": "address[]"
        },
        {
          "internalType": "enum HospitalManager.Role[]",
          "name": "_roles",
          "type": "uint8[]"
        }
      ],
      "name": "setRolesForAddresses",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum HospitalManager.Vote",
          "name": "_vote",
          "type": "uint8"
        }
      ],
      "name": "setVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]