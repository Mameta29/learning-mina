# Mina zkApps Learning Project

## Overview

このリポジトリは、Mina プロトコルの zkApps 開発を学習するためのサンプルプロジェクトです。
TypeScript(o1js)を使用して、シンプルなカウンター機能を実装しています。

## 環境構築

```bash
# 必要な環境
node.js (v16以上推奨)
npm (最新版推奨)

# グローバルインストール
npm install -g zkapp-cli

# バージョン確認
zk --version

# プロジェクト作成
zk project learning

# 依存関係インストール
cd learning
npm install
```

## プロジェクト構造

```
learning/
├── src/
│   ├── Add.ts          # スマートコントラクト
│   ├── interact.ts     # コントラクトとの対話スクリプト
│   └── generateKey.ts  # アカウント鍵生成用スクリプト
├── build/              # コンパイル後のJavaScriptファイル
└── config.json        # ネットワーク設定ファイル
```

## テストネット設定

```bash
zk config

# 設定項目
Deploy Alias Name: devnet
Target Network Kind: Testnet
Mina GraphQL API URL: https://api.minascan.io/node/devnet/v1/graphql
Transaction Fee: 0.1
```

## Faucet の取得

1. `zk config` 実行後に表示される URL にアクセス
2. 表示されたアドレスに対して tMINA をリクエスト
3. トランザクションの承認を待つ

## デプロイ

```bash
zk deploy devnet
```

## コントラクトとの対話

### 状態の読み取り

```bash
npm run build
node build/src/interact.js
```

### 状態の更新

```bash
# generateKey.tsで新しいアカウントを生成
# 生成された秘密鍵をinteract.tsに設定
npm run build
node build/src/interact.js
```

## 重要なポイント

- デプロイされるのはコントラクトコードではなく、検証鍵と State のみ
- すべての計算はローカルで実行され、証明もローカルで生成
- 生成された証明はネットワークに送信され、デプロイされた検証鍵で検証

## 注意事項

- このサンプルでは秘密鍵を直接コードに記載していますが、実際の開発では環境変数などで適切に管理してください
- テストネット用の tMINA は定期的に取得する必要があります

## 実行例

```bash
# 状態の読み取り
> npm run build && node build/src/interact.js
zkApp count 1

# 状態の更新（+2）
> npm run build && node build/src/interact.js
zkApp count 1
compiling...
proving...
signing...
sent tx 5JtYrgjvti7XXuvYF4orcWEUXcaGnk1BiwK1tjjRRrZUdfLbDwE7
```

## 学習ポイント

- zkApps の基本的な開発フロー
- ゼロ知識証明を使用したスマートコントラクトの仕組み
- TypeScript での zkApps 開発手法

## 参考

- [Mina Protocol Documentation](https://docs.minaprotocol.com/)
- [o1js Documentation](https://docs.minaprotocol.com/zkapps/o1js)
