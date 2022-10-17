import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { task } from "hardhat/config";
import { ETH_AMOUNTS } from "../config";

task("deploy_simple_order", "Run deploy deploy_simple_order").setAction(
  async (args, hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;

    const gasPrice = await hre.network.provider.send("klay_gasPrice", []);
    const deployment = await deploy("simpleOrder", {
      args: [deployer], // EOA
      log: true,
      from: deployer,
      gasLimit: 7500000,
      gasPrice,
    });
    console.log("deployment", deployment);
  }
);
