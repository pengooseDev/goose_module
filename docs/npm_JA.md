<div align="center">

# 📚 Docs
| npm : | [KO](./npm_KO.md) \| [EN](./npm_EN.md) \| **JA**|
|:--:|:--:|
| Creation guide: | [KO](./guide_KO.md) \| [EN](./guide_EN.md) \| [JA](./guide_JA.md) |

</div>


# 1. パッケージの作成

まず、`npm init` コマンドを使って新しいパッケージを作成しましょう。

```shell
> npm init
```

すべての設定を最初に完了する必要はありません。パッケージ作成後に package.json ファイルを直接編集して、必要な設定を追加できます！ :)

## TypeScript の使用

パッケージに TypeScript を導入するには、以下のように開発依存関係として TypeScript と Node.js の型定義をインストールしてください。

```shell
> npm install --save-dev typescript @types/node
```

# 2. package.json の設定

package.json ファイルは、パッケージの情報と依存関係を定義します。以下の例を参考にしてください！

`"build": "tsc"` は、TypeScript を使用する場合にのみ package.json に追加されるスクリプトです！ :)

```json
{
  "name": "module-name",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "files": ["lib"],
  "types": "lib/index.d.ts",
  "private": false,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc"
  },
  "author": "pengoose",
  "license": "MIT",
  "devDependencies": {
    "@types/node": "^20.3.3",
    "typescript": "^5.1.6"
  }
}
```

---

## [tsconfig](https://yamoo9.gitbook.io/typescript/cli-env/tsconfig) の設定 (TypeScript 使用時)

TypeScript プロジェクトでは、tsconfig.json ファイルを通してコンパイラオプションを設定できます！ :)

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

# 3. コードの記述

ここは、あなたのアイデアをコードとして実装するステージです！  
「ライブラリ」や「モジュール」を作ることに対して、恐れる必要はありません！

モジュールを作るということは、普段よく使うコードを再利用可能な形にまとめ、どのプロジェクトでも誰でも簡単に利用できるように公開することを意味します。

例えば、以下のようなモジュールが考えられます:

- **データ検証ライブラリ：** 入力値が特定の条件を満たしているかを検証する関数群
- **よく使うアルゴリズム：** ソートや探索などのアルゴリズムをまとめたモジュール
- **API リクエストラッパー：** 特定の API へのリクエストを簡単に送るためのラッパー関数
- **UI コンポーネント：** ボタン、フォーム、ダイアログなど、再利用可能な UI コンポーネント

とてもシンプルで、しかも魅力的なプロセスです！ 🥳

# 4. README の作成

次は、モジュールの使い方をドキュメント化する段階です！  
あなたの素晴らしいコードを他の人が簡単に理解し利用できるよう、分かりやすく親切な README を作成しましょう。

README には通常、以下の内容を含めます:

- **モジュールの説明：** このモジュールがどんな問題を解決するのか、またはどんな機能を提供するのかを簡潔に説明してください。これにより、ユーザーはモジュールの役割をすぐに理解できます！
- **インストールおよび使用方法：** モジュールのインストール方法と使い方を詳細に記述してください！
- **サンプルコード：** 実際にこのモジュールをどのように使うのかを示す例コードは、ユーザーの理解に大いに役立ちます。 :)
- **API ドキュメント：** モジュールが提供する関数やメソッド、そのパラメーターと返り値などを詳細にドキュメント化してください！

しっかりとしたドキュメントを書くことは、あなたのコードをユーザーフレンドリーにするだけでなく、開発者としての協働力を高める大切なプロセスです。 :)

# 5. ビルド

TypeScript や Babel を使用している場合、ソースコードをビルドする必要があります！

```shell
> npm run build
```

このコマンドは、上記の tsconfig.json の設定に従い、プロジェクトルートの lib フォルダにビルド済みファイルを生成します。

# 6. デプロイ 🚀

npm モジュールをデプロイするには、まず [npm](https://www.npmjs.com/) でアカウントを作成する必要があります！

アカウント作成後、ターミナルで `npm login` コマンドを使ってログインしてください :)

## npm ログイン

```shell
> npm login
```

![npm login image](https://i.imgur.com/YiTdDAc.png)

## npm パッケージのデプロイ

ログインが完了したら、npm publish コマンドを使ってパッケージをデプロイします。

```shell
> npm publish
```

*注意:* package.json の version フィールドは、以前にデプロイされたバージョンよりも高くなっている必要があります！

```json
{
  "version": "1.0.0" // 以前にデプロイされたバージョン
}
```
```json
{
  "version": "1.0.1" // 新しいバージョン（ドキュメント修正時も含む）
}
```

---

🎉 おめでとうございます！あなたの素晴らしいパッケージが npm に公開されました！ 🥳  
これで他の開発者もあなたのパッケージをインストールして利用できるようになります。

今後、パッケージに対するフィードバックが寄せられ、そのフィードバックを基にパッケージを改善していくプロセスが始まります。 :) （ワクワクしませんか？）

例えば、GitHub の Issue タブでユーザーの問題点や機能リクエストを受けたり、Pull Request (PR) を通じて他の開発者の協力を得ながらコードをさらに進化させたりできます。

あなたの初めてのパッケージデプロイを祝福し、これからも学び続け成長する開発者としての道を応援します！ :)

---

# 追加のヒント

# Yarn でのデプロイ

package.json の `"private"` フィールドを `false` に設定すると、yarn でもこのモジュールをインストールできるようになります！

```json
{
  "private": false
}
```

# モジュール名に "@" を含む場合

モジュール名に "@" が含まれた状態で `npm publish` を実行すると、npm はそのパッケージをプライベートパッケージとみなし、有料エラーが発生します。  
リポジトリがパブリックであることを示すため、以下のコマンドを使用してデプロイしてください。

```shell
> npm publish --access=public
```

---

# TS モジュールの指定

![](https://velog.velcdn.com/images/pengoose_dev/post/76a25c7d-a00e-4120-ba2f-8f1987897876/image.png)

package.json の `"types"` フィールドを `"index.d.ts"` に設定することで、モジュールが TypeScript をサポートしていることを示すことができます！ :)

```json
{
  "types": "index.d.ts"
}
```

---

# npm ページとのリポジトリ連携

![](https://i.imgur.com/UlhhJWQ.png)

package.json の `"repository"` フィールドを以下のように設定することで、リポジトリと連携できます。

```json
"repository": {
  "type": "git",
  "url": "repositoryURL"
}
```