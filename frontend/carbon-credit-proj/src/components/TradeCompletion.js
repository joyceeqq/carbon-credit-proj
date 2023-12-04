import React, { useState, useEffect } from "react";
import getWeb3 from "../utils/getWeb3";
import TradeContract from "../contracts/TradeContract.json"; // Import ABI
import CompanyContract from "../contracts/CompanyContract.json"; // Import ABI
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const TradeCompletion = () => {
  const [web3, setWeb3] = useState(null);
  const [tradeId, setTradeId] = useState("");
  const [tradeDetails, setTradeDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  });

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

  console.log(`This is the ${userType} from TradeCompletion`);

  const handleTradeIdChange = (e) => {
    setTradeId(e.target.value);
  };

  const fetchTradeDetails = async () => {
    // You would implement logic here to fetch trade details based on tradeId
    // For now, we'll just mock this
    // setTradeDetails({
    //   id: tradeId,
    //   buyer: '0xBuyerAddress',
    //   seller: '0xSellerAddress',
    //   creditsAmount: '100',
    //   terms: 'Trade terms...',
    //   status: 'Created'
    // });

    if (!web3) {
      setMessage("Please connect your MetaMask wallet.");
      return;
    }
    const contractAddress = "0x2d4d2830040Dd054d21f336188f11CA78e63b8E1";

    const instance = new web3.eth.Contract(TradeContract.abi, contractAddress);

    const count = await instance.methods.tradeCount().call();
    console.log("count: ", count);
    const tradeList = [];
    console.log("walletAddress: ", walletAddress);
    for (let id = 1; id <= count; id++) {
      const trade = await instance.methods.trades(id).call();
      console.log(trade);
      if (
        trade.buyer.toLowerCase() === walletAddress[0].toLowerCase() ||
        trade.seller.toLowerCase() === walletAddress[0].toLowerCase()
      ) {
        tradeList.push(trade);
      }
    }
    console.log("tradeList: ", tradeList);
    setTrades(tradeList);
  };

  useEffect(() => {
    if (web3) {
      fetchTradeDetails();
    }
  }, [web3]);

  const handleCompleteTrade = async (tradeId, seller, buyer, amount) => {
    setMessage("Completing trade...");
    try {
      if (!web3) {
        setMessage("Please connect your MetaMask wallet.");
        return;
      }
  
      const accounts = await web3.eth.getAccounts();
      const tradeContractAddress = "0x2d4d2830040Dd054d21f336188f11CA78e63b8E1";
      const CompanyContractAddress = "0x1C20A3defd61B0426E51C91A77A23522Df45f47C";
  
      const tradeContract = new web3.eth.Contract(TradeContract.abi, tradeContractAddress);
      const carbonCreditContract = new web3.eth.Contract(CompanyContract.abi, CompanyContractAddress);
  
      // Call the completeTrade function in the trade contract
      await tradeContract.methods.completeTrade(tradeId).send({ from: accounts[0] });
  
      // Call the tradeCarbonCredits function in the carbon credit contract
      await carbonCreditContract.methods.tradeCarbonCredits(seller, buyer, amount).send({ from: accounts[0] });
  
      setMessage("Trade completed successfully!");
      // You may want to refresh the trade list after completion, so you can call fetchTradeDetails() here if needed.
    } catch (error) {
      setMessage(`Error completing trade: ${error.message}`);
    }
  };
  
  
  

  return (
    <div className="h-screen">
      {/* Navigation */}
      <nav>
        <div className="w-full container mx-auto">
          <div className="w-full flex items-center justify-between">
            <Link
              className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              to={"/"}
            >
              Brock
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                chain
              </span>
            </Link>

            <div className="flex w-1/2 justify-end content-center">
              <Link
                className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                to={"/dashboard/create-trade"}
              >
                Create Trade
              </Link>
              <Link
                className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                to={"/dashboard/complete-trade"}
              >
                Complete Trade
              </Link>
              <Link
                className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                to={"/dashboard/register-company"}
              >
                Register Company
              </Link>
              <Link
                className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                to={"/dashboard/submit-project"}
              >
                Submit Project
              </Link>
              <Link
                className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
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
          <h2 className="text-2xl font-bold mb-2">Your Trades</h2>
          <table className="w-full border-collapse border border-green-800">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="border border-blue-400 px-4 py-2">ID</th>
                <th className="border border-blue-400 px-4 py-2">Buyer</th>
                <th className="border border-blue-400 px-4 py-2">Seller</th>
                <th className="border border-blue-400 px-4 py-2">
                  Credits Amount
                </th>
                <th className="border border-blue-400 px-4 py-2">Terms</th>
                <th className="border border-blue-400 px-4 py-2">Status</th>
                <th className="border border-blue-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                >
                  <td className="border border-green-600 px-4 py-2">
                    {trade.id.toString()}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {trade.buyer}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {trade.seller}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {trade.creditsAmount.toString()}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {trade.terms}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {trade.status}
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {trade.status === "Created" && (
                      <button
                        className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold my-2 py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        onClick={() => handleCompleteTrade(trade.id, trade.seller, trade.buyer, trade.creditsAmount)}
                      >
                        Complete
                      </button>
                    )}
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

export default TradeCompletion;
