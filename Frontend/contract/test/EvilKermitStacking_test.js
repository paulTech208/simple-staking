const EvilKermitstaking = artifacts.require('./EvilKermitstaking.sol');
const TestUSDC = artifacts.require('./TestUSDC.sol');
const { assert } = require('chai');
const { keccak256, toUtf8Bytes, parseEther, parseUnits, formatUnits } = require('ethers/lib/utils');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('EvilKermitstaking Contract', async (deployers) => {
    let evilkermitStaking;
    let evilkermitStakingAddress;
    let usdc;
    let usdcAddress;
    const deployer = deployers[0]
    const DEFAULT_ADMIN_ROLE = "0x00"
    const ONE_MONTH = keccak256(toUtf8Bytes("ONE_MONTH"))

    before(async () => {
        evilkermitStaking = await EvilKermitstaking.deployed();
        usdc = await TestUSDC.deployed();
        usdcAddress = usdc.address;
        evilkermitStakingAddress = evilkermitStaking.address;
    });

    it('deployer should have 1000000000 TestUSDC', async () => {
        const response = await usdc.balanceOf(deployer);
        const usdcAmount = formatUnits(response.toString(), 6).toString();
        assert(
            parseInt(usdcAmount, 10) === 1000000000,
            "1000000000000000 USDC is not minted to deployer."
        )
    });

    it('should set EvilKermitstaking contract owner as admin', async () => {
        const hasAdminRole = await evilkermitStaking.hasRole(DEFAULT_ADMIN_ROLE, deployer);
        assert.isTrue(hasAdminRole, "Contract owner is not set as admin");
    });

    it('EvilkermitStaking should be open.', async () => {
        await evilkermitStaking.setEvilkermitStakingOpen();
        const stakingStarted = await evilkermitStaking.getEvilkermitStakingStarted();
        assert.isTrue(stakingStarted, "Staking is not opened.");
    });

    it('EvilkermitStaking staking should receive 10 USDC.', async () => {
        // function approve(address spender, uint256 amount) public virtual override returns (bool) {
        const amount = parseUnits("10", 6);
        
        await usdc.approve(evilkermitStakingAddress, amount);
        await evilkermitStaking.evilkermitStaking(
            usdcAddress,
            ONE_MONTH,
            deployer,
            amount
        );

        const response = await usdc.balanceOf(evilkermitStakingAddress)
        const balancOfStaking = formatUnits(response.toString(), 6).toString()

        const stakerInfo = await evilkermitStaking.stakerInfos(usdcAddress, deployer, ONE_MONTH);

        assert(
            stakerInfo.stakingToken === usdcAddress,
            ""
        )
        assert(
            stakerInfo.stakingPeriod === ONE_MONTH,
            ""
        )
        
        const balanceOfStaker = formatUnits(stakerInfo.amount.toString(), 6).toString()

        assert(
            parseInt(balanceOfStaker, 10) == 10,
            ""
        )

        assert(
            parseInt(balancOfStaking, 10) == 10,
            "EvilkermitStaking don't receive 10 USDC"
        )
    });

    it('EvilkermitStakin staking should give 10*0.15 USD', async () => {
        const amount = parseUnits("10", 6);
        
        const preresponse = await usdc.balanceOf(deployer)
        const prebalancOfStaking = formatUnits(preresponse.toString(), 6).toString()

        await evilkermitStaking.unlockStaking(
            usdcAddress,
            deployer,
            ONE_MONTH
        )

        const response = await usdc.balanceOf(deployer)
        const balancOfStaking = formatUnits(response.toString(), 6).toString()

        const stakerInfo = await evilkermitStaking.stakerInfos(usdcAddress, deployer, ONE_MONTH);

        assert(
            stakerInfo.stakingToken === usdcAddress,
            "Staking token should be USDC address"
        )
        assert(
            parseFloat(balancOfStaking - prebalancOfStaking) == 1.5,
            "The Bps of 30days should be 1.5"
        )
        console.log("contract address", evilkermitStaking.address)
    })
});
