// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.21 <0.8.0;

/**
 * @title Crowdfunding Smart Contract
 *
 *
 * Allows minting and burning of tokens.
 * Allows creation and tracking of pledges for crowdfunding.
 *
 **/

 contract Ownable {
    address private _owner; 

    constructor() public {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Must be called by owner");
        _;
    }

    /**
     * @dev Returns true if the caller is the current owner.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }
}
 
 contract Crowdfunding is Ownable {

    address _owner;
    CustomToken abcToken; // all wallets are handled by abcToken

    // Crowdfunded Program information are saved in this struct
    struct Program {
        address addr; // address of program
        address ownerAddr; // address of who created the program, i.e. NGO
        uint balance; // realtime balance, should be updated every pledge and revert
        uint targetAmount; // set by the owner upon opening of program
        uint totalPledgedAmountOnClose; // record of the program balance when crowdfunding closes
        bool isOpenForFunding; // if true, pledging and reverts should still be allowed
        mapping(address => uint) pledges; // Mapping of Funder Address => Amount
        mapping(address => uint) partnerFarmers; // Mapping of partner farmer and agreed upon amount
        
        mapping (uint => address) indexedFunderList;
        uint funderCount;
    }

    // List of all the created programs
    mapping(address => Program) public programs;

    // List of funders/sponsors
    mapping(address => bool) public funders;
     
    // Events
    event NewProgram(address indexed _addr, address indexed _ownerAddr);
    event Pledge(address indexed _programAddr, address _funderAddr, uint amount);
    event RevertPledge(address indexed _programAddr, address _funderAddr, uint amount);
    event CloseProgram(address indexed _addr);
    event TransferFundsToFarmer(address programAddr, address farmerAddr, uint amount);
    
    event MintTokens(address indexed _addr, uint amount);
    event BurnTokens(address indexed _addr, uint amount);

    constructor() public {
        super;
        abcToken = new CustomToken();
    }

    modifier validProgram(address addr) {
        require(programs[addr].addr != address(0), "Program Uninitialized.");
        _;
    }

    modifier validAmount(uint amount) {
        require(amount > 0, "Amount cannot be 0.");
        _;
    }

    modifier programOpen(address addr) {
        require(programs[addr].addr != address(0), "Program Uninitialized.");
        require(programs[addr].isOpenForFunding, "Program is already closed for funding.");
        _;
    }

    modifier onlyProgramOwner(address addr) {
        require(programs[addr].ownerAddr == msg.sender, "Must be program owner.");
        _;
    }

    modifier onlyFunder() {
        require(funders[msg.sender], "Must be funder.");
        _;
    }
    
    /**
    * @dev Only Funders can call mintRequest
    */
    function mintRequest(uint amount) onlyFunder() validAmount(amount) public {    
        abcToken.mint(msg.sender, amount);
        emit MintTokens(msg.sender, amount);
    }
    
    /**
    * @dev Only Funders and Farmers can call burnRequest
    */
    function burnRequest(uint amount) validAmount(amount) public {
        require(programs[msg.sender].addr != msg.sender, "Cannot burn tokens for program wallet");
        
        abcToken.burn(msg.sender, amount);
        emit BurnTokens(msg.sender, amount);
    }
    
    /**
    * @dev Returns amount of tokens in circulation
    */
    function getTotalSupply() public view returns(uint totalSupply) {
        totalSupply = abcToken.getTotalSupply();
    }

    /**
    * @dev Returns amount of tokens in wallet of program/funder/farmer
    */
    function getBalanceOf(address accountAddr) public view returns(uint balance){
        balance = abcToken.getBalanceOf(accountAddr);
    }

    /**
    * @dev Returns amount pledged by funder to the program
    */
    function getPledgeOf(address funderAddr, address programAddr) public view returns(uint pledgedAmount){
        Program storage program = programs[programAddr];
        pledgedAmount = program.pledges[funderAddr];
    }

    /**
    * @dev Adds address as funder address, so funder can call mintRequest
    */
    function addNewFunder(address addr) public onlyOwner {
        require(!funders[addr], "Address already registered.");
        require(programs[addr].addr == address(0),"Invalid address.");
        
        funders[addr] = true;
    }

    /**
    * @dev Creates new program
    */
    function createNew(address programAddr, uint targetAmount) validAmount(targetAmount) public {
         require(programs[programAddr].addr == address(0), "Program at address already created.");

         Program storage newProgram = programs[programAddr];
         newProgram.addr = programAddr;
         newProgram.ownerAddr = msg.sender;
         newProgram.balance = 0;
         newProgram.targetAmount = targetAmount;
         newProgram.isOpenForFunding = true;
         newProgram.funderCount = 0;
         
         emit NewProgram(programAddr, msg.sender);
    }

    /**
    * @dev Funder calls this function to add a pledge to the program
    */
    function pledge(address programAddr, uint amount) programOpen(programAddr) validAmount(amount) public {
        abcToken.transfer(msg.sender, programAddr, amount);

        Program storage program = programs[programAddr];
        program.balance += amount;
        program.pledges[msg.sender] += amount;

        addToProgramFunderList(programAddr, msg.sender);

        emit Pledge(programAddr, msg.sender, amount);

        if(program.balance >= program.targetAmount){
            program.isOpenForFunding = false;
            program.totalPledgedAmountOnClose = program.balance;
            emit CloseProgram(programAddr);
        }
    }

    /**
    * @dev Funder calls this function to revert a previous pledge to the program
    */
    function revertPledge(address programAddr, uint amount) programOpen(programAddr) validAmount(amount) public {
        require(programs[programAddr].pledges[msg.sender] >= amount, "Requested amount exceeds maximum pledged amount.");
        
        revertFunderPledge(programAddr, msg.sender, amount);
    }

    /**
    * @dev Program owner calls this function to close program and revert pledges
    */
    function closeAndRevertAll(address programAddr) programOpen(programAddr) onlyProgramOwner(programAddr) public {
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

    /**
    * @dev Program owner calls this function to close program and revert pledges
    */
    function returnLeftoverToFunders(address programAddr) onlyProgramOwner(programAddr) public {
        Program storage program = programs[programAddr];
        program.isOpenForFunding = false;
        uint leftover = program.balance;

        // iterate over indexed funders and revert each pledge
        for(uint i=0; i<program.funderCount; i++) {
            address funder = program.indexedFunderList[i];
            if(program.pledges[funder] > 0) {
                uint refundAmount = (leftover * program.pledges[funder])/program.totalPledgedAmountOnClose;
                revertFunderPledge(programAddr, funder, refundAmount);
            }
        }
    }
    
    /**
    * @dev Returns agreed upon amount for the program
    */ 
    function getAmountOfFarmerPartnership(address programAddr, address farmerAddr) validProgram(programAddr) public view returns (uint amount){
        Program storage program = programs[programAddr];
        amount = program.partnerFarmers[farmerAddr];
    }

    /**
    * @dev Adds farmer as partner for the program
    */ 
    function addFarmerPartnership(address programAddr, address farmerAddr, uint amount) 
        validProgram(programAddr) onlyProgramOwner(programAddr) validAmount(amount) public {
        
        require(programs[programAddr].partnerFarmers[farmerAddr] == 0, "Already a partner farmer.");

        Program storage program = programs[programAddr];
        program.partnerFarmers[farmerAddr] = amount;
    }

    /**
    * @dev Transfers funds from program to farmer
    */ 
    function transferFunds(address programAddr, address farmerAddr, uint amount) validProgram(programAddr) onlyProgramOwner(programAddr) public {
        Program storage program = programs[programAddr];
        
        // Require Statements
        require(program.balance >= amount, "Program must have sufficient funds to transfer.");
        require(program.partnerFarmers[farmerAddr] > 0, "Cannot transact with non partner farmer.");
        
        // Deduct AMOUNT from PROGRAM
        program.balance = program.balance - amount;
        
        // Transfer AMOUNT to FARMER
        abcToken.transfer(programAddr, farmerAddr, amount);

        emit TransferFundsToFarmer(programAddr, farmerAddr, amount);
    } 
    
    // Private functions
    function revertFunderPledge(address programAddr, address funderAddr, uint amount) private {
        abcToken.transfer(programAddr, funderAddr, amount);
        
        Program storage program = programs[programAddr];
        program.balance -= amount;
        program.pledges[funderAddr] -= amount;

        emit RevertPledge(programAddr, funderAddr, amount);
    }

    function addToProgramFunderList(address programAddr, address funderAddr) private {
        // Keeps the indexedFunderList unique, only adds if funder is not yet on the list
        Program storage program = programs[programAddr];
        bool isAlreadyFunder = false;

        for(uint i=0; i<program.funderCount; i++) {
            if(program.indexedFunderList[i] == funderAddr) {
                isAlreadyFunder = true;
            }
        }

        if(!isAlreadyFunder) {
            program.indexedFunderList[program.funderCount] = msg.sender;
            program.funderCount++;
        }
    }
 }

/**
 * @dev CustomToken should be instantiated by Crowdfunding contract.
 */
contract CustomToken is Ownable {

    uint _totalSupply;
    mapping(address => uint) balances;

    event TokenInitialization(address);

    constructor() public {
        super;
        _totalSupply = 0;
        emit TokenInitialization(msg.sender);
    }

    function getTotalSupply() public view onlyOwner returns (uint totalSupply) {
        totalSupply = _totalSupply;
    }
    
    function getBalanceOf(address account) public view onlyOwner returns (uint balance) {
        balance = balances[account];
    }
    
    function mint(address account, uint amount) public onlyOwner {
        balances[account] += amount;
        _totalSupply += amount;
    }
    
    function burn(address account, uint amount) public onlyOwner {
        require(balances[account] >= amount, "Must have sufficient balance");
        
        balances[account] -= amount;
        _totalSupply -= amount;
    }
    
    function transfer(address accountFrom, address accountTo, uint amount) public onlyOwner {
        require(balances[accountFrom] >= amount, "Must have sufficient balance");
        
        balances[accountFrom] -= amount;
        balances[accountTo] += amount;
    }
}