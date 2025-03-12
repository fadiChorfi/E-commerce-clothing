"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

const HeroSection = () => {
  const router = useRouter();

  const handleSubmit = (gender: string) => {
    router.push(`/search?search=${encodeURIComponent(gender)}`);
  };

  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white min-w-6xl">
        <div className="container mx-auto py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Spring Collection 2025</h1>
            <p className="text-lg mb-8 text-gray-200">Discover the latest trends and styles for the new season.</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" onClick={() => handleSubmit("woman")}>
                Shop Women
              </Button>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" onClick={() => handleSubmit("man")}>
                Shop Men
              </Button>
            </div>
          </div>
        </div>
      </section>
  );
}

export default HeroSection;
