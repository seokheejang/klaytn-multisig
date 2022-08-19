import "dotenv/config";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./deploy/deploy_multisig_wallet";
import "./deploy/deploy_safe_contract";

const httpHeaders = {
  Authorization:
    "Basic " +
    Buffer.from(
      process.env.ACCESS_KEY_ID + ":" + process.env.SECRET_ACCESS_KEY
    ).toString("base64"),
  "x-chain-id": `${process.env.KAS_X_CHAIN_ID}`,
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      { version: "0.7.6" },
      { version: "0.6.12" },
      { version: "0.5.17" },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {},
    cypress: {
      url: process.env.CYPRESS_HOST,
      httpHeaders,
      accounts: [process.env.DEPLOYER || ""],
      chainId: 8217,
      gas: 7500000,
    },
    baobab: {
      url: process.env.BAOBAB_HOST,
      httpHeaders,
      accounts: [process.env.DEPLOYER || ""],
      chainId: 1001,
      gas: 7500000,
    },
    scn: {
      url: process.env.SCN_HOST,
      accounts: [process.env.DEPLOYER || ""],
      chainId: 1000,
      gas: 7500000,
    },
  },
  mocha: {
    timeout: 20000,
  },
};

export default config;
