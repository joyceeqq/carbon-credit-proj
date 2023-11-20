import React, { useState } from 'react';
import getWeb3 from '../utils/getWeb3';
import ProjectContract from '../contracts/Project.json'; // Import ABI

const ProjectSubmission = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const handleSubmitProject = async (projectName, expectedOffsets, description) => {
    // Initialize web3
    if (!web3) {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);
    }

    // Get the contract instance
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ProjectContract.networks[networkId];
    const instance = new web3.eth.Contract(
      ProjectContract.abi,
      deployedNetwork && deployedNetwork.address,
    );
    setContract(instance);

    // Interact with the smart contract
    const accounts = await web3.eth.getAccounts();
    await contract.methods.submitProject(projectName, expectedOffsets, description).send({ from: accounts[0] });

    // Handle additional logic and UI updates
  };

  return (
    <div>
      {/* Form for project submission */}
    </div>
  );
};

export default ProjectSubmission;
