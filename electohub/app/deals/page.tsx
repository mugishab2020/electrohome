"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiClock, FiCheckCircle } from 'react-icons/fi';

interface Deal {
  id: number;
  productName: string;
  image: string;
  purchaseDate: string;
  price: string;
  discount: string;
  status: 'active' | 'expired';
}

const DealsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'past' | 'current'>('past');

  const pastDeals: Deal[] = [
    {
      id: 1,
      productName: "iPhone 13 Pro",
      image: "/images/iphone13pro.jpg",
      purchaseDate: "2023-05-15",
      price: "$899",
      discount: "10% OFF",
      status: 'expired'
    },
    {
      id: 2,
      productName: "Samsung 4K Smart TV",
      image: "/images/samsungtv.jpg",
      purchaseDate: "2023-04-22",
      price: "$599",
      discount: "20% OFF",
      status: 'expired'
    },
    {
      id: 3,
      productName: "Sony WH-1000XM4 Headphones",
      image: "/images/sonyheadphones.jpg",
      purchaseDate: "2023-03-10",
      price: "$279",
      discount: "15% OFF",
      status: 'expired'
    },
  ];

  const currentDeals: Deal[] = [
    {
      id: 4,
      productName: "MacBook Air M2",
      image: "/images/macbookair.jpg",
      purchaseDate: "2023-06-30",
      price: "$1099",
      discount: "12% OFF",
      status: 'active'
    },
    {
      id: 5,
      productName: "iPad Pro 2022",
      image: "/images/ipadpro.jpg",
      purchaseDate: "2023-07-15",
      price: "$749",
      discount: "8% OFF",
      status: 'active'
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Your Deals</h1>

        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-l-lg ${activeTab === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('past')}
          >
            Past Deals
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg ${activeTab === 'current' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('current')}
          >
            Current Deals
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'past' ? pastDeals : currentDeals).map((deal) => (
            <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={deal.image}
                  alt={deal.productName}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-sm">
                  {deal.discount}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{deal.productName}</h3>
                <p className="text-gray-600 mb-2">Price: {deal.price}</p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <FiClock className="mr-2" />
                  {formatDate(deal.purchaseDate)}
                </p>
                <div className={`flex items-center ${deal.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                  {deal.status === 'active' ? <FiCheckCircle className="mr-2" /> : <FiClock className="mr-2" />}
                  {deal.status === 'active' ? 'Active' : 'Expired'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'past' && pastDeals.length === 0 && (
          <p className="text-center text-gray-600">You haven't made any purchases yet.</p>
        )}

        {activeTab === 'current' && currentDeals.length === 0 && (
          <p className="text-center text-gray-600">There are no current deals available.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DealsPage;