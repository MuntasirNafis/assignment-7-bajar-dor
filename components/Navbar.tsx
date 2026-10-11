"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [tickerData, setTickerData] = useState([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const checkUser = () => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user_data");
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("https://api.abcz.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => setTickerData(data));

    checkUser();

    // Listen to custom auth events and storage changes
    window.addEventListener("authChange", checkUser);
    window.addEventListener("storage", checkUser);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("authChange", checkUser);
      window.removeEventListener("storage", checkUser);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
    setDropdownOpen(false);
    window.dispatchEvent(new Event("authChange"));
    router.push("/signin");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="Logo" className="w-8 h-8 object-contain" />
          <div>
            <h1 className="font-bold text-lg text-emerald-800">বাজার দর</h1>
            <p className="text-xs text-gray-500">রবিবার, ১১ অক্টোবর, ২০২৬</p>
          </div>
        </Link>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 bg-emerald-50 hover:bg-emerald-100/60 border border-emerald-100 px-3 py-1.5 rounded-full transition cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold uppercase shadow-xs">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
              <span className="text-xs font-semibold text-gray-800 pr-1">{user.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-gray-400 truncate">{user.email}</p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition"
                >
                  👤 আমার প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium transition border-t border-gray-50 mt-1 cursor-pointer"
                >
                  🚪 সাইন আউট
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/signin" className="px-4 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 rounded-md transition">
              সাইন ইন
            </Link>
            <Link href="/signup" className="px-4 py-1.5 text-sm font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <nav className="max-w-6xl mx-auto px-4 py-2 flex gap-6 overflow-x-auto text-sm font-medium text-gray-700">
        <Link href="/" className="hover:text-emerald-600 whitespace-nowrap">
          হোম
        </Link>
        {categories.map((cat: any) => (
          <Link key={cat.id || cat.slug} href={`/category/${cat.slug}`} className="hover:text-emerald-600 whitespace-nowrap">
            {cat.icon} {cat.nameBn}
          </Link>
        ))}
      </nav>

      <div className="bg-emerald-50 border-y border-emerald-100 py-1.5 overflow-hidden whitespace-nowrap flex">
        <div className="animate-marquee flex gap-8 text-xs text-gray-700 items-center">
          {tickerData.map((item: any, idx) => (
            <span key={idx} className="flex items-center gap-1">
              <span>{item.image}</span>
              <span>{item.nameBn}</span>
              <span className="font-semibold">{item.today} টাকা/{item.unit}</span>
              <span className={item.change?.dir === "up" ? "text-red-600 font-medium" : item.change?.dir === "down" ? "text-emerald-600 font-medium" : "text-gray-500"}>
                {item.change?.dir === "up" ? `▲ ${item.change?.pct}%` : item.change?.dir === "down" ? `▼ ${Math.abs(item.change?.pct)}%` : `— ${item.change?.pct}%`}
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}