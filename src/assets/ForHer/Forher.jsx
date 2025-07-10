import React, { useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Category from "../Category/Category";
import CategoryProductLayout from "../CategoryProductLayout/CategoryProductLayout";
import { useCart } from "../Context/CartContext"; // Import cart context

// Category Data
const categories = [
  {
    id: 1,
    image: "./pictures/neck.jpeg",
    title: "Ladies Jewellery",
  },
  {
    id: 2,
    image: "./pictures/womenwatch.jpg",
    title: "Ladies Watches",
  },
  {
    id: 3,
    image: "./pictures/sunglasses.jpg",
    title: "Sunglasses",
  },
];

// Product Data
const products = [
  {
    id: 101,
    name: "Gold Necklace",
    title: "Gold Necklace", // Added for cart display
    category: "Ladies Jewellery",
    image: "./pictures/neck.jpeg",
    image1: "./pictures/neck.jpeg", // Added for cart display
    price: 150, // Changed to number
    discountedPrice: 150, // Added for cart
  },
  {
    id: 102,
    name: "Diamond Ring",
    title: "Diamond Ring",
    category: "Ladies Jewellery",
    image: "./pictures/image5.jpg",
    image1: "./pictures/image5.jpg",
    price: 250,
    discountedPrice: 250,
  },
  {
    id: 103,
    name: "Elegant Watch",
    title: "Elegant Watch",
    category: "Ladies Watches",
    image: "./pictures/womenwatch.jpg",
    image1: "./pictures/womenwatch.jpg",
    price: 300,
    discountedPrice: 300,
  },
  {
    id: 104,
    name: "Sporty Watch",
    title: "Sporty Watch",
    category: "Ladies Watches",
    image: "./pictures/enjoy.jpeg",
    image1: "./pictures/enjoy.jpeg",
    price: 200,
    discountedPrice: 200,
  },
  {
    id: 105,
    name: "Aviator Sunglasses",
    title: "Aviator Sunglasses",
    category: "Sunglasses",
    image: "./pictures/sunglasses.jpg",
    image1: "./pictures/sunglasses.jpg",
    price: 100,
    discountedPrice: 100,
  },
  {
    id: 106,
    name: "Retro Sunglasses",
    title: "Retro Sunglasses",
    category: "Sunglasses",
    image: "./pictures/neckmen.jpeg",
    image1: "./pictures/neckmen.jpeg",
    price: 90,
    discountedPrice: 90,
  },
];

const ForHer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory = location.state?.selectedCategory || null;
  const { addToCart, openCart } = useCart(); // Get cart functions

  // Create refs for each category
  const categoryRefs = useMemo(() => 
    categories.reduce((acc, category) => {
      acc[category.title] = React.createRef();
      return acc;
    }, {}), 
  []);  

  // Scroll to selected category if passed from Home page
  useEffect(() => {
    if (selectedCategory && categoryRefs[selectedCategory]) {
      categoryRefs[selectedCategory].current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [selectedCategory]);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="md:pt-18 relative w-full flex justify-center items-center">
        <div className="relative w-full h-[60vh] md:h-[60vh] overflow-hidden">
          <img
            src="./pictures/image2.jpg"
            alt="For Her Collection"
            className="absolute left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
          <div className="absolute left-4 md:left-10 top-40 md:top-1/2 md:-translate-y-1/2 flex flex-col text-white">
            <div className="text-sm md:text-xl font-bold text-left">
              <p className="uppercase text-2xl md:text-4xl">Best Seller</p>
              <p className="text-2xl md:text-3xl">For Her</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className=" top-16 z-10 bg-white py-2 shadow-sm">
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide px-2 space-x-4 md:justify-center justify-start">
          {categories.map((category) => (
            <Category
              key={category.id}
              title={category.title}
              image={category.image}
              onClick={() => navigate("/forher", {
                state: { selectedCategory: category.title }
              })}
            />
          ))}
        </div>
      </div>

      {/* Products Section with Add to Cart */}
      <CategoryProductLayout
        categories={categories}
        products={products}
        categoryRefs={categoryRefs}
        handleAddToCart={(item) => {
          // Create a cart-ready product object
          const cartProduct = {
            id: item.id,
            title: item.title,
            name: item.name,
            discountedPrice: item.discountedPrice,
            price: item.price,
            image1: item.image1,
            image: item.image,
            category: item.category
          };
          
          addToCart(cartProduct);
          openCart();
        }}
      />
    </div>
  );
};

export default ForHer;