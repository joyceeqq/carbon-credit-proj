const TradeContract = artifacts.require("TradeContract");

contract("TradeContract", (accounts) => {
  let tradeContract;
  const buyer = accounts[1];
  const seller = accounts[2];

  beforeEach(async () => {
    tradeContract = await TradeContract.new();
  });

  it("should create a trade", async () => {
    const creditsAmount = 1000;
    const terms = "Trade terms";

    await tradeContract.createTrade(buyer, seller, creditsAmount, terms, { from: buyer });
    const trade = await tradeContract.trades(1);

    assert.equal(trade.buyer, buyer, "The buyer address is not correct");
    assert.equal(trade.seller, seller, "The seller address is not correct");
    assert.equal(trade.status, "Created", "Trade status should be 'Created'");
  });

  it("should complete a trade", async () => {
    const creditsAmount = 500;
    const terms = "Other trade terms";

    await tradeContract.createTrade(buyer, seller, creditsAmount, terms, { from: buyer });
    await tradeContract.completeTrade(1, { from: seller });
    const trade = await tradeContract.trades(1);

    assert.equal(trade.status, "Completed", "Trade status should be 'Completed'");
  });

  it("should not complete a non-existent trade", async () => {
    try {
      await tradeContract.completeTrade(999, { from: seller });
      assert.fail("Completed a non-existent trade");
    } catch (error) {
      assert.include(error.message, "Trade does not exist", "Expected revert reason not found");
    }
  });

  // Additional tests for edge cases, error handling, etc.
});
