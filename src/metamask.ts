import {
  ExternalProvider,
  JsonRpcSigner,
  Network,
  Web3Provider } from '@ethersproject/providers';
import { parseUnits } from '@ethersproject/units';

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
};

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

type ExtensionForProvider = {
  on: (event: string, callback: (...params: any) => void) => void;
};

type GenericProvider = ExternalProvider & ExtensionForProvider;

export enum Methods {
  SendTransaction = 'eth_sendTransaction',
  AccountsChanged = 'accountsChanged',
  RequestAccounts = 'eth_requestAccounts',
  NetworkChanged = 'networkChanged',
  Disconnect = 'disconnect'
}

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

export class Metamask {
  provider: Web3Provider;
  connection: Connection | undefined;

  constructor() {
    if (!window.ethereum) throw Error('Provider does not exist');
    this.provider = new Web3Provider(window.ethereum);
  }

  async connect(): Promise<Connection> {
    const accounts: string[] = await this.provider.send(Methods.RequestAccounts, []);
    const network: Network = await this.provider.getNetwork();
    const signer: JsonRpcSigner = this.provider.getSigner();
    this.connection = new Connection(accounts, network, signer);
    return this.connection;
  }

  async sendTransaction(from: string, to: string, valueInEther: string) {
    const value = parseUnits(valueInEther, 'ether').toHexString();
    const hash = await this.provider.send(
      Methods.SendTransaction,
      [{ from, to, value }]
    );
    return hash;
  }

  onAccountsChanged(callback: (acc: string[]) => void) {
    (window.ethereum as GenericProvider).on(Methods.AccountsChanged, callback);
  }

  onNetworkChanged(callback: (net: number) => void) {
    (window.ethereum as GenericProvider).on(Methods.NetworkChanged, callback);
  }

  onDisconnect(callback: (error: ProviderRpcError) => void) {
    (window.ethereum as GenericProvider).on(Methods.Disconnect, callback);
  }
}
