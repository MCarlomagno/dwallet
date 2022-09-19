import { useEffect, useState } from 'react';
import { Metamask } from './metamask';

export function useMetamask() {
  const [metamask, setMetamask] = useState<Metamask>();

  useEffect(() => {
    setMetamask(new Metamask());
  }, []);
  
  return metamask
}