"use client";
import React, { useState } from "react";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    <div className="w-full my-3">
      {/* Mobile view - Hamburger menu for filters */}
      <div className="md:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 w-full bg-white rounded-lg shadow-sm mb-2"
        >
          <span>Filters</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isFilterOpen && (
          <div className="flex flex-col gap-2 mb-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category:
              </label>
              <select
                className="px-4 py-2 w-full bg-white rounded-lg shadow-sm"
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

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort by:
              </label>
              <select
                className="px-4 py-2 w-full bg-white rounded-lg shadow-sm"
                value={selectedSort}
                onChange={(e) => handleSort(e.target.value)}
              >
                {sorts.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender:
              </label>
              <select
                className="px-4 py-2 w-full bg-white rounded-lg shadow-sm"
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
          </div>
        )}
      </div>

      {/* Desktop view - Horizontal layout */}
      <div className="hidden md:flex md:flex-wrap lg:flex-nowrap lg:justify-center gap-2 ">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm whitespace-nowrap">
            Filters:
          </button>
          <select
            className="px-4 py-2 bg-white rounded-lg shadow-sm min-w-0"
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
          className="px-4 py-2 bg-white rounded-lg shadow-sm min-w-0"
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
          className="px-4 py-2 bg-white rounded-lg shadow-sm min-w-0"
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
    </div>
  );
};

export default Filter;