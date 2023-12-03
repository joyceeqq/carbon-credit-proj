import React, { useState, useEffect } from 'react';
import getWeb3 from '../utils/getWeb3';
import TradeContract from '../contracts/TradeContract.json';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const TradeCreation = () => {
  const [web3, setWeb3] = useState(null);
  const [buyer, setBuyer] = useState('');
  const [seller, setSeller] = useState('');
  const [creditsAmount, setCreditsAmount] = useState('');
  const [terms, setTerms] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState("");


  useEffect(() => {
      setUserType(localStorage.getItem("userType"))
  });

  console.log(`This is the ${userType} from TradeCreation`)

  const handleCreateTrade = async (event) => {
    event.preventDefault();

    if (!web3) {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
      } catch (error) {
        setMessage('Failed to load web3, accounts, or contract. Check console for details.');
        console.error(error);
        return;
      }
    }

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TradeContract.networks[networkId];
    const instance = new web3.eth.Contract(
      TradeContract.abi,
      deployedNetwork && deployedNetwork.address,
    );

    try {
      const accounts = await web3.eth.getAccounts();
      await instance.methods.createTrade(buyer, seller, creditsAmount, terms).send({ from: accounts[0] });
      setMessage('Trade created successfully!');
    } catch (error) {
      setMessage(`Error creating trade: ${error.message}`);
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
                to={"/dashboard/create-trade"}
                >
                    Create Trade
                </Link>
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/complete-trade"}
                >
                    Complete Trade                
                </Link>
                </div>
                
            </div>
            </div>
        </nav>

        <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col items-center">
          <form onSubmit={handleCreateTrade} class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
              Fill in your trade details here!
            </label>
            <div className="text-indigo-400 font-bold">
              <label htmlFor="buyer">Buyer Address:</label>
              <input
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="buyer"
                type="text"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                placeholder="Enter Buyer's Address"
                required
              />
            </div>
            <div className="text-indigo-400 font-bold">
              <label htmlFor="seller">Seller Address:</label>
              <input
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="seller"
                type="text"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                placeholder="Enter Seller's Address"
                required
              />
            </div>
            <div className="text-indigo-400 font-bold">
              <label htmlFor="creditsAmount">Credits Amount:</label>
              <input
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="creditsAmount"
                type="number"
                value={creditsAmount}
                onChange={(e) => setCreditsAmount(e.target.value)}
                placeholder="Enter Credits Amount"
                required
              />
            </div>
            <div className="text-indigo-400 font-bold"> 
              <label htmlFor="terms">Trade Terms:</label>
              <textarea
                class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="terms"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="Enter Trade Terms"
                required
              />
            </div>
            <button 
            class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="submit">Create Trade</button>
          </form>
          {message && <p className="text-indigo-100">{message}</p>}
        </div>    
      </div>
    
  );
};

export default TradeCreation;
