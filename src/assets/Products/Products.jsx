import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("/products/allProducts");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            to={`/product-details/${product._id}`}
            key={product._id}
            className="border p-4 rounded shadow hover:shadow-md"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <p className="text-sm">{product.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
