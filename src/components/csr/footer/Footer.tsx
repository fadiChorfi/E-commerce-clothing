"use client";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-32">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Company Name</h3>
            <p className="text-sm">
              Creating beautiful designs and delivering amazing experiences
              since 2020.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-white" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-sm hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-sm hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-sm hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/faq"
                  className="text-sm hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-sm hover:text-white transition-colors"
                >
                  Shipping Information
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="text-sm hover:text-white transition-colors"
                >
                  Returns Policy
                </a>
              </li>
              <li>
                <a
                  href="/track-order"
                  className="text-sm hover:text-white transition-colors"
                >
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4 ">
            <h3 className="text-white text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  123 Business Street, City, Country
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@company.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
