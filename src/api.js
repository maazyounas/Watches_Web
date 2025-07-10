// src/api.js
import axios from "axios";

const BASE_URL = "https://your-api-base-url.com"; // replace with actual backend URL

export const registerUser = (userData) =>
  axios.post(`${BASE_URL}/users/register`, userData);

export const loginUser = (credentials) =>
  axios.post(`${BASE_URL}/users/login`, credentials);

export const getAllProducts = () =>
  axios.get(`${BASE_URL}/products/allProducts`);

export const getProductById = (id) =>
  axios.get(`${BASE_URL}/products/product/${id}`);

export const postReview = (reviewData) =>
  axios.post(`${BASE_URL}/products/addReview`, reviewData);

// Add more API functions as needed...
