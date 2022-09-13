import { JsonRpcSigner, Network } from '@ethersproject/providers';

export class Connection {
  network: Network;
  accounts: string[];
  signer: JsonRpcSigner;
  constructor(accounts: string[], network: Network, signer: JsonRpcSigner) {
    this.accounts = accounts;
    this.network = network;
    this.signer = signer;
  }
}
