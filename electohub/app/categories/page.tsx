"use client";
import React, { useState, useRef } from 'react';
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
  const [activeCategory, setActiveCategory] = useState<string>("Phones");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    { name: "Phones", icon: <BsPhone className="text-2xl" /> },
    { name: "Laptops", icon: <BsLaptop className="text-2xl" /> },
    { name: "Tablets", icon: <BsTablet className="text-2xl" /> },
    { name: "Gaming", icon: <BsController className="text-2xl" /> },
    { name: "Accessories", icon: <BsSmartwatch className="text-2xl" /> },
    { name: "Smart Home", icon: <BsHouseDoor className="text-2xl" /> },
  ];

  const products: Product[] = [
    { id: 1, name: "iPhone 13 Pro", price: "$999", image: "/images/iphone13pro.jpeg", category: "Phones" },
    { id: 2, name: "Samsung Galaxy S21", price: "$799", image: "/images/galaxys21.jpg", category: "Phones" },
    { id: 3, name: "MacBook Pro", price: "$1299", image: "/images/macbookpro.jpg", category: "Laptops" },
    { id: 4, name: "Dell XPS 13", price: "$999", image: "/images/dellxps13.jpg", category: "Laptops" },
    { id: 5, name: "iPad Pro", price: "$799", image: "/images/ipadpro.jpg", category: "Tablets" },
    { id: 6, name: "Samsung Galaxy Tab S7", price: "$649", image: "/images/galaxytabs7.jpg", category: "Tablets" },
    { id: 7, name: "PlayStation 5", price: "$499", image: "/images/ps5.jpg", category: "Gaming" },
    { id: 8, name: "Xbox Series X", price: "$499", image: "/images/xboxseriesx.jpg", category: "Gaming" },
    { id: 9, name: "AirPods Pro", price: "$249", image: "/images/airpodspro.jpg", category: "Accessories" },
    { id: 10, name: "Samsung Galaxy Watch 4", price: "$249", image: "/images/galaxywatch4.jpg", category: "Accessories" },
    { id: 11, name: "Amazon Echo Dot", price: "$49", image: "/images/echodot.jpg", category: "Smart Home" },
    { id: 12, name: "Philips Hue Starter Kit", price: "$199", image: "/images/philipshue.jpg", category: "Smart Home" },
  ];

  const filteredProducts = products.filter(product => product.category === activeCategory);

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
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
          >
            {filteredProducts.map(product => (
              <div key={product.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
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
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
