import React from "react";
import { Product } from "@/types/types";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

type Props = {
  data: Product[];
};

const ProductListing = ({ data }: Props) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {data.map((product: Product) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          className="group h-full bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <Link 
            href={`/products/${product.id}`} 
            className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <ProductCard product={product} />
          </Link>
        </motion.div>
      ))}
      
  
      {data.length % 4 !== 0 && data.length > 4 && (
        [...Array(4 - (data.length % 4))].map((_, index) => (
          <div key={`placeholder-${index}`} className="hidden lg:block" aria-hidden="true" />
        ))
      )}
      {data.length % 3 !== 0 && data.length > 3 && (
        [...Array(3 - (data.length % 3))].map((_, index) => (
          <div key={`md-placeholder-${index}`} className="hidden md:block lg:hidden" aria-hidden="true" />
        ))
      )}
      {data.length % 2 !== 0 && data.length > 2 && (
        <div key="sm-placeholder" className="hidden sm:block md:hidden" aria-hidden="true" />
      )}
      {/* <div className="mt-12 text-center ">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div> */}
    </motion.div>
  );
};

export default ProductListing;
