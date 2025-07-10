import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaGoogle,
  FaSpotify,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* SHOP Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SHOP</h3>
          <ul className="space-y-2 text-sm">
            <li 
              onClick={() => navigate("/forher")} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              For Her
            </li>
            <li 
              onClick={() => navigate("/forhim")} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              For Him
            </li>
            <li 
              onClick={() => navigate("/watches")} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              Watches
            </li>
            <li 
              onClick={() => navigate("/jewellery")} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              Jewelry
            </li>
            
          </ul>
        </div>

       {/* COMPANY Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li 
              onClick={() => navigate("/aboutus")} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              About Us
            </li>
            <li 
              onClick={() => navigate("/support", { state: { scrollTo: "terms" } })} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              Terms & Conditions
            </li>
            <li 
              onClick={() => navigate("/support", { state: { scrollTo: "terms" } })} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              Privacy Policy
            </li>
          </ul>
        </div>

       {/* HELP & SUPPORT Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">HELP & SUPPORT</h3>
          <ul className="space-y-2 text-sm">
            <li 
              onClick={() => navigate("/support")} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              FAQs
            </li>
            <li 
              onClick={() => navigate("/contact")} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              Contact Us
            </li>
            <li 
              onClick={() => navigate("/support", { state: { scrollTo: "repair" } })} 
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              Returns & Exchanges
            </li>
            <li 
              onClick={() => navigate("/support", { state: { scrollTo: "shipping" } })} 
              className="hover:text-yellow-400 cursor-pointer transition-colors flex items-center gap-2"
            >
              <FaTruck className="text-yellow-400" /> Shipping Information
            </li>
            <li 
              onClick={() => navigate("/support", { state: { scrollTo: "repair" } })} 
              className="hover:text-yellow-400 cursor-pointer transition-colors flex items-center gap-2"
            >
              <FaShieldAlt className="text-yellow-400" /> Warranty Terms
            </li>
          </ul>
          
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <FaPhone className="text-yellow-400" />
              <span>+92 (321) 53-26953</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaEnvelope className="text-yellow-400" />
              <span>support@worldcross.com</span>
            </div>
            <div className="flex items-start gap-2 text-sm mt-2">
              <FaMapMarkerAlt className="text-yellow-400 mt-1" />
              <span>G-10 Islamabad</span>
            </div>
          </div>
        </div>

        {/* SECURE PAYMENT Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SECURE PAYMENT</h3>
          <p className="text-sm mb-4 text-gray-300">
            Shop with confidence using our trusted payment partners. All transactions are encrypted and secure.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-white p-1.5 rounded shadow-md">
              <img
                src="./pictures/easyicon.jpg"
                alt="Easypaisa"
                className="w-10 h-6 object-contain rounded"
              />
            </div>
            <div className="bg-white p-2 rounded shadow-md">
              <SiStripe className="text-indigo-700 text-2xl" />
            </div>
            
          </div>
          
          
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <FaFacebookF className="text-xl hover:text-blue-500 cursor-pointer transition-colors" />
          <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer transition-colors" />
          <FaPinterestP className="text-xl hover:text-red-600 cursor-pointer transition-colors" />
          <FaYoutube className="text-xl hover:text-red-600 cursor-pointer transition-colors" />
          <FaGoogle className="text-xl hover:text-blue-500 cursor-pointer transition-colors" />
          <FaSpotify className="text-xl hover:text-green-500 cursor-pointer transition-colors" />
        </div>
        <p className="text-xs text-gray-500">
          © 2025 World-Cross Watches. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;