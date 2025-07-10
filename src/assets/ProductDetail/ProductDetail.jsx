import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { GiWatch, GiPillow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { FaShippingFast, FaCheckCircle, FaBoxOpen } from "react-icons/fa";

const ProductDetail = () => {
  const location = useLocation();
  let product = location.state?.product;

   const navigate = useNavigate();

  // Persist product to localStorage when navigating via state
  useEffect(() => {
    if (location.state?.product) {
      localStorage.setItem("selectedProduct", JSON.stringify(location.state.product));
    }
  }, [location.state]);

  // Fallback if user refreshes or opens detail page directly
  if (!product) {
    const storedProduct = localStorage.getItem("selectedProduct");
    product = storedProduct ? JSON.parse(storedProduct) : null;
  }

  if (!product) return <div className="min-h-screen flex items-center justify-center text-2xl">Product not found</div>;

  const discount = Math.round(
    ((product.actualPrice - product.discountedPrice) / product.actualPrice) * 100
  );

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-12 mt-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{product.title}</h1>

        {/* Image & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.image1}
            alt={product.title}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg"
          />

          <div>
            {/* Main Quality Line */}
            <p className="text-xl mb-4 text-gray-700 italic">
              {product.title || "Stylish. Durable. Designed to Impress."}
            </p>

            {/* Price & Discount */}
            <p className="text-gray-500 line-through text-lg">
              Rs. {product.actualPrice}
            </p>
            <p className="text-3xl text-red-600 font-bold">
              Rs. {product.discountedPrice}
            </p>
            <p className="text-green-600 font-semibold mt-2">
              Save {discount}%!
            </p>

            {/* Add to Cart / Buy / Enquire */}
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <button className="flex-1 min-w-[200px] bg-black text-white px-6 py-3 rounded-lg hover:bg-yellow-300 hover:text-black transition">
                  Add to Cart
                </button>
                <button onClick={() => navigate("/checkoutpage")} className="flex-1 min-w-[200px] bg-yellow-300 text-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition">
                  Buy it Now
                </button>
              </div>
              <button onClick={() => navigate("/bulkorder")}
              className="px-6 py-3 rounded-lg cursor-pointer bg-black text-yellow-300 transition font-medium hover:bg-gray-400 hover:text-black transition">
                Bulk Order / Corporate Deal - Click to Enquire
              </button>
            </div>

            {/* Benefits Section */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <FaShippingFast className="text-3xl text-blue-500 mb-2" />
                <p className="font-semibold">Free</p>
                <p className="font-semibold">Shipping</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <FaCheckCircle className="text-3xl text-green-400 mb-2" />
                <p className="font-semibold">999+</p>
                <p className="font-semibold">Customers</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <FaCheckCircle className="text-3xl text-yellow-400 mb-2" />
                <p className="font-semibold">Premium</p>
                <p className="font-semibold">Quality</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
          <ul className="space-y-2 text-gray-700">
            {product.technicalDetails?.case && (
              <li className="flex border-b pb-2">
                <strong className="w-1/3">Case:</strong>
                <span className="w-2/3">{product.technicalDetails.case}</span>
              </li>
            )}
            {product.technicalDetails?.dial && (
              <li className="flex border-b pb-2">
                <strong className="w-1/3">Dial:</strong>
                <span className="w-2/3">{product.technicalDetails.dial}</span>
              </li>
            )}
            {product.technicalDetails?.movement && (
              <li className="flex border-b pb-2">
                <strong className="w-1/3">Movement:</strong>
                <span className="w-2/3">{product.technicalDetails.movement}</span>
              </li>
            )}
            {product.technicalDetails?.bracelet && (
              <li className="flex border-b pb-2">
                <strong className="w-1/3">Bracelet:</strong>
                <span className="w-2/3">{product.technicalDetails.bracelet}</span>
              </li>
            )}
            {product.technicalDetails?.extraFeatures && (
              <li className="flex border-b pb-2">
                <strong className="w-1/3">Extra Features:</strong>
                <span className="w-2/3">{product.technicalDetails.extraFeatures}</span>
              </li>
            )}
            {product.technicalDetails?.manual && (
              <li className="flex">
                <strong className="w-1/3">Manual & Info:</strong>
                <span className="w-2/3">{product.technicalDetails.manual}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Package Contents */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Package Contents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 p-4 bg-gray-50 rounded-lg">
              <GiWatch className="text-4xl text-gray-600 mb-2" />
              <p className="font-medium text-gray-700">Your {product.title}</p>
            </div>
            <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 p-4 bg-gray-50 rounded-lg">
              <FaBoxOpen className="text-4xl text-gray-600 mb-2" />
              <p className="font-medium text-gray-700">Safe Keeping Box</p>
            </div>
            <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 p-4 bg-gray-50 rounded-lg">
              <GiPillow className="text-4xl text-gray-600 mb-2" />
              <p className="font-medium text-gray-700">Premium Pillow</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;