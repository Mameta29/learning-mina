import { Mina, NetworkId, PrivateKey, PublicKey, fetchAccount} from 'o1js';
import { Add } from './Add.js';

const Network = Mina.Network({
  networkId: "testnet",
  mina: "https://api.minascan.io/node/devnet/v1/graphql",
});

Mina.setActiveInstance(Network);

const appKey = PublicKey.fromBase58("B62qm3CZ7rgfFKjHdB3P7oX7NxByGsNgsvUxMrkGLwMHUsCU6eE2qry");

await fetchAccount({publicKey: appKey})

const zkApp = new Add(appKey)

console.log("zkApp count", zkApp.num.get().toString())