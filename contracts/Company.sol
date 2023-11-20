// SPDX-License-Identifier: MIT
// Contain the `Company` struct and related functions
pragma solidity ^0.8.0;

contract CompanyContract {
    struct Company {
        address walletAddress;
        string name;
        string registrationNumber; // Unique registration number for the company
        // Add other company details as needed
    }

    mapping(address => Company) public companies;
    mapping(address => uint) public companyCredits; // Mapping to track credit balances


    // Event to emit when a company is registered
    event CompanyRegistered(address walletAddress, string name);

    function registerCompany(
        address _walletAddress,
        string memory _name,
        string memory _registrationNumber
        // Add other parameters as needed
    ) public {
        // Check if the company is already registered
        require(companies[_walletAddress].walletAddress == address(0), "Company already registered.");

        // Create a new Company struct and add it to the mapping
        companies[_walletAddress] = Company({
            walletAddress: _walletAddress,
            name: _name,
            registrationNumber: _registrationNumber
            // Set other details
        });

        // Emit an event after successful registration
        emit CompanyRegistered(_walletAddress, _name);
    }

    // Additional functions related to companies
}

