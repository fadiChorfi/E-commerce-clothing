import supabase from "@/supabase/client";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/csr/products/ProductDetail";


interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*, product_variants(*)")
    .eq("id", slug)
    .single(); 

  if (error || !product) {
    console.error("Error fetching product:", error);
    notFound();
  }

  return <ProductDetail product={product} />;
}