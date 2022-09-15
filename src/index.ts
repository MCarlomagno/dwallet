import { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum?: ExternalProvider | CoinbaseWalletProvider;
  }
}

import { Metamask } from './metamask';
import { Coinbase } from './coinbase'; 

export default { 
  Metamask,
  Coinbase
};