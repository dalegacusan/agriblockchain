require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const cors = require('cors')

const crowdfunding = require('../truffle/build/contracts/Crowdfunding.json');

const {
    WEB3_USER,
    WEB3_PASSWORD,
    WEB3_PROVIDER,
    OWNER_ADDRESS,
    OWNER_PRIVATE_KEY,
    CONTRACT_ADDRESS,
} = process.env;

// Connection to chain
// Use this for web deployed chain
/*const web3 = new Web3(new Web3.providers.HttpProvider(
  `https://${WEB3_USER}:${WEB3_PASSWORD}@${WEB3_PROVIDER}`,
));*/

// Use this for local chain
const web3 = new Web3('ws://localhost:7545');

web3.eth.net.isListening()
  .then(function() {

    // Contract details
    console.log("connected");
    const crowdfundingContract = new web3.eth.Contract(
        crowdfunding.abi,
        CONTRACT_ADDRESS
    );
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.post('/api/crowdfunding/mint/', async function (req, res){
        try {
            const callerAddress = req.body.callerAddress;
            const callerKey = req.body.callerKey;
            const amount = req.body.amount;


            const data = crowdfundingContract
              .methods
              .mintRequest(
                  parseInt(amount),
              )
              .encodeABI();
          transactionHash = await buildSendTransaction(
              callerAddress,
              callerKey,
              data,
          );

            res.status(200).json({
                message: 'Successfully minted ' + amount + ' for ' + callerAddress,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
            message: 'Failed to mint tokens to account.'
            });
        }
    });

    app.post('/api/crowdfunding/burn/', async function (req, res){
        try {
            const callerAddress = req.body.callerAddress;
            const callerKey = req.body.callerKey;
            const amount = req.body.amount;


            const data = crowdfundingContract
              .methods
              .burnRequest(
                  parseInt(amount),
              )
              .encodeABI();
          transactionHash = await buildSendTransaction(
              callerAddress,
              callerKey,
              data,
          );

            res.status(200).json({
                message: 'Successfully burned ' + amount + ' from ' + callerAddress,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
            message: 'Failed to burn tokens.'
            });
        }
    });

    app.post('/api/crowdfunding/addNewFunder/', async function (req, res){
        try {
            const callerAddress = req.body.callerAddress;
            const callerKey = req.body.callerKey;
            const funderAddress = req.body.funderAddress;


            const data = crowdfundingContract
              .methods
              .addNewFunder(
                  funderAddress,
              )
              .encodeABI();
          transactionHash = await buildSendTransaction(
              callerAddress,
              callerKey,
              data,
          );

            res.status(200).json({
                message: 'Successfully added funder.',
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
            message: 'Failed to add funder.'
            });
        }
    });

    app.get('/api/crowdfunding/balance/:address', async function (req, res) {
        try {
            const address = req.params.address;

            const balance = await crowdfundingContract
                .methods
                .getBalanceOf(address)
                .call({from: address});
            
            res.status(200).json({
                message: 'Successfully retrieved balance.',
                balance: balance,
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
            message: 'Failed to retrieve balance.'
            });
        }
    });

    app.get('/api/crowdfunding/program/:address', async function (req, res) {
        try {
            const address = req.params.address;

            const programStruct = await crowdfundingContract
                .methods
                .programs(address)
                .call();
            
            res.status(200).json({
                message: 'Successfully retrieved program details.',
                programStruct: programStruct,
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
            message: 'Failed to retrieve program.'
            });
        }
    });

    app.get('/api/crowdfunding/getPledge/:funderAddress/:programAddress', async function (req, res) {
        try {
            const programAddress = req.params.programAddress;
            const funderAddress = req.params.funderAddress;

            const pledgedAmount = await crowdfundingContract
                .methods
                .getPledgeOf(funderAddress, programAddress)
                .call({from: funderAddress});
            
            res.status(200).json({
                message: 'Successfully retrieved pledge amount.',
                pledgedAmount: pledgedAmount,
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
            message: 'Failed to retrieve pledge amount.'
            });
        }
    });

    app.post('/api/crowdfunding/createNewProgram/', async function (req, res){
        try {
            const callerAddress = req.body.callerAddress;
            const callerKey = req.body.callerKey;
            const address = req.body.programAddress;
            const amount = req.body.amount;


            const data = crowdfundingContract
              .methods
              .createNew(
                  address,
                  parseInt(amount),
              )
              .encodeABI();
          transactionHash = await buildSendTransaction(
              callerAddress,
              callerKey,
              data,
          );

            res.status(200).json({
                message: 'Successfully created program at' + address,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
            message: 'Failed to create new program.'
            });
        }
    });

    app.post('/api/crowdfunding/pledge/', async function (req, res){
        try {
            const callerAddress = req.body.callerAddress;
            const callerKey = req.body.callerKey;
            const address = req.body.programAddress;
            const amount = req.body.amount;


            const data = crowdfundingContract
              .methods
              .pledge(
                  address,
                  parseInt(amount),
              )
              .encodeABI();
          transactionHash = await buildSendTransaction(
              callerAddress,
              callerKey,
              data,
          );

            res.status(200).json({
                message: 'Successfully pledged ' + amount + ' for ' + address,
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: 'Failed to create pledge.'
            });
        }
    });

    app.post('/api/crowdfunding/revertPledge/', async function (req, res){
        try {
            const callerAddress = req.body.callerAddress;
            const callerKey = req.body.callerKey;
            const address = req.body.programAddress;
            const amount = req.body.amount;


            const data = crowdfundingContract
              .methods
              .revertPledge(
                  address,
                  parseInt(amount),
              )
              .encodeABI();
          transactionHash = await buildSendTransaction(
              callerAddress,
              callerKey,
              data,
          );

            res.status(200).json({
                message: 'Successfully reverted pledge of ' + amount + ' for ' + address,
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
            message: 'Failed to revert pledge'
            });
        }
    });

    app.post('/api/crowdfunding/closeAndRevertAll/', async function (req, res){
        try {
            const callerAddress = req.body.callerAddress;
            const callerKey = req.body.callerKey;
            const address = req.body.programAddress;

            const data = crowdfundingContract
              .methods
              .closeAndRevertAll(
                  address,
              )
              .encodeABI();
          transactionHash = await buildSendTransaction(
              callerAddress,
              callerKey,
              data,
          );

            res.status(200).json({
                message: 'Successfully closed and reverted pledges',
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
            message: 'Failed to close'
            });
        }
    });

    app.post('/api/crowdfunding/addFarmerPartnership/', async function (req, res){
        try {
            const callerAddress = req.body.callerAddress;
            const callerKey = req.body.callerKey;
            const programAddress = req.body.programAddress;
            const farmerAddress = req.body.farmerAddress;
            const amount = req.body.amount;

            const data = crowdfundingContract
              .methods
              .addFarmerPartnership(
                programAddress,
                farmerAddress,
                parseInt(amount)
              )
              .encodeABI();
          transactionHash = await buildSendTransaction(
              callerAddress,
              callerKey,
              data,
          );

            res.status(200).json({
                message: 'Successfully added farmer',
            });
        } catch (error) {
            console.log(error)

            res.status(500).json({
                message: 'Failed to add farmer.'
            });
        }
    });

    app.post('/api/crowdfunding/transferFunds/', async function (req, res){
        try {
            const callerAddress = req.body.callerAddress;
            const callerKey = req.body.callerKey;
            const programAddress = req.body.programAddress;
            const farmerAddress = req.body.farmerAddress;
            const amount = req.body.amount;

            const data = crowdfundingContract
              .methods
              .transferFunds(
                programAddress,
                farmerAddress,
                parseInt(amount)
              )
              .encodeABI();
          transactionHash = await buildSendTransaction(
              callerAddress,
              callerKey,
              data,
          );

            res.status(200).json({
                message: 'Successfully trasnferred tokens to farmer',
            });
        } catch (error) {
            console.log(error)

            res.status(500).json({
            message: 'Failed to transfer.'
            });
        }
    });

    const PORT = 8081;

    app.listen(PORT, () => {
      console.log('Example app listening at http://localhost:' + PORT);
    });
  })
  .catch(function(error) {
    console.log('Connection to chain not established!');

    console.error(error);

    process.exit(1);
  });

/**
 * @param {String} address - sender of the transaction
 * @param {String} privateKey - sender's private key
 * @param {String} encodedABI - myContract.methods.myMethod().encodeABI()
 */
async function buildSendTransaction(
    address,
    privateKey,
    encodedABI,
) {

  const txParams = {
    from: address,
    nonce: await web3.eth.getTransactionCount(address),// incremental value
    to: CONTRACT_ADDRESS, // crowdfunding address - CONTRACT_ADDRESS
    value: 0,// if you're sending ether
    gasLimit: web3.utils.toHex(6721975),// limit of gas willing to spend
    gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),// transaction fee
    data: encodedABI, // instructions
  };

  const tx = new Tx(txParams);

  // Sign the Transaction with sender's private key
  tx.sign(Buffer.from( // convert string to Buffer
      privateKey.substring(2), // remove 0x
      'hex',
  ));

  const serializedTx = tx.serialize();
  const rawTx = '0x' + serializedTx.toString('hex');
  const transaction = await web3.eth.sendSignedTransaction(rawTx);

  return transaction.transactionHash;
}