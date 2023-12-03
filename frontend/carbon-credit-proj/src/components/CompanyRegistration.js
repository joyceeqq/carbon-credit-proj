import React, { useState, useEffect } from 'react';
import getWeb3 from '../utils/getWeb3';
import CompanyContract from '../contracts/CompanyContract.json'; // Import ABI
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const CompanyRegistration = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [userType, setUserType] = useState("");


  useEffect(() => {
      setUserType(localStorage.getItem("userType"))
  });

  console.log(`This is the ${userType} from Company Registration`)

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Initialize web3
    if (!web3) {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);
    }

    // Get the contract instance
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = CompanyContract.networks[networkId];
    const instance = new web3.eth.Contract(
      CompanyContract.abi,
      deployedNetwork && deployedNetwork.address,
    );
    setContract(instance);

    // Interact with the smart contract
    const accounts = await web3.eth.getAccounts();
    try {
      await instance.methods.registerCompany(walletAddress, name, registrationNumber).send({ from: accounts[0] });
      alert('Company registered successfully!');
    } catch (error) {
      alert('Error registering company: ' + error.message);
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
        <form onSubmit={handleRegister} class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
              Fill in company details below!
            </label>
            <div className="text-indigo-400 font-bold">
              <label>Wallet Address:</label>
              <input
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="text"
                value={walletAddress}
                onChange={e => setWalletAddress(e.target.value)}
                placeholder="Enter Wallet Address"
                required
              />
            </div>
            <div className="text-indigo-400 font-bold">
              <label>Company Name:</label>
              <input
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
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
                onChange={e => setRegistrationNumber(e.target.value)}
                placeholder="Enter Registration Number"
                required
              />
            </div>
            <button 
            class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="submit">Register</button>
          </form>
        </div> 
     
      </div>
    
  );
};

export default CompanyRegistration;
