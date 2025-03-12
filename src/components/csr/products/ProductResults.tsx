"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { searchProducts } from "@/supabase/client";
import { Product } from "@/types/types";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ProductResultsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function ProductResults({ searchParams }: ProductResultsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTerm =
    typeof searchParams.search === "string" ? searchParams.search : "";

  useEffect(() => {
    async function fetchProducts() {
      if (!searchTerm) {
        setProducts([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await searchProducts(searchTerm);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [searchTerm]);

  if (!searchTerm) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Enter a product name to search</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Searching products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {products.length > 0
          ? `Results for "${searchTerm}" (${products.length} products found)`
          : `No results found for "${searchTerm}"`}
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            We couldn&apos;t find any products matching your search.
          </p>
          <p className="text-muted-foreground mt-2">
            Try using different keywords or browse our categories.
          </p>
        </div>
      )}
    </div>
  );
}
