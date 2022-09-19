import {
  ExternalProvider,
  JsonRpcSigner,
  Network,
  Web3Provider,
} from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { Connection } from "./metamaskConnection";
import { Methods, GenericProvider, ProviderRpcError } from "./types";

export class Metamask {
  provider: Web3Provider;
  connection: Connection | undefined;

  constructor() {
    this.provider = new Web3Provider(window.ethereum as ExternalProvider);
  }

  async connect(): Promise<Connection> {
    const accounts: string[] = await this.provider.send(
      Methods.RequestAccounts,
      []
    );
    const network: Network = await this.provider.getNetwork();
    const signer: JsonRpcSigner = this.provider.getSigner();
    this.connection = new Connection(accounts, network, signer);
    return this.connection;
  }

  async sendTransaction(from: string, to: string, valueInEther: string) {
    const value = parseUnits(valueInEther, "ether").toHexString();
    const hash = await this.provider.send(Methods.SendTransaction, [
      { from, to, value },
    ]);
    return hash;
  }

  onAccountsChanged(callback: (acc: string[]) => void) {
    const provider = window.ethereum as GenericProvider;
    provider.on(Methods.AccountsChanged, callback);
  }

  onNetworkChanged(callback: (net: number) => void) {
    const provider = window.ethereum as GenericProvider;
    provider.on(Methods.NetworkChanged, callback);
  }

  onDisconnect(callback: (error: ProviderRpcError) => void) {
    const provider = window.ethereum as GenericProvider;
    provider.on(Methods.Disconnect, callback);
  }
}