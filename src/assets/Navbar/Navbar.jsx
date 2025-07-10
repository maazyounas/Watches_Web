import { useState, useEffect } from "react";
import { BsWatch } from "react-icons/bs";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleCart } = useCart();

  const [menuState, setMenuState] = useState({
    dropdownOpen: false,
    menuOpen: false,
    categoriesOpen: false,
    showLogin: false,
    showRegister: false,
    showResetPassword: false,
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleState = (key) => {
    setMenuState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setMenuState((prev) => ({ ...prev, dropdownOpen: false }));
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`transition-all duration-300 ${
          isScrolled ? "bg-black shadow-lg py-4" : "bg-black py-5"
        } text-white flex justify-between items-center px-4 md:px-6`}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2 text-2xl font-bold md:ml-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1>World-Cross</h1>
          <BsWatch className="text-2xl hover:text-yellow-400 transition-all duration-300" />
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-8">
            {[
              { name: "Home", path: "/" },
              { name: "Watches", path: "/watches" },
              { name: "Jewellery", path: "/jewellery" },
              { name: "About us", path: "/aboutus" },
              { name: "Support", path: "/support" },
            ].map(({ name, path }) => (
              <li key={name}>
                <a
                  onClick={() => navigate(path)}
                  className="text-xl cursor-pointer hover:text-yellow-400 transition-all duration-300"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 relative">
          {/* Account Dropdown */}
          <div
            className="hidden md:flex flex-col items-center text-sm dropdown-container"
            onMouseEnter={() => toggleState("dropdownOpen")}
            onMouseLeave={() => toggleState("dropdownOpen")}
          >
            <button aria-label="Account" onClick={() => navigate("/admin")}>
              <RiAccountPinCircleFill className="text-3xl cursor-pointer hover:text-yellow-400 transition-all duration-300" />
            </button>

            {menuState.dropdownOpen && (
              <div className="absolute top-8 bg-white text-black shadow-lg rounded-md p-4 w-48 text-center z-50">
                <button
                  className="bg-yellow-400 text-black px-4 py-2 rounded-md w-full font-semibold hover:bg-gray-400"
                  onClick={() => toggleState("showLogin")}
                >
                  Sign In
                </button>
                <p className="mt-2 text-sm">
                  Not a member yet?{" "}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => toggleState("showRegister")}
                  >
                    Create new account
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div className="hidden md:flex flex-col items-center text-sm">
            <FaShoppingCart
              className="text-3xl cursor-pointer hover:text-yellow-400 transition-all duration-300"
              onClick={toggleCart}
            />
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden"
            onClick={() => toggleState("menuOpen")}
            aria-label="Toggle Menu"
          >
            {menuState.menuOpen ? (
              <FaTimes className="text-3xl hover:text-yellow-400 transition-all duration-300" />
            ) : (
              <FaBars className="text-3xl hover:text-yellow-400 transition-all duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {menuState.menuOpen && (
          <div className="fixed top-12 left-0 w-full bg-black text-white flex flex-col py-6 px-10 md:hidden z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Categories */}
            <button
              className="flex justify-between items-center text-xl w-full hover:text-yellow-400"
              onClick={() => toggleState("categoriesOpen")}
            >
              Categories{" "}
              <IoIosArrowForward
                className={`${
                  menuState.categoriesOpen ? "rotate-90" : ""
                } transition-transform`}
              />
            </button>
            {menuState.categoriesOpen && (
              <ul className="flex flex-col space-y-3 pl-4 mt-2">
                {["WOMEN", "MEN", "WATCHES", "JEWELLERY",].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex justify-between items-center"
                    >
                      <p
                        onClick={() => {
                          toggleState("menuOpen");
                          const route =
                            item === "WOMEN"
                              ? "forher"
                              : item === "MEN"
                              ? "forhim"
                              : item.toLowerCase();
                          navigate(`/${route}`);
                        }}
                        className="cursor-pointer hover:text-gray-400 duration-300"
                      >
                        {item}
                      </p>
                      <IoIosArrowForward />
                    </li>
                  )
                )}
              </ul>
            )}

            {/* Other Links */}
            <ul className="flex flex-col space-y-4 pl-2 mt-6">
              {["About us", "Support"].map((link) => (
                <li key={link} className="flex justify-between items-center">
                  <p
                    onClick={() => {
                      toggleState("menuOpen");
                      navigate(`/${link.toLowerCase().replace(" ", "")}`);
                    }}
                    className="cursor-pointer hover:text-gray-400 duration-300"
                  >
                    {link}
                  </p>
                  <IoIosArrowForward />
                </li>
              ))}
            </ul>

            {/* Mobile Account and Cart */}
            <div className="flex items-center justify-between mt-6">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => toggleState("showLogin")}
              >
                <RiAccountPinCircleFill className="text-3xl hover:text-yellow-400" />
                <span>Account</span>
              </div>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleCart}
              >
                <FaShoppingCart className="text-3xl hover:text-yellow-400" />
                <span>Cart</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Sign In Modal */}
      {menuState.showLogin && !menuState.showResetPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border rounded"
            />
            <button className="bg-yellow-400 text-black w-full py-2 rounded-md font-semibold hover:bg-gray-400">
              Sign In
            </button>
            <p className="mt-2 text-sm text-center">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => toggleState("showResetPassword")}
              >
                Forgot Your Password?
              </button>
            </p>
            <button
              className="mt-4 text-sm text-gray-600 w-full text-center hover:underline"
              onClick={() => toggleState("showLogin")}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {menuState.showResetPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 mb-2 border rounded"
            />
            <button className="bg-yellow-400 text-black w-full py-2 rounded-md font-semibold hover:bg-gray-400">
              Reset Password
            </button>
            <button
              className="mt-4 text-sm text-gray-600 w-full text-center hover:underline"
              onClick={() =>
                setMenuState((prev) => ({
                  ...prev,
                  showResetPassword: false,
                  showLogin: true,
                }))
              }
            >
              Back to Sign In
            </button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {menuState.showRegister && (
        <form className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Create New Account</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="w-full p-2 mb-2 border rounded"
            />
            <button className="bg-yellow-400 text-black w-full py-2 rounded-md font-semibold hover:bg-gray-400">
              Register
            </button>
            <button
              className="mt-4 text-sm text-gray-600 w-full text-center hover:underline"
              onClick={() => toggleState("showRegister")}
            >
              Close
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Navbar;
