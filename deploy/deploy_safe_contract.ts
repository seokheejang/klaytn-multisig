//import Caver from "caver-js";
import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { task } from "hardhat/config";

task("deploy_safe_contracts", "Run deploy deploy_safe_contracts").setAction(
  async (args, hre: HardhatRuntimeEnvironment) => {
    // const networkConfig = hre.network.config as HttpNetworkConfig;
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;

    const gasPrice = await hre.network.provider.send("klay_gasPrice", []);
    const deployment = await deploy("GnosisSafe", {
      args: [],
      log: true,
      from: deployer,
      gasLimit: 7500000,
      gasPrice,
    });
    console.log("deployment", deployment);
  }
);
