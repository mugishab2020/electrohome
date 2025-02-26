"use client";
import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHome, FiGrid, FiTag, FiSettings, FiLogOut, FiLogIn } from "react-icons/fi";
import { useRouter } from "next/navigation";  


const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if window is defined to ensure we're in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const login = () => {
    router.push('/auth/login');
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('token');
    }
    router.push('/auth/login');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const profileRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, login, logout } = useAuth();

  const navItems = [
    { href: "/", label: "Home", icon: <FiHome className="mr-2" /> },
    { href: "/categories", label: "Categories", icon: <FiGrid className="mr-2" /> },
    { href: "/deals", label: "Deals", icon: <FiTag className="mr-2" /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/logo.jpeg"
              alt="ElectoHub Logo"
              className="h-15 w-10 cursor-pointer ml-5 rounded-10"
            />
          </Link>
          <div className="hidden md:flex ml-20 space-x-8">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} className="text-gray-700 hover:text-blue-600 flex items-center">
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none ml-2"
            />
          </div>
          <Link href="/cart" className="text-gray-700 hover:text-blue-600 relative">
            <FiShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <FiUser className="text-2xl" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiUser className="inline-block mr-2" />
                    Account
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiSettings className="inline-block mr-2" />
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut className="inline-block mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={login}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <FiLogIn className="mr-2" />
              Login
            </button>
          )}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link key={index} href={item.href} className="text-gray-700 hover:text-blue-600 flex items-center" onClick={() => setIsMenuOpen(false)}>
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
