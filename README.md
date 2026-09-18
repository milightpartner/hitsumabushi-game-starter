# hitsumabushi-game-starter

対戦ゲームポータル「**ひつまぶし (OmoshiroGamePortal)**」向けのゲームを作るためのスターターテンプレートです。「Use this template」から新しいリポジトリを作って、AIエディタと対話するだけでSDK準拠のゲームを実装できます。

## 1. セットアップ

### 1-1. このテンプレートから新しいリポジトリを作る

GitHubの「Use this template」ボタンから、自分のアカウント/組織に新しいリポジトリを作成してください。

### 1-2. `@milightpartner/hitsumabushi-sdk` へのアクセス権を用意する

このSDKはnpmjs.comではなく **GitHub Packages** で配布されています。`read:packages` スコープを持つ Personal Access Token を発行し、環境変数にセットしてください。

```bash
export GITHUB_PACKAGES_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

(このリポジトリの `.npmrc` は既にGitHub Packagesを見るよう設定済みです)

### 1-3. インストール

```bash
npm install
```

これだけで `@milightpartner/hitsumabushi-sdk`(`hitsumabushi` CLI)のインストールに加えて、AI開発スキル(`.claude/skills/hitsumabushi-game-developer/`)のセットアップが自動的に行われます(`postinstall`)。

**ゲーム本体(`index.html`)は公開URL `https://milightpartner.jp/sdk/hitsumabushi-sdk.js` から `<script>` タグでSDKを読み込みます。** ビルドもバンドラも、SDKのコピーをリポジトリにコミットする必要もありません。`npx hitsumabushi dev`(ローカル開発ハーネス)専用のパス `/__hitsumabushi_dev__/sdk.js` を指したままデプロイすると、本番では404になりゲームが一切反応しなくなるので注意してください。

## 2. AIと一緒にゲームを作る

1. このリポジトリを **Claude Code** で開く
2. 作りたいゲームのルール・コンセプトを伝える
3. AIが `Hitsumabushi.init()` の使い方、通信の設計、リマッチ・観戦モード対応、OBS透過対応などを踏まえて実装を進めます

Claude Code以外のAIエディタ(Cursor等)を使う場合は、`.cursorrules` に要点をまとめてあります。より詳しい仕様は `.claude/skills/hitsumabushi-game-developer/SKILL.md`、および `node_modules/@milightpartner/hitsumabushi-sdk/docs/` 配下の各仕様書を参照してください:

- [`docs/api-reference.md`](https://github.com/milightpartner/OmoshiroGamePortal/blob/main/packages/hitsumabushi-sdk/docs/api-reference.md) — SDKの完全なAPI・通信プロトコル仕様
- [`docs/game-manifest-spec.md`](https://github.com/milightpartner/OmoshiroGamePortal/blob/main/packages/hitsumabushi-sdk/docs/game-manifest-spec.md) — `manifest.json` の全プロパティ定義
- [`docs/game-guidelines.md`](https://github.com/milightpartner/OmoshiroGamePortal/blob/main/packages/hitsumabushi-sdk/docs/game-guidelines.md) — モバイル対応・UX上の技術制約

## 3. 動作確認

Portal本体を起動しなくても、ローカルで多人数対戦フローを検証できます:

```bash
npm run dev
```

`manifest.json` の宣言に沿った人数分の `<iframe>` が並び、実際のポータルと同じ `INIT_GAME` の注入と `GAME_DATA_RELAY` の相互中継が行われます。観戦者の追加・OBSモードの切り替え・リマッチ(`onInitGame` の再実行)もここで確認できます。

> このハーネスはゲーム単体の動作確認用です。Portal本体との実際の接続(ルーム作成・ロビー・クロスオリジンでの埋め込み)はこのハーネスでは検証できません。

## 4. できあがったら

実装できたら [`hitsumabushi-community-games`](https://github.com/milightpartner/hitsumabushi-community-games) にForkでPRを送って投稿してください(手順は同リポジトリの`CONTRIBUTING.md`参照)。CI検証を通ってマージされると、コミュニティ枠のサイトへ自動デプロイされます。ポータルの正式なゲームカタログへの掲載は別途`milightpartner/OmoshiroGamePortal`の管理者によるレビューが必要です。

## このリポジトリに含まれるもの

| ファイル | 役割 |
|---|---|
| `index.html` | ゲーム本体(SDK初期化・観戦者ロック・リマッチ対応済みの最小骨格) |
| `manifest.json` | プレイ人数・勝敗モデルの宣言 |
| `guide.md` | (任意)ゲーム解説記事の下書き。不要なら削除可 |
| `CLAUDE.md` / `.cursorrules` | AIエディタ向けのガイド |
| `.npmrc` | GitHub Packagesレジストリの設定 |
