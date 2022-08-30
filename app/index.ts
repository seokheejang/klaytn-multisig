import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { abi } from "../artifacts/contracts/TestContract/TestERC20.sol/TestERC20.json";
import { ethers } from "ethers";
import { PUBLIC_BAOBAB_HOST } from "../config";

const ERC20CA = "0x6a6506a06b77bb1b83cf8340d8803eff2f816576";
const toAddress = "0xBeB578AB22907B7EA88ea646bf5bEDF6a92DbDC3";

const provider = new ethers.providers.JsonRpcProvider({
  url: PUBLIC_BAOBAB_HOST,
});
const deployerKey = process.env.DEPLOYER as string;
const wallet = new ethers.Wallet(deployerKey, provider);
const ERC20Inst = new ethers.Contract(ERC20CA, abi, wallet);

const procERC20Test = async () => {
  const tx = await ERC20Inst.transfer(toAddress, 1);
  const txReceipt = await tx.wait();

  console.log("txReceipt", txReceipt);

  const token = await ERC20Inst.balanceOf(toAddress);

  console.log(token.toNumber());
};

procERC20Test();
