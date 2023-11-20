// src/utils/ipfs.js or src/services/ipfs.js

import { create } from 'ipfs-http-client';

const ipfsClient = create('http://localhost:5001');

export const uploadToIPFS = async (file) => {
  try {
    const added = await ipfsClient.add(file);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    return url; // Returns the URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
};

export const retrieveFromIPFS = async (hash) => {
  // Function to retrieve files from IPFS using the hash
};
