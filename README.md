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
  layouts/          # 共通レイアウト
  pages/index.astro # 名前・Ask AI ドロップダウン・Links
  styles/global.css # 最小限のタイポグラフィ
public/
  about.md        # AI 向けの詳細プロフィール
  llms.txt          # llms.txt 形式の入口
                      # favicon など
```

## AI

- `public/about.md` が AI エージェント向けの詳細プロフィール（HTML ページは名前とリンクのみ）
- `public/llms.txt` から `about.md` を参照
- Ask AI は `https://yumazak.dev/about.md` を読むプロンプトで各サービスを開く
- `<link rel="alternate" type="text/plain">` でも about.md を公開
- Cloudflare Pages の `_headers` で about.md を `text/plain` 配信

## Content

- AI 向けの詳細情報を更新する: `public/about.md`
- トップページの表示を更新する: `src/pages/index.astro`

職歴の詳細は private リポジトリの `assistant` を正とし、公開可能な範囲だけをこのリポジトリに反映する。

## Deploy

公開 URL: **https://yumazak.dev/**

Cloudflare Pages の `about` プロジェクト（GitHub `yumazak/about` 連携）で配信します。

- Build command: `pnpm build`
- Output: `dist`
- Node: `.node-version`（24.22.1）
- カスタムドメイン: `yumazak.dev`
- CLI: `cf pages list` / `cf pages deployments list --project-name about`
