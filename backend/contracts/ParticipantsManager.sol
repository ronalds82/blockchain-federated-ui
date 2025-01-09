// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ParticipantsManager {
    enum Role { Miner, Trainer }
    enum Vote { Null, Accept, Reject }

    struct Participant {
        address hospitalId;
        string name;
        Role role;
        Vote vote;
    }

    Participant[] private participants;

    event ParticipantJoined(address hospitalId, string name, Role role);
    event ParticipantLeft(address hospitalId);

    // Function to join as a participant
    function join(string memory _name, Role _role) public {
        participants.push(Participant({
            hospitalId: msg.sender,
            name: _name,
            role: _role,
            vote: Vote.Null
        }));
        emit ParticipantJoined(msg.sender, _name, _role);
    }

    // Function to leave as a participant
    function leave() public {
        for (uint i = 0; i < participants.length; i++) {
            if (participants[i].hospitalId == msg.sender) {
                emit ParticipantLeft(participants[i].hospitalId);
                _removeParticipant(i);
                return;
            }
        }
        revert("Participant not found");
    }

    // Function to get all participants
    function getParticipants() public view returns (Participant[] memory) {
        return participants;
    }

    // Internal function to remove a participant
    function _removeParticipant(uint index) internal {
        require(index < participants.length, "Index out of bounds");
        participants[index] = participants[participants.length - 1];
        participants.pop();
    }
}