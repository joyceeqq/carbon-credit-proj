# carbon-credit-proj

## For developers
### Downloads
- Download and install Node.js
- Install Tuffle Suite: You can install it globally using npm
```
npm install -g truffle
```
- Install Ganache globally:
```
npm install ganache --global
```
- Download IPFS via the IPFS website. Run `ipfs init` in your terminal to initialise IPFS on your machine and create a new IPFS repository.

### Editting or adding new smart contracts
You can create `.sol` files insider the `contracts` directory. Write your solidity smart contracts for handling the various functions of our carbon credits system. Compile your contacts to check for any errors and generate ABI (Application Binary Interface):
```
truffle compile
```
As our React project is separate from our Truffle project, everytime we compile the contracts, we have to manually update copy the artifacts over from `build/contracts` to `src/contracts` of our React project. Possible Improvement: We can create a script in our React project that copies these JSON files from the Truffle build directory to our React project whenever they are updated. We can run this script manually or automate it as part of the build process.

### Testing Smart contracts
Ensure that ganache is running:
```
ganache
```
Before running the tests, we need to deploy our contract into ganache. Open a new terminal and run:
```
truffle migrate --reset
```
We can then run the tests now:
```
truffle test
```
### How to run the application
- Open one terminal and run ganache:
```
ganache
```
- Open a new terminal and run ipfs daemon to start the IPFS daemon. This starts an IPFS node on your local machine, allowing you to interact with the IPFS network.
```
ipfs daemon
```
- Open a  new terminal again and cd to the frontend directory to run the react application:
```
cd frontend
cd carbon-credit-proj
npm start
```