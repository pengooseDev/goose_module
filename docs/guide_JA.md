<div align="center">

# 📚 Docs
| npm : | [KO](./npm_KO.md) \| [EN](./npm_EN.md) \| [JA](./npm_JA.md)|
|:--:|:--:|
| Creation guide: | [KO](./guide_KO.md) \| [EN](./guide_EN.md) \| **JA** |

</div>

# モジュール開発ガイド

モジュール開発を始めるとなると、何から手を付ければ良いのか途方に暮れてしまいますか？ 😨  
または、新たな視点を取り入れてさらに成長したいと感じていますか？  
そんな時は、以下のドキュメントを参考にしてください！ 🥳

# 1. アイデアの採用

「モジュール開発」と聞くと、いきなり素晴らしいものを作らなければならないと思ったり、何らかの不安を感じたりするかもしれません。

実際、私たちはすでに数多くのモジュールを開発しています！  
コンポーネント、定数、型、インターフェース、関数、オブジェクトなど、よく使うコードを export で再利用可能にすること自体が、実はモジュール開発なのです :)

そこに「デプロイ」というプロセスを加えるだけで、どのプロジェクトでも誰でも簡単に使えるようになるので、恐れる必要はありません！

`以下はアイデアを得るためのヒントと、モジュールの例です！`

## Tip
### **[@toss/utils](https://slash.page/ko/libraries/common/utils/src/Numbers_floorAndFormatNumber.i18n)**
Tossが提供する様々な便利ライブラリ！
### [@pengoose/pinterest](https://www.npmjs.com/package/@pengoose/pinterest)
PinterestのAPIを活用した画像検索モジュール！

- 日常的に使っているカスタムフックやユーティリティコード、そして以下で紹介する様々な例は、すべて素晴らしいモジュールになり得ます。
- 現在使っている技術やAPIを見直し、どのようにさらに高め、どんな問題を解決できるかを考えてみてください。
- 開発中に繰り返し遭遇する問題について考えてみましょう！ 例えば、redux-thunkモジュールは毎週400〜500万ダウンロードを記録しています。

<br/>
<br/>

# 2. 仕様書の作成

アイデアが固まったら、そのアイデアを具体化する番です。仕様書を作成して、プロジェクトの目標や実装する機能を明確に定義することで、効率的かつ効果的に開発を進めることができます。 :)

<br/>
<br/>
``` 
- [ ] Pinterest オブジェクトは `id` と `boardIds` を持つ。
- [ ] `getBoards()` はすべてのボードを返す。
- [ ] `getAllPins()` はすべてのボードが持つピンデータを1つの配列として返す。
  - [ ] `shuffle` オプションを受け取り、画像の順序をランダムに並べ替えることができる。
```
<br/>

> 上記は `@pengoose/pinterest` モジュールの仕様書例です！ 仕様書を初めて作成する場合、あまり詳細に書きすぎるのではなく、実装を進めながら仕様書を改善していくことをお勧めします。 :)

<br/>
<br/>

# 3. 実装
```ts
import { Pin, Boards } from './pinterest.type';
import { shuffle as shufflePins } from './utils';

interface PinterestProps {
  id: string;
  boardIds: string[];
}

export class Pinterest {
  private id: string;
  private boardIds: string[];

  constructor({ id, boardIds }: PinterestProps) {
    this.id = id;
    this.boardIds = boardIds;
  }

  public async getBoards(): Promise<Boards> {
    const requests = this.boardIds.map((boardId) => this.getBoard({ id: this.id, boardId }));
    const result = await Promise.allSettled(requests);

    return this.boardIds.reduce((acc, boardId, index) => {
      const res = result[index];
      if (res.status === 'fulfilled') {
        acc[boardId] = res.value.pins;
      }
      return acc;
    }, {} as Boards);
  }

  public async getAllPins({ shuffle }: { shuffle?: boolean } = {}): Promise<Pin[]> {
    const boards = await this.getBoards();
    const pins = Object.values(boards).flat();

    if (shuffle) {
      return shufflePins(pins);
    }

    return pins;
  }
  // ...codes
```
<br/>
<br/>

# 4. 依存モジュールの最小化

モジュール開発において、`依存モジュールを最小化`することは非常に重要な要素です。その理由は以下の通りです。

1. **保守の難易度の増加**  
   依存モジュールが多くなるほど、ライブラリやパッケージのアップデートに追従し、バージョン管理を行うのが難しくなります。アップデート時にサブパッケージのバージョン問題が発生すると、コードのリファクタリングが追加で必要になります！

2. **セキュリティ問題の発生可能性の増加**  
   特定のライブラリでセキュリティ問題が発生し、GitHubから警告メールを受け取った経験があるかもしれません。 😨 依存モジュールはそれぞれ潜在的なセキュリティ脆弱性を持つため、依存モジュールが多いほどセキュリティ問題が発生する可能性が高まります！

3. **バンドルサイズの増加**  
   依存モジュールが増えると、バンドルサイズも大きくなり、ウェブアプリケーションの初回ロードやビルド速度に悪影響を及ぼします！

4. **非効率なツリーシェイキング**  
   最新のビルドツールは依存モジュールから使われていないコードを除去します。しかし、依存モジュールがツリーシェイキングに適していない場合、不要なコードがバンドルに含まれ、バンドルサイズに悪影響を及ぼす可能性があります！

5. **互換性**  
   依存性を最小限に抑えたモジュールは、様々な開発環境やプロジェクトに容易に適用できます。