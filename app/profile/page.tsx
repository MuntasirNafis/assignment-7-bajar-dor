"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string }>({ name: "Rezwan Ahmed", email: "rezwanahmed@gmail.com" });
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/signin");
      return;
    }

    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setNameInput(parsed.name || "");
    }
  }, [router]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...user, name: nameInput };
    setUser(updated);
    localStorage.setItem("user_data", JSON.stringify(updated));
    alert("নাম সফলভাবে আপডেট করা হয়েছে!");
  };

  const handleSignOut = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    router.push("/signin");
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">আমার প্রোফাইল</h2>
      <p className="text-xs text-gray-500 mb-6">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-xl font-bold text-emerald-800">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="px-4 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium rounded-lg transition"
        >
          সাইন আউট
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
        <h4 className="font-semibold text-gray-800 text-sm mb-4">তথ্য</h4>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">নাম</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-emerald-500 bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-xs"
          >
            আপডেট
          </button>
        </form>
      </div>
    </main>
  );
}