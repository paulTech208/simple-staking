const EvilKermitstaking = artifacts.require("EvilKermitstaking");

module.exports = async function (deployer) {
  await deployer.deploy(EvilKermitstaking);
  const evilkermitStaking = await EvilKermitstaking.deployed() ;

  console.log("\tEvilkermit Contract Address: ", evilkermitStaking.address, "\n");
};