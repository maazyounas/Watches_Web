import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CategoryProductLayout = ({ categories, products, categoryRefs, handleAddToCart }) => {
  const scrollRefs = useRef({});

  const scrollCategory = (title, direction) => {
    const scrollContainer = scrollRefs.current[title];
    if (scrollContainer) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="px-2 md:px-10">
      {categories.map((category) => (
        <div
          key={category.id}
          ref={categoryRefs[category.title]}
          className="mt-16 relative scroll-mt-[100px]" // This line fixes the hidden title
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            {category.title}
          </h3>

          {/* Scroll Buttons */}
          <button
            onClick={() => scrollCategory(category.title, "left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hidden md:flex"
          >
            <IoIosArrowBack className="text-2xl" />
          </button>

          {/* Horizontal Scrollable Product List */}
          <div
            ref={(el) => (scrollRefs.current[category.title] = el)}
            className="flex overflow-x-auto space-x-4 hide-scrollbar py-2 px-2"
          >
            {products
              .filter((product) => product.category === category.title)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-72 md:w-1/5 bg-white shadow-md rounded-lg p-3 border hover:shadow-xl transition duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover"
                  />
                  <p className="text-center mt-3 font-medium text-base">
                    {product.name}
                  </p>
                  <p className="text-center text-red-500 font-bold">
                    Rs.{product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="cursor-pointer mt-2 bg-black text-yellow-300 py-2 px-4 w-full font-bold rounded-md hover:bg-gray-400 hover:text-black transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>

          <button
            onClick={() => scrollCategory(category.title, "right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hidden md:flex"
          >
            <IoIosArrowForward className="text-2xl" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryProductLayout;
