"use client";

import { ArrowRight, Home } from "lucide-react";
import { useEffect } from "react";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  useEffect(() => {
    console.error("404 Page Not Found");
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Large 404 */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[150px] font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-none mb-4">
            404
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto"></div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-400 mb-2">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <p className="text-gray-500">
            The page might have been moved or deleted. Let's get you back on
            track.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-orange-400 rounded-lg font-semibold hover:bg-orange-400/10 transition-all duration-300"
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <p className="text-gray-400 mb-4">Quick Navigation</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="text-gray-300 hover:text-orange-400 transition"
            >
              About
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/products"
              className="text-gray-300 hover:text-orange-400 transition"
            >
              Products
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-orange-400 transition"
            >
              Contact
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/technology"
              className="text-gray-300 hover:text-orange-400 transition"
            >
              Technology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
