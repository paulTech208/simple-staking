// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
    ██╗   ██╗███████╗██████╗  ██████╗
    ██║   ██║██╔════╝██╔══██╗██╔════╝
    ██║   ██║███████╗██║  ██║██║     
    ██║   ██║╚════██║██║  ██║██║     
    ╚██████╔╝███████║██████╔╝╚██████╗
    ╚═════╝ ╚══════╝╚═════╝  ╚═════╝
*/

contract USDC is ERC20 {
    constructor() ERC20("USDC", "USDC Coin") {
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function mint(uint256 amount) public {
         _mint(msg.sender, amount * 10 ** 6);
    }
}