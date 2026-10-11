"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    // Save mock user & token for client session
    const user = { name, email };
    localStorage.setItem("auth_token", "demo_token_123");
    localStorage.setItem("user_data", JSON.stringify(user));

    router.push("/profile");
  };

  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12 bg-gray-50/50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-xs text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="text-xs text-gray-500 mb-6">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">নাম</label>
            <input
              type="text"
              required
              placeholder="যেমন: রহিম উদ্দিন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-emerald-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">ইমেইল</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-emerald-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-emerald-500 bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-xs mt-2"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <span className="relative bg-white px-3 text-xs text-gray-400">অথবা</span>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium py-2 rounded-lg transition"
          >
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium py-2 rounded-lg transition"
          >
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-emerald-600 font-medium hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-xs text-gray-400 hover:text-gray-600 transition">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}