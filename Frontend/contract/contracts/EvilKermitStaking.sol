// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

/*-
    ███████╗██╗   ██╗██╗██╗     ██╗  ██╗███████╗███╗   ███╗██╗████████╗    ███████╗████████╗ █████╗ ██╗  ██╗██╗███╗   ██╗ ██████╗ 
    ██╔════╝██║   ██║██║██║     ██║ ██╔╝██╔════╝████╗ ████║██║╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██║ ██╔╝██║████╗  ██║██╔════╝ 
    █████╗  ██║   ██║██║██║     █████╔╝ █████╗  ██╔████╔██║██║   ██║       ███████╗   ██║   ███████║█████╔╝ ██║██╔██╗ ██║██║  ███╗
    ██╔══╝  ╚██╗ ██╔╝██║██║     ██╔═██╗ ██╔══╝  ██║╚██╔╝██║██║   ██║       ╚════██║   ██║   ██╔══██║██╔═██╗ ██║██║╚██╗██║██║   ██║
    ███████╗ ╚████╔╝ ██║███████╗██║  ██╗███████╗██║ ╚═╝ ██║██║   ██║       ███████║   ██║   ██║  ██║██║  ██╗██║██║ ╚████║╚██████╔╝
    ╚══════╝  ╚═══╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝   ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
-*/

contract EvilKermitStaking is AccessControlEnumerable {
    error Access_OnlyAdmin();

    /// Emitted once a stake is scheduled for withdrawal
    event StakeUnlocked(
        address indexed account,
        uint256 withdrawTime
    );
    event EvilkermitStaked(IERC20 stakingToken, bytes32 period, address staker, uint256 amount);
    event EvilkemitStakeOpened();
    event EvilkermitStakingUnlocked(IERC20 stakingToken, bytes32 period, address staker, uint256 amount);

    bytes32 public constant ONE_MONTH = keccak256("ONE_MONTH");
    bytes32 public constant THREE_MONTH = keccak256("THREE_MONTH");
    bytes32 public constant HALF_YEAR = keccak256("HALF_YEAR");
    bytes32 public constant ONE_YEAR = keccak256("ONE_YEAR");

    uint256 oneMonthBPS = 150;
    uint256 threeMonthBPS = 500;
    uint256 halfYearBPS = 1400;
    uint256 yearBPS = 3000;

    bool public evilkermitOpen = false;

    struct StakerInfo {
        uint256 amount;
        bytes32 stakingPeriod;
        uint256 stakedAt;
        IERC20 stakingToken;
    }

    mapping(IERC20 => mapping (address => mapping (bytes32 => StakerInfo)) ) public stakerInfos;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setEvilkermitStakingOpen() external onlyAdmin {
        evilkermitOpen = true;
        emit EvilkemitStakeOpened();
    }

    function getEvilkermitStakingStarted() external view returns (bool) {
        return evilkermitOpen;
    }

    function getStakingBPS(bytes32 period) internal view returns (uint256) {
        if (period == ONE_MONTH) return oneMonthBPS;
        if (period == THREE_MONTH) return threeMonthBPS;
        if (period == HALF_YEAR) return halfYearBPS;
        if (period == ONE_YEAR) return yearBPS;

        return 0;
    }

    function evilkermitStaking(
        IERC20 stakingToken,
        bytes32 stakingPeriod,
        address stakerAddress,
        uint256 amount
    ) external onlyValidPeriod(stakingPeriod) onlyAdmin onlyStakingOpen {
        require(amount > 0, "Staking amount must be greater than 0");
        
        StakerInfo memory _stakerInfo = StakerInfo({
            stakingPeriod: stakingPeriod,
            amount: amount,
            stakedAt: block.timestamp,
            stakingToken: stakingToken
        });

        stakerInfos[stakingToken][stakerAddress][stakingPeriod] = _stakerInfo;
        stakingToken.transferFrom(stakerAddress, address(this), amount);

        emit EvilkermitStaked(stakingToken, stakingPeriod, msg.sender, amount);
    }

    function unlockStaking(IERC20 stakingToken, address staker, bytes32 stakingPeriod) external onlyAdmin {
        if (stakerInfos[stakingToken][staker][stakingPeriod].amount == 0) revert("msg.sender was not staked.");

        StakerInfo memory _stakerInfo = stakerInfos[stakingToken][staker][stakingPeriod];
        uint256 unlockAmount = _stakerInfo.amount * getStakingBPS(stakingPeriod) / 1000;
        stakingToken.transfer(msg.sender, unlockAmount);

        emit EvilkermitStakingUnlocked(stakingToken, stakingPeriod, msg.sender, unlockAmount);
    }

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access denied");
        _;
    }

    modifier onlyStakingOpen() {
        require(evilkermitOpen, "Staking is closed.");

        _;
    }

    modifier canStake(IERC20 _stakingToken, address _stakerAddress, bytes32 _stakingPeriod) {
        require(stakerInfos[_stakingToken][_stakerAddress][_stakingPeriod].amount == 0, "Already Staked");

        _;
    }

    modifier onlyValidPeriod(bytes32 period) {
        require(
            period == ONE_MONTH ||
                period == HALF_YEAR ||
                period == THREE_MONTH ||
                period == ONE_YEAR,
            "Staking period is invalid."
        );

        _;
    }
}
