
import { NextPage } from "next";

import supabase from "@/supabase/client";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/csr/products/ProductDetail";
import { Product } from "@/types/types";


interface ProductPostPageProps {
  params: { slug: string | number };
}

const ProductPostPage: NextPage<ProductPostPageProps> = async ({ params }) => {

  const { data: products, error } = await supabase
    .from("products")
    .select("*, product_variants(*)");

  if (error || !products) {
    console.error("Error fetching products:", error);
    notFound();
  }

  const product = products.find((p: Product) => p.id === params.slug);

  if (!product) {
    notFound();
  }


 
  return <ProductDetail product={product}  />;
};

export default ProductPostPage;
