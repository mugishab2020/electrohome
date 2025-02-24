import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      {product.discount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
          {product.discount}
        </span>
      )}
      <div className="p-4">
        <h3 className="text-lg text-black font-semibold mb-2">{product.name}</h3>
        <p className="text-blue-600 font-bold">{product.price}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
