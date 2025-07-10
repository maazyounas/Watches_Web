import  { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    issueType: "Product Issue",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace this with actual API/email sending logic
    console.log("Complaint submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-28">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Submit a Complaint</h2>
      {submitted ? (
        <div className="text-green-600 text-center font-semibold">
          ✅ Thank you! Your complaint has been submitted. We will contact you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 p-2 rounded"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div>
            <label className="block font-medium">Order ID (if applicable)</label>
            <input
              type="text"
              name="orderId"
              className="w-full border border-gray-300 p-2 rounded"
              onChange={handleChange}
              value={formData.orderId}
            />
          </div>

          <div>
            <label className="block font-medium">Issue Type</label>
            <select
              name="issueType"
              className="w-full border border-gray-300 p-2 rounded"
              onChange={handleChange}
              value={formData.issueType}
            >
              <option>Product Issue</option>
              <option>Late Delivery</option>
              <option>Damaged Item</option>
              <option>Wrong Item Delivered</option>
              <option>Payment Problem</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Message</label>
            <textarea
              name="message"
              className="w-full border border-gray-300 p-2 rounded"
              rows="4"
              required
              onChange={handleChange}
              value={formData.message}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Submit Complaint
          </button>
        </form>
      )}
    </div>
  );
};

export default ComplaintForm;
