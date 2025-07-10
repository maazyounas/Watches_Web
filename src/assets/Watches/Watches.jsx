import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Category from "../Category/Category";
import CategoryProductLayout from "../CategoryProductLayout/CategoryProductLayout";
import { useCart } from "../Context/CartContext"; // Import cart context

// Categories
const categories = [
  {
    id: 1,
    image: "./pictures/womenwatch.jpg",
    title: "Ladies Watches",
  },
  {
    id: 2,
    image: "./pictures/menwatch.jpg",
    title: "Men's Watches",
  },
];

// Products (Watches only)
const products = [
  {
    id: 101,
    name: "Elegant Watch",
    title: "Elegant Watch",
    category: "Ladies Watches",
    image: "./pictures/womenwatch.jpg",
    image1: "./pictures/womenwatch.jpg",
    price: 300,
    discountedPrice: 300,
  },
  {
    id: 102,
    name: "Sporty Watch",
    title: "Sporty Watch",
    category: "Ladies Watches",
    image: "./pictures/enjoy.jpeg",
    image1: "./pictures/enjoy.jpeg",
    price: 200,
    discountedPrice: 200,
  },
  {
    id: 201,
    name: "Classic Men's Watch",
    title: "Classic Men's Watch",
    category: "Men's Watches",
    image: "./pictures/menwatch.jpg",
    image1: "./pictures/menwatch.jpg",
    price: 180,
    discountedPrice: 180,
  },
  {
    id: 202,
    name: "Luxury Men's Watch",
    title: "Luxury Men's Watch",
    category: "Men's Watches",
    image: "./pictures/menwatch2.jpg",
    image1: "./pictures/menwatch2.jpg",
    price: 250,
    discountedPrice: 250,
  },
];

const Watches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory = location.state?.selectedCategory || null;
  const { addToCart, openCart } = useCart(); // Cart context functions

  // Refs for each category
  const categoryRefs = useMemo(
    () =>
      categories.reduce((acc, category) => {
        acc[category.title] = React.createRef();
        return acc;
      }, {}),
    []
  );

  // Scroll to selected category if provided
  useEffect(() => {
    if (selectedCategory && categoryRefs[selectedCategory]) {
      categoryRefs[selectedCategory].current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
            alt="Hero"
            className="absolute left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
          <div className="absolute left-4 md:left-10 top-40 md:top-1/2 md:-translate-y-1/2 flex flex-col text-white">
            <div className="text-sm md:text-xl font-bold text-left">
              <p className="text-2xl md:text-3xl">Watches Collection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="top-16 z-10 bg-white py-2 shadow-sm">
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide px-2 space-x-4 md:justify-center justify-start">
          {categories.map((category) => (
            <Category
              key={category.id}
              title={category.title}
              image={category.image}
              onClick={() =>
                navigate("/watches", {
                  state: { selectedCategory: category.title },
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Product Layout with Add to Cart */}
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

export default Watches;
