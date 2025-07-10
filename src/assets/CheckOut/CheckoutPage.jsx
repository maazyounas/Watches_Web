import { useCart } from "../Context/CartContext";
import  { useState } from 'react';
import {  FaLock, FaShippingFast, FaRegCreditCard, FaMoneyBillWave, FaChevronRight } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BsFillCreditCardFill } from 'react-icons/bs';

const CheckoutPage = () => {
  const { cartItems } = useCart(); // Access cart items from context
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    saveInfo: false,
    newsletter: false
  });

  // Helper functions for price calculations
  const normalizePrice = (price) => {
    if (typeof price === 'number') return price;
    const cleaned = String(price).replace(/[^\d.]/g, '').replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  const formatPrice = (price) => {
    const num = normalizePrice(price);
    return num.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = normalizePrice(item.discountedPrice || item.price);
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Indicator */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-yellow-500">Cart</span>
            <FaChevronRight className="mx-2 text-xs" />
            <span className="font-medium text-black">Information</span>
            <FaChevronRight className="mx-2 text-xs" />
            <span>Shipping</span>
            <FaChevronRight className="mx-2 text-xs" />
            <span>Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 mt-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaLock className="text-green-500 mr-2" />
              Secure Checkout
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Contact Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <IoMdCheckmarkCircleOutline className="mr-2 text-yellow-500" />
                  Contact Information
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-300"
                    checked={formData.newsletter}
                    onChange={handleChange}
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaShippingFast className="mr-2 text-yellow-500" />
                  Delivery Address
                </h3>
                <div className="bg-yellow-50 p-3 rounded-md mb-4">
                  <p className="text-sm text-yellow-700">Delivering to Pakistan</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address * <span className="text-gray-500 text-xs">(Include complete address & nearest landmark)</span>
                  </label>
                  <textarea
                    name="address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    rows="3"
                    placeholder="House #, Street, Area, Landmark..."
                    value={formData.address}
                    onChange={handleChange}
                    required
                    minLength={30}
                  />
                  <p className="text-xs text-gray-500 mt-1">At least 12 words required</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal code (optional)</label>
                    <input
                      type="text"
                      name="postalCode"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="03XX-XXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{4}-[0-9]{7}"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: 03XX-XXXXXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-300"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                  />
                  <label htmlFor="saveInfo" className="text-sm text-gray-600">
                    Save this information for next time
                  </label>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaShippingFast className="mr-2 text-yellow-500" />
                  Shipping Method
                </h3>
                <p className="text-sm text-gray-600 mb-4">Choose a shipping method</p>
                
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="freeDelivery"
                        name="shipping"
                        className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-300"
                        defaultChecked
                      />
                      <label htmlFor="freeDelivery" className="font-medium">Standard Delivery</label>
                    </div>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="p-4 text-sm text-gray-600">
                    <p>Delivery within 3-7 business days</p>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <BsFillCreditCardFill className="mr-2 text-yellow-500" />
                  Payment Method
                </h3>
                <div className="flex items-center bg-green-50 p-3 rounded-md mb-4">
                  <FaLock className="text-green-500 mr-2" />
                  <span className="text-sm text-green-700">All transactions are secure and encrypted</span>
                </div>
                
                <div className="space-y-4">
                  <div className={`flex items-center border rounded-md p-4 transition-all ${paymentMethod === 'cod' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}>
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-300"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <label htmlFor="cod" className="flex items-center font-medium cursor-pointer">
                      <FaMoneyBillWave className="mr-2 text-green-500 text-xl" />
                      <div>
                        <p className="font-medium">Cash on Delivery (COD)</p>
                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className={`flex items-center border rounded-md p-4 transition-all ${paymentMethod === 'payfast' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}>
                    <input
                      type="radio"
                      id="payfast"
                      name="payment"
                      className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-300"
                      checked={paymentMethod === 'payfast'}
                      onChange={() => setPaymentMethod('payfast')}
                    />
                    <label htmlFor="payfast" className="flex items-center font-medium cursor-pointer">
                      <FaRegCreditCard className="mr-2 text-blue-500 text-xl" />
                      <div>
                        <p className="font-medium">PAYFAST</p>
                        <p className="text-sm text-gray-500">Pay via Debit/Credit/Wallet/Bank Account</p>
                      </div>
                    </label>
                  </div>
                </div>
                
                {paymentMethod === 'payfast' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      After clicking "Submit Order", you will be redirected to PAYFAST to complete your purchase securely.
                    </p>
                    <div className="flex space-x-3 mt-3">
                      <div className="bg-gray-200 rounded-md p-2">
                        <div className="bg-blue-700 w-8 h-6 rounded-sm"></div>
                      </div>
                      <div className="bg-gray-200 rounded-md p-2">
                        <div className="bg-red-600 w-8 h-6 rounded-sm"></div>
                      </div>
                      <div className="bg-gray-200 rounded-md p-2">
                        <div className="bg-green-700 w-8 h-6 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Billing Address</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sameAddress"
                      name="billing"
                      className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-300"
                      checked={sameAsShipping}
                      onChange={() => setSameAsShipping(true)}
                    />
                    <label htmlFor="sameAddress" className="font-medium">Same as shipping address</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="differentAddress"
                      name="billing"
                      className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-300"
                      checked={!sameAsShipping}
                      onChange={() => setSameAsShipping(false)}
                    />
                    <label htmlFor="differentAddress" className="font-medium">Use a different billing address</label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-yellow-300 py-4 px-6 rounded-md font-medium hover:bg-gray-800 transition duration-200 text-lg shadow-lg"
              >
                Submit Order
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b">Order Summary</h2>
              
              <div className="max-h-[400px] overflow-y-auto pr-2">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 py-4 text-center">Your cart is empty</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center mb-4 py-2 border-b">
                      <div className="bg-gray-100 p-2 rounded-lg mr-4">
                        <img 
                          src={item.image1 || "https://via.placeholder.com/80"} 
                          alt={item.title} 
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.color && `Color: ${item.color}`}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs">Qty: {item.quantity || 1}</span>
                          <span className="font-medium">
                            Rs {formatPrice(item.discountedPrice || item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rs {formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 mt-3">
                    <span className="font-medium">Total</span>
                    <div>
                      <div className="text-sm text-gray-500 text-right">PKR</div>
                      <div className="text-xl font-bold">
                        Rs {formatPrice(calculateTotal())}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-yellow-50 p-4 rounded-md">
                <div className="flex items-center text-yellow-700">
                  <FaShippingFast className="mr-2" />
                  <p className="text-sm">Free shipping to Pakistan</p>
                </div>
                <p className="text-xs text-yellow-600 mt-2">
                  Orders are processed within 24 hours and shipped within 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;