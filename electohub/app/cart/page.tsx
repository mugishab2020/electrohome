"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // In a real application, you would fetch the cart items from an API or local storage
    // For this example, we'll use some mock data
    const mockCartItems: CartItem[] = [
      { id: 1, name: "Smartphone X", price: 699, quantity: 1, image: "/images/smartphone.jpg" },
      { id: 2, name: "Laptop Pro", price: 1299, quantity: 1, image: "/images/laptop.jpg" },
      // Add more items as needed
    ];
    setCartItems(mockCartItems);
  }, []);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
        <FiShoppingCart className="text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Looks like you haven't added any items to your cart yet.</p>
        <Link href="/categories" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 flex items-center">
          <FiArrowLeft className="mr-2" />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Your Shopping Cart</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img className="h-16 w-16 object-cover rounded" src={item.image} alt={item.name} />
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-gray-700">-</button>
                    <span className="mx-2 text-gray-700">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-gray-700">+</button>
                    <button onClick={() => removeItem(item.id)} className="ml-4 text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-4 sm:px-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-xl font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/categories" className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
