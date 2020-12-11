## If contract is not yet deployed: 

First deploy a blockchain (Ganache should deploy at localhost:7545)

Go to truffle directory and run
```bash
truffle migrate
```

## Prerequisites
Make sure the blockchain is up and contract is deployed at localhost:7545

Copy and paste the contract address, owner account and owner private key (prepend 0x) to the .env file

It should look like this
```bash
OWNER_ADDRESS=0x3FdD9A81380b00409979765E4215e2Ab7c1A41e0
OWNER_PRIVATE_KEY=0xfa599b3be9b548e1f415270a9ac7354aa37260ebef340dbbbcaa106568454c40
CONTRACT_ADDRESS=0x18adBAc1b598B26040431a4d692CF14e789867f2
```



## Connect to the blockchain

```bash
npm install
```

```bash
npm run dev
```
This will open localhost:8081

Test the API with Postman using the addresses provided by Ganache
