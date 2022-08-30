import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { task } from "hardhat/config";

task("deploy_erc721_token", "Run deploy deploy_erc721_token").setAction(
  async (args, hre: HardhatRuntimeEnvironment) => {
    // const networkConfig = hre.network.config as HttpNetworkConfig;
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;

    const gasPrice = await hre.network.provider.send("klay_gasPrice", []);
    const deployment = await deploy("TestERC721", {
      args: ["TEST721", "JSH"],
      log: true,
      from: deployer,
      gasLimit: 7500000,
      gasPrice,
    });
    console.log("deployment", deployment);
  }
);
