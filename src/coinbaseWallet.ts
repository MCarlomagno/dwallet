import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

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