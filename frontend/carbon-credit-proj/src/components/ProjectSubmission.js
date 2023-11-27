import React, { useState } from 'react';
import getWeb3 from '../utils/getWeb3';
import ProjectContract from '../contracts/ProjectContract.json'; // Import ABI
import { uploadToIPFS } from '../utils/ipfs'; // Import IPFS upload function

const ProjectSubmission = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [projectName, setProjectName] = useState(''); // State for project name
  const [expectedOffsets, setExpectedOffsets] = useState(''); // State for expected offsets
  const [description, setDescription] = useState(''); // State for description

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitProject = async (projectName, expectedOffsets, description) => {
    if (!web3) {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);
    }

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ProjectContract.networks[networkId];
    const instance = new web3.eth.Contract(
      ProjectContract.abi,
      deployedNetwork && deployedNetwork.address,
    );
    setContract(instance);

    const accounts = await web3.eth.getAccounts();

    // First, upload the file to IPFS and get the URL
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadToIPFS(file);
    }

    // Assuming the smart contract has a parameter to accept the URL of the uploaded file
    await contract.methods.submitProject(projectName, expectedOffsets, description, fileUrl).send({ from: accounts[0] });

    // Handle additional logic and UI updates
  };

  return (
    <div>
      {/* Additional form fields for projectName, expectedOffsets, description */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => handleSubmitProject(projectName, expectedOffsets, description)}>
        Submit Project
      </button>
    </div>
  );
};

export default ProjectSubmission;
