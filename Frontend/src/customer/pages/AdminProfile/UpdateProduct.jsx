import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  updateProduct,
  clearProductErrors,
  clearProductMessages,
} from "../../../redux/slices/productSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  

  const { loading, error, message, product } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Fetch product details on mount (or when productId changes)
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
      dispatch(clearProductErrors());
    }
  }, [dispatch, id]);

  // When product data loads, set form fields and preview image
  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
      });

      if (product.image?.url) {
        setPreview(product.image.url); // use product.image.url based on your backend shape
      } else {
        setPreview("");
      }
    }
  }, [product]);

  // Show toast messages for error and success
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearProductMessages());
    }
  }, [error, message, dispatch]);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle form submit (update product)
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (image) {
      formData.append("image", image);
    }

    dispatch(updateProduct(id, formData));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md mt-10 mb-10 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 text-sm font-medium text-left">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-left">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1 text-sm font-medium text-left">
            Price (₹)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block mb-1 text-sm font-medium text-left">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label htmlFor="stock" className="block mb-1 text-sm font-medium text-left">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            min="0"
            value={form.stock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-left">Product Image</label>

          {/* Hidden file input */}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Custom styled button to trigger file input */}
          <label
            htmlFor="image"
            className="block w-full cursor-pointer bg-gray-100 border border-gray-300 rounded px-4 py-3 text-center text-gray-700 hover:bg-gray-200 transition"
          >
            {image ? image.name : "Change Product Image"}
          </label>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded mx-auto"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white py-2 rounded-md font-medium bg-black hover:bg-gray-800 transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
