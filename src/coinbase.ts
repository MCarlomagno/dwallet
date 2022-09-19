import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from "web3modal";
import { CoinbaseWallet } from "./coinbaseWallet";

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
