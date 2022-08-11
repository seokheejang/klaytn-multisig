import Caver from "caver-js";
import { PUBLIC_BAOBAB_HOST, PUBLIC_CYPRESS_HOST } from "../../config";

interface KASProviderOpt {
  secretKey: string;
  accessKey: string;
  chainId: number;
}

class CaverContoller {
  public caver: Caver;
  private network: string;
  private KASProvider: KASProviderOpt;

  constructor(network: string) {
    this.network = network;
  }

  setProivder(network: string, opt: KASProviderOpt) {
    this.KASProvider.secretKey = opt.secretKey;
    this.KASProvider.accessKey = opt.accessKey;
    this.KASProvider.chainId = opt.chainId;
    this.network = network;

    let url: string;
    let httpHeaders = {
      headers: [
        {
          name: "Authorization",
          value: `Basic ${Buffer.from(
            `${this.KASProvider.accessKey}:${this.KASProvider.secretKey}`
          ).toString("base64")}`,
        },
        { name: "x-chain-id", value: `${this.KASProvider.chainId}` },
      ],
    };
    if (this.network === `baobab`) {
      url = PUBLIC_BAOBAB_HOST;
    } else if (this.network === `cypress`) {
      url = PUBLIC_CYPRESS_HOST;
    } else {
      throw Error("setProivder: network should be 'baobab' or 'cypress'");
    }
    this.caver = new Caver(new Caver.providers.HttpProvider(url, httpHeaders));
  }

  get getProvider() {
    return this.caver;
  }

  get getChainId() {
    return this.KASProvider.chainId;
  }
}

export { CaverContoller };
