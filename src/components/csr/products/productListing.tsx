import React from "react";
import { Product } from "@/types/types";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

type Props = {
  data: Product[];
};

const ProductListing = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">
      {data.map((product: Product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Link href={`/products/${product.id}`} className="block h-full">
            <ProductCard product={product} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductListing;
