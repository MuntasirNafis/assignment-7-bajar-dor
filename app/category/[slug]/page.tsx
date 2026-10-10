"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.today - b.today;
    if (sortOrder === "high-to-low") return b.today - a.today;
    return 0;
  });

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-20 text-center font-medium text-gray-500">লোড হচ্ছে...</div>;
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো তথ্য নেই।</p>
        <Link href="/" className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-emerald-50 p-6 rounded-2xl gap-4 border border-emerald-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span>{sortedProducts[0]?.categoryIcon}</span>
            <span>{sortedProducts[0]?.categoryNameBn}</span>
          </h2>
          <p className="text-xs text-gray-600 mt-1">প্রতিদিনের বাজার দর এক নজরে</p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm">
          <span className="text-xs text-gray-500 font-medium">সাজান:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-sm bg-transparent focus:outline-none cursor-pointer text-gray-700"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
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
        ))}
      </div>
    </main>
  );
}