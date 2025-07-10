import React from "react";

const Category = ({ image, title, onClick }) => {
  return (
    <div
      className="group flex flex-col items-center justify-center cursor-pointer min-w-[120px] sm:min-w-[150px] lg:min-w-[190px] m-5"
      onClick={onClick}
    >
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-46 md:h-46 overflow-hidden hover:shadow-lg rounded-full p-[5px] transition-transform duration-300 group-hover:scale-105">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <h3 className="text-sm sm:text-lg font-semibold mt-2 text-center group-hover:text-yellow-700 transition-all duration-300">
        {title}
      </h3>
    </div>
  );
};

export default Category;
