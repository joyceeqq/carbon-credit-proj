// SPDX-License-Identifier: MIT
// Contain the `Company` struct and related functions
pragma solidity ^0.8.0;

contract CompanyContract {
    struct Company {
        address walletAddress;
        string name;
        string registrationNumber; // Unique registration number for the company
        uint carbonCredits; // New attribute for carbon credits
        uint emissions; // New attribute for emissions
        // Add other company details as needed
    }

    mapping(address => Company) public companies;
    mapping(address => uint) public companyCredits; // Mapping to track credit balances

    // Event to emit when a company is registered
    event CompanyRegistered(address walletAddress, string name, uint emissions);

    // Event to emit when carbon credits are added
    event CarbonCreditsAdded(address indexed walletAddress, uint amount);

    // Event to emit when carbon credits are deducted
    event CarbonCreditsDeducted(address indexed walletAddress, uint amount);

    // Event to emit when carbon credits are traded
    event CarbonCreditsTraded(address indexed seller, address indexed buyer, uint amount);

    function registerCompany(
        address _walletAddress,
        string memory _name,
        string memory _registrationNumber,
        uint _emissions // Pass emissions as a parameter
        // Add other parameters as needed
    ) public {
        Company storage company = companies[_walletAddress];

        if (company.walletAddress == address(0)) {
            // Create a new Company struct if the company is not registered
            companies[_walletAddress] = Company({
                walletAddress: _walletAddress,
                name: _name,
                registrationNumber: _registrationNumber,
                carbonCredits: 0, // Initialize carbon credits to 0 for new companies
                emissions: _emissions // Set emissions to the passed value
                // Set other details
            });

            // Emit an event after successful registration
            emit CompanyRegistered(_walletAddress, _name, _emissions);
        } else {
            // Update emissions if the company already exists
            company.emissions = _emissions;

            // Emit an event after updating emissions
            emit CompanyRegistered(_walletAddress, _name, _emissions);
        }
    }

    // Function to add carbon credits for a company
    function addCarbonCredits(address _walletAddress, uint _amount) public {
        require(companies[_walletAddress].walletAddress != address(0), "Company not registered.");
        
        // Update the carbon credits for the company
        companies[_walletAddress].carbonCredits += _amount;
        
        // Emit an event after adding carbon credits
        emit CarbonCreditsAdded(_walletAddress, _amount);
    }

    // Function to deduct carbon credits from a company
    function deductCarbonCredits(address _walletAddress, uint _amount) public {
        require(companies[_walletAddress].walletAddress != address(0), "Company not registered.");
        require(companies[_walletAddress].carbonCredits >= _amount, "Not enough carbon credits.");
        
        // Deduct the carbon credits from the company
        companies[_walletAddress].carbonCredits -= _amount;
        
        // Emit an event after deducting carbon credits
        emit CarbonCreditsDeducted(_walletAddress, _amount);
    }

    // Function to trade carbon credits between companies
    function tradeCarbonCredits(address _seller, address _buyer, uint _amount) public {
        require(companies[_seller].walletAddress != address(0), "Seller not registered.");
        require(companies[_buyer].walletAddress != address(0), "Buyer not registered.");
        require(companies[_seller].carbonCredits >= _amount, "Seller does not have enough carbon credits.");

        // Transfer carbon credits from seller to buyer
        companies[_seller].carbonCredits -= _amount;
        companies[_buyer].carbonCredits += _amount;

        // Emit an event to indicate the trade
        emit CarbonCreditsTraded(_seller, _buyer, _amount);
    }

    // Additional functions related to companies
}
