import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // 既存ユーザーチェック
  const existing = await prisma.user.findUnique({
    where: { email },
  });
  if (existing) {
    return NextResponse.json(
      { error: "このメールアドレスはすでに登録されています" },
      { status: 400 },
    );
  }

  // パスワードのハッシュ化
  const hashed = await bcrypt.hash(password, 10);

  // ユーザー作成
  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return NextResponse.json({ id: user.id, email: user.email });
}
