const CreateProgram = artifacts.require("CreateProgram");

module.exports = function(deployer) {
  deployer.deploy(CreateProgram);
};