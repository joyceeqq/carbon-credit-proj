const ProjectContract = artifacts.require("ProjectContract");

contract("ProjectContract", (accounts) => {
  let projectContract;

  beforeEach(async () => {
    projectContract = await ProjectContract.new();
  });

  it("should allow a company to submit a project", async () => {
    const projectName = "Eco Project";
    const expectedOffsets = 1000;
    const description = "Project to improve eco-friendliness";

    await projectContract.submitProject(projectName, expectedOffsets, description, { from: accounts[0] });
    const project = await projectContract.projects(1);

    assert.equal(project.name, projectName, "Project name was not set correctly");
    assert.equal(project.status, "Pending Approval", "Project status should be 'Pending Approval'");
  });

  it("should allow a project to be verified and approved", async () => {
    const projectName = "Eco Project 2";
  
    await projectContract.submitProject(projectName, 2000, "Another eco project", { from: accounts[0] });
    await projectContract.verifyProject(1, true, { from: accounts[0] }); // Project ID should be 1
    const project = await projectContract.projects(1);
  
    assert.equal(project.status, "Approved", "Project should be approved");
  });
  
  it("should allow a project to be verified and rejected", async () => {
    const projectName = "Eco Project 3";
  
    await projectContract.submitProject(projectName, 3000, "Yet another eco project", { from: accounts[0] });
    await projectContract.verifyProject(1, false, { from: accounts[0] }); // Project ID should be 1
    const project = await projectContract.projects(1);
  
    assert.equal(project.status, "Rejected", "Project should be rejected");
  });

  // Additional tests for edge cases, error handling, etc.
});
