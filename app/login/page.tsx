"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      window.location.href = "/letters";
      return;
    }

    setError("That password isn't quite right. Try again 💗");
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7fb] px-6 text-[#4a3040]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-[2.5rem] border border-pink-100 bg-white/90 p-8 text-center shadow-[0_20px_70px_rgba(236,72,153,0.12)] md:p-12">
        <div className="mb-6 text-5xl">💌</div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-pink-400">
          Just for you
        </p>

        <h1 className="text-4xl font-bold">
          Your letters<span className="text-pink-400">♡</span>
        </h1>

        <p className="mx-auto mt-4 max-w-sm leading-7 text-[#806575]">
          A little collection of words, memories and love from the people
          who mean the most to you.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label
            htmlFor="password"
            className="mb-2 block text-left text-sm font-semibold"
          >
            Enter your password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your secret password"
            className="w-full rounded-2xl border border-pink-100 bg-pink-50/50 px-5 py-4 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            required
          />

          {error && (
            <p className="mt-3 text-sm text-pink-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full bg-[#f472b6] px-6 py-4 font-semibold text-white transition hover:bg-[#ec4899] disabled:opacity-60"
          >
            {loading ? "Opening..." : "Open your letters 💗"}
          </button>
        </form>

        <div className="mt-8 text-xl">🎀 ♡ ✨ ♡ 🎀</div>
      </div>
    </main>
  );
}