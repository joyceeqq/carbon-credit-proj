import React, { useState } from 'react';
import getWeb3 from '../utils/getWeb3';
import TradeContract from '../contracts/TradeContract.json'; // Import ABI

const TradeCompletion = () => {
  const [web3, setWeb3] = useState(null);
  const [tradeId, setTradeId] = useState('');
  const [tradeDetails, setTradeDetails] = useState(null);
  const [message, setMessage] = useState('');

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
    <div>
      <h2>Complete Trade</h2>
      <input
        type="text"
        value={tradeId}
        onChange={handleTradeIdChange}
        placeholder="Enter trade ID"
      />
      <button onClick={fetchTradeDetails}>Fetch Trade Details</button>
      {tradeDetails && (
        <div>
          <p><strong>Trade ID:</strong> {tradeDetails.id}</p>
          <p><strong>Buyer:</strong> {tradeDetails.buyer}</p>
          <p><strong>Seller:</strong> {tradeDetails.seller}</p>
          <p><strong>Credits Amount:</strong> {tradeDetails.creditsAmount}</p>
          <p><strong>Terms:</strong> {tradeDetails.terms}</p>
          <p><strong>Status:</strong> {tradeDetails.status}</p>
          <button onClick={handleCompleteTrade} disabled={tradeDetails.status !== 'Created'}>
            Complete Trade
          </button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default TradeCompletion;
