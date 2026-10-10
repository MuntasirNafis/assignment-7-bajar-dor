"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/signin");
      return;
    }

    fetch("https://api.abcz.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: any) => p.slug === slug || String(p.id) === String(slug)) || data[0];
        setProduct(found);
        setLoading(false);
      });
  }, [slug, router]);

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-500 font-medium">লোড হচ্ছে...</div>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <div className="text-4xl mb-2">{product?.image}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{product?.nameBn}</h2>
          <p className="text-xs text-gray-500 mb-3">প্রতি {product?.unit}</p>
          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium">
            {product?.categoryNameBn}
          </span>
        </div>
        <div className="text-right bg-emerald-50 border border-emerald-100 p-4 rounded-xl w-full md:w-auto">
          <span className="text-xs text-gray-500 block">আজকের গড় দাম</span>
          <span className="text-2xl font-bold text-emerald-700">{product?.today} টাকা</span>
          <span className={`text-xs block mt-1 font-medium ${product?.change?.dir === 'up' ? 'text-red-600' : 'text-emerald-600'}`}>
            {product?.change?.dir === "up" ? `▲ ${product?.change?.pct}%` : `▼ ${Math.abs(product?.change?.pct)}%`}
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-800">
          বাজারভিত্তিক আজকের দাম
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="p-3">বাজার</th>
                <th className="p-3">বিভাগ</th>
                <th className="p-3">সর্বনিম্ন</th>
                <th className="p-3">সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {product?.markets?.map((m: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{m.market}</td>
                  <td className="p-3 text-gray-500">{m.division}</td>
                  <td className="p-3 text-gray-700">{m.min} টাকা</td>
                  <td className="p-3 text-gray-700">{m.max} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}