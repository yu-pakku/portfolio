# yuma's portfolio

UFOキャッチャーで作品を集める、ゲーム型のポートフォリオサイトです。

タイトル画面のメインメニューから各モードへ進みます。メニューは目次を兼ねているので、遊ばなくても目的の情報へ直接移動できます。

| パス                 | 画面             | 内容                                               |
| -------------------- | ---------------- | -------------------------------------------------- |
| `/`                  | タイトル画面     | 起動画面とメインメニュー                           |
| `/play`              | UFOキャッチャー  | 景品として作品を獲得する（選んだ景品は必ず取れる） |
| `/collection`        | コレクション図鑑 | 全作品の一覧                                       |
| `/collection/[slug]` | 作品詳細         | 課題・役割・技術・工夫・学び                       |
| `/character`         | キャラクター     | 自己紹介とスキル                                   |
| `/credits`           | スタッフロール   | 連絡先                                             |

## 技術スタック

- Next.js 16（App Router）／React 19／TypeScript（strict）
- Tailwind CSS 4
- Motion（アニメーション）
- ESLint／Prettier
- GitHub Actions（CI）／Vercel（ホスティング）

## 開発

Node.js 22 を推奨します（`.nvmrc` 参照）。

```bash
npm ci
npm run dev
```

http://localhost:3000 を開きます。

| コマンド               | 内容                                      |
| ---------------------- | ----------------------------------------- |
| `npm run lint`         | ESLint（警告も失敗扱い）                  |
| `npm run format`       | Prettier で整形                           |
| `npm run format:check` | 整形漏れの確認                            |
| `npm run typecheck`    | ルート型の生成と型チェック                |
| `npm run build`        | 本番ビルド                                |
| `npm run check`        | 上記の確認をまとめて実行（CI と同じ内容） |

## 作品の追加

1. `public/works/` に画像（16:9）を置く
2. `src/data/works.ts` の配列に1件追加する

作品詳細ページは、ビルド時に作品の数だけ自動で生成されます。

## ディレクトリ構成

```
src/
├─ app/            # ページ（App Router）
├─ components/
│  ├─ game/        # 画面の枠・メニューなどゲームUI
│  └─ works/       # 作品カード
├─ data/           # 作品・プロフィール・スキルのデータ
└─ types/          # 型定義
```

## ライセンス

ソースコードは [MIT License](./LICENSE) です。

`public/works/` の画像、作品紹介の文章などのコンテンツの著作権は作者が保持しており、MIT License の対象外です。
