import React, { useState } from 'react';
import getWeb3 from '../utils/getWeb3';
import TradeContract from '../contracts/TradeContract.json';

const TradeCreation = () => {
  const [web3, setWeb3] = useState(null);
  const [buyer, setBuyer] = useState('');
  const [seller, setSeller] = useState('');
  const [creditsAmount, setCreditsAmount] = useState('');
  const [terms, setTerms] = useState('');
  const [message, setMessage] = useState('');

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
    <div>
      <h2>Create Trade</h2>
      <form onSubmit={handleCreateTrade}>
        <div>
          <label htmlFor="buyer">Buyer Address:</label>
          <input
            id="buyer"
            type="text"
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            placeholder="Enter Buyer's Address"
            required
          />
        </div>
        <div>
          <label htmlFor="seller">Seller Address:</label>
          <input
            id="seller"
            type="text"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            placeholder="Enter Seller's Address"
            required
          />
        </div>
        <div>
          <label htmlFor="creditsAmount">Credits Amount:</label>
          <input
            id="creditsAmount"
            type="number"
            value={creditsAmount}
            onChange={(e) => setCreditsAmount(e.target.value)}
            placeholder="Enter Credits Amount"
            required
          />
        </div>
        <div>
          <label htmlFor="terms">Trade Terms:</label>
          <textarea
            id="terms"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Enter Trade Terms"
            required
          />
        </div>
        <button type="submit">Create Trade</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TradeCreation;
