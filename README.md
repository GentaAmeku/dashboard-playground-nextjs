# 📊 Dashboard Playground

このプロジェクトは、Next.js の機能を試す、プレイグラウンド用のダッシュボードです。

## ✨ 主な機能

- 📈 タスク統計情報の表示（総数、ステータス別、優先度別、完了率）
- ✏️ タスクの作成、編集、削除
- 🔍 タスクの検索とフィルタリング

## ショーケース
https://github.com/user-attachments/assets/8913f6a4-5766-44fd-b5e2-3e2d35e1465f

## 🛠️ 技術スタック

### フロントエンド

- **Next.js 16** - React フレームワーク（App Router）
- **React 19** - UI ライブラリ
- **TypeScript** - 型安全性
- **Tailwind CSS 4** - スタイリング
- **shadcn/ui** - UI コンポーネントライブラリ
- **Radix UI** - アクセシブルなUIプリミティブ

### バックエンド・データベース

- **Drizzle ORM** - 型安全なORM
- **SQLite (better-sqlite3)** - データベース
- **Zod** - スキーマバリデーション

### 状態管理・フォーム

- **Zustand** - クライアント状態管理
- **React Hook Form** - フォーム管理
- **nuqs** - URL状態管理（クエリパラメータ）

### 開発ツール

- **Biome** - リンター・フォーマッター
- **Drizzle Kit** - データベースマイグレーション
- **Lefthook** - Git フック管理
- **tsx** - TypeScript実行環境

## 🚀 セットアップ手順

### 前提条件

- **Node.js** 24.11.1
- **pnpm**（推奨）またはnpm/yarn/bun

### 1️⃣ 依存関係のインストール

```bash
pnpm install
```

> **⚠️ 重要: better-sqlite3 のセットアップ**
> 
> better-sqlite3 はネイティブモジュール（C++バインディング）を含むため、インストール後に追加のセットアップが必要です。
> 
> **pnpm を使用している場合**
> 
> 以下のコマンドを実行：
> 
> ```bash
> pnpm rebuild better-sqlite3
> ```
> 
> **npm/yarn/bun を使用している場合**
> 
> 追加のセットアップは不要です。
> 
> **トラブルシューティング**
> 
> `db:push` や `db:migrate` 実行時に以下のようなエラーが出る場合：
> ```
> Error: Could not locate the bindings file
> ```
> 
> 以下を実行してください：
> ```bash
> # node_modulesとロックファイルを削除
> rm -rf node_modules pnpm-lock.yaml
> 
> # 再インストール
> pnpm install
> 
> # better-sqlite3をリビルド
> pnpm rebuild better-sqlite3
> ```

### 2️⃣ データベースのセットアップ

#### 💻 Cursorを使用している場合

Cursorを使用している場合は、カスタムコマンドを利用できます：

`/db-setup` を指定すると、データベースのマイグレーションとシードデータの投入を自動的に実行します。詳細は [`.cursor/commands/db-setup.md`](.cursor/commands/db-setup.md) を参照してください。
データベースの再セットアップも可能です。

#### 🔧 手動でセットアップする場合

**方法A: `db:push`を使用（開発環境推奨）**

```bash
# 既存データベースをリセットする場合（オプション）
rm -f local.db local.db-shm local.db-wal

# データベースの作成とシードデータの投入
pnpm db:push && pnpm db:seed
```

**方法B: `db:migrate`を使用（本番環境向け）**

```bash
# 既存データベースをリセットする場合（オプション）
rm -f local.db local.db-shm local.db-wal

# マイグレーションファイルの生成、マイグレーション実行、シードデータの投入
pnpm db:generate && pnpm db:migrate && pnpm db:seed
```

### 3️⃣ 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 📝 利用可能なスクリプト

- `pnpm dev` - 🚀 開発サーバーを起動
- `pnpm build` - 📦 本番用ビルド
- `pnpm start` - ▶️ 本番サーバーを起動
- `pnpm lint` - 🔍 リンターを実行
- `pnpm format` - ✨ コードをフォーマット
- `pnpm db:push` - 🗄️ スキーマから直接データベースを更新（開発環境推奨）
- `pnpm db:generate` - 📄 マイグレーションファイルを生成
- `pnpm db:migrate` - 🔄 マイグレーションを実行
- `pnpm db:seed` - 🌱 シードデータを投入
- `pnpm db:studio` - 🎨 Drizzle Studioを起動（データベースGUI）

## 📁 プロジェクト構造

```
dashboard-playground-nextjs/
├── app/                    # Next.js App Router
│   ├── actions/           # Server Actions
│   ├── components/         # アプリケーションコンポーネント
│   ├── tasks/             # タスク関連のページとコンポーネント
│   └── page.tsx           # ホームページ（ダッシュボード）
├── components/
│   └── ui/                # shadcn/uiコンポーネント
├── lib/
│   ├── db/                # データベース関連
│   │   ├── schema.ts      # Drizzleスキーマ
│   │   ├── repositories/ # リポジトリパターン
│   │   └── services/      # ビジネスロジック
│   ├── validation/        # Zodバリデーションスキーマ
│   └── utils.ts           # ユーティリティ関数
├── drizzle/               # マイグレーションファイル
└── scripts/               # スクリプト（シードなど）
```

## 🔧 よくある問題と解決方法

### better-sqlite3 関連のエラー

**問題**: `Could not locate the bindings file` エラー

**解決方法**:
```bash
pnpm rebuild better-sqlite3
```

**問題**: データベースコマンドが動作しない

**解決方法**:
1. `.npmrc` に `node-linker=hoisted` が設定されているか確認
2. `pnpm install` を再実行
3. `pnpm rebuild better-sqlite3` を実行

### パッケージマネージャーの変更

pnpm から npm/yarn に変更する場合：

```bash
# pnpmの痕跡を削除
rm -rf node_modules pnpm-lock.yaml .npmrc

# 新しいパッケージマネージャーで再インストール
npm install
# または
yarn install
```