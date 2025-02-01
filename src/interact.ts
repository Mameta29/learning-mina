import { Mina, PrivateKey, PublicKey, fetchAccount} from 'o1js';
import { Add } from './Add.js';

// ネットワーク接続設定
const Network = Mina.Network("https://api.minascan.io/node/devnet/v1/graphql");

// ネットワーク設定をアクティブにする
Mina.setActiveInstance(Network);

// zkAppsのスマートコントラクトアドレスを読み込む
const appKey = PublicKey.fromBase58("B62qm3CZ7rgfFKjHdB3P7oX7NxByGsNgsvUxMrkGLwMHUsCU6eE2qry");

// コントラクトのインスタンスを生成
const zkApp = new Add(appKey)
// アカウントの現在のstateを取得 -> これしないとstate読み取りができない
await fetchAccount({publicKey: appKey})
console.log("zkApp count", zkApp.num.get().toString())


// アカウントの秘密鍵をBase58形式の文字列から生成
const accountPrivateKey = PrivateKey.fromBase58("EKEmBeQKgn4yzMyzZsTnu9jDbzAjpeAU8L5Zy7sbSbpAPEj133iH")

// 秘密鍵から対応する公開鍵を生成
const accountPublicKey = accountPrivateKey.toPublicKey()

console.log("compiling...")
// スマートコントラクトをコンパイルし、証明キーを生成
await Add.compile()

// トランザクションを作成。sender（送信者）とfee（手数料）を指定し、zkApp.update()を実行
const tx = await Mina.transaction(
  { sender: accountPublicKey, fee: 0.1e9 }, // 0.1 MINA = 100,000,000 ナノMINA
  async () => {
    await zkApp.update() // コントラクトのupdate関数を呼び出し
  }
);

console.log("proving...")
// トランザクションの正当性を証明するゼロ知識証明を生成
await tx.prove()

console.log("signing...")
// トランザクションに署名し、ネットワークに送信
const sentTx = await tx.sign([accountPrivateKey]).send()

// 送信されたトランザクションのハッシュを出力
console.log("sent tx", sentTx.hash)