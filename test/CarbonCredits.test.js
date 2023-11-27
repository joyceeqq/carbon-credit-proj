const CarbonCredits = artifacts.require("CarbonCredits");

contract("CarbonCredits", (accounts) => {
  const regulator = accounts[0];
  const company = accounts[1];

  let contractInstance;

  beforeEach(async () => {
    contractInstance = await CarbonCredits.new();
    // Register a company for testing
    await contractInstance.registerCompany(company, "Test Company", "123456789", { from: regulator });
  });

  it("should issue credits to a registered company", async () => {
    const amountToIssue = 1000;
    await contractInstance.issueCredits(company, amountToIssue, { from: regulator });
    const companyCredits = await contractInstance.companyCredits(company);
    assert.equal(companyCredits.toNumber(), amountToIssue, "Credits were not issued correctly");
  });

  it("should not issue credits to an unregistered company", async () => {
    try {
      await contractInstance.issueCredits(accounts[2], 1000, { from: regulator });
      assert.fail("Issued credits to an unregistered company");
    } catch (error) {
      assert.include(error.message, "Company not registered", "Expected revert reason not found");
    }
  });

  it("should offset emissions for a company", async () => {
    const amountToIssue = 1000;
    const amountToOffset = 500;
    await contractInstance.issueCredits(company, amountToIssue, { from: regulator });
    await contractInstance.offsetEmissions(company, amountToOffset, { from: company });
    const remainingCredits = await contractInstance.companyCredits(company);
    assert.equal(remainingCredits.toNumber(), amountToIssue - amountToOffset, "Emissions were not offset correctly");
  });

  it("should not offset emissions if credits are insufficient", async () => {
    try {
      await contractInstance.offsetEmissions(company, 1000, { from: company });
      assert.fail("Offset emissions with insufficient credits");
    } catch (error) {
      assert.include(error.message, "Insufficient credits", "Expected revert reason not found");
    }
  });
});
