import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products/addProduct"; // Update this if needed

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    imageUrls: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch Products & Orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, orderRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/products/getAllProducts`),
          axios.get(`${API_BASE_URL}/orders/getAllOrders`),
        ]);
        setProducts(productRes.data);
        setOrders(orderRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price || !form.category || !form.brand || form.stock === "") {
      alert("All fields are required!");
      return;
    }

    try {
      if (editingProductId) {
        await axios.put(`${API_BASE_URL}/products/updateProduct/${editingProductId}`, form);
      } else {
        await axios.post(`${API_BASE_URL}/products/addProduct`, form);
      }

      window.location.reload();
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to save product"));
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/products/deleteProduct/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to delete product"));
    }
  };

  // Load Product into Form for Editing
  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setForm(product);
  };

  // Update Order Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/orders/${id}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? { ...order, status: newStatus } : order))
      );
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to update order"));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 mb-6 rounded">
        <h3 className="text-xl font-semibold mb-3">{editingProductId ? "Edit Product" : "Add Product"}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="p-2 border rounded" required />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="p-2 border rounded" required />
          <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="imageUrls" placeholder="Image URLs (comma separated)" value={form.imageUrls} onChange={handleChange} className="p-2 border rounded" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 border rounded col-span-2" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Loading & Error */}
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Table */}
      <h3 className="text-xl font-semibold mt-6">Products</h3>
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg mt-2">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border hover:bg-gray-100">
              <td className="border p-2">{product._id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.brand}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-700">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Table */}
      <h3 className="text-xl font-semibold mt-6">Orders</h3>
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg mt-2">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border hover:bg-gray-100">
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.customerName}</td>
              <td className="border p-2">${order.totalPrice}</td>
              <td className="border p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
