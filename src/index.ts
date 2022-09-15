import { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum?: ExternalProvider | CoinbaseWalletProvider;
  }
}

export * from './metamask';
export * from './coinbase';