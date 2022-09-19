import { Metamask, Coinbase } from 'dwallet';
import { useCallback, useEffect, useState } from 'react';
import './App.css'

function App() {
  const [metamask, setMetamask] = useState<Metamask>();
  const [coinbase, setCoinbase] = useState<Coinbase>();

  useEffect(() => {
    setMetamask(new Metamask());
    setCoinbase(new Coinbase('demo', process.env.INFURA_API_KEY ?? ''));
  }, []);

  const connect = useCallback(() => {
    if (metamask) {
      metamask.connect().then(() => {
        metamask.onAccountsChanged(console.log);
        metamask.onDisconnect(console.log);
        metamask.onNetworkChanged(console.log);
      });
    }
  }, [metamask]);

  const sendTransaction = useCallback(() => {
    if (metamask) {
      const randomAddr = '0xEF38C99133b97F407b6Fec3A5Cf2Ce45a30E8ace';
      metamask.connect().then(() => {
        console.log('connected');
        if (!metamask.connection) return;
        metamask.sendTransaction(
          metamask.connection.accounts[0],
          randomAddr,
          '1'
        );
      })
    }
  }, [metamask]);

  const connectCoinbase = useCallback(() => {
    if (coinbase) {
      coinbase.connect().then(console.log);
    }
  }, [coinbase]);

  return (
    <div className="App">
      <button onClick={connect}>
        Connect Metamask
      </button>
      <button onClick={connectCoinbase}>
        Connect Coinbase
      </button>
      <button onClick={sendTransaction}>
        Send transaction
      </button>
    </div>
  )
}

export default App
