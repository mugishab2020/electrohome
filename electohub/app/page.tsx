"use client";
import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import {
  BsLaptop,
  BsSmartwatch,
  BsPhone,
  BsTablet,
  BsHouseDoor,
  BsController,
} from "react-icons/bs";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  discount?: string;
}

const ElectoHub: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const productsPerPage = 4;

  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 13 Pro",
      price: "$999",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5",
      discount: "10% OFF",
    },
    {
      id: 2,
      name: "MacBook Pro M1",
      price: "$1299",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      discount: "15% OFF",
    },
    {
      id: 3,
      name: "Samsung Galaxy Watch",
      price: "$299",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    },
    {
      id: 4,
      name: "iPad Pro",
      price: "$799",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    },
    {
      id: 5,
      name: "iPhone 13 Pro",
      price: "$999",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5",
      discount: "10% OFF",
    },
    {
      id: 6,
      name: "MacBook Pro M1",
      price: "$1299",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      discount: "15% OFF",
    },
    {
      id: 7,
      name: "Samsung Galaxy Watch",
      price: "$299",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    },
    {
      id: 8,
      name: "iPad Pro",
      price: "$799",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    },
    {
      id: 9,
      name: "iPhone 13 Pro",
      price: "$999",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5",
      discount: "10% OFF",
    },
    {
      id: 11,
      name: "MacBook Pro M1",
      price: "$1299",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      discount: "15% OFF",
    },
    {
      id: 10,
      name: "Samsung Galaxy Watch",
      price: "$299",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    },
    {
      id: 12,
      name: "iPad Pro",
      price: "$799",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    },
  ];

  const categories = [
    { name: "Smartphones", icon: <BsPhone className="text-4xl" /> },
    { name: "Laptops", icon: <BsLaptop className="text-4xl" /> },
    { name: "Tablets", icon: <BsTablet className="text-4xl" /> },
    { name: "Accessories", icon: <BsSmartwatch className="text-4xl" /> },
    { name: "Smart Home", icon: <BsHouseDoor className="text-4xl" /> },
    { name: "Gaming", icon: <BsController className="text-4xl" /> },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      Math.min(prev + 1, products.length - productsPerPage)
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide < products.length - productsPerPage) {
        nextSlide();
      } else {
        setCurrentSlide(0);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const showPrevButton = currentSlide > 0;
  const showNextButton = currentSlide < products.length - productsPerPage;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Discover the Future of Technology
              </h1>
              <p className="text-xl mb-8">
                Experience tomorrow's innovation today with our cutting-edge
                electronic devices.
              </p>
              <button className="bg-[#7F68DC] text-white px-8 py-3 rounded-full hover:bg-blue-700 hover:text-blue-200 transition duration-300">
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661"
                alt="Latest Electronics"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-black font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition duration-300 cursor-pointer"
              >
                {category.icon}
                <span className="mt-4 text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-black font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="relative">
            <div className="flex overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 25}%)` }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="w-full md:w-1/4 flex-shrink-0 px-4"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
            {showPrevButton && (
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              >
                <FiChevronLeft className="text-2xl" />
              </button>
            )}
            {showNextButton && (
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              >
                <FiChevronRight className="text-2xl" />
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Summer Sale!</h3>
              <p className="mb-4">Get up to 40% off on selected items</p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300">
                Shop Now
              </button>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">New Arrivals</h3>
              <p className="mb-4">Check out the latest tech gadgets</p>
              <button className="bg-white text-pink-600 px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300">
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ElectoHub;
