// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract HospitalManager {
    enum Role {
        Null, // default when not in a training round
        Miner,
        Trainer
    }

    enum Vote {
        Null, // default
        Accept,
        Reject
    }

    struct Hospital {
        address hospitalAddress; // The wallet address (from Metamask)
        string name;
        Role role; // Null, Miner, or Trainer
        Vote vote; // Null, Accept, or Reject
    }

    // Mapping of address -> Hospital struct
    mapping(address => Hospital) public hospitals;

    // Keep an array of addresses so we can retrieve all participants easily
    address[] private hospitalAddresses;

    // Event emitted when a hospital joins the training round
    event HospitalCreated(
        address indexed hospitalAddress,
        string name,
        Role role,
        Vote vote
    );

    function createHospital(string calldata _name, Role _role) external {
        // Ensure the caller has not already joined (role == Null)
        require(
            hospitals[msg.sender].role == Role.Null,
            "Hospital already joined."
        );

        // Create and store the hospital record
        hospitals[msg.sender] = Hospital({
            hospitalAddress: msg.sender,
            name: _name,
            role: _role,
            vote: Vote.Null
        });

        // Keep track of their address in an array for easy enumeration
        hospitalAddresses.push(msg.sender);

        emit HospitalCreated(msg.sender, _name, _role, Vote.Null);
    }

    // Event emitted when a hospital leaves the training round
    event HospitalRemoved(address indexed hospitalAddress);

    function removeHospitalFromTrainingRound() external {
        // Ensure the caller is currently joined (role != Null)
        require(
            hospitals[msg.sender].role != Role.Null,
            "Hospital not joined."
        );

        // Remove from the array by swapping and popping
        for (uint256 i = 0; i < hospitalAddresses.length; i++) {
            if (hospitalAddresses[i] == msg.sender) {
                hospitalAddresses[i] = hospitalAddresses[
                    hospitalAddresses.length - 1
                ];
                hospitalAddresses.pop();
                break;
            }
        }

        // Delete from the mapping
        delete hospitals[msg.sender];

        emit HospitalRemoved(msg.sender);
    }

    function getAllHospitals() external view returns (Hospital[] memory) {
        Hospital[] memory _hospitals = new Hospital[](hospitalAddresses.length);
        for (uint256 i = 0; i < hospitalAddresses.length; i++) {
            address addr = hospitalAddresses[i];
            _hospitals[i] = hospitals[addr];
        }
        return _hospitals;
    }

    function setVote(Vote _vote) external {
        require(
            hospitals[msg.sender].role != Role.Null,
            "Hospital not joined."
        );
        hospitals[msg.sender].vote = _vote;
    }

    function setRole(Role _role) external {
        require(
            hospitals[msg.sender].role != Role.Null,
            "Hospital not joined."
        );
        hospitals[msg.sender].role = _role;
    }
}
