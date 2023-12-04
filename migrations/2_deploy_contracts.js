const CompanyContract = artifacts.require("CompanyContract");
const ProjectContract = artifacts.require("ProjectContract");
const TradeContract = artifacts.require("TradeContract");

module.exports = function (deployer) {
  deployer.deploy(CompanyContract);
  deployer.deploy(ProjectContract);
  deployer.deploy(TradeContract);
};
