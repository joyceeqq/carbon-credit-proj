import React, { useState, useEffect } from 'react';
import getWeb3 from '../utils/getWeb3';
import ProjectContract from '../contracts/ProjectContract.json';
import { uploadToIPFS } from '../utils/ipfs';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProjectValidation = () => {
  const [web3, setWeb3] = useState(null);
  const [projectId, setProjectId] = useState();
  const [expectedOffsets, setExpectedOffsets] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  const [project, setProject] = useState();
  const [projects, setProjects] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [verify, setVerify] = useState(false);


  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
    if (web3) {
        fetchProjectCount();
    }
  }, [web3]);

  console.log(`This is the ${userType} from Project Submission`)

  const fetchProjectCount = async () => {
    if (web3) {
      // Update the contract address with the deployed contract address on Sepolia testnet
      const contractAddress = "0x41565b29d8EC63Ea11b10A80947221798537cf09";

      // Get the contract instance
      const instance = new web3.eth.Contract(
        ProjectContract.abi,
        contractAddress
      );

      // Call the 'projectCount' function to get the total number of projects
      const count = await instance.methods.projectCount().call();
      console.log(count);
      setProjectCount(parseInt(count, 10));
    }
  };

  const fetchHandler = async () => {
    fetchProjectById(projectId)
  }

  const resetHandler = async () => {
    setProject()
    setProjects([])
    setProjectId(0)
    setFetched(false)
    setMessage("")
  }


  const verifyHandler = async () => {
    setVerify(true)
    verifyProjectById(projectId,verify)
    setVerify(false)
    setProject()
    setProject([])
    setProjectId(0)
    setFetched(false)
    setMessage("")
  }

  const rejectHandler = async () => {
    verifyProjectById(projectId,verify)
    setVerify(false)
    setProject()
    setProject([])
    setProjectId(0)
    setFetched(false)
    setMessage("")

  }

  async function fetchProjectById(id) {
    if (web3) {
        // Update the contract address with the deployed contract address on Sepolia testnet
        const contractAddress = "0x41565b29d8EC63Ea11b10A80947221798537cf09";
  
        // Get the contract instance
        const instance = new web3.eth.Contract(
          ProjectContract.abi,
          contractAddress
        );
  
        const project = await instance.methods.projects(id).call();
        console.log(`Project details: ${project}`);
        setProject(project);
        const projectsList = [];
        projectsList.push(project);
        setProjects(projectsList);
        setFetched(true)
      }
  }

  async function verifyProjectById(id,verify) {
    if (web3) {
        // Update the contract address with the deployed contract address on Sepolia testnet
        const contractAddress = "0x41565b29d8EC63Ea11b10A80947221798537cf09";
  
        // Get the contract instance
        const instance = new web3.eth.Contract(
          ProjectContract.abi,
          contractAddress
        );
        
        try {
            const accounts = await web3.eth.getAccounts();
            const success = await instance.methods
                .verifyProject(projectId,verify)
                .send({ from: accounts[0] });
            toast.success('Project submitted successfully!');
          } catch (error) {
            toast.error(`Error submitting project: ${error.message}`);
          }
      }
  }

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setWalletAddress(accounts[0]); // Assuming the first account is the wallet address
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);
    } catch (error) {
      alert("Error connecting to MetaMask: " + error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectWallet = () => {
    // Logic to disconnect the wallet
    setWalletAddress("");
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
                to={"/dashboard/validate-project"}
                >
                    Validate Project          
                </Link>
                </div>
                
            </div>
            </div>
        </nav>

        <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col items-center">
        <form class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
                Total Number of Projects: {projectCount}
            </label>
                
            <div className="text-indigo-400 font-bold">
                {walletAddress ? (
                <button
                    class="shadow w-full my-4 py-3 px-4 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleDisconnectWallet}
                >
                    Disconnect MetaMask
                </button>
                ) : (
                <button
                    class="shadow w-full my-4 py-3 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleConnectWallet}
                >
                    Connect to MetaMask
                </button>
                )} 
                <label>Wallet Address:</label>
                <input
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring"
                type="text"
                value={walletAddress}
                disabled
                placeholder="Wallet Address"
                /> 
              <label>Project Id</label>
              <input
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="number"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>
            
            {(!fetched) 
            ?
            <button 
            class="bg-gradient-to-r from-purple-800 to-green-500 my-3 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="button"
            onClick={fetchHandler}
            >Fetch Project Details</button>
            :
            <div>
            <button 
            class="bg-gradient-to-r from-purple-800 to-green-500 my-3 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="button"
            onClick={verifyHandler}
            >Verify</button>
            <button 
            class="bg-gradient-to-r from-purple-800 to-green-500 my-3 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="button"
            onClick={rejectHandler}
            >Reject</button>
            <button 
            class="bg-gradient-to-r from-purple-800 to-green-500 my-3 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="button"
            onClick={resetHandler}
            >Cancel</button>
            </div>
            }   
          </form>
          {message && <p className="text-indigo-100">{message}</p>}
        </div>
        {(projects.length!=0) 
        ? 
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Your Projects</h2>
          <table className="w-full border-collapse border border-green-800">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="border border-green-600 px-4 py-2">ID</th>
                <th className="border border-green-600 px-4 py-2">Name</th>
                <th className="border border-green-600 px-4 py-2">
                  Description
                </th>
                <th className="border border-green-600 px-4 py-2">Status</th>
                <th className="border border-green-600 px-4 py-2">
                  Expected Offsets
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                >
                  <td className="border border-green-600 px-4 py-2">
                    {project.id.toString()}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {project.name}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {project.description}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {project.status}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {project.expectedOffsets.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        :
        <div></div>
        } 
      </div>
    
    
  );
};

export default ProjectValidation;
