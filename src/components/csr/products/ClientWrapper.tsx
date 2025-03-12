"use client";
import {Product} from "@/types/types";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import ProductListing from "./productListing";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import HeroSection from "../section/HeroSection";
import FeaturedProductsSection from "../section/FeaturedProductsSection";
import NewsletterSection from "../section/NewsletterSection";

type Props = {
  products: Product[];
};

const ClientWrapper = ({ products }: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedSort, setSelectedSort] = useState<string>("Sort by: Featured");
  const [selectedGender, setSelectedGender]  = useState<string>('mixed')

  
  useEffect(() => {
    let updatedProducts = [...products];

    
    if (selectedCategory !== "All Categories") {
      updatedProducts = updatedProducts.filter(
        (item) => item.category === selectedCategory
      );
    }

    
    if (selectedSort === "Price: Low to High") {
      updatedProducts.sort((a, b) => a.base_price - b.base_price);
    } else if (selectedSort === ".Price: High to Low") {
      updatedProducts.sort((a, b) => b.base_price - a.base_price);
    }


    if (selectedGender !== "mixed"){
        updatedProducts = updatedProducts.filter((item)=> item.gender === selectedGender)
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, selectedSort,selectedGender, products]);

  return (
    <div>
      <Header/>
      <HeroSection/>
      <FeaturedProductsSection/>
       <div className="flex justify-center">
        <Filter
          selectedCategory={selectedCategory}
          handleFilter={setSelectedCategory}
          selectedSort={selectedSort}
          handleSort={setSelectedSort}
          selectedGender ={selectedGender}
          handleGender={setSelectedGender}
        />
      </div> 
      
      <ProductListing data={filteredProducts} />
      <NewsletterSection/>
      <Footer/>
    </div>
  );
};

export default ClientWrapper;
