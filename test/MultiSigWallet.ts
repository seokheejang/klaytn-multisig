import "@nomiclabs/hardhat-ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MultiSigWallet, MultiSigWallet__factory } from "../typechain-types";
import { ETH_AMOUNTS } from "../config";
import { getIndexFromTxEventLog } from "./utils";

let msw: MultiSigWallet;

describe("MultiSigWallet", async () => {
  const owners = new Array<string>();

  let signers: SignerWithAddress[];
  let receiver: string;

  const required = 2;
  const one_eth = ETH_AMOUNTS.ONE_ETH;
  const one_gwei = ETH_AMOUNTS.ONE_GWEI;
  const deposit = one_eth;

  before("Deploy Contract", async () => {
    // Initialize signer and owners account
    signers = await ethers.getSigners();
    owners.push(signers[0].address);
    owners.push(signers[1].address);
    receiver = signers[2].address;

    // Contracts are deployed using the first signer/account by default
    msw = await new MultiSigWallet__factory(signers[0]).deploy(
      owners,
      required,
      { value: deposit }
    );
  });

  describe("Deafault View Function", async () => {
    it("Check Function: getOwners", async () => {
      const result = await msw.getOwners();
      // @TODO: 배열 비교 처리
      expect(result[0]).to.eq(owners[0]);
      expect(result[1]).to.eq(owners[1]);
    });

    it("Check Function: required", async () => {
      const result = await msw.required();
      expect(result).to.eq(required);
    });
  });

  describe("Failure Case 1. Confirmed Check", async () => {
    it("Should operation executeTransaction exceeded confrim(required) threshold", async () => {
      const tx = await msw.submitTransaction(receiver, one_gwei, "0x01");
      const txId = await getIndexFromTxEventLog(tx);
      // 다른 owner의 confrim이 오기전에 execute contract 실행
      await msw.executeTransaction(txId);

      expect(await msw.isConfirmed(txId)).to.eq(false);
    });
  });

  describe("Success Case 1.", async () => {
    it("Should have been 1 ETH deposited into the wallet account[0]", async () => {
      const amount = await ethers.provider.getBalance(msw.address);

      expect(amount).to.eq(one_eth);
    });

    it(`signers[0] run submitTransaction, Wallet Contract value: ${one_eth}`, async () => {
      // 첫 번째 owner의 submit multisig contract 실행
      const tx = await msw.submitTransaction(receiver, one_gwei, "0x01");
      const txId = await getIndexFromTxEventLog(tx);

      expect(await msw.getConfirmationCount(txId)).to.eq(1);

      expect(await ethers.provider.getBalance(msw.address)).to.eq(one_eth);
    });

    it(`signers[1] run confirmTransaction, Wallet Contract value: ${
      BigInt(one_eth) - BigInt(one_gwei)
    }`, async () => {
      // 두번째 owner 계정으로 connect해서 confirm multisig contract 실행
      const tx = await msw.connect(signers[1]).confirmTransaction(0);
      const txId = await getIndexFromTxEventLog(tx);

      expect(await msw.getConfirmationCount(txId)).to.eq(2);
      // Contract Wallet의 빠져나간 Ehter 잔금 확인
      expect(await ethers.provider.getBalance(msw.address)).to.eq(
        BigInt(one_eth) - BigInt(one_gwei)
      );
    });
  });

  describe("Success Case 2.", async () => {
    it("Transaction Revoke", async () => {
      const tx = await msw.submitTransaction(receiver, one_gwei, "0x01");
      const txId = await getIndexFromTxEventLog(tx);

      expect(await msw.confirmations(txId, signers[0].address)).to.eq(true);

      await msw.revokeConfirmation(txId);

      expect(await msw.confirmations(txId, signers[0].address)).to.eq(false);
    });
  });
});
