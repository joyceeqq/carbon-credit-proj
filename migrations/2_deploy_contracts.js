const CompanyContract = artifacts.require("CompanyContract");
const ProjectContract = artifacts.require("ProjectContract");
const TradeContract = artifacts.require("TradeContract");
const CarbonCredits = artifacts.require("CarbonCredits");

module.exports = function (deployer) {
  deployer.deploy(CompanyContract);
  deployer.deploy(ProjectContract);
  deployer.deploy(TradeContract);
  deployer.deploy(CarbonCredits);
};
