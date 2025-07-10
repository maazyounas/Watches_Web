import { useCart } from "../Context/CartContext";
import { IoClose } from "react-icons/io5";
import CheckoutPage from "../CheckOut/CheckOutPage";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isCartOpen,
    toggleCart,
  } = useCart();

  const navigate = useNavigate();
  // Helper function to normalize prices
  const normalizePrice = (price) => {
    if (typeof price === 'number') return price;
    
    const cleaned = String(price)
      .replace(/[^\d.]/g, '')
      .replace(/,/g, '');
    
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  // Calculate total with price normalization
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = normalizePrice(item.discountedPrice);
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  // Format price for display
  const formatPrice = (price) => {
    const num = normalizePrice(price);
    return num.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  return (
    <>
      {/* Overlay with higher z-index */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={toggleCart}
        ></div>
      )}

      {/* Sidebar with even higher z-index */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-[9999] transform transition-transform duration-300 shadow-lg ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="text-3xl text-black hover:text-yellow-500 transition-colors"
              >
                <IoClose />
              </button>
            </div>

            {/* Empty cart */}
            {cartItems.length === 0 ? (
              <div>
                <p className="text-gray-600 text-sm">Your cart is empty.</p>
                <p className="mt-3 text-xs text-black">
                  Browse our bestsellers:
                </p>
                <div className="mt-6 space-y-3">
                  <button
                    className="w-full bg-black text-yellow-300 px-4 py-2 text-sm font-bold rounded hover:bg-gray-300 hover:text-black transition-all"
                    onClick={() => {
                      toggleCart();
                      window.location.href = "/forher";
                    }}
                  >
                    BestSellers For Her
                  </button>
                  <button
                    className="w-full bg-black text-yellow-300 px-4 py-2 text-sm font-bold rounded hover:bg-gray-300 hover:text-black transition-all"
                    onClick={() => {
                      toggleCart();
                      window.location.href = "/forhim";
                    }}
                  >
                    BestSellers For Him
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-2"
                  >
                    <img
                      src={item.image1}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        Rs.{formatPrice(item.discountedPrice)}
                      </p>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-sm transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-lg hover:text-red-700 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Checkout */}
          {cartItems.length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-base font-bold mb-2">
                Total: Rs.{formatPrice(calculateTotal())}
              </p>
              <button onClick={()=> navigate("/checkoutpage")}
              className="w-full bg-black text-yellow-300 py-2 rounded font-semibold hover:bg-yellow-400 hover:text-black transition-colors">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;