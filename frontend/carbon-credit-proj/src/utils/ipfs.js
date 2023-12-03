import { create } from 'ipfs-http-client';

// Replace 'http://localhost:5001' with the URL of your IPFS node
const ipfsClient = create({ url: 'http://localhost:5001' });

export const uploadToIPFS = async (file) => {
  try {
    const { cid } = await ipfsClient.add(file);
    const url = `https://ipfs.io/ipfs/${cid}`;
    return url; // Returns the URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
};

export const retrieveFromIPFS = async (hash) => {
  try {
    const data = await ipfsClient.cat(hash);
    return data; // Returns the content of the file from IPFS
  } catch (error) {
    console.error('Error retrieving file from IPFS:', error);
    throw error;
  }
};
