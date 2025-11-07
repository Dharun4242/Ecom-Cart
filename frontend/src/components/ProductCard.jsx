import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col items-center">
      <img
        src="https://via.placeholder.com/150"
        alt={product.name}
        className="w-full h-32 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-xl font-bold my-2">${product.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(product._id)}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
