import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { task } from "hardhat/config";
import { ETH_AMOUNTS } from "../config";

task("deploy_erc20_token", "Run deploy deploy_erc20_token").setAction(
  async (args, hre: HardhatRuntimeEnvironment) => {
    // const networkConfig = hre.network.config as HttpNetworkConfig;
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;

    const gasPrice = await hre.network.provider.send("klay_gasPrice", []);
    const deployment = await deploy("TestERC20", {
      args: ["TEST20", "JSH", `${ETH_AMOUNTS.ONE_ETH}000000000`],
      log: true,
      from: deployer,
      gasLimit: 7500000,
      gasPrice,
    });
    console.log("deployment", deployment);
  }
);
