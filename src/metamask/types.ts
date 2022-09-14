import { ExternalProvider } from '@ethersproject/providers';

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface ExtensionForProvider {
  on: (event: string, callback: (...params: any) => void) => void;
}

export type GenericProvider = ExternalProvider & ExtensionForProvider;

export enum Methods {
  SendTransaction = 'eth_sendTransaction',
  AccountsChanged = 'accountsChanged',
  RequestAccounts = 'eth_requestAccounts',
  NetworkChanged = 'networkChanged',
  Disconnect = 'disconnect'
}
