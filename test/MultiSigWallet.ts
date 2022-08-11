import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { providers } from "ethers";
import { ethers } from "hardhat";
import { MultiSigWallet, MultiSigWallet__factory } from "../typechain-types";

let msw: MultiSigWallet;

describe("MultiSigWallet", async () => {
  const owners = [
    "0xD4f71C9d6B3Db938fb0a3cE030d062ece98C5AC5",
    "0x27602b812373435Ff2a459Be0f8c5e7D18df6A9d",
  ];
  const required = 2;

  beforeEach(async () => {
    // Contracts are deployed using the first signer/account by default
    const signers = await ethers.getSigners();
    msw = await new MultiSigWallet__factory(signers[0]).deploy(
      owners,
      required
    );
    console.log(msw.address);
  });

  describe("Deafault View Function", async () => {
    it("getOwners", async () => {
      const result = await msw.getOwners();
      // @TODO: 배열 비교 처리
      expect(result[0]).to.eq(owners[0]);
      expect(result[1]).to.eq(owners[1]);
    });

    it("required", async () => {
      const result = await msw.required();
      expect(result).to.eq(required);
    });
  });

  describe("MultiSig sendTransaction ", async () => {
    it("required", async () => {
      const getBalance = await ethers.provider.getBalance(msw.address);
      console.log("getBalance", getBalance);
      const result = await msw.required();
      expect(result).to.eq(required);
    });
  });
});
