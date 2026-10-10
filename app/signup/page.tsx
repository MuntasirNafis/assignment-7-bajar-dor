"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/signin");
  };

  return (
    <div className="max-w-md mx-auto my-16 bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">অ্যাকাউন্ট তৈরি করুন</h2>
      <p className="text-xs text-center text-gray-500 mb-6">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার পূর্ণ নাম"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-emerald-600"
            required
          />
        </div>
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
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-emerald-600"
            required
          />
        </div>
        <button type="submit" className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition cursor-pointer">
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="text-emerald-600 font-medium hover:underline">সাইন ইন করুন</Link>
        </p>
      </div>
    </div>
  );
}