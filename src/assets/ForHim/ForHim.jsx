import React, { useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Category from "../Category/Category";
import CategoryProductLayout from "../CategoryProductLayout/CategoryProductLayout";
import { useCart } from "../Context/CartContext";

// Category Data
const categories = [
  {
    id: 1,
    image: "./pictures/image1.jpg",
    title: "Men Jewellery",
  },
  {
    id: 2,
    image: "./pictures/image3.jpg",
    title: "Men Watches",
  },
];

// Product Data
const products = [
  {
    id: 201,
    name: "Gold Chain",
    title: "Gold Chain",
    category: "Men Jewellery",
    image: "./pictures/image1.jpg",
    image1: "./pictures/image1.jpg",
    price: 180,
    discountedPrice: 180,
  },
  {
    id: 202,
    name: "Silver Bracelet",
    title: "Silver Bracelet",
    category: "Men Jewellery",
    image: "./pictures/bracelet.jpg",
    image1: "./pictures/bracelet.jpg",
    price: 120,
    discountedPrice: 120,
  },
  {
    id: 203,
    name: "Luxury Watch",
    title: "Luxury Watch",
    category: "Men Watches",
    image: "./pictures/image3.jpg",
    image1: "./pictures/image3.jpg",
    price: 350,
    discountedPrice: 350,
  },
  {
    id: 204,
    name: "Sport Watch",
    title: "Sport Watch",
    category: "Men Watches",
    image: "./pictures/menwatch.jpg",
    image1: "./pictures/menwatch.jpg",
    price: 220,
    discountedPrice: 220,
  },
];

const ForHim = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory = location.state?.selectedCategory || null;
  const { addToCart, openCart } = useCart();

  // Create refs using useMemo
  const categoryRefs = useMemo(() => 
    categories.reduce((acc, category) => {
      acc[category.title] = React.createRef();
      return acc;
    }, {}), 
  []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to selected category (if any)
  useEffect(() => {
    if (selectedCategory && categoryRefs[selectedCategory]) {
      categoryRefs[selectedCategory].current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedCategory, categoryRefs]);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="md:pt-18 relative w-full flex justify-center items-center">
        <div className="relative w-full h-[60vh] md:h-[60vh] overflow-hidden">
          <img
            src="./pictures/menwatch.jpg"
            alt="Hero"
            className="absolute left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
          <div className="absolute left-4 md:left-10 top-40 md:top-1/2 md:-translate-y-1/2 flex flex-col text-white">
            <div className="text-sm md:text-xl font-bold text-left">
              <p className="uppercase text-2xl md:text-4xl">Best Seller</p>
              <p className="text-2xl md:text-3xl">For Him</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="top-16 z-10 bg-white py-2 shadow-sm">
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide px-2 space-x-4 md:justify-center justify-start">
          {categories.map((category) => (
            <Category
              key={category.id}
              title={category.title}
              image={category.image}
              onClick={() =>
                navigate("/forhim", {
                  state: { selectedCategory: category.title },
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Products Section */}
      <CategoryProductLayout
        categories={categories}
        products={products}
        categoryRefs={categoryRefs}
        handleAddToCart={(item) => {
          const cartProduct = {
            id: item.id,
            title: item.title,
            name: item.name,
            discountedPrice: item.discountedPrice,
            price: item.price,
            image1: item.image1,
            image: item.image,
            category: item.category,
          };

          addToCart(cartProduct);
          openCart();
        }}
      />
    </div>
  );
};

export default ForHim;
