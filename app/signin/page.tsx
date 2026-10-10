"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("auth_token", "logged_in");
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto my-16 bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">সাইন ইন</h2>
      <p className="text-xs text-center text-gray-500 mb-6">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্ট খুলুন।</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">ইমেইল</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-emerald-600"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="পাসওয়ার্ড দিন"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-emerald-600"
            required
          />
        </div>
        <button type="submit" className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition cursor-pointer">
          সাইন ইন
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="text-emerald-600 font-medium hover:underline">সাইন আপ করুন</Link>
        </p>
      </div>
    </div>
  );
}