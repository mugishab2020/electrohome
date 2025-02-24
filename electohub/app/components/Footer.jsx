import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">About ElectroHub</h4>
            <p className="text-gray-400">Your one-stop destination for all electronics and tech needs.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Customer Support</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">mugishab2020@gmail.com</li>
              <li className="text-gray-400">+250788282329</li>
            </ul>
          </div>
          <div>
            <div className="flex space-x-4 mt-6">
              <FaFacebook className="text-2xl cursor-pointer hover:text-blue-400" />
              <FaTwitter className="text-2xl cursor-pointer hover:text-blue-400" />
              <FaInstagram className="text-2xl cursor-pointer hover:text-blue-400" />
              <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 ElectroHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
