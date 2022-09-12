import { Metamask } from "../src/metamask";
import { ExternalProvider } from '@ethersproject/providers';

describe('Metamask', () => {
  it('should instance Metamask when provider exists', () => {
    const provider: ExternalProvider = {
      isMetaMask: true,
      send: () => {}
    };

    window.ethereum = provider;
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
});