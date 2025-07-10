import React, { useState } from 'react';

const BulkOrder = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    productName: '',
    quantity: '',
    requirements: '',
    updates: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bulk Order Submitted:', formData);
    // You can send this to your backend here
    alert('Form submitted successfully!');
  };

  return (
    <div className="mt-20 bg-gray-50 min-h-screen px-4 py-8 md:px-16">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-700 mb-2">Bulk & Corporate Orders</h1>
        <p className="text-lg text-gray-600">Got a big zero order? For shipments of 25 units or more, hit us up!</p>
        <p className="text-sm text-gray-500 mt-2">Fill the form & our representative will contact you back.</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          name="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="p-3 border rounded"
        />
        <input
          name="lastName"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="p-3 border rounded"
        />
        <input
          name="email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-3 border rounded col-span-1 md:col-span-2"
        />
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 font-semibold">+92</span>
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 border rounded w-full"
          />
        </div>
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="p-3 border rounded"
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="p-3 border rounded"
        />
        <input
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
          className="p-3 border rounded"
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity (Min 5)"
          min={5}
          value={formData.quantity}
          onChange={handleChange}
          required
          className="p-3 border rounded"
        />
        <textarea
          name="requirements"
          placeholder="Any specific requirement?"
          value={formData.requirements}
          onChange={handleChange}
          className="p-3 border rounded col-span-1 md:col-span-2 h-24"
        />

        {/* Checkbox */}
        <div className="col-span-1 md:col-span-2 flex items-start gap-2">
          <input
            type="checkbox"
            name="updates"
            checked={formData.updates}
            onChange={handleChange}
            className="mt-1"
          />
          <label className="text-sm text-gray-700">
            Keep me up to date on news and offers.
            <br />
            <span className="text-xs text-gray-500">
              For more information on how we process your data for marketing communication, check our{' '}
              <a href="/privacy-policy" className="text-pink-600 underline">Privacy Policy</a>.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
        >
          Submit Bulk Order Request
        </button>
      </form>
    </div>
  );
};

export default BulkOrder;
