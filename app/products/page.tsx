"use client";

import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function ProductsPage() {
  return (

    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading Store...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}