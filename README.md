# authas-proto

Google OAuth 自前実装の学習用リポジトリ。  
Supabase Auth を使った auth-app に作り直す前の実装確認用。

## 技術スタック

- Next.js / TypeScript / Tailwind CSS
- Prisma 7 + PostgreSQL（Docker）
- bcryptjs（パスワードハッシュ化）
- jsonwebtoken（JWT認証）
- Google OAuth 2.0（自前実装）

## 機能

- 新規登録（メール・パスワード）
- ログイン（メール・パスワード）
- ログイン（Google OAuth）
- ログアウト
- 認証状態確認（/api/auth/me）

## ローカル環境構築

### 前提

- Node.js 22.x（.nvmrc）
- Docker（Rancher Desktop）

### セットアップ

1. リポジトリをクローン

```bash
   git clone https://github.com/atsmile/authas-proto.git
   cd authas-proto
```

2. パッケージインストール

```bash
   npm install
```

3. 環境変数を設定

   `.env` と `.env.local` を作成して以下を設定：

```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/authas_proto"
   JWT_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. PostgreSQL を起動

```bash
   docker compose up -d
```

5. マイグレーション実行

```bash
   npx prisma migrate dev
```

6. 開発サーバー起動

```bash
   npm run dev
```

## API

| メソッド | パス | 説明 |
|---|---|---|
| POST | /api/auth/register | 新規登録 |
| POST | /api/auth/login | ログイン |
| GET | /api/auth/me | 認証状態確認 |
| POST | /api/auth/logout | ログアウト |
| GET | /api/auth/google | Google認証開始 |
| GET | /api/auth/callback/google | Googleコールバック |
