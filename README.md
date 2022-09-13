# DWallet 🤑

[![Node.js Package](https://github.com/MCarlomagno/dwallet/actions/workflows/release.yml/badge.svg)](https://github.com/MCarlomagno/dwallet/actions/workflows/release.yml)
[![Publish to Docker](https://github.com/MCarlomagno/dwallet/actions/workflows/publish.yml/badge.svg)](https://github.com/MCarlomagno/dwallet/actions/workflows/publish.yml)
Simple typescript package for managing metamask connection in an easy and straightforward way.


## Installation

```sh
npm install dwallet
```

## Usage

#### Simple connection to Metamask wallet

```ts
import { Metamask } from 'dwallet';

// ...

const metamask = new Metamask();
const connection = await metamask.connect();
const { network, accounts } = metamask.connection;
```

#### Listening events


```ts
import { Metamask } from 'dwallet';

// ...

const metamask = new Metamask();
const connection = await metamask.connect();

// Accounts changed
metamask.onAccountsChanged((acc: string[]) => {
  // do something 
});

// Network changed
metamask.onNetworkChanged((net: Network) => {
  // do something 
});

// User disconnects
metamask.onDisconnect((err: Error) => {
  // do something 
});
```

## Contribuiting
Issues and PRs are always welcomed, as well as suggestions.