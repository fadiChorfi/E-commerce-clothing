"use client";
import React from "react";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Our Company</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We &apos; re dedicated to providing exceptional products and services that transform the way you live and work.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
        <div className="w-full lg:w-1/2 relative h-64 md:h-96">
          <div className="bg-indigo-600 absolute inset-0 rounded-lg opacity-10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* Replace with your actual image path */}
              <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-600">Company Image</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2010, our company began with a simple mission: to create innovative solutions that make a real difference in people&apos;s lives. What started as a small team of passionate individuals has grown into a thriving organization with a global presence.
          </p>
          <p className="text-gray-600 mb-4">
            Through years of dedication and hard work, we&apos;ve established ourselves as leaders in our industry, known for our commitment to quality, customer satisfaction, and sustainable business practices.
          </p>
          <p className="text-gray-600">
            Today, we continue to push boundaries and explore new opportunities, always staying true to our core values and the vision that inspired us from the beginning.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Innovation",
              description: "We constantly seek new ideas and approaches to solve complex problems."
            },
            {
              title: "Integrity",
              description: "We uphold the highest ethical standards in all our business dealings."
            },
            {
              title: "Excellence",
              description: "We strive for excellence in everything we do, from product development to customer service."
            },
            {
              title: "Collaboration",
              description: "We believe in the power of teamwork and partnership to achieve greater results."
            }
          ].map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Leadership Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Jane Smith",
              position: "CEO & Founder",
              bio: "With over 15 years of industry experience, Jane has led our company from its inception to where it stands today."
            },
            {
              name: "John Davis",
              position: "CTO",
              bio: "John brings technical expertise and innovative thinking to our product development and technology strategies."
            },
            {
              name: "Sarah Johnson",
              position: "COO",
              bio: "Sarah oversees our day-to-day operations, ensuring efficiency and excellence across all departments."
            }
          ].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600">Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">{member.name}</h3>
              <p className="text-indigo-600 mb-4 text-center">{member.position}</p>
              <p className="text-gray-600 text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-100 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Work With Us?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Join our growing list of satisfied clients and experience the difference our products and services can make for your business.
        </p>
        <Link href="/contact" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Contact Us Today
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;