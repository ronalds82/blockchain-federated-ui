export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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
        "name": "HospitalRemoved",
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
        "inputs": [],
        "name": "removeHospitalFromTrainingRound",
        "outputs": [],
        "stateMutability": "nonpayable",
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