"use client";
import React from "react";

type Props = {
  selectedCategory: string;
  handleFilter: (category: string) => void;
  selectedSort: string;
  handleSort: (sort: string) => void;
  selectedGender: string;
  handleGender: (gender: string) => void;
};

const Filter = ({
  selectedCategory,
  handleFilter,
  selectedSort,
  handleSort,
  selectedGender,
  handleGender,
}: Props) => {
  const categories: string[] = [
    "All Categories",
    "T-Shirts",
    "Pants",
    "Hoodies",
    "Shoes",
    "Jackets",
    "Accessories",
    "Sweaters",
    "Bags",
  ];

  const sorts: string[] = [
    "Sort by: Featured",
    "Price: Low to High",
    "Price: High to Low",
  ];
  const gender: string[] = ["mixed", "male", "female"];

  return (
    <div className="flex items-center  my-3">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
          Filters:
        </button>
        <select
          className="px-4 py-2 bg-white rounded-lg shadow-sm"
          value={selectedCategory}
          onChange={(e) => handleFilter(e.target.value)}
        >
          {categories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <select
        className="px-4 py-2 mx-4 rounded-lg shadow-sm"
        value={selectedSort}
        onChange={(e) => handleSort(e.target.value)}
      >
        {sorts.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className="px-4 py-2 mx-4 rounded-lg shadow-sm"
        value={selectedGender}
        onChange={(e) => handleGender(e.target.value)}
      >
        {gender.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
