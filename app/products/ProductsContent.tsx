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

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  const searchQuery = searchParams.get("search") || "";
  const category = searchParams.get("cat") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 4;


  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const updateURL = (filter: { search?: string; cat?: string; sort?: string; page?: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (filter.search !== undefined) params.set("search", filter.search);
    if (filter.cat !== undefined) params.set("cat", filter.cat);
    if (filter.sort !== undefined) params.set("sort", filter.sort);
    

    if (filter.page !== undefined) params.set("page", filter.page.toString());
    else params.set("page", "1");

    router.replace(`/products?${params.toString()}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase.from("products").select("*", { count: "exact" });

      if (debouncedSearch) query = query.ilike("title", `%${debouncedSearch}%`);
      if (category) query = query.eq("category", category);

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
  }, [debouncedSearch, category, sort, page]);

  return (
    <div className="p-6 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2 rounded flex-1"
          defaultValue={searchQuery}
          onChange={(e) => updateURL({ search: e.target.value })}
        />

        <select
          value={category}
          onChange={(e) => updateURL({ cat: e.target.value })}
          className="border p-2 rounded bg-white"
        >
          <option value="">All Categories</option>
          <option value="tshirt">T-shirt</option>
          <option value="hoodie">Hoodie</option>
          <option value="jogger">Jogger</option>
        </select>

        <select
          value={sort}
          onChange={(e) => updateURL({ sort: e.target.value })}
          className="border p-2 rounded bg-white"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>


      {loading ? (
        <div className="text-center py-10">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No products found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="border p-4 rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white"
                onClick={() => router.push(`/products/${p.id}`)}
              >
                <div className="h-40 bg-gray-100 mb-4 rounded-md flex items-center justify-center text-gray-400">Image</div>
                <h2 className="font-bold text-lg leading-tight mb-1">{p.title}</h2>
                <p className="text-blue-600 font-bold mb-1">${p.price}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{p.category}</p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              disabled={page <= 1}
              onClick={() => updateURL({ page: page - 1 })}
              className="px-4 py-2 bg-black text-white rounded-md disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="font-medium">Page {page}</span>
            <button
              disabled={page * limit >= totalCount}
              onClick={() => updateURL({ page: page + 1 })}
              className="px-4 py-2 bg-black text-white rounded-md disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}