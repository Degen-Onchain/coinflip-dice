# Base - Coinflip Documentation

## **1. Getting Started**

You'll need a compatible blockchain wallet (e.g., Rabby or MetaMask) with sufficient funds on the Base network. Ensure you have ETH and [**USD Coin (USDC)**](https://basescan.org/token/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913) for transaction fees and betting.

## **2. How the the game works**

- Players choose the amount to wager and call "heads" or "tails."
- The smart contract executes a provably fair coin flip.
- The oracle provides the randomness needed to determine the outcome.
- If the player's call matches the result, they win; otherwise, they lose.

![Screenshot 2023-12-18 at 13.58.38.png](https://dappv2-one.vercel.app/docs/coinflip/coinflip-map.png)

## **3. Odds and Fees**

- The game has a 50% probability of the outcome being Heads or Tails.
- Players are charged $0.10 USDC for betting.
- The platform charges 2% of the winner's prize as a fee. Max Payout = wager * 1.98

## 4**. Blockchain, Smart Contracts and Oracle**

The game utilizes Solidity smart contracts to handle transactions and enforce rules.

All game transactions and outcomes are recorded on the Base blockchain and leverage [**Supra Oracle**](https://supraoracles.com/)'s technology, ensuring transparency and immutability. The oracle generates a cryptographic proof of randomness, ensuring the fairness of each coin flip. The smart contract utilizes this proof to determine the game outcome.

You can follow the game contract activity on Base Scan [**here**](https://basescan.org/address/0x2a610eb95251386eb1174fb4f4dea3403ed48494#tokentxns).

## 5**. Contact and Support**

For inquiries, feedback, or support, please reach out to our team at tribesx.app@gmail.com or at [**@TribeXapp on X**](https://twitter.com/TribeXapp).

Thank you for playing Tribex's CoinFlip! Good luck and enjoy the game.

*Note: This documentation is subject to updates. Please refer to the latest version for the most accurate information.*