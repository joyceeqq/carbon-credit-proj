const CompanyContract = artifacts.require("CompanyContract");

contract("CompanyContract", accounts => {
    let contractInstance;
    const [admin, company1, company2] = accounts;

    beforeEach(async () => {
        contractInstance = await CompanyContract.new();
    });

    it("should register a company", async () => {
        await contractInstance.registerCompany(company1, "Company One", "123456", 100, { from: admin });
        const registeredCompany = await contractInstance.companies(company1);

        assert.equal(registeredCompany.name, "Company One", "Company name is not set correctly");
        assert.equal(registeredCompany.registrationNumber, "123456", "Registration number is not set correctly");
        assert.equal(registeredCompany.emissions, 100, "Emissions are not set correctly");
    });

    it("should add carbon credits to a company", async () => {
        await contractInstance.registerCompany(company1, "Company One", "123456", 100, { from: admin });
        await contractInstance.addCarbonCredits(company1, 50, { from: admin });

        const company = await contractInstance.companies(company1);
        assert.equal(company.carbonCredits, 50, "Carbon credits were not added correctly");
    });

    it("should deduct carbon credits from a company", async () => {
        await contractInstance.registerCompany(company1, "Company One", "123456", 100, { from: admin });
        await contractInstance.addCarbonCredits(company1, 50, { from: admin });
        await contractInstance.deductCarbonCredits(company1, 20, { from: admin });

        const company = await contractInstance.companies(company1);
        assert.equal(company.carbonCredits, 30, "Carbon credits were not deducted correctly");
    });

    it("should allow trading of carbon credits", async () => {
        await contractInstance.registerCompany(company1, "Company One", "123456", 100, { from: admin });
        await contractInstance.registerCompany(company2, "Company Two", "654321", 200, { from: admin });
        await contractInstance.addCarbonCredits(company1, 100, { from: admin });

        await contractInstance.tradeCarbonCredits(company1, company2, 40, { from: admin });

        const seller = await contractInstance.companies(company1);
        const buyer = await contractInstance.companies(company2);

        assert.equal(seller.carbonCredits, 60, "Seller's carbon credits not updated correctly");
        assert.equal(buyer.carbonCredits, 40, "Buyer did not receive the correct amount of carbon credits");
    });

    // Additional tests as needed...
});
