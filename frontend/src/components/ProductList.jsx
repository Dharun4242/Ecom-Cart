import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts, addItemToCart } from "../api";

const ProductList = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch products.");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addItemToCart(productId, 1);
      alert("Item added to cart!");
      onCartUpdate();
    } catch (error) {
      alert("Error adding item to cart.");
    }
  };

  if (loading)
    return <div className="text-center p-8">Loading products...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
