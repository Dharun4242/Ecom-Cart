// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react"; // from lucide-react

const quotes = [
  "Shop smart, look sharp.",
  "Happiness is... adding to cart!",
  "Buy now or cry later!",
  "Your cart is calling.",
  "Life is short, shop more.",
];

function Navbar({ cartCount, onWishlistClick }) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 backdrop-blur-md bg-opacity-90 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left: Logo */}
        <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md select-none">
          <span className="text-indigo-400">E</span>-Cart
        </h1>

        {/* Middle: Quote */}
        <p className="text-gray-200 italic text-sm md:text-base text-center animate-pulse">
          {quote}
        </p>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          {/* Wishlist Icon */}
          <button
            onClick={onWishlistClick}
            className="relative group transition-transform transform hover:scale-110"
            title="Wishlist"
          >
            <Heart
              className="w-6 h-6 text-white group-hover:text-red-500 transition-colors duration-200"
              strokeWidth={2}
            />
            <span className="sr-only">Wishlist</span>
          </button>

          {/* Cart Icon */}
          <div
            className="relative transition-transform transform hover:scale-110 cursor-pointer"
            title="Cart"
          >
            <ShoppingCart className="w-7 h-7 text-white" strokeWidth={2.3} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
