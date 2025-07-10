import React, { useState } from "react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId && phone && email) {
      setSubmitted(true);
      // TODO: Call backend API to track order
      console.log("Tracking order:", { orderId, phone, email });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Track Your Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
              Order ID
            </label>
            <input
              id="orderId"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter your Order ID"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter the same number used in order"
            />
            <p className="text-xs text-gray-500 mt-1">
              Please use the same contact number you provided while placing the order.
            </p>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter your email address"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
          >
            Track Order
          </button>
        </form>
        {submitted && (
          <p className="mt-6 text-green-600 font-medium text-center">
            Your request has been submitted. Tracking details will be shown here.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
