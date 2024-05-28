// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Airdrop is Ownable {
    IERC20 public token;
    uint256 public totalAirdropAmount;
    uint256 public tokensPerParticipant;
    uint256 public maxParticipants;
    uint256 public participantsCount;

    mapping(address => bool) public hasClaimed;

    event AirdropClaimed(address indexed participant, uint256 amount);

    constructor(
        IERC20 _token,
        uint256 _totalAirdropAmount,
        uint256 _tokensPerParticipant,
        uint256 _maxParticipants
    ) {
        token = _token;
        totalAirdropAmount = _totalAirdropAmount;
        tokensPerParticipant = _tokensPerParticipant;
        maxParticipants = _maxParticipants;
    }

    function claimAirdrop() external {
        require(!hasClaimed[msg.sender], "Airdrop already claimed");
        require(participantsCount < maxParticipants, "Max participants reached");
        require(token.balanceOf(address(this)) >= tokensPerParticipant, "Not enough tokens in contract");

        hasClaimed[msg.sender] = true;
        participantsCount++;
        token.transfer(msg.sender, tokensPerParticipant);
        emit AirdropClaimed(msg.sender, tokensPerParticipant);
    }

    function withdrawRemainingTokens() external onlyOwner {
        uint256 remainingTokens = token.balanceOf(address(this));
        token.transfer(owner(), remainingTokens);
    }
}
