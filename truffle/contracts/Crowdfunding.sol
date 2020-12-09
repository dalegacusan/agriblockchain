// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.21 <0.8.0;

/**
 * @title Crowdfunding Smart Contract
 *
 *
 * Allows creation and tracking of pledges for crowdfunding.
 **/
 
 contract Crowdfunding {

     // Crowdfunded Program information are saved in this struct
     struct Program {
         address addr; // address of program
         address ownerAddr; // address of who created the program, i.e. NGO
         uint balance; // realtime balance, should be updated every pledge and revert
         uint targetAmount; // set by the owner upon opening of program
         bool isOpenForFunding; // if true, pledging and reverts should still be allowed
         mapping(address => uint) pledges; // Mapping of Funder Address => Amount
         mapping(address => uint) farmerPartnerships; // Mapping of partner farmer and agreed upon amount

         mapping (uint => address) indexedFunderList;
         uint funderCount;
     }
     
    struct Farmer {
        address addr;
        uint balance; 
    }

    // List of all the created programs
     mapping(address => Program) public programs;
     
    // List of farmers
    mapping(address => Farmer) public farmers;
     
    // Events
     event NewProgram(address indexed _addr, address indexed _ownerAddr);
     event Pledge(address indexed _programAddr, address _funderAddr, uint amount);
     event RevertPledge(address indexed _programAddr, address _funderAddr, uint amount);
     event CloseProgram(address indexed _addr);
     event TransferFundsToFarmer(address programAddr, address farmerAddr, uint amount);

    function getBalance(address programAddr) public view returns(uint balance){
        balance = programs[programAddr].balance;
    }

    function getPledgeOf(address funderAddr, address programAddr) public view returns(uint pledgedAmount){
        Program storage program = programs[programAddr];
        pledgedAmount = program.pledges[funderAddr];
    }
    
    function getFarmerBalance(address farmerAddr) public view returns (uint farmerBalance) {
        farmerBalance = farmers[farmerAddr].balance;
    }

    function createNew(address programAddr, uint targetAmount) public {
         require(!isProgramValid(programAddr), "Program at address already created.");

         Program storage newProgram = programs[programAddr];
         newProgram.addr = programAddr;
         newProgram.ownerAddr = msg.sender;
         newProgram.balance = 0;
         newProgram.targetAmount = targetAmount;
         newProgram.isOpenForFunding = true;
         newProgram.funderCount = 0;
         
         emit NewProgram(programAddr, msg.sender);
     }

    function pledge(address programAddr, uint amount) public {
        require(isProgramValid(programAddr), "Program Uninitialized.");
        require(programs[programAddr].isOpenForFunding, "Program is already closed for funding.");

        Program storage program = programs[programAddr];
        program.balance += amount;
        program.pledges[msg.sender] += amount;

        program.indexedFunderList[program.funderCount] = msg.sender;
        program.funderCount++;

        emit Pledge(programAddr, msg.sender, amount);

        if(program.balance >= program.targetAmount){
            program.isOpenForFunding = false;
            emit CloseProgram(programAddr);
        }
    }

    function revertPledge(address programAddr, uint amount) public {
        require(programs[programAddr].isOpenForFunding, "Program is already closed, funds cannot be reverted.");
        require(programs[programAddr].pledges[msg.sender] >= amount, "Requested amount exceeds maximum pledged amount.");
        
        revertFunderPledge(programAddr, msg.sender, amount);
    }

    function closeAndRevertAll(address programAddr) public {
        require(isProgramValid(programAddr), "Program Uninitialized");
        require(programs[programAddr].ownerAddr == msg.sender, "Only program owner can close the program.");

        Program storage program = programs[programAddr];
        program.isOpenForFunding = false;

        // iterate over indexed funders and revert each pledge
        for(uint i=0; i<program.funderCount; i++) {
            address funder = program.indexedFunderList[i];
            if(program.pledges[funder] > 0) {
                revertFunderPledge(programAddr, funder, program.pledges[funder]);
            }
        }

        emit CloseProgram(programAddr);
    }
    
    // Functions for program-farmer
    function addFarmerPartnership(address programAddr, address farmerAddr, uint amount) public {
        require(isProgramValid(programAddr), "Program Uninitialized.");
        require(programs[programAddr].ownerAddr == msg.sender, "Only program owner can add farmer.");
        require(programs[programAddr].farmerPartnerships[farmerAddr] == 0, "Already a partner farmer.");
        require(amount > 0, "Amount cannot be 0.");

        Program storage program = programs[programAddr];
        program.farmerPartnerships[farmerAddr] = amount;
    }
    
    function transferFunds(address programAddr, address farmerAddr, uint amount) public {
        Program storage program = programs[programAddr];
        Farmer storage farmer = farmers[farmerAddr]; 
        
        // Require Statements
        require(isProgramValid(programAddr), "Program Uninitialized.");
        require(program.ownerAddr == msg.sender, "Only program owner can add farmer.");
        require(program.balance >= amount, "Program must have sufficient funds to transfer.");
        require(program.farmerPartnerships[farmerAddr] > 0, "Cannot transact with non partner farmer.");
        
        // Deduct AMOUNT from PROGRAM
        program.balance = program.balance - amount;
        
        // Push AMOUNT to FARMER
        farmer.balance = farmer.balance + amount;

        emit TransferFundsToFarmer(programAddr, farmerAddr, amount);
    } 
    
    // Private functions
    function revertFunderPledge(address programAddr, address funderAddr, uint amount) private {
        Program storage program = programs[programAddr];
        program.balance -= amount;
        program.pledges[funderAddr] -= amount;

        emit RevertPledge(programAddr, funderAddr, amount);
    }

    function isProgramValid(address programAddr) private view returns (bool isValid) {
        isValid = programs[programAddr].addr != address(0);
    }
 }