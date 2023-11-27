// SPDX-License-Identifier: MIT
// This file will handle everything related to carbon offset projects
pragma solidity ^0.8.0;

import "./CompanyContract.sol";

contract ProjectContract {
    struct Project {
        uint id;
        address companyAddress;
        string name; // Name of Project
        string description; // Description of project
        string status; // "Pending Approval", "Approved", "Rejected"
        uint expectedOffsets;
        // other project details
    }

    mapping(uint => Project) public projects;
    uint public projectCount;

    function submitProject(
        string memory _projectName,
        uint _expectedOffsets,
        string memory _description
    ) public {
        // Increment projectCount to get a new unique ID for the project
        projectCount++;

        // Add the new project to the projects mapping
        projects[projectCount] = Project({
            id: projectCount,
            companyAddress: msg.sender, // The address of the company submitting the project
            name: _projectName,
            description: _description,
            status: "Pending Approval",
            expectedOffsets: _expectedOffsets
            // Set other project details
        });
        // Emit an event if we have one for a new project submission
    }

    function verifyProject(uint _projectId, bool _isApproved) public {
        // Check if the project exists
        require(_projectId > 0 && _projectId <= projectCount, "Project does not exist.");
        
        // Retrieve the project
        Project storage project = projects[_projectId];

        // Check if the project is in 'Pending Approval' status
        require(keccak256(bytes(project.status)) == keccak256(bytes("Pending Approval")), "Project not pending approval.");

        // Update the status based on the approval
        if (_isApproved){
            project.status = "Approved";
        } else {
            project.status = "Rejected";
        }

        // Emit an event if we have one for project verification
    }

    // Additional project-related functions
}
