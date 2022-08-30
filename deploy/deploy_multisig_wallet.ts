import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { task } from "hardhat/config";

task("deploy_multisig_wallet", "Run deploy deploy_multisig_wallet").setAction(
  async (args, hre: HardhatRuntimeEnvironment) => {
    // const networkConfig = hre.network.config as HttpNetworkConfig;
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;

    const gasPrice = await hre.network.provider.send("klay_gasPrice", []);
    const deployment = await deploy("MultiSigWallet", {
      args: [
        [
          "0xd4f71c9d6b3db938fb0a3ce030d062ece98c5ac5",
          "0x27602b812373435ff2a459be0f8c5e7d18df6a9d",
        ],
        2,
      ],
      log: true,
      from: deployer,
      gasLimit: 7500000,
      gasPrice,
    });
    console.log("deployment", deployment);
  }
);
