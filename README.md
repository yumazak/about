# Portfolio

[yumazak](https://github.com/yumazak) のポートフォリオサイト。1ページの静的な Markdown 風サイトです。

## Stack

- [Astro](https://astro.build/) — 静的サイト生成
- TypeScript
- pnpm / oxlint / oxfmt

## Setup

```bash
pnpm install
pnpm dev
```

Node のバージョンは `.node-version`（24.22.1）に合わせてください。

## Scripts

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `pnpm dev`          | 開発サーバーを起動              |
| `pnpm build`        | `dist/` に静的サイトを生成      |
| `pnpm preview`      | ビルド結果をプレビュー          |
| `pnpm check`        | Astro / TypeScript の型チェック |
| `pnpm lint`         | oxlint で lint                  |
| `pnpm lint:fix`     | oxlint で自動修正               |
| `pnpm format`       | oxfmt で整形                    |
| `pnpm format:check` | 整形差分を確認                  |

## Structure

```text
src/
  data/career.ts    # 職歴・スキル
  layouts/          # 共通レイアウト
  pages/index.astro # すべてのセクションを1ページに集約
  styles/global.css # 最小限のタイポグラフィ
public/             # favicon など
```

## Content

- 職歴・スキルを更新する: `src/data/career.ts`

職歴の詳細は private リポジトリの `assistant` を正とし、公開可能な範囲だけをこのリポジトリに反映する。

## Deploy

公開 URL: **https://yumazak.github.io/about/**

`main` ブランチへの push で GitHub Pages にデプロイします（`.github/workflows/deploy.yml`）。

- 初回のみ GitHub の Settings → Pages → Source で **GitHub Actions** を選択
- base path は `actions/configure-pages` の `base_path` から自動設定される
- ローカルの `pnpm build` は base `/` で出力される
- Build command: `pnpm build`
- Output: `dist`
- Node: `.node-version`（24.22.1）
