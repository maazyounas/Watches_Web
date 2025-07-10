import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Category from "../Category/Category";
import ReviewsSection from "../ReviewsSection/ReviewsSections";
import BestSeller from "../BestSeller/BestSeller";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, RefreshCcw, Truck, Users } from "lucide-react"; // Importing icons

const Home = () => {
  const navigate = useNavigate();

  const heroImages = [
    "./pictures/image1.jpg",
    "./pictures/image2.jpg",
    "./pictures/image3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Men's Watches");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const bestSellersData = {
    "Men's Watches": [
      {
        id: 1,
        title: "Men's Watch 1",
        image1: "./pictures/image1.jpg",
        image2: "./pictures/image2.jpg",
        actualPrice: 15999,
        discountedPrice: 2599,
      },
      {
        id: 2,
        title: "Men's Watch 2",
        image1: "./pictures/image2.jpg",
        image2: "./pictures/image3.jpg",
        actualPrice: 14999,
        discountedPrice: 3399,
      },
      {
        id: 3,
        title: "Men's Watch 1",
        image1: "./pictures/image3.jpg",
        image2: "./pictures/image4.jpg",
        actualPrice: 12999,
        discountedPrice: 3599,
      },
      {
        id: 4,
        title: "Men's Watch 2",
        image1: "./pictures/image4.jpg",
        image2: "./pictures/image5.jpg",
        actualPrice: 14999,
        discountedPrice: 3399,
      },
      {
        id: 5,
        title: "Men's Watch 1",
        image1: "./pictures/image5.jpg",
        image2: "./pictures/image1.jpg",
        actualPrice: 14999,
        discountedPrice: 3399,
      },
      {
        id: 6,
        title: "Men's Watch 2",
        image1: "./pictures/image6.jpg",
        image2: "./pictures/image2.jpg",
        actualPrice: 14999,
        discountedPrice: 3399,
      },
    ],
    "Ladies Watches": [
      {
        id: 1,
        title: "Men's Watch 1",
        image1: "./pictures/image1.jpg",
        image2: "./pictures/image2.jpg",
        actualPrice: 14999,
        discountedPrice: 3399,
      },
      {
        id: 2,
        title: "Men's Watch 1",
        image1: "./pictures/image1.jpg",
        image2: "./pictures/image2.jpg",
        actualPrice: 14999,
        discountedPrice: 3399,
      },
    ],
  };

  const categories = [
    {
      id: 1,
      image: "./pictures/menwatch.jpg",
      title: "Men's Watches",
      path: "Mens watches",
    },
    {
      id: 2,
      image: "./pictures/neckmen.jpeg",
      title: "Men's Jewellery",
      path: "/mens-jewellery",
    },
    {
      id: 3,
      image: "./pictures/neck.jpeg",
      title: "Ladies Jewellery",
      path: "/ladies-jewellery",
    },
    {
      id: 4,
      image: "./pictures/womenwatch.jpg",
      title: "Ladies Watches",
      path: "/ladies-watches",
    },
    {
      id: 5,
      image: "./pictures/sunglasses.jpg",
      title: "Sunglasses",
      path: "/sunglasses",
    },
  ];

  return (
    <>
      {/* Navbar Section */}
      <Navbar />

      {/* Hero Section */}
      <div className=" md:pt-18 relative w-full flex  justify-center items-center ">
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
          <img
            src={heroImages[currentIndex]}
            alt="Hero"
            className="absolute left-0 w-full h-full object-cover  transition-all duration-1000 ease-in-out"
          />
          <div className="absolute left-4 md:left-10 top-40 md:top-1/2 md:-translate-y-1/2 flex flex-col text-white">
            <div className="text-sm md:text-xl font-bold text-left">
              <p>Discover Our</p>
              <p className="uppercase text-2xl md:text-4xl">Best Seller</p>
            </div>
            <div className="flex flex-row gap-2 md:gap-4 mt-4">
              <button
                onClick={() => navigate("/forher")}
                className="bg-black hover:bg-gray-400 hover:text-black text-yellow-400 text-sm md:text-lg px-4 py-2 md:px-6 md:py-3 font-bold rounded-md transition duration-300 cursor-pointer"
              >
                FOR HER
              </button>
              <button
                onClick={() => navigate("/forhim")}
                className="bg-black hover:bg-gray-400 hover:text-black text-yellow-400 text-sm md:text-lg px-4 py-2 md:px-6 md:py-3 font-bold rounded-md transition duration-300 cursor-pointer"
              >
                FOR HIM
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-300 py-10 px-8 md:px-10 w-full">
        {/* Horizontal Scrollable Categories */}
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide px-2 space-x-4 md:justify-center justify-start">
          {categories.map((category) => (
            <Category
              key={category.id}
              title={category.title}
              image={category.image}
              onClick={() => {
                if (
                  ["Ladies Jewellery", "Ladies Watches", "Sunglasses"].includes(
                    category.title
                  )
                ) {
                  navigate("/forher", {
                    state: { selectedCategory: category.title },
                  });
                } else if (
                  ["Men's Watches", "Men's Jewellery"].includes(category.title)
                ) {
                  navigate("/forhim", {
                    state: { selectedCategory: category.title },
                  });
                } else {
                  navigate(category.path);
                }
              }}
            />
          ))}
        </div>
      </div>

      <BestSeller
        bestSellers={bestSellersData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Key Features Section */}
      <div className=" py-10 px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-gray-700 mb-2" />
            <p className="text-lg font-semibold">1 Year Warranty</p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCcw className="w-12 h-12 text-gray-700 mb-2" />
            <p className="text-lg font-semibold">7 Days Replacement</p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-12 h-12 text-gray-700 mb-2" />
            <p className="text-lg font-semibold">Free Delivery</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-12 h-12 text-gray-700 mb-2" />
            <p className="text-lg font-semibold">5,000+ Customers</p>
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="bg-gray-300 py-16 px-8">
        <h2 className="text-center text-3xl font-bold mb-10 uppercase tracking-wide">
          New at World-Cross
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Left Side - Two Items */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="./pictures/pic.jpg"
                alt="New Arrival 1"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="./pictures/image2.jpg"
                alt="New Arrival 2"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Center - Large Image */}
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
            <img
              src="./pictures/watch2.jpg"
              alt="New Arrival 3"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Two Items */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="./pictures/image4.jpg"
                alt="New Arrival 4"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="./pictures/image5.jpg"
                alt="New Arrival 5"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Explore All Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/watches")}
            className="bg-black text-yellow-400 px-6 py-3 text-lg font-bold uppercase rounded-md transition duration-300 hover:bg-gray-400 hover:text-black"
          >
            Explore New &gt;
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
      <ReviewsSection />

      <div className="py-12 bg-black text-white text-center">
        <h2 className="text-3xl font-bold mb-4">WHY CHOOSE WORLD-CROSS?</h2>
        <p className="text-lg">
          Premium quality, timeless elegance, and unmatched craftsmanship.
        </p>
      </div>

      {/* Custom CSS to Hide Scrollbar */}
      <style>
        {`
          .hide-scrollbar {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, and Opera */
          }
        `}
      </style>

    </>
  );
};

export default Home;
