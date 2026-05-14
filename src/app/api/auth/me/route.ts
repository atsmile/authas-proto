import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "ログインしていません" },
      { status: 401 },
    );
  }

  try {
    const payload = verifyToken(token);
    return NextResponse.json({ id: payload.id, email: payload.email });
  } catch {
    return NextResponse.json({ error: "トークンが無効です" }, { status: 401 });
  }
}
