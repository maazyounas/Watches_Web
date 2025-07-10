import React, { useRef } from "react";
import CategoryProductLayout from "../CategoryProductLayout/CategoryProductLayout";
import Category from "../Category/Category";
import { useCart } from "../Context/CartContext";

const products = [
  {
    id: 101,
    name: "Gold Necklace",
    title: "Gold Necklace", // Added title field
    category: "Ladies Jewellery",
    image: "./pictures/neck.jpeg",
    image1: "./pictures/neck.jpeg", // Added image1 field
    price: 150,
    discountedPrice: 150, // Added discountedPrice
  },
  {
    id: 102,
    name: "Diamond Ring",
    title: "Diamond Ring",
    category: "Mens Jewellery",
    image: "./pictures/image5.jpg",
    image1: "./pictures/image5.jpg",
    price: 250,
    discountedPrice: 250,
  },
  {
    id: 103,
    name: "Elegant Watch",
    title: "Elegant Watch",
    category: "Ladies Braclets",
    image: "./pictures/womenwatch.jpg",
    image1: "./pictures/womenwatch.jpg",
    price: 300,
    discountedPrice: 300,
  },
  {
    id: 104,
    name: "Sporty Watch",
    title: "Sporty Watch",
    category: "Ladies Bags",
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

const categories = [
  { id: 1, title: "Ladies Jewellery", image: "./pictures/neck.jpeg" },
  { id: 2, title: "Mens Jewellery", image: "./pictures/image5.jpg" },
  { id: 3, title: "Ladies Braclets", image: "./pictures/womenwatch.jpg" },
  { id: 4, title: "Ladies Bags", image: "./pictures/enjoy.jpeg" },
  { id: 5, title: "Sunglasses", image: "./pictures/sunglasses.jpg" },
];

const Jewellery = () => {
  const categoryRefs = useRef(
    categories.reduce((acc, category) => {
      acc[category.title] = React.createRef();
      return acc;
    }, {})
  );

  const { addToCart, openCart } = useCart();

  const scrollToCategory = (title) => {
    const sectionRef = categoryRefs.current[title];
    if (sectionRef?.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="md:pt-18 relative w-full flex justify-center items-center">
        <div className="relative w-full h-[60vh] md:h-[60vh] overflow-hidden">
          <img
            src="./pictures/image2.jpg"
            alt="Jewellery Collection"
            className="absolute left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
          <div className="absolute left-4 md:left-10 top-40 md:top-1/2 md:-translate-y-1/2 flex flex-col text-white">
            <div className="text-sm md:text-xl font-bold text-left">
              <p className="uppercase text-2xl md:text-4xl">Jewellery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className=" top-16 z-10 bg-white py-2 shadow-sm">
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide px-2 space-x-4 md:justify-center justify-start">
          {categories.map((category) => (
            <Category
              key={category.id}
              image={category.image}
              title={category.title}
              onClick={() => scrollToCategory(category.title)}
            />
          ))}
        </div>
      </div>

      {/* Product Sections */}
      <CategoryProductLayout
        categories={categories}
        products={products}
        categoryRefs={categoryRefs.current}
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

export default Jewellery;