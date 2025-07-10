import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Camille Beaudoin", location: "Montreal, Canada", time: "7 hours ago",
    review: "I bought a bracelet for my boyfriend, and we both love it! :)",
  },
  {
    name: "Melissa",
    location: "Portland, United States",
    time: "13 hours ago",
    review:
      "I love it and so does my husband. The dark and beautiful stone of this bracelet looks great on his skin tone and he really enjoys the weight of it.",
  },
  {
    name: "Joseph Romzek",
    location: "Dearborn, United States",
    time: "14 hours ago",
    review:
      "Love my new Holzkern watch with the dark green marble dial. It’s absolutely gorgeous and keeps great time.",
  },
  {
    name: "Jacqueline",
    location: "Canada",
    time: "16 hours ago",
    review:
      "Definitely a gift to give to someone who is difficult to buy for as the bandlet is unique, well designed and beautiful.",
  },
  {
    name: "Tom",
    location: "Pickering, United Kingdom",
    time: "17 hours ago",
    review: "Beautiful, really very happy.",
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  return (
    <div className="py-10 px-6 text-center bg-gradient-to-b from-white to-blue-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-black">WATCHES & JEWELLERY FROM WORLD-CROSS</h1>
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center p-6 rounded-lg shadow-md bg-white">
        {/* Left Section - Rating */}
        <div className="w-full md:w-1/3 text-center md:text-left md:pr-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 md:pl-10">Excellent</h2>
          <div className="flex justify-center md:justify-start items-center gap-1 md:pl-14">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-2xl md:text-3xl" />
            ))}
          </div>
          <p className="text-lg mt-2 font-semibold md:pl-17">4.64 average</p>
          <p className="text-gray-500 text-md md:pl-18">1,222 reviews</p>
        </div>

        {/* Right Section - Reviews */}
        <div className="relative w-full md:w-4/3 bg-blue-100 p-8 rounded-lg shadow-lg overflow-hidden">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black p-1 rounded-full text-white shadow-lg hover:bg-gray-700 transition z-10"
          >
            <IoIosArrowBack className="text-3xl" />
          </button>

          {/* Review Cards */}
          <div
            className="flex transition-transform duration-500 ease-in-out space-x-4 md:space-x-8"
            style={{
              transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 768 ? 1 : 4))}%)`,
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="w-full md:w-1/4 flex-shrink-0 p-6 bg-white  rounded-xl shadow-lg mx-1 md:mx-2 text-center"
              >
                <h3 className="font-bold text-lg md:text-xl">{review.name}</h3>
                <p className="text-gray-500 text-sm">{review.location} • {review.time}</p>
                <p className="mt-4 italic text-blue-900">"{review.review}"</p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black p-1 rounded-full text-white shadow-lg hover:bg-gray-700 transition z-10"
          >
            <IoIosArrowForward className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
