"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.email) setUser(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      {user ? (
        <>
          <p>{user.email} でログイン中</p>
          <button onClick={handleLogout}>ログアウト</button>
        </>
      ) : (
        <>
          <p>ログインしていません</p>
          <a href="/login">ログイン</a>
          <a href="/register">新規登録</a>
        </>
      )}
    </div>
  );
}
