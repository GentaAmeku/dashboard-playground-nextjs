# 📊 Dashboard Playground

このプロジェクトは、Next.js の機能を試す、プレイグラウンド用のダッシュボードです。

## ✨ 主な機能

- 🔐 Google アカウントによる認証（未ログイン時はログイン画面へリダイレクト）
- 📈 タスク統計情報の表示（総数、ステータス別、優先度別、完了率）
- ✏️ タスクの作成、編集、削除
- 🔍 タスクの検索とフィルタリング

## 📷 ショーケース

https://github.com/user-attachments/assets/6cddd292-cd2a-4ae4-9db5-8210b4bd98f7

## 🛠️ 技術スタック

### フロントエンド

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui**

### 認証

- **Better Auth** - Google OAuth 認証・セッション管理

### バックエンド・データベース

- **Drizzle ORM** - ORM
- **SQLite (better-sqlite3)** - データベース
- **Zod** - バリデーション

### 状態管理・フォーム

- **Zustand** - クライアント状態管理
- **React Hook Form** - フォーム管理
- **nuqs** - URL状態管理（クエリパラメータ）

### 開発ツール

- **Biome** - リンター・フォーマッター
- **Drizzle Kit** - データベースマイグレーション
- **Lefthook** - Git フック管理

## 🚀 セットアップ手順

### 前提条件

- **Node.js** 24.11.1
- **pnpm**（推奨）またはnpm/yarn/bun
- **Google Cloud Console** のアカウント（OAuth クライアント作成に必要）

### 1️⃣ 依存関係のインストール

```bash
pnpm install
```

### 2️⃣ 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、各値を設定します。

```bash
cp .env.example .env.local
```

| 変数名 | 説明 |
|---|---|
| `BETTER_AUTH_SECRET` | セッション署名用シークレット（`openssl rand -base64 32` で生成） |
| `BETTER_AUTH_URL` | アプリの URL（開発環境: `http://localhost:3000`） |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | クライアントから参照する URL（同上） |
| `GOOGLE_CLIENT_ID` | Google Cloud Console で発行した Client ID |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console で発行した Client Secret |

#### Google Cloud Console の設定

1. [Google Cloud Console](https://console.cloud.google.com/) で OAuth 2.0 クライアント ID を作成
2. **承認済みのリダイレクト URI** に以下を追加:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
3. 発行された Client ID / Client Secret を `.env.local` に貼り付け

### 3️⃣ データベースのセットアップ

#### 💻 Claude Code / Cursor を使用している場合

カスタムコマンドが利用できます：

- `/init` — Node.js・pnpm の確認、依存関係のインストールまで自動実行
- `/db-setup` — データベースのセットアップ（`pnpm db:push` + `pnpm db:seed`）を自動実行
- `/db-setup reset` — データベースをリセットして再セットアップ

#### 🔧 手動でセットアップする場合

**方法A: `db:push` を使用（開発環境推奨）**

```bash
# 既存データベースをリセットする場合（初回は不要）
rm -f local.db local.db-shm local.db-wal

# データベースの作成とシードデータの投入
pnpm db:push && pnpm db:seed
```

**方法B: `db:migrate` を使用（本番環境向け）**

```bash
# 既存データベースをリセットする場合（オプション）
rm -f local.db local.db-shm local.db-wal

# マイグレーションファイルの生成、マイグレーション実行、シードデータの投入
pnpm db:generate && pnpm db:migrate && pnpm db:seed
```

### 4️⃣ 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、ログイン画面が表示されます。

## 🧪 テスト

```bash
# 単体テスト（CLI）
pnpm test

# 単体テスト（UI）
pnpm run test:ui
```

## 📝 利用可能なスクリプト

- `pnpm dev` - 🚀 開発サーバーを起動
- `pnpm build` - 📦 本番用ビルド
- `pnpm start` - ▶️ 本番サーバーを起動
- `pnpm lint` - 🔍 リンターを実行
- `pnpm test` - 🧪 単体テストを実行（CLI）
- `pnpm run test:ui` - 🧪 単体テストを実行（UI）
- `pnpm format` - ✨ コードをフォーマット
- `pnpm db:push` - 🗄️ スキーマから直接データベースを更新（開発環境推奨）
- `pnpm db:generate` - 📄 マイグレーションファイルを生成
- `pnpm db:migrate` - 🔄 マイグレーションを実行
- `pnpm db:seed` - 🌱 シードデータを投入
- `pnpm db:studio` - 🎨 Drizzle Studio を起動（データベース GUI）

## 📁 プロジェクト構造

```
dashboard-playground-nextjs/
├── app/
│   ├── (authed)/              # 認証必須ルート
│   │   ├── layout.tsx         # 認証チェック + サイドバー/ヘッダー
│   │   ├── page.tsx           # ホームページ（ダッシュボード）
│   │   ├── components/        # 認証済みページ用コンポーネント
│   │   │   ├── AppHeader/
│   │   │   ├── AppSidebar/    # ユーザー情報・ログアウトボタン含む
│   │   │   ├── PageContainer/
│   │   │   └── TaskStatistics/
│   │   └── tasks/             # タスク関連ページとコンポーネント
│   ├── actions/               # Server Actions
│   ├── api/auth/[...all]/     # Better Auth ハンドラ
│   ├── login/                 # ログインページ
│   └── layout.tsx             # ルートレイアウト（html/body のみ）
├── components/
│   └── ui/                    # shadcn/ui コンポーネント
├── lib/
│   ├── auth.ts                # Better Auth サーバー設定
│   ├── auth-client.ts         # Better Auth クライアント設定
│   ├── db/                    # データベース関連
│   │   ├── schema.ts          # Drizzle スキーマ（tasks + auth テーブル）
│   │   ├── repositories/      # リポジトリパターン
│   │   └── services/          # ビジネスロジック
│   ├── validation/            # Zod バリデーションスキーマ
│   └── utils.ts               # ユーティリティ関数
├── proxy.ts                   # ルート保護（未認証時に /login へリダイレクト）
├── drizzle/                   # マイグレーションファイル
└── scripts/                   # スクリプト（シードなど）
```
