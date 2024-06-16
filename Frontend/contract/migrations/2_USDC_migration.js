const TestUSDC = artifacts.require("TestUSDC");

module.exports = async function (deployer) {
  await deployer.deploy(TestUSDC);
  const usdc = await TestUSDC.deployed() ;

  console.log("\tUSDC Address: ", usdc.address, "\n");
};