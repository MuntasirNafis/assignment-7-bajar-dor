"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("https://api.abcz.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => setTickerData(data));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          {/* Standard img tag to ensure logo renders instantly */}
          <img src="/logo-icon.png" alt="Bazar Dor Logo" className="w-8 h-8 object-contain" />
          <div>
            <h1 className="font-bold text-lg text-emerald-800">বাজার দর</h1>
            <p className="text-xs text-gray-500">শনিবার, ১০ অক্টোবর, ২০২৬</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/signin" className="px-4 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 rounded-md transition">
            সাইন ইন
          </Link>
          <Link href="/signup" className="px-4 py-1.5 text-sm font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
            সাইন আপ
          </Link>
        </div>
      </div>

      <nav className="max-w-6xl mx-auto px-4 py-2 flex gap-6 overflow-x-auto text-sm font-medium text-gray-700">
        <Link href="/" className="hover:text-emerald-600 whitespace-nowrap">
          হোম
        </Link>
        {categories.map((cat: any) => (
          <Link
            key={cat.id || cat.slug}
            href={`/category/${cat.slug}`}
            className="hover:text-emerald-600 whitespace-nowrap"
          >
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