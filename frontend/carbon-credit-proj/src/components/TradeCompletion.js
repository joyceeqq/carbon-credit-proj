import React, { useState,useEffect } from 'react';
import getWeb3 from '../utils/getWeb3';
import TradeContract from '../contracts/TradeContract.json'; // Import ABI
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const TradeCompletion = () => {
  const [web3, setWeb3] = useState(null);
  const [tradeId, setTradeId] = useState('');
  const [tradeDetails, setTradeDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState("");


  useEffect(() => {
      setUserType(localStorage.getItem("userType"))
  });

  console.log(`This is the ${userType} from TradeCompletion`)

  const handleTradeIdChange = (e) => {
    setTradeId(e.target.value);
  };

  const fetchTradeDetails = async () => {
    // You would implement logic here to fetch trade details based on tradeId
    // For now, we'll just mock this
    setTradeDetails({
      id: tradeId,
      buyer: '0xBuyerAddress',
      seller: '0xSellerAddress',
      creditsAmount: '100',
      terms: 'Trade terms...',
      status: 'Created'
    });
  };

  const handleCompleteTrade = async () => {
    setMessage('Completing trade...');
    try {
      const web3Instance = await getWeb3();
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = TradeContract.networks[networkId];
      const contract = new web3Instance.eth.Contract(
        TradeContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const accounts = await web3Instance.eth.getAccounts();
      await contract.methods.completeTrade(tradeId).send({ from: accounts[0] });

      setMessage('Trade completed successfully!');
    } catch (error) {
      setMessage(`Error completing trade: ${error.message}`);
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
            <form class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
                  Complete your trade here!
                </label>
                
                <input
                  class="shadow appearance-none border rounded w-full my-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                  type="text"
                  value={tradeId}
                  onChange={handleTradeIdChange}
                  placeholder="Enter trade ID"
                />
              </div>

              <div class="flex items-center justify-between pt-4">
                <button
                  class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                  type="button"
                  onClick={fetchTradeDetails}
                >
                  Fetch Trade Details
                </button>
                {tradeDetails && (
                  <div>
                    <div className="text-indigo-100">
                    <p><strong>Trade ID:</strong> {tradeDetails.id}</p>
                    <p><strong>Buyer:</strong> {tradeDetails.buyer}</p>
                    <p><strong>Seller:</strong> {tradeDetails.seller}</p>
                    <p><strong>Credits Amount:</strong> {tradeDetails.creditsAmount}</p>
                    <p><strong>Terms:</strong> {tradeDetails.terms}</p>
                    <p><strong>Status:</strong> {tradeDetails.status}</p>
                    </div>
                    <button 
                    class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    onClick={handleCompleteTrade} disabled={tradeDetails.status !== 'Created'}>
                      Complete Trade
                    </button>
                  </div>
                )}
                {message && <p className="text-indigo-100">{message}</p>}
              </div>
            </form>
          </div>         
        
      </div>
  );
};

export default TradeCompletion;
