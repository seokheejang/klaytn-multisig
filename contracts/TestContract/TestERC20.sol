// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20TokenGenerator is ERC20 {
  constructor(string memory _name, string memory _symbol, uint256 initialSupply) ERC20(_name, _symbol) {
    _mint(msg.sender, initialSupply);
  }
}