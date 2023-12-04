import React, { useState, useEffect } from "react";
import getWeb3 from "../utils/getWeb3";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ProjectContract from "../contracts/ProjectContract.json"; // Import ABI

const ViewProjects = () => {
  const [web3, setWeb3] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectCount, setProjectCount] = useState(0);

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

  const fetchProjectDetails = async () => {
    if (web3) {
      // Update the contract address with the deployed contract address on Sepolia testnet
      const contractAddress = "0x4e2A86bcd030E1bFE3FB4E81f4007223455Ec9b6";

      // Get the contract instance
      const instance = new web3.eth.Contract(
        ProjectContract.abi,
        contractAddress
      );

      // Call the 'projectCount' function to get the total number of projects
      const count = await instance.methods.projectCount().call();
      console.log(count);
      setProjectCount(parseInt(count, 10));

      // Fetch project details for each project and filter by wallet address
      const projectsList = [];
      for (let id = 1; id <= projectCount; id++) {
        const project = await instance.methods.projects(id).call();
        console.log(project);
        if (
          project.companyAddress.toLowerCase() === walletAddress.toLowerCase()
        ) {
          projectsList.push(project);
        }
      }
      setProjects(projectsList);
      console.log("Projects: ", projectsList)
    }
  };

  useEffect(() => {
    if (web3) {
      fetchProjectDetails();
    }
  }, [web3]);

  const handleDisconnectWallet = () => {
    // Logic to disconnect the wallet
    setWalletAddress("");
    setProjects([]);
  };

  return (
    <div className="h-screen">
      {/* ... (your navigation code) */}
      <nav>
        <div class="w-full container mx-auto">
          <div class="w-full flex items-center justify-between">
            <Link
              class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
              to={"/"}
            >
              Brock
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                chain
              </span>
            </Link>
            <div class="flex w-1/2 justify-end content-center">
            <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/create-trade"}
                >
                    Create Trade
                </Link>
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/complete-trade"}
                >
                    Complete Trade                
                </Link>
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
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/view-projects"}
                >
                    View Projects          
                </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col items-center">
        <div className="text-indigo-400 font-bold">
          {walletAddress ? (
            <button
              className="shadow w-full my-4 py-3 px-4 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDisconnectWallet}
            >
              Disconnect MetaMask
            </button>
          ) : (
            <button
              className="shadow w-full my-4 py-3 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleConnectWallet}
            >
              Connect to MetaMask
            </button>
          )}
          <label>Wallet Address:</label>
          <input
            className="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring"
            type="text"
            value={walletAddress}
            disabled
            placeholder="Wallet Address"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Your Projects</h2>
          <table className="w-full border-collapse border border-green-800">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="border border-blue-400 px-4 py-2">ID</th>
                <th className="border border-blue-400 px-4 py-2">Name</th>
                <th className="border border-blue-400 px-4 py-2">
                  Description
                </th>
                <th className="border border-blue-400 px-4 py-2">Status</th>
                <th className="border border-blue-400 px-4 py-2">
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
      </div>
    </div>
  );
};

export default ViewProjects;
