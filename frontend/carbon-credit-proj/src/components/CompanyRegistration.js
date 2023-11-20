import React, { useState } from 'react';
import getWeb3 from '../utils/getWeb3';
import CompanyContract from '../contracts/Company.json'; // Import ABI

const CompanyRegistration = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const handleRegister = async (walletAddress, name, registrationNumber) => {
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
    await contract.methods.registerCompany(walletAddress, name, registrationNumber).send({ from: accounts[0] });

    // Handle additional logic
  };

  return (
    <div>
      {/* Form for company registration */}
    </div>
  );
};

export default CompanyRegistration;
