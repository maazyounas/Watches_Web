import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCart } from "../Context/CartContext";  // Correct import path

const BestSeller = ({ bestSellers, selectedCategory, setSelectedCategory }) => {
  const bestSellersRef = useRef(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart(); // ✅ Cart context

  const calculateDiscount = (actualPrice, discountedPrice) => {
    return Math.round(((actualPrice - discountedPrice) / actualPrice) * 100);
  };

  const scrollBestSellers = (direction) => {
    if (bestSellersRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      bestSellersRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleProductClick = (item) => {
    localStorage.setItem("selectedProduct", JSON.stringify(item));
    navigate("/product-details", { state: { product: item } });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    openCart(); // Automatically opens cart sidebar
  };

  return (
    <div className="py-10 px-4 md:px-10 w-full mx-auto">
      <h1 className="text-center text-xl md:text-3xl font-bold mb-6">
        DISCOVER OUR BESTSELLERS
      </h1>

      {/* Category Selector Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(bestSellers).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 cursor-pointer rounded-md font-bold transition duration-300 ${
              selectedCategory === category
                ? "bg-black text-yellow-400"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Best Sellers Carousel */}
      <div className="relative w-full overflow-hidden">
        <button
          onClick={() => scrollBestSellers("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10 hidden md:flex"
        >
          <IoIosArrowBack className="text-2xl" />
        </button>

        <div
          ref={bestSellersRef}
          className="flex overflow-x-auto space-x-4 px-4 md:px-0 w-full hide-scrollbar"
        >
          {bestSellers[selectedCategory]?.length ? (
            bestSellers[selectedCategory]?.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer flex-shrink-0 w-72 md:w-1/5 bg-white shadow-lg rounded-lg overflow-hidden p-3 border hover:shadow-xl transition duration-300 relative"
                onMouseEnter={() => setHoveredProduct(item.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  {calculateDiscount(item.actualPrice, item.discountedPrice)}%
                  OFF
                </span>

                <img
                  src={hoveredProduct === item.id ? item.image2 : item.image1}
                  alt={item.title}
                  className="w-full h-58 object-cover rounded-md transition-all duration-300"
                  onClick={() => handleProductClick(item)}
                />

                <div className="p-2 text-center">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div className="text-center mt-2">
                    <span className="text-gray-500 line-through">
                      Rs.{item.actualPrice}
                    </span>
                    <span className="text-xl font-bold text-red-500 ml-2">
                      Rs.{item.discountedPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-3 bg-black text-yellow-300 py-2 px-4 w-full md:text-lg font-bold rounded-md hover:bg-gray-400 hover:text-black transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full">
              No products found in this category.
            </p>
          )}
        </div>

        <button
          onClick={() => scrollBestSellers("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10 hidden md:flex"
        >
          <IoIosArrowForward className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default BestSeller;
