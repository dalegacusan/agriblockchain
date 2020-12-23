require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const cors = require('cors');
const flatten = require('flat');
const Web3EthAccounts = require('web3-eth-accounts');

const Farmer = require('./models/Farmer');
const Program = require('./models/Program');
const NGO = require('./models/NGO');
const { produce, produceRequirement } = require('./models/Produce');
const Sponsor = require('./models/Sponsor');

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
const web3 = new Web3(`ws://${WEB3_PROVIDER}`);

web3.eth.net.isListening()
    .then(async function () {
        console.log("Successfully connected to Truffle!");

        // To generate an account with address and private key
        const accounts = new Web3EthAccounts(`ws://${WEB3_PROVIDER}`);
        // Retrieve all accounts from Ganache
        const ganacheAddresses = await web3.eth.getAccounts();
        const crowdfundingContract = new web3.eth.Contract(
            crowdfunding.abi,
            CONTRACT_ADDRESS
        );

        const app = express();
        const PORT = process.env.PORT || 7545;

        // Setting up basic middleware for all Express requests
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(bodyParser.json());

        const URL = process.env.MONGODB_URL;
        mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
            .then(result => {
                console.log('Successfully connected to MongoDB!');
            })
            .catch(error => {
                console.log(`Error connecting to MongoDB:`, error.message);

                process.exit(1);
            });

        const userModel = {
            program: Program,
            ngo: NGO,
            farmer: Farmer,
            sponsor: Sponsor,
        };

        // ===================================================================== //
        //                       START: BLOCKCHAIN ENDPOINTS                     //
        // ===================================================================== //

        // Set up routes
        require('./routes')(app);

        // NGO: [0]
        // Farmer: [1]
        // Sponsor [2]

        app.post('/api/create/ngo', (req, res) => {

            const {
                name,
                contactNumber,
                representativeName,
                address1,
                address2,
                region,
                city,
                country,
                username,
                password
            } = req.body;

            const newNGO = new NGO({
                blockchain: {
                    address: OWNER_ADDRESS
                },
                loginDetails: {
                    username,
                    password
                },
                ngoAbout: {
                    ngoName: name,
                    addressLine1: address1,
                    addressLine2: address2,
                    ngoRegion: region,
                    ngoCity: city,
                    ngoCountry: country,
                },
                ngoContactDetails: {
                    authorizedRepresentative: representativeName,
                    ngoContactNumber: contactNumber,
                },
                programs: {
                    activePrograms: [],
                    completedPrograms: [],
                }
            });

            newNGO.save()
                .then(result => {
                    console.log('NGO Saved to Database!');

                    res.status(200).json({
                        message: "Successfully saved NGO to Database"
                    })
                })
                .catch(err => {
                    console.log('Error: ', err);

                    res.status(404).json({
                        message: "Failed to save NGO to Database"
                    })
                });

        });

        app.post('/api/create/farmer', (req, res) => {

            const testFarmer = new Farmer({
                blockchain: {
                    address: ganacheAddresses[1]
                },
                loginDetails: {
                    username: "mangjose",
                    password: "josemang123"
                },
                farmerAbout: {
                    firstName: "Juan",
                    middleName: "Sy",
                    lastName: "Jose",
                    suffix: "M",
                    addressLine1: "Cotabato City",
                    addressLine2: "Paranaque City",
                    region: "NCR",
                    city: "Manila",
                    country: "Philippines",
                },
                contactDetails: {
                    emailAddress: "mangjose@gmail.com",
                    contactNumber: "1234567890"
                },
                // producePortfolio: { type: Array, default: [] },        // DEFAULT
                // programsParticipated: { type: Array, default: [] },    // DEFAULT
                // walletBalance: { type: Number, default: 0 }            // DEFAULT
            });

            testFarmer.save()
                .then(result => {
                    console.log('Farmer Saved to MongoDB!');

                    res.status(200).json({
                        message: "Successfully saved Farmer to Database"
                    })
                })
                .catch(err => {
                    console.log('Error: ', err);

                    res.status(404).json({
                        message: "Failed to save Farmer to Database"
                    })
                });

        });

        app.post('/api/crowdfunding/createNewProgram/', async function (req, res) {
            const {
                programName,        // User
                about,              // User
                completed,          // DEFAULT = false
                cityAddress,        // User
                ngo,                // REQUIRED
                status,             // DEFAULT = "active"
                stage,              // DEFAULT = "crowdfunding"
                requiredAmount,     // User 
                programDate         // DEFAULT = new Date()
            } = req.body;

            try {
                // Generate a new account for a program
                const newAccount = await accounts.create();

                const callerAddress = OWNER_ADDRESS;
                const callerKey = OWNER_PRIVATE_KEY;
                const address = newAccount.address;

                const newProgram = new Program({
                    blockchain: newAccount,
                    programAbout: {
                        programName,
                        about,
                        cityAddress,
                        // Assumes that the caller is an NGO
                        ngo,
                        requiredAmount,
                    },
                    timeline: {
                        programDate: programDate,
                    },
                    produceRequirements: [],
                    farmersParticipating: [],    // DEFAULT
                    sponsors: [],                // DEFAULT
                });

                const data = crowdfundingContract
                    .methods
                    .createNew(
                        address,
                        parseInt(requiredAmount),
                    )
                    .encodeABI();
                transactionHash = await buildSendTransaction(
                    callerAddress,
                    callerKey,
                    data,
                );

                // Save a farmer to MongoDB
                newProgram.save()
                    .then(result => {
                        console.log(`Program ${programName}: Saved to Database!`);

                        res.status(200).json({
                            message: "Successfully saved Program to Database"
                        });

                    })
                    .catch(err => {
                        console.log('Error: ', err.errors['programAbout.ngo'].message);

                        res.status(404).json({
                            message: 'Failed to save Program to Database'
                        });
                    });

            } catch (error) {
                console.error(error);

                res.status(500).json({
                    message: 'Failed to create program.'
                });
            }
        });

        // Create a new Sponsor
        app.post('/api/crowdfunding/addNewFunder/', async function (req, res) {

            const {
                name,
                contactNumber,
                representativeName,
                address1,
                address2,
                region,
                city,
                country,
                username,
                password
            } = req.body;

            try {
                // Enter your own OWNER_ADDRESS and OWNER_PRIVATE_KEY in .env
                const callerAddress = OWNER_ADDRESS;
                const callerKey = OWNER_PRIVATE_KEY;
                const funderAddress = ganacheAddresses[2];

                const newSponsor = new Sponsor({
                    blockchain: {
                        address: funderAddress
                    },
                    loginDetails: {
                        username,
                        password
                    },
                    sponsorAbout: {
                        corporationName: name,
                        addressLine1: address1,
                        addressLine2: address2,
                        region,
                        city,
                        country
                    },
                    contactDetails: {
                        authorizedRepresentative: representativeName,
                        contactNumber,
                    },
                    // sponsoredPrograms: Array,      // DEFAULT = []
                    walletBalance: 100000
                });

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

                // Save a Sponsor to MongoDB
                newSponsor.save()
                    .then(result => {
                        console.log('Sponsor Saved to MongoDB!');
                        res.status(200).json({
                            message: 'Successfully added funder.',
                            data: result
                        });
                    })
                    .catch(err => {
                        console.log('Error: ', err);
                    });


            } catch (error) {
                console.error(error);

                res.status(500).json({
                    message: 'Failed to add funder.'
                });
            }
        });

        // Gives money to an address
        app.post('/api/crowdfunding/mint/', async function (req, res) {

            const { bodyAddress, bodyPrivateKey, amount } = req.body;

            try {

                const callerAddress = bodyAddress;
                const callerKey = bodyPrivateKey;

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

        // Add a Sponsor to a Program
        app.post('/api/crowdfunding/pledge/:programId/:sponsorId', async function (req, res) {

            const { programId, sponsorId } = req.params;

            try {

                Program.find({ _id: programId })
                    .then(async result => {

                        const callerAddress = ganacheAddresses[2];
                        const callerKey = "0x6c68b1bc58f1fc4fefffdfe1849e8c0c94430784ec6615616c4a22d3ceced0dd";
                        // Get blockchain address of program
                        const address = result[0].blockchain.address;
                        const amountFunded = req.body.amountFunded;

                        const sponsorToPush = {
                            sponsorId,
                            amountFunded,
                            dateFunded: new Date(),
                        }

                        // Add amount to currentAmount of Program
                        const newAmount = {
                            programAbout: {
                                currentAmount: amountFunded
                            }
                        }

                        const data = crowdfundingContract
                            .methods
                            .pledge(
                                address,
                                parseInt(amountFunded),
                            )
                            .encodeABI();
                        transactionHash = await buildSendTransaction(
                            callerAddress,
                            callerKey,
                            data,
                        );

                        Program.findOneAndUpdate(
                            { _id: programId },
                            {
                                $push: { sponsors: sponsorToPush },
                                $inc: flatten(newAmount)
                            }, { new: true })
                            .then((program) => {
                                console.log("Successfully added sponsor to Program's Sponsors array");

                                // Push programId to sponsoredPrograms array of Sponsor
                                Sponsor.findOneAndUpdate({ _id: sponsorId }, { $push: { sponsoredPrograms: programId }, $inc: { walletBalance: -amountFunded } })
                                    .then(() => {
                                        console.log("Added program to sponsoredPrograms array");

                                        const { programAbout } = program;
                                        const { currentAmount, requiredAmount } = programAbout;

                                        /* 
                                          Check if currentAmount of Program is >= required amount
                                          IF TRUE, set Program's stage to "procurement"
                                        */
                                        if (currentAmount >= requiredAmount) {
                                            program.programAbout.stage = "procurement"

                                            program.save()
                                                .then(() => {
                                                    console.log("Program is now in Procurement Phase!");
                                                })
                                        }

                                        res.status(200).json({
                                            message: 'Successfully pledged ' + amountFunded + ' for ' + address,
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })

                            })

                    });

            } catch (error) {
                console.log(error);

                res.status(500).json({
                    message: 'Failed to create pledge.'
                });
            }
        });

        // Add a Farmer to a Program
        app.post('/api/crowdfunding/addFarmerPartnership/:programId/:farmerId', async function (req, res) {

            const { programId, farmerId } = req.params;
            const { name, price, quantity } = req.body;

            const expectedAmountToReceive = price * quantity;

            try {
                Program.findById({ _id: programId })
                    .then(async result => {
                        const { blockchain: programBlockchainObj } = result;
                        const { address: programDBAddress } = programBlockchainObj;

                        Farmer.findById({ _id: farmerId })
                            .then(async result => {
                                const { blockchain: farmerBlockchainObj } = result;
                                const { address: farmerDBAddress } = farmerBlockchainObj;

                                const callerAddress = OWNER_ADDRESS;
                                const callerKey = OWNER_PRIVATE_KEY;
                                const programAddress = programDBAddress;
                                // Get address from Ganache accounts based on current instance of index
                                const farmerAddress = farmerDBAddress;

                                const producePledge = {
                                    farmerId,
                                    farmerAddress: farmerDBAddress,
                                    name,
                                    price,
                                    quantity,
                                    expectedAmountToReceive,
                                    dateParticipated: new Date(),
                                }

                                const data = crowdfundingContract
                                    .methods
                                    .addFarmerPartnership(
                                        programAddress,
                                        farmerAddress,
                                        parseInt(expectedAmountToReceive)
                                    )
                                    .encodeABI();
                                transactionHash = await buildSendTransaction(
                                    callerAddress,
                                    callerKey,
                                    data,
                                );

                                Program.findOneAndUpdate(
                                    { _id: programId },
                                    {
                                        $push: { farmersParticipating: producePledge },
                                    }, { new: true })
                                    .then((program) => {
                                        console.log("Successfully added Farmer to the Program's Farmers Participating array");

                                        // Push programId to programsParticipated array of Farmer
                                        Farmer.updateOne(
                                            { _id: farmerId },
                                            {
                                                $push:
                                                {
                                                    programsParticipated: {
                                                        programId,
                                                        name,
                                                        price,
                                                        quantity,
                                                        expectedAmountToReceive
                                                    }
                                                }
                                            })
                                            .then(() => {
                                                console.log("Added program to programsParticipated array");

                                                res.status(200).json({
                                                    message: 'Successfully added Farmer to Program',
                                                });
                                            })
                                            .catch(err => {
                                                console.log(err);

                                                res.status(404).json({
                                                    message: 'Failed to add Farmer to Program',
                                                });
                                            })



                                    })
                                    .catch(err => {
                                        console.error(err);
                                        res.status(400).json({
                                            status: "error",
                                            response: err
                                        });
                                    });
                            })

                    })
                    .catch(err => {
                        console.log('Error', err);
                    })

            } catch (error) {
                console.log(error)

                res.status(500).json({
                    message: 'Failed to add farmer.'
                });
            }
        });

        // Put stage to execution
        app.patch('/api/program/:programId/stage/execution', (req, res) => {

            /*
              Todo:
          
              1) add a received field to each of farmer's programsParticipated
            */

            const { programId } = req.params;

            const newStage = {
                programAbout: {
                    stage: "execution"
                }
            }

            Program.findOneAndUpdate(
                { _id: programId },
                { $set: flatten(newStage) },
                { new: true }
            )
                .then(result => {
                    console.log("Program is moved to Execution stage");

                    const { farmersParticipating, blockchain } = result;
                    const { address: programDBAddress } = blockchain;

                    farmersParticipating.forEach(async farmer => {
                        const { farmerId, expectedAmountToReceive, farmerAddress: farmerDBAddress } = farmer;
                        const callerAddress = OWNER_ADDRESS;
                        const callerKey = OWNER_PRIVATE_KEY;

                        const data = await crowdfundingContract
                            .methods
                            .transferFunds(
                                programDBAddress,
                                farmerDBAddress,
                                parseInt(expectedAmountToReceive)
                            )
                            .encodeABI();
                        transactionHash = await buildSendTransaction(
                            callerAddress,
                            callerKey,
                            data,
                        );

                        // Add amount to farmer wallet
                        await Farmer.findOneAndUpdate(
                            { _id: farmerId },
                            { $inc: { walletBalance: expectedAmountToReceive } }
                        )
                            .then(async result => {

                                res.status(200).json({
                                    message: "Successfully updated farmer balance"
                                })

                            })
                            .catch(err => {
                                console.log(err);
                            });

                    })
                })
                .catch(err => {
                    console.log(err);
                });
        })










        // ************ Working BUT NEEDS VERIFICATION ============= //
        app.post('/api/crowdfunding/burn/', async function (req, res) {
            try {
                const callerAddress = OWNER_ADDRESS;
                const callerKey = OWNER_PRIVATE_KEY;
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

        // ******* WORKING ******* //
        app.get('/api/crowdfunding/balance/:userType/:userId', async function (req, res) {

            const { userType, userId } = req.params;

            try {

                userModel[userType].findById({ _id: userId })
                    .then(async result => {
                        const { blockchain } = result;

                        const address = blockchain.address;

                        const balance = await crowdfundingContract
                            .methods
                            .getBalanceOf(address)
                            .call({ from: address });

                        res.status(200).json({
                            message: 'Successfully retrieved balance.',
                            balance: balance,
                        });
                    })

            } catch (error) {
                console.error(error);

                res.status(500).json({
                    message: 'Failed to retrieve balance.'
                });
            }
        });

        // ******* WORKING ******* //
        app.get('/api/crowdfunding/program/:programId', async function (req, res) {

            const { programId } = req.params;

            try {

                let address;

                await Program.findById({ _id: programId })
                    .then(result => {
                        const { blockchain } = result;

                        address = blockchain.address;
                    })

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

        // ******* WORKING ******* //
        app.get('/api/crowdfunding/getPledge/:programId/:sponsorId', async function (req, res) {

            const { programId, sponsorId } = req.params;

            let programAddress;
            let funderAddress;

            try {

                await Program.findById({ _id: programId })
                    .then(result => {
                        const { blockchain } = result;
                        programAddress = blockchain.address;
                    })

                await Sponsor.findById({ _id: sponsorId })
                    .then(result => {
                        const { blockchain } = result;
                        funderAddress = blockchain.address;
                    })

                const pledgedAmount = await crowdfundingContract
                    .methods
                    .getPledgeOf(funderAddress, programAddress)
                    .call({ from: funderAddress });

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





        // ADD TRANSFERFUNDS FUNCTION
        // ******* WORKING ******* //
        // Funder/Sponsor calls this function to revert a previous pledge to the program
        // Remove a Sponsor from a Program
        // Note: If more than one pledge, reverts all pledges
        app.post('/api/crowdfunding/revertPledge/:programId/:sponsorId', async function (req, res) {

            const { programId, sponsorId } = req.params;

            let amount = 0;

            try {
                Program.findById({ _id: programId })
                    .then(async result => {
                        const { sponsors, blockchain } = result;
                        const callerAddress = OWNER_ADDRESS;
                        const callerKey = OWNER_PRIVATE_KEY;
                        const address = blockchain.address;

                        const currentSponsor = sponsors.filter(sponsor => {
                            const { sponsorId: currSponsorId } = sponsor;

                            return currSponsorId === sponsorId;
                        });

                        currentSponsor.map(sponsor => {
                            const { amountFunded } = sponsor;

                            amount += parseInt(amountFunded);
                        });

                        await Sponsor.findOneAndUpdate(
                            { _id: sponsorId },
                            {
                                $inc: { walletBalance: amount },
                                $pull: { sponsoredPrograms: programId }
                            }
                        )
                            .then(result => {
                                const { walletBalance } = result;

                                console.log("Successfully updated walletBalance of Sponsor ")
                            });

                        const decrement = {
                            programAbout: {
                                currentAmount: -amount
                            }
                        }

                        Program.findOneAndUpdate(
                            { _id: programId },
                            {
                                $pull: { sponsors: { sponsorId } },
                                $inc: flatten(decrement)
                            }

                        )
                            .then(result => {
                                console.log("Removed sponsor from program.")
                            })
                            .catch(err => {
                                console.log('Error', err);
                            });

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

                    })


            } catch (error) {
                console.log(error);

                res.status(500).json({
                    message: 'Failed to revert pledge'
                });
            }
        });

        // ADD TRANSFERFUNDS FUNCTION
        // ******* WORKING ******* //
        // Program owner calls this function to close program and revert pledges
        // Remove Program and Send back all money
        app.post('/api/crowdfunding/closeAndRevertAll/:programId', async function (req, res) {

            const { programId } = req.params;
            let programAddress;

            try {
                await Program.findById({ _id: programId })
                    .then(async result => {
                        programAddress = result.blockchain.address;

                        const callerAddress = OWNER_ADDRESS;
                        const callerKey = OWNER_PRIVATE_KEY;
                        const address = programAddress;

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

                        const { sponsors } = result;

                        // Give back all money funded back to Sponsor
                        sponsors.forEach(async sponsor => {
                            const { sponsorId, amountFunded } = sponsor;

                            await Sponsor.findByIdAndUpdate(
                                { _id: sponsorId },
                                {
                                    $pull: { sponsoredPrograms: programId },
                                    $inc: { walletBalance: amountFunded }
                                });

                        });

                        // Empty out sponsors array of Program
                        await Program.findByIdAndUpdate({ _id: programId }, { $set: { sponsors: [] } }, (err, newDocu) => {
                            console.log("Successfully emptied out sponsors array");
                        });

                        // Delete program
                        await Program.findOneAndDelete({ _id: programId })
                            .then(res => {
                                console.log("Removed program from programs")
                            });

                    });

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

        // ******* WORKING ******* //
        // Add a Farmer to a Program
        app.post('/api/crowdfunding/addFarmerPartnership/:programId/:farmerId', async function (req, res) {

            const { programId, farmerId } = req.params;
            const { name, price, quantity } = req.body;

            try {
                Program.findById({ _id: programId })
                    .then(async result => {
                        const { blockchain: programBlockchainObj } = result;
                        // const { blockchain: farmerDBAddress } = result;
                        const { address: programDBAddress } = programBlockchainObj;

                        Farmer.findById({ _id: farmerId })
                            .then(async result => {
                                // const { blockchain: farmerBlockchainObj } = result;
                                const { blockchain: farmerDBAddress } = result;
                                // const { address: farmerDBAddress } = farmerBlockchainObj;

                                const callerAddress = OWNER_ADDRESS;
                                const callerKey = OWNER_PRIVATE_KEY;
                                const programAddress = programDBAddress;
                                // Get address from Ganache accounts based on current instance of index
                                const farmerAddress = farmerDBAddress;
                                const amount = price * quantity;

                                const producePledge = {
                                    farmerId,
                                    name,
                                    price,
                                    quantity,
                                    dateParticipated: new Date(),
                                }

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

                                Program.findOneAndUpdate(
                                    { _id: programId },
                                    {
                                        $push: { farmersParticipating: producePledge },
                                    }, { new: true })
                                    .then((program) => {
                                        console.log(program);
                                        console.log("Successfully added Farmer to the Program's Farmers Participating array");

                                        // Push programId to programsParticipated array of Farmer
                                        Farmer.updateOne(
                                            { _id: farmerId },
                                            {
                                                $push:
                                                {
                                                    programsParticipated: {
                                                        programId,
                                                        name,
                                                        price,
                                                        quantity
                                                    }
                                                }
                                            })
                                            .then(() => {
                                                console.log("Added program to programsParticipated array");
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })

                                        res.status(200).json({
                                            message: 'Successfully added farmer',
                                        });

                                    })
                                    .catch(err => {
                                        console.error(err);
                                        res.status(400).json({
                                            status: "error",
                                            response: err
                                        });
                                    });
                            })

                    })
                    .catch(err => {
                        console.log('Error', err);
                    })

            } catch (error) {
                console.log(error)

                res.status(500).json({
                    message: 'Failed to add farmer.'
                });
            }
        });

        // ************ Working BUT NEEDS VERIFICATION ============= //
        app.post('/api/crowdfunding/transferFunds/:programId/:farmerId', async function (req, res) {

            const { programId, farmerId } = req.params;

            try {

                Program.findById({ _id: programId })
                    .then(async result => {
                        const { blockchain: programBlockchainObj } = result;
                        const { address: programDBAddress } = programBlockchainObj;

                        Farmer.findById({ _id: farmerId })
                            .then(async result => {
                                // const { blockchain: farmerBlockchainObj } = result;
                                console.log(result)
                                const { blockchain: farmerDBAddress } = result;
                                // const { address: farmerDBAddress } = farmerBlockchainObj;

                                const callerAddress = OWNER_ADDRESS;
                                const callerKey = OWNER_PRIVATE_KEY;
                                const programAddress = programDBAddress;
                                const farmerAddress = farmerDBAddress;
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

                                const decrement = {
                                    programAbout: {
                                        currentAmount: -amount
                                    }
                                }

                                Program.findOneAndUpdate(
                                    { _id: programId },
                                    { $inc: flatten(decrement) }
                                )
                                    .then(result => {
                                        console.log("Successfully updated currentAmount of Program")
                                    })

                                res.status(200).json({
                                    message: 'Successfully trasnferred tokens to farmer',
                                });
                            })




                        // ************ Verify ************ //
                        app.post('/api/crowdfunding/returnLeftover/:programId', async function (req, res) {

                            const { programId } = req.params;

                            try {

                                Program.findById({ _id: programId })
                                    .then(async result => {
                                        const { blockchain } = result;

                                        const callerAddress = OWNER_ADDRESS;
                                        const callerKey = OWNER_PRIVATE_KEY;
                                        const address = blockchain.address;

                                        const data = crowdfundingContract
                                            .methods
                                            .returnLeftoverToFunders(
                                                address,
                                            )
                                            .encodeABI();
                                        transactionHash = await buildSendTransaction(
                                            callerAddress,
                                            callerKey,
                                            data,
                                        );

                                        res.status(200).json({
                                            message: 'Successfully returned funds.',
                                        });

                                    })

                            } catch (error) {
                                console.log(error);

                                res.status(500).json({
                                    message: 'Failed to return funds.'
                                });
                            }
                        });
                        // ===================================================================== //
                        //                        END: BLOCKCHAIN ENDPOINTS                      //
                        // ===================================================================== //

                        // ===================================================================== //
                        //                        START: MongoDB ENDPOINTS                       //
                        // ===================================================================== //

                        // =================================
                        //          CREATE Data Only
                        // =================================

                        const newNGO = new NGO({
                            blockchain: {
                                address: OWNER_ADDRESS
                            },
                            loginDetails: {
                                username: "zubirijuan",
                                password: "josemang123",
                            },
                            ngoAbout: {
                                ngoName: "Juan Foundation",
                                addressLine1: "Cotabato City",
                                addressLine2: "Paranaque City",
                                region: "NCR",
                                city: "Manila",
                                country: "Philippines",
                            },
                            ngoContactDetails: {
                                authorizedRepresentative: "Juan Miguel Zubiri",
                                ngoContactNumber: 09123456789,
                            },
                            programs: {
                                activePrograms: [],
                                completedPrograms: [],
                            }
                            // ngoAbout: {
                            //     ngoName: name,
                            //     addressLine1: address1,
                            //     addressLine2: address2,
                            //     ngoRegion: region,
                            //     ngoCity: city,
                            //     ngoCountry: country,
                            // },
                            // ngoContactDetails: {
                            //     authorizedRepresentative: representativeName,
                            //     ngoContactNumber: contactNumber,
                            // },
                            // programs: {
                            //     activePrograms: [],
                            //     completedPrograms: [],
                            // }
                        });



                        // =================================
                        //          READ Data Only
                        // =================================
                        app.get('/api/ngo', (req, res) => {
                            NGO.find({})
                                .then(result => {
                                    res.status(200).json(result);
                                });
                        })

                        // Get one NGO
                        app.get('/api/ngo/:ngoId', (req, res) => {
                            const { ngoId } = req.params;

                            NGO.findById({ _id: ngoId })
                                .then(result => {
                                    res.status(200).json(result);
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(404).json(err);
                                });
                        })

                        // Get all programs
                        app.get('/api/programs', (req, res) => {
                            Program.find({})
                                .then(result => {
                                    res.status(200).json(result);
                                })
                                .then(err => {
                                    console.log(err);
                                });
                        })

                        // Get one program
                        app.get('/api/programs/:programId', (req, res) => {
                            const { programId } = req.params;

                            Program.findOne({ _id: programId })
                                .then(result => {
                                    res.status(200).json(result);
                                });
                        })

                        // Get all farmers
                        app.get('/api/farmers', (req, res) => {
                            // Get all farmers from MongoDB
                            Farmer.find({})
                                .then(result => {
                                    res.status(200).json(result);
                                });
                        })

                        // Get one farmer
                        app.get('/api/farmers/:farmerId', (req, res) => {
                            const { farmerId } = req.params;

                            Farmer.findById({ _id: farmerId })
                                .then(result => {
                                    res.status(200).json(result);
                                });
                        })

                        // Get all sponsors
                        app.get('/api/sponsors', (req, res) => {
                            // Get all farmers from MongoDB
                            Sponsor.find({})
                                .then(result => {
                                    res.status(200).json(result);
                                });
                        })

                        // Get one sponsor
                        app.get('/api/sponsors/:sponsorId', (req, res) => {
                            const { sponsorId } = req.params;

                            Sponsor.findById({ _id: sponsorId })
                                .then(result => {
                                    res.status(200).json(result);
                                });
                        })
                        // ===================================================================== //
                        //                        END: MongoDB ENDPOINTS                         //
                        // ===================================================================== //


                        app.listen(PORT, () => {
                            console.log('Example app listening at http://localhost:' + PORT);
                        });
                    })
                    .catch(function (error) {
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
            } catch (error) {
                console.log(error);

                res.status(500).json({
                    message: 'Failed to transfer'
                });
            }


        });

    })