import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // ユーザー検索
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return NextResponse.json(
      { error: "メールアドレスまたはパスワードが正しくありません" },
      { status: 401 },
    );
  }

  // パスワード照合
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json(
      { error: "メールアドレスまたはパスワードが正しくありません" },
      { status: 401 },
    );
  }

  // JWTを発行してCookieにセット
  const token = signToken({ id: user.id, email: user.email });
  const res = NextResponse.json({ id: user.id, email: user.email });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7日
    path: "/",
  });

  return res;
}
