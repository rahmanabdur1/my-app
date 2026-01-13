"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "use-debounce"; 

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  created_at: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  const search = searchParams.get("search") || "";
  const cat = searchParams.get("cat") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 4; 

  const [debouncedSearch] = useDebounce(search, 500); 

  const updateURL = (newFilters: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
      else params.delete(key);
    });
    if (!newFilters.page) params.set("page", "1"); 
    router.replace(`/products?${params.toString()}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" });

      if (debouncedSearch) query = query.ilike("title", `%${debouncedSearch}%`);
      if (cat) query = query.eq("category", cat);

      if (sort === "price_asc") query = query.order("price", { ascending: true });
      else if (sort === "price_desc") query = query.order("price", { ascending: false });
      else query = query.order("created_at", { ascending: false });

      const { data, error, count } = await query.range(from, to);

      if (!error) {
        setProducts(data || []);
        setTotalCount(count || 0);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [debouncedSearch, cat, sort, page]);

  return (
    <div className="p-6 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6">Store Products</h1>

      <div className="flex flex-wrap gap-4 mb-8 bg-gray-100 p-4 rounded-lg">
        <input
          placeholder="Search..."
          className="border p-2 rounded flex-1"
          defaultValue={search}
          onChange={(e) => updateURL({ search: e.target.value })}
        />
        <select className="border p-2 rounded" value={cat} onChange={(e) => updateURL({ cat: e.target.value })}>
          <option value="">All Categories</option>
          <option value="tshirt">T-shirt</option>
          <option value="hoodie">Hoodie</option>
          <option value="jogger">Jogger</option>
        </select>
        <select className="border p-2 rounded" value={sort} onChange={(e) => updateURL({ sort: e.target.value })}>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low-High</option>
          <option value="price_desc">Price: High-Low</option>
        </select>
      </div>


      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.map((p) => (
              <div 
                key={p.id} 
                className="border p-4 rounded-lg hover:shadow-md cursor-pointer bg-white"
                onClick={() => router.push(`/products/${p.id}`)}
              >
                <h2 className="font-bold text-lg">{p.title}</h2>
                <p className="text-blue-600 font-bold">${p.price}</p>
                <p className="text-sm text-gray-500 uppercase">{p.category}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 items-center">
            <button 
              disabled={page <= 1}
              onClick={() => updateURL({ page: page - 1 })}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {page}</span>
            <button 
              disabled={page * limit >= totalCount}
              onClick={() => updateURL({ page: page + 1 })}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}