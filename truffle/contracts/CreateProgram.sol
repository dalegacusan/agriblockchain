pragma solidity >=0.4.22 <0.7.0;

contract CreateProgram {
    
    struct Program{
        string programID;
        string programName;
        string programDescription;
    }
    
    Program[] programs;
    
    
    function AddProgram(string memory _id, string memory _programName, string memory _programDesc) public {
        Program memory newProgram = Program(_id, _programName, _programDesc);
        
        programs.push(newProgram);
    }
    
    function GetProgramsLength() public view returns (uint){
        return programs.length;
    }

}