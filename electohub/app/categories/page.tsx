"use client";
import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BsLaptop, BsSmartwatch, BsPhone, BsTablet, BsHouseDoor, BsController, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from 'next/image';

interface Category {
  name: string;
  icon: JSX.Element;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const CategoriesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Phone");
  const [Products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    { name: "Phone", icon: <BsPhone className="text-2xl" /> },
    { name: "Laptop", icon: <BsLaptop className="text-2xl" /> },
    { name: "Tablet", icon: <BsTablet className="text-2xl" /> },
    { name: "Gaming", icon: <BsController className="text-2xl" /> },
    { name: "Accessories", icon: <BsSmartwatch className="text-2xl" /> },
    { name: "Smarthome", icon: <BsHouseDoor className="text-2xl" /> },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setMessage(null); // Reset message before fetching new data
      try {
        const response = await axiosInstance.get(`/products/category/${activeCategory}`);
        console.log(response);
        if (response.status === 200) {
          setMessage("");
          setProducts(response.data);
          console.log("the fetched data is ", response.data)
        } else if (response.data.length > 0) {
          setMessage("No products found in this category");
          setError("");

          setProducts([]);
          console.log(message);
          console.log(error)

        } else {
          setMessage("An error occurred while fetching products");
          setProducts([]);
        }
        console.log("Fetched products:", response.data);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [activeCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Product Categories</h1>
        
        <div className="flex justify-center space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition duration-300 ${
                activeCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-blue-100'
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.icon}
              <span className="mt-2 text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Displaying message */}
        {message && (
          <div className="text-center mb-4 p-2 rounded bg-gray-200 text-gray-800">
            {message}
          </div>
        )}

        {loading ? (
          <p className="text-center text-lg font-medium">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="relative">
            <button 
              onClick={() => scroll('left')} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              <BsChevronLeft />
            </button>
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto space-x-6 pb-4 px-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {Products.map(Product => (
            
                <div key={Product.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={Product.photo}
                      alt={Product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{Product.name}</h3>
                    <p className="text-gray-600">{Product.price}</p>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => scroll('right')} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              <BsChevronRight />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
