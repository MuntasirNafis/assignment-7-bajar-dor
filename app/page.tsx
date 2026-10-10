"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-20 text-center font-medium text-gray-500">লোড হচ্ছে...</div>;
  }

  const risers = products.filter((p: any) => p.change?.dir === "up").slice(0, 6);
  const fallers = products.filter((p: any) => p.change?.dir === "down").slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <section className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6 md:p-8 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="max-w-xl">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full mb-3">
            শনিবার, ১০ অক্টোবর, ২০২৬
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">আজকের বাজারের দাম এক নজরে</h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#all-products" className="inline-block bg-emerald-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition shadow-sm">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="w-48 md:w-64 flex-shrink-0">
          <Image src="/bazar-hero.png" alt="Bazar Hero" width={250} height={200} className="w-full h-auto object-contain" priority />
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-1.5">
          ▲ আজ দাম বেড়েছে
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {risers.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-bold text-emerald-600 mb-4 flex items-center gap-1.5">
          ▼ আজ দাম কমেছে
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {fallers.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section id="all-products">
        <h3 className="text-xl font-bold text-gray-900 mb-1">সব পণ্য</h3>
        <p className="text-xs text-gray-500 mb-4">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
    >
      <div>
        <div className="text-3xl mb-2">{product.image}</div>
        <h4 className="font-semibold text-gray-800">{product.nameBn}</h4>
        <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <div>
          <span className="text-xs text-gray-400 block">আজকের দাম</span>
          <span className="font-bold text-gray-900">{product.today} টাকা</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${product.change?.dir === 'up' ? 'text-red-600 bg-red-50' : product.change?.dir === 'down' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 bg-gray-100'}`}>
          {product.change?.dir === 'up' ? `▲ ${product.change?.pct}%` : product.change?.dir === 'down' ? `▼ ${Math.abs(product.change?.pct)}%` : `— ${product.change?.pct}%`}
        </span>
      </div>
    </Link>
  );
}