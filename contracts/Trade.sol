// SPDX-License-Identifier: MIT
// To handle OTC trades
pragma solidity ^0.8.0;

import "./Company.sol";

contract TradeContract {
    struct Trade {
        uint id;
        address buyer;
        address seller;
        uint creditsAmount;
        string terms;
        string status; // "Created", "Completed"
        // other trade details
    }

    mapping(uint => Trade) public trades;
    uint public tradeCount;

    function createTrade(
        address _buyer,
        address _seller,
        uint _creditsAmount,
        string memory _terms
    ) public {
        // Increment tradeCount to get a new unique ID for the trade
        tradeCount++;

        // Add the new trade to the trades mapping
        trades[tradeCount] = Trade({
            id: tradeCount,
            buyer: _buyer,
            seller: _seller,
            creditsAmount: _creditsAmount,
            terms: _terms,
            status: "Created"
            // Set other trade details
        });
        // Emit an event if we have one for a new trade creation
    }

    function completeTrade(uint _tradeId) public {
        // Check if the trade exists
        require(_tradeId > 0 && _tradeId <= tradeCount, "Trade does not exist.");

        // Retrieve the trade
        Trade storage trade = trades[_tradeId];

        // Check if the trade is in 'Created' status
        require(keccak256(bytes(trade.status)) == keccak256(bytes("Created")), "Trade not in correct status.");

        // Additional checks can be implemented here, like verifying the caller's authority to complete the trade
        trade.status = "Completed";

        // Emit an event if we have one for trade completion
    }

    // Additional trade-related functions
}
