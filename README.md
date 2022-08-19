# klaytn-multisig

Klaytn multi-sig contract dapp

# Reference

- https://github.com/gnosis/MultiSigWallet
- https://github.com/safe-global/safe-contracts

## Hardhat Compile

```shell
yarn hardhat compile
```

## Hardhat Test

```shell
yarn hardhat test
yarn hardhat test ./test/MultiSigWallet.ts
```

## Hardhat Klaytn Deploy

```shell
# Contarct Name
#   : msw (mulitisigwallet),
#   : sc (safe-contracts),
yarn deploy:baobab:{Contarct Name}
yarn deploy:cypress:{Contarct Name}
yarn deploy:scn:{Contarct Name}
```

## Remixd Connect

```shell
yarn remixd
# remixd -s ./contracts/SafeContract --remix-ide https://remix.ethereum.org
```
