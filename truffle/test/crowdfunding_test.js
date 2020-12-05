const Crowdfunding = artifacts.require("Crowdfunding");
let instance;


contract("Crowdfunding", accounts => {
    beforeEach("setup", async () => {
        instance = await Crowdfunding.new();
    });

    describe("New Program Initialization", () => {
        it("should deploy crowdfunding contract", async () => {
            assert(instance);
        });
    
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

    describe("Pledging", () => {
        let callerAddr = accounts[0];
        let programAddr = accounts[1];
        let targetAmount = 100;
        
        beforeEach("setup new program", async () => {
            return instance.createNew(programAddr, targetAmount, {from: callerAddr})
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
    
            return instance.getBalance.call(programAddr)
            .then(balance => {
                previousBalance = balance;
                return instance.pledge(programAddr, amount_1);
            })
            .then(() => {
                return instance.getBalance.call(programAddr);
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
                return instance.getBalance.call(programAddr);
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
    
            return instance.getBalance.call(programAddr)
            .then(balance => {
                previousBalance = balance;
                return instance.pledge(programAddr, amount_1);
            })
            .then(() => {
                return instance.getBalance.call(programAddr);
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
                return instance.getBalance.call(programAddr);
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
                await instance.getBalance.call(programAddr)
                .then(balance => {
                    previousBalance = balance;
                    return instance.pledge(programAddr, amount_1);
                })
                .then(() => {
                    return instance.getBalance.call(programAddr);
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
                await instance.getBalance.call(programAddr)
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

    describe("Closing", () => {
        let ownerAddr = accounts[0];
        let programAddr = accounts[1];
        let targetAmount = 100;
        
        beforeEach("setup new program", async () => {
            instance = await Crowdfunding.new();
            return instance.createNew(programAddr, targetAmount, {from: ownerAddr})
        });

        it("should automatically close program for funding once target amount is reached", () => {
            return instance.pledge(programAddr, targetAmount)
            .then(() => {
                return instance.programs.call(programAddr);
            })
            .then(returnedProgram => {
                assert(!returnedProgram.isOpenForFunding);
            });
        });

        it("should allow owner to close program and refund pledges", async () => {
            let amount = 10;

            await instance.pledge(programAddr, amount, {from: ownerAddr});

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

            try {
                await instance.pledge(programAddr, targetAmount, {from: ownerAddr});
                assert(false, "should revert");
            } catch(err) {
                assert(err instanceof Error);          
            }

            return instance.programs(programAddr)
            .then(returnedProgram => {
                assert(!returnedProgram.isOpenForFunding);
                assert.equal(returnedProgram.balance.toNumber(), targetAmount);
            });
        });

        it("should not allow revert pledge if program is closed", async () => {
            let amount = 100;

            try {
                await instance.pledge(programAddr, targetAmount, {from: ownerAddr});
                await instance.revertPledge(programAddr, amount, {from: ownerAddr});
                assert(false, "should revert");
            } catch(err) {
                assert(err instanceof Error);          
            }

            return instance.programs(programAddr)
            .then(returnedProgram => {
                assert(!returnedProgram.isOpenForFunding);
                assert.equal(returnedProgram.balance.toNumber(), targetAmount);
            });
        });
    });
});