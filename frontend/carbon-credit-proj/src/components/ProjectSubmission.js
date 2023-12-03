import React, { useState, useEffect } from 'react';
import getWeb3 from '../utils/getWeb3';
import ProjectContract from '../contracts/ProjectContract.json';
import { uploadToIPFS } from '../utils/ipfs';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const ProjectSubmission = () => {
  const [web3, setWeb3] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [expectedOffsets, setExpectedOffsets] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState("");


  useEffect(() => {
      setUserType(localStorage.getItem("userType"))
  });

  console.log(`This is the ${userType} from Project Submission`)

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
    <div class="h-screen">
        {/* <!--Nav--> */}
        <nav>
            <div class="w-full container mx-auto">
            <div class="w-full flex items-center justify-between">
                <Link class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#" to={"/"}>
                Brock<span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">chain</span>
                </Link>
                <div class="flex w-1/2 justify-end content-center">
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/register-company"}
                >
                    Register Company 
                </Link>
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/submit-project"}
                >
                    Submit Project          
                </Link>
                </div>
                
            </div>
            </div>
        </nav>

        <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col items-center">
        <form onSubmit={handleSubmitProject} class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
              Submit your project here!
            </label>
            <div className="text-indigo-400 font-bold">
              <label>Project Name:</label>
              <input
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="text-indigo-400 font-bold">
              <label>Expected Offsets:</label>
              <input
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="number"
                value={expectedOffsets}
                onChange={(e) => setExpectedOffsets(e.target.value)}
                placeholder="Enter expected offsets"
                required
              />
            </div>
            <div className="text-indigo-400 font-bold">
              <label>Description:</label>
              <textarea                
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                required
              />
            </div>
            <div className="text-indigo-400 font-bold">
              <label>Project Proposal File:</label>
              <input 
              class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              type="file" onChange={handleFileChange} />
            </div>
            <button 
            class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="submit">Submit Project</button>
          </form>
          {message && <p className="text-indigo-100">{message}</p>}
        </div>   
      </div>
    
    
  );
};

export default ProjectSubmission;
