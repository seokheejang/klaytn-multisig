import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MultiSigWallet, MultiSigWallet__factory } from "../typechain-types";

let msw: MultiSigWallet;
const owners = ['0xD4f71C9d6B3Db938fb0a3cE030d062ece98C5AC5', '0x27602b812373435Ff2a459Be0f8c5e7D18df6A9d'];
const required = 2;

beforeEach(async () => {
  // Contracts are deployed using the first signer/account by default
  const signers = await ethers.getSigners();
  msw = await new MultiSigWallet__factory(signers[0]).deploy(owners, required);

  // ethers.getContractFactory를 활용한 deploy
  // const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
  // const multisig = await MultiSigWallet.deploy([
  //     "0xd4f71c9d6b3db938fb0a3ce030d062ece98c5ac5",
  //     "0x27602b812373435ff2a459be0f8c5e7d18df6a9d",
  //   ], 2);
});

describe("MultiSigWallet", async () => {
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

  describe("Write Function", async () => {

  });
});
