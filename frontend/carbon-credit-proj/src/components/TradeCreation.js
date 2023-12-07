import React, { useState, useEffect } from 'react';
import getWeb3 from '../utils/getWeb3';
import TradeContract from '../contracts/TradeContract.json';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TradeCreation = () => {
  const [web3, setWeb3] = useState(null);
  const [buyer, setBuyer] = useState('');
  const [seller, setSeller] = useState('');
  const [creditsAmount, setCreditsAmount] = useState('');
  const [terms, setTerms] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState('');
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    setUserType(localStorage.getItem('userType'));
  }, []);

  const handleConnectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setWeb3(await getWeb3());
      console.log(accounts);
      if (actionType === 'Buy') {
        setBuyer(accounts[0]);
        setSeller('');
      } else if (actionType === 'Sell') {
        setSeller(accounts[0]);
        setBuyer('');
      }
    } catch (error) {
      alert('Error connecting to MetaMask: ' + error.message);
    }
  };

  const handleActionType = (type) => {
    setActionType(type);
    handleConnectWallet();
  };

  const handleCreateTrade = async (event) => {
    event.preventDefault();

    if (!web3) {
      setMessage('Please connect your MetaMask wallet.');
      return;
    }

    const contractAddress = "0x589866F8169325be506dEA0951b9dE4bB7557e9B";
    
    const instance = new web3.eth.Contract(
      TradeContract.abi,
      contractAddress
    );

    try {
      const accounts = await web3.eth.getAccounts();
      await instance.methods
        .createTrade(buyer, seller, creditsAmount, terms)
        .send({ from: accounts[0] });
      toast.success('Trade created successfully!');
    } catch (error) {
      toast.error(`Error creating trade: ${error.message}`);
    }
  };

  return (
    <div className="h-screen">
      <nav>
        <div className="w-full container mx-auto">
          <div className="w-full flex items-center justify-between">
            <Link
              className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              to={'/'}
            >
              Brock
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                chain
              </span>
            </Link>
            <div className="flex w-1/2 justify-end content-center">
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
        <div className="mb-4">
          <label className="block text-blue-300 py-2 font-bold mb-2">
            Choose an Action:
          </label>
          <div className="flex space-x-4">
            <button
              className={`${
                actionType === 'Buy'
                  ? 'bg-blue-500'
                  : 'bg-gray-400 hover:bg-gray-500'
              } text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleActionType('Buy')}
            >
              Buy
            </button>
            <button
              className={`${
                actionType === 'Sell'
                  ? 'bg-blue-500'
                  : 'bg-gray-400 hover:bg-gray-500'
              } text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleActionType('Sell')}
            >
              Sell
            </button>
          </div>
        </div>

        <form
          onSubmit={handleCreateTrade}
          className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="text-indigo-400 font-bold">
            <label htmlFor="buyer">Buyer Address:</label>
            <input
              className="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              id="buyer"
              type="text"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
              placeholder="Enter Buyer's Address"
              required
              disabled={actionType === 'Buy'}
            />
          </div>
          <div className="text-indigo-400 font-bold">
            <label htmlFor="seller">Seller Address:</label>
            <input
              className="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              id="seller"
              type="text"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              placeholder="Enter Seller's Address"
              required
              disabled={actionType === 'Sell'}
            />
          </div>
          <div className="text-indigo-400 font-bold">
            <label htmlFor="creditsAmount">Credits Amount:</label>
            <input
              className="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
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
              className="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              id="terms"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="Enter Trade Terms"
              required
            />
          </div>
          <button
            className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="submit"
          >
            Create Trade
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeCreation;
