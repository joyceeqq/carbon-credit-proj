import React, { useState } from 'react';
import getWeb3 from '../utils/getWeb3';
import CompanyContract from '../contracts/CompanyContract.json'; // Import ABI

const CompanyRegistration = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

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
    <div>
      <h2>Company Registration</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Wallet Address:</label>
          <input
            type="text"
            value={walletAddress}
            onChange={e => setWalletAddress(e.target.value)}
            placeholder="Enter Wallet Address"
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter Company Name"
            required
          />
        </div>
        <div>
          <label>Registration Number:</label>
          <input
            type="text"
            value={registrationNumber}
            onChange={e => setRegistrationNumber(e.target.value)}
            placeholder="Enter Registration Number"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CompanyRegistration;
