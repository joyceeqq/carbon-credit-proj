const CompanyContract = artifacts.require("CompanyContract");
const assert = require('chai').assert;

contract("CompanyContract", (accounts) => {
  it("should register a company", async () => {
    const contractInstance = await CompanyContract.new();
    await contractInstance.registerCompany(accounts[1], "Test Company", "123456789");
    const registeredCompany = await contractInstance.companies(accounts[1]);
    assert.equal(registeredCompany.name, "Test Company", "The company name was not registered correctly");
  });

  it("should emit an event when a company is registered", async () => {
    const contractInstance = await CompanyContract.new();
    const result = await contractInstance.registerCompany(accounts[2], "New Company", "987654321");
    assert.equal(result.logs[0].event, "CompanyRegistered", "CompanyRegistered event was not emitted");
  });

  it("should not allow a company to be registered twice", async () => {
    const contractInstance = await CompanyContract.new();
    await contractInstance.registerCompany(accounts[3], "Existing Company", "123123123");

    try {
      await contractInstance.registerCompany(accounts[3], "Existing Company", "123123123");
      assert.fail("The same company was registered twice.");
    } catch (error) {
      assert.include(error.message, "Company already registered", "Error message does not match");
    }
  });
});
