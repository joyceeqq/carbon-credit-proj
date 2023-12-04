import Web3 from "web3";

const getWeb3 = async () => {
  let web3;

  // Modern dapp browsers
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
    } catch (error) {
      throw new Error("User denied account access");
    }
  }
  // Legacy dapp browsers
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
  // Non-dapp browsers
  else {
    throw new Error("Web3 is not available in your browser. Please use a dapp browser like MetaMask.");
  }

  return web3;
};

export default getWeb3;
