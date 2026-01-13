import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) return notFound();

  return (
    <div className="p-10 max-w-2xl mx-auto text-black">
      <Link href="/products" className="text-blue-500 mb-4 inline-block">← Back</Link>
      <div className="border p-8 rounded-2xl shadow-sm bg-white">
        <span className="text-blue-600 font-bold uppercase">{product.category}</span>
        <h1 className="text-4xl font-black my-2">{product.title}</h1>
        <p className="text-2xl font-semibold mb-4">${product.price}</p>
        <p className="text-gray-500 text-sm">Created: {new Date(product.created_at).toDateString()}</p>
        <button className="mt-6 w-full bg-black text-white py-3 rounded-xl">Add to Cart</button>
      </div>
    </div>
  );
}