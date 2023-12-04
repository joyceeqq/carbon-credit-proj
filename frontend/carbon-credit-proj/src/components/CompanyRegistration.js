import React, { useState, useEffect } from "react";
import getWeb3 from "../utils/getWeb3";
import CompanyContract from "../contracts/CompanyContract.json"; // Import ABI
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { toast } from 'react-toastify';

const CompanyRegistration = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [emissions, setEmissions] = useState("");
  const [userType, setUserType] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  }, []);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setWalletAddress(accounts);
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


  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
  
    if (!web3) {
      alert("Web3 is not available. Please connect your wallet.");
      return;
    }
    // Update the contract address with the deployed contract address on Sepolia testnet
    const contractAddress = "0xdd14192987bb3a4355954E3F8116c68e8d59F8B1";
  
    // Get the contract instance
    const instance = new web3.eth.Contract(
      CompanyContract.abi,
      contractAddress
    );
  
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
  
      if (accounts.length === 0) {
        toast.error("No Ethereum accounts found.");
        return;
      }
  
      const senderAddress = accounts[0];
      // Call your contract function here
      // For example, if you want to call the 'registerCompany' function:
      await instance.methods.registerCompany(senderAddress, name, registrationNumber, emissions).send({ from: senderAddress });
  
      toast.success("Company registered successfully!");
    } catch (error) {
      toast.error("Error registering company: " + error.message);
    }
  };
  
  

  return (
    <div class="h-screen">
      {/* <!--Nav--> */}
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

      <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col items-center">
        <form
          onSubmit={handleRegister}
          class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <label
            class="block text-blue-300 py-2 font-bold mb-2"
            for="emailaddress"
          >
            Fill in company details below!
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
          </div>
          <div className="text-indigo-400 font-bold">
            <label>Company Name:</label>
            <input
              class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Company Name"
              required
            />
          </div>
          <div className="text-indigo-400 font-bold">
            <label>Registration Number:</label>
            <input
              class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Enter Registration Number"
              required
            />
          </div>
            <div className="text-indigo-400 font-bold"></div>
            <label>Emissions:</label>
            <input
              class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              type="text"
              value={emissions}
              onChange={(e) => setEmissions(e.target.value)}
              placeholder="Enter Emissions"
              required
            />
          <button
            class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistration;
