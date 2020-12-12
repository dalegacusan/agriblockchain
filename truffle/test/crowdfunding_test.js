const Crowdfunding = artifacts.require("Crowdfunding");
let instance;


contract("Crowdfunding", accounts => {
    beforeEach("setup", async () => {
        instance = await Crowdfunding.new();
        
    });

    describe("Minting", async () => {
        it("should allow contract owner to add funder", async () => {
            let contractOwner = accounts[0];
            let funderAddress = accounts[1];

            return instance.addNewFunder(funderAddress, {from: contractOwner})
            .then(() => {
                assert(instance.funders.call(funderAddress));
            });
        });

        it("should not allow to add funder if not contract owner", async () => {
            let notContractOwner = accounts[0];
            let funderAddress = accounts[1];
            let err;

            try {
                return instance.addNewFunder(funderAddress, {from: notContractOwner})
            } catch (error) {
                err = error;
                assert(!instance.funders.call(funderAddress));
            }

            assert(err instanceof Error);
        });
    });

    describe("New Program Initialization", async () => {
        it("should create a new crowdfunding program with target amount and is open", async () => {
            let callerAddr = accounts[0];
            let programAddr = accounts[1];
            let expectedAmount = 100;
    
            return instance.createNew(programAddr, 100, {from: callerAddr})
            .then(() => {
                return instance.programs.call(programAddr);
            })
            .then(returnedProgram => {
                assert.equal(returnedProgram.targetAmount, expectedAmount);
                assert(returnedProgram.isOpenForFunding);
            });
        });

        it("should not allow to create program on an already existing one", async () => {
            let callerAddr = accounts[0];
            let programAddr = accounts[1];
            let err;

            await instance.createNew(programAddr, 100, {from: callerAddr});

            try {
                await instance.createNew(programAddr, 100, {from: callerAddr});
            } catch (error) {
                err = error;
                assert(err instanceof Error);
            }
        });
    });

    describe("Pledging", async () => {
        let callerAddr = accounts[0];
        let programAddr = accounts[1];
        let walletBalance = 1000;
        let targetAmount = 100;
        
        beforeEach("setup new program", async () => {
            return instance.createNew(programAddr, targetAmount, {from: callerAddr})
            .then(() => {
                return instance.addNewFunder(callerAddr)
                .then (() => {
                    instance.mintRequest(walletBalance, {from: callerAddr});
                });
            });
        });

        it("should not allow pledge if balance is insufficient", async () => {
            let err;

            try {
                let amount = await instance.getBalanceOf.call(callerAddr);
                amount++;
                await instance.pledge(programAddr, amount, {from: callerAddr});
            } catch(error) {
                err = error;
                pledgedAmount = await instance.getPledgeOf.call(callerAddr, programAddr);
                assert.equal(pledgedAmount.toNumber(), 0);       
            }

            assert(err instanceof Error); 
        });
    
        it("should update balance and record pledge when an account pledges", async () => {
            /**
             * Calls pledge twice and checks the balance each time
             *  
             * */ 
            let previousBalance;
            let amount_1 = 10;
            let amount_2 = 20;
            let expected_1 = 10;
            let expected_2 = 30;
    
            return instance.getBalanceOf.call(programAddr)
            .then(balance => {
                previousBalance = balance;
                return instance.pledge(programAddr, amount_1);
            })
            .then(() => {
                return instance.getBalanceOf.call(programAddr);
            })
            .then(balance => {
                assert.equal(balance.toNumber(), expected_1);
                return instance.getPledgeOf.call(callerAddr, programAddr);
            })
            .then(pledgeAmount => {
                assert.equal(pledgeAmount, expected_1)
                return instance.pledge(programAddr, amount_2);
            })
            .then(() => {
                return instance.getBalanceOf.call(programAddr);
            })
            .then(balance => {
                assert.equal(balance.toNumber(), expected_2);
                return instance.getPledgeOf.call(callerAddr, programAddr);
            })
            .then(pledgeAmount => {
                assert.equal(pledgeAmount, expected_2)
            });
        });
    
        it("should not allow pledge on uninitialized program", async () => {
            let callerAddr = accounts[0];
            let wrongProgramAddr = accounts[2];
            let amount = 100;
            let pledgedAmount;
    
    
            try {
                await instance.pledge(wrongProgramAddr, amount);
            } catch(err) {
                assert(err instanceof Error);
                pledgedAmount = await instance.getPledgeOf.call(callerAddr, wrongProgramAddr);
                assert.equal(pledgedAmount.toNumber(), 0);            
            }
            
        });

        it("should allow funder to revert from its own pledged amount", async () => {
            /**
             * Calls pledge, then reverts pledge, and checks the balance each time
             *  
             * */ 
            let previousBalance;
            let amount_1 = 50;
            let amount_2 = 20;
    
            return instance.getBalanceOf.call(programAddr)
            .then(balance => {
                previousBalance = balance;
                return instance.pledge(programAddr, amount_1);
            })
            .then(() => {
                return instance.getBalanceOf.call(programAddr);
            })
            .then(balance => {
                assert.equal(balance.toNumber(), previousBalance + amount_1);
                return instance.getPledgeOf.call(callerAddr, programAddr);
            })
            .then(pledgeAmount => {
                assert.equal(pledgeAmount.toNumber(), previousBalance + amount_1)
                return instance.revertPledge(programAddr, amount_2);
            })
            .then(() => {
                return instance.getBalanceOf.call(programAddr);
            })
            .then(balance => {
                assert.equal(balance.toNumber(), previousBalance + amount_1 - amount_2);
                return instance.getPledgeOf.call(callerAddr, programAddr);
            })
            .then(pledgeAmount => {
                assert.equal(pledgeAmount.toNumber(), previousBalance + amount_1 - amount_2);
            });
        });

        it("should not allow funder to revert more than its own pledged amount", async () => {
            /**
             * Calls pledge, then reverts pledge, and checks the balance each time
             *  
             * */ 
            let previousBalance;
            let amount_1 = 50;
            let amount_2 = 60;
            
            try {
                await instance.getBalanceOf.call(programAddr)
                .then(balance => {
                    previousBalance = balance;
                    return instance.pledge(programAddr, amount_1);
                })
                .then(() => {
                    return instance.getBalanceOf.call(programAddr);
                })
                .then(balance => {
                    assert.equal(balance.toNumber(), previousBalance + amount_1);
                    return instance.getPledgeOf.call(callerAddr, programAddr);
                })
                .then(pledgeAmount => {
                    assert.equal(pledgeAmount.toNumber(), previousBalance + amount_1)
                    return instance.revertPledge(programAddr, amount_2);
                })
            } catch(error) {
                await instance.getBalanceOf.call(programAddr)
                .then(balance => {
                    assert.equal(balance.toNumber(), previousBalance + amount_1);
                    return instance.getPledgeOf.call(callerAddr, programAddr);
                })
                .then(pledgeAmount => {
                    assert.equal(pledgeAmount.toNumber(), previousBalance + amount_1);
                });
            }
            
        });
    });

    describe("Farmer-Program Transactions", async () => {
        let ownerAddr = accounts[0];
        let programAddr = accounts[1];
        let farmerAddr = accounts[3];
        let walletBalance = 1000;
        let targetAmount = 1000;
        
        beforeEach("setup new program", async () => {
            return instance.createNew(programAddr, targetAmount, {from: ownerAddr})
            .then(() => {
                return instance.addNewFunder(ownerAddr)
                .then (() => {
                    instance.mintRequest(walletBalance, {from: ownerAddr});
                });
            });
        });

        it("should allow program owner to add new farmer-prorgam partnership", async () => {
            let amount = 100;
            return instance.addFarmerPartnership(programAddr, farmerAddr, amount, {from: ownerAddr})
            .then(() => {
                return instance.getAmountOfFarmerPartnership(programAddr, farmerAddr);
            })
            .then(returnedAmount => {
                assert.equal(returnedAmount, amount);
            });
        });

        it("should not allow add new farmer-prorgam partnership if caller is not the owner", async () => {
            let amount = 100;
            let notOwnerAddr = accounts[2];
            let err;

            try{
                await instance.addFarmerPartnership(programAddr, farmerAddr, amount, {from: notOwnerAddr});
            } catch(error) {
                err = error;
                return instance.getAmountOfFarmerPartnership(programAddr, farmerAddr)
                .then(returnedAmount => {
                    assert.equal(returnedAmount, 0);
                });
            }

            assert(err instanceof Error);
        });

        it("should allow transfer of funds to farmer", async () => {
            let amount = 100;
            return instance.pledge(programAddr, amount, {from: ownerAddr})
            .then(() => {
                return instance.addFarmerPartnership(programAddr, farmerAddr, amount, {from: ownerAddr})
            })
            .then(() => {
                return instance.transferFunds(programAddr, farmerAddr, amount);
            })
            .then(() => {
                return instance.getBalanceOf(farmerAddr);
            })
            .then(returnedAmount => {
                assert.equal(returnedAmount, amount);
            });
        });
    });

    describe("Closing", async () => {
        let ownerAddr = accounts[0];
        let programAddr = accounts[1];
        let funderAddr = accounts[2];
        let walletBalance = 1000;
        let targetAmount = 100;
        
        beforeEach("setup new program", async () => {
            instance = await Crowdfunding.new();
            return instance.createNew(programAddr, targetAmount, {from: ownerAddr})
            .then(() => {
                return instance.addNewFunder(funderAddr, {from: ownerAddr})
            })
            .then (() => {
                instance.mintRequest(walletBalance, {from: funderAddr});
            });
        });

        it("should automatically close program for funding once target amount is reached", () => {
            return instance.pledge(programAddr, targetAmount, {from: funderAddr})
            .then(() => {
                return instance.programs.call(programAddr);
            })
            .then(returnedProgram => {
                assert(!returnedProgram.isOpenForFunding);
            });
        });

        it("should allow owner to close program and refund pledges", async () => {
            let amount = 10;

            await instance.pledge(programAddr, amount, {from: funderAddr});

            return instance.closeAndRevertAll(programAddr, {from: ownerAddr})
            .then(() => {
                return instance.programs(programAddr);
            })
            .then(returnedProgram => {
                assert(!returnedProgram.isOpenForFunding);
                assert.equal(returnedProgram.balance.toNumber(), 0);
            });
        });

        it("should not allow close on uninitialized program", async () => {
            let wrongProgramAddr = accounts[2];

            try {
                await instance.closeAndRevertAll(wrongProgramAddr, {from: ownerAddr});
                assert(false, "should revert");
            } catch(err) {
                assert(err instanceof Error);          
            }
        });

        it("should not allow close on program if not the owner", async () => {
            let wrongOwnerAddr = accounts[2];

            try {
                await instance.closeAndRefund(programAddr, {from: wrongOwnerAddr});
                assert(false, "should revert");
            } catch(err) {
                assert(err instanceof Error);          
            }

            return instance.programs(programAddr)
            .then(returnedProgram => {
                assert(returnedProgram.isOpenForFunding);
            });
        });

        it("should not allow pledge if program is closed", async () => {
            let amount = 100;
            let err

            try {
                await instance.pledge(programAddr, targetAmount, {from: funderAddr});
                assert(false, "should revert");
            } catch(error) {
                err = error;

                return instance.programs(programAddr)
                .then(returnedProgram => {
                    assert(!returnedProgram.isOpenForFunding);
                    assert.equal(returnedProgram.balance.toNumber(), targetAmount);
                });
            }
            assert(err instanceof Error);
        });

        it("should not allow revert pledge if program is closed", async () => {
            let amount = 100;
            let err;

            try {
                await instance.pledge(programAddr, targetAmount, {from: funderAddr});
                await instance.revertPledge(programAddr, amount, {from: funderAddr});
                assert(false, "should revert");
            } catch(error) {
                err = error;
                return instance.programs(programAddr)
                .then(returnedProgram => {
                    assert(!returnedProgram.isOpenForFunding);
                    assert.equal(returnedProgram.balance.toNumber(), targetAmount);
                });       
            }

            assert(err instanceof Error);
        });
    });
});