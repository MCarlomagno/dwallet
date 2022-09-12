import { ExternalProvider, Web3Provider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
};

export class Metamask {
  readonly provider: Web3Provider;

  constructor() {
    if (!window.ethereum) throw Error('Provider does not exist');
  
    this.provider = new Web3Provider(window.ethereum);
  }
}
