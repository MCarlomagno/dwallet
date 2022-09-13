import { parseUnits } from "ethers/lib/utils";
import { Metamask, Methods } from "../src/metamask";

const mockProvider = {
  isMetaMask: true,
  send: () => {}
};

describe('Metamask', () => {
  it('should instance Metamask when provider exists', () => {
    window.ethereum = mockProvider;
    const metamask = new Metamask();
    expect(metamask.provider).toBeTruthy();
  });

  it('should throw an error when provider does not exist', () => {
    window.ethereum = {}; 
    const fn = () => {
      const metamask = new Metamask();
    }
    expect(fn).toThrow(Error);
  });

  it('should connect and create connection object', async () => {
    window.ethereum = mockProvider;
    const metamask = new Metamask();
    const getNetworkMock = jest
      .spyOn(metamask.provider, 'getNetwork')
      .mockImplementation(async () => ({chainId: 1, name: 'eth'}));
    const sendMock = jest
      .spyOn(metamask.provider, 'send')
      .mockImplementation(async () => (['test']));
    const connection = await metamask.connect();
    expect(sendMock).toBeCalled();
    expect(getNetworkMock).toBeCalled();
    expect(connection.accounts[0]).toBe('test');
    expect(connection.network.chainId).toBe(1);
    expect(connection.network.name).toBe('eth');
    expect(connection).toHaveProperty('signer');
  });

  it('should send a transaction', async () => {
    window.ethereum = mockProvider;
    const metamask = new Metamask();
    jest.spyOn(metamask.provider, 'getNetwork')
      .mockImplementation(async () => ({chainId: 1, name: 'eth'}));
    const sendMock = jest
      .spyOn(metamask.provider, 'send')
      .mockImplementation(async () => (['test']));
    const connection = await metamask.connect();
    const from = 'addr1';
    const to = 'addr2';
    const value = '1';
    await metamask.sendTransaction(from, to, value);
    expect(sendMock).toHaveBeenCalledWith(
      Methods.SendTransaction,
      [{ from, to, value: parseUnits(value, 'ether').toHexString() }]
    );
  });
});