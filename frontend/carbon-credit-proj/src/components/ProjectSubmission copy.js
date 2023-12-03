import React, { useState } from 'react';
import getWeb3 from '../utils/getWeb3';
import ProjectContract from '../contracts/ProjectContract.json';
import { uploadToIPFS } from '../utils/ipfs';

const ProjectSubmission = () => {
  const [web3, setWeb3] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [expectedOffsets, setExpectedOffsets] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitProject = async (event) => {
    event.preventDefault();

    if (!web3) {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);
    }

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ProjectContract.networks[networkId];
    const contractInstance = new web3.eth.Contract(
      ProjectContract.abi,
      deployedNetwork && deployedNetwork.address,
    );

    let fileUrl = '';
    if (file) {
      fileUrl = await uploadToIPFS(file);
    }

    try {
      const accounts = await web3.eth.getAccounts();
      await contractInstance.methods.submitProject(projectName, Number(expectedOffsets), description, fileUrl).send({ from: accounts[0] });
      setMessage('Project submitted successfully!');
    } catch (error) {
      setMessage(`Error submitting project: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Submit Project</h2>
      <form onSubmit={handleSubmitProject}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            required
          />
        </div>
        <div>
          <label>Expected Offsets:</label>
          <input
            type="number"
            value={expectedOffsets}
            onChange={(e) => setExpectedOffsets(e.target.value)}
            placeholder="Enter expected offsets"
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            required
          />
        </div>
        <div>
          <label>Project Proposal File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit Project</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProjectSubmission;
