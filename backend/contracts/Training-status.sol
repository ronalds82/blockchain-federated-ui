// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract TrainingStatusManager {
    // Enum representing the training round statuses
    enum Status {
        NONE,
        WAITING_FOR_PARTICIPANTS,
        START_TRAINING,
        TRAINING_COMPLETED
    }

    // Variable to hold the current status
    Status public currentStatus;

    // Event to emit whenever the status changes
    event StatusChanged(Status oldStatus, Status newStatus);

    // Constructor to initialize the status
    constructor() {
        currentStatus = Status.NONE; // Default status
    }

    // Function to update the status
    function updateStatus(Status _newStatus) public {
        require(
            uint(_newStatus) <= uint(Status.TRAINING_COMPLETED),
            "Invalid status"
        );
        emit StatusChanged(currentStatus, _newStatus); // Emit event before changing status
        currentStatus = _newStatus;
    }

    // Function to retrieve the current status as a string
    function getStatus() public view returns (string memory) {
        string[4] memory statusStrings = [
            "NONE",
            "WAITING_FOR_PARTICIPANTS",
            "START_TRAINING",
            "TRAINING_COMPLETED"
        ];
        return statusStrings[uint(currentStatus)];
    }
}
