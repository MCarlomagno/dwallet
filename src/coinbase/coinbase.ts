import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from "web3modal";

interface CoinbaseOptions {
  appName: string;
  infuraId: string;
}

type Class<T> = new (...args: any[]) => T

export class CoinbaseWallet {
  package: Class<CoinbaseWalletSDK>;
  options: CoinbaseOptions;
  constructor(pkg: Class<CoinbaseWalletSDK>, options: CoinbaseOptions) {
    this.package = pkg;
    this.options = options;
  }
}

export class Coinbase {
  private wallet: CoinbaseWallet;
  private web3Modal: Web3Modal;
  private provider: any;

  constructor(appName: string, infuraId: string) {
    this.wallet = new CoinbaseWallet(
      CoinbaseWalletSDK, 
      { appName, infuraId }
    );

    this.web3Modal = new Web3Modal();
  }

  async connect() {
    this.provider = await this.web3Modal.connect();
  }
}
