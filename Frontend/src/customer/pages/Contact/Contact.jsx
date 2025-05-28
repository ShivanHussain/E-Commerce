import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm } from "../../../redux/slices/contactSlice";
import { toast } from "react-toastify";

export default function Contact() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
    setFormData({
      name: "",
      email: "",
      message: ""
    })
  };

  React.useEffect(() => {
    if (success) toast.success(success);
    if (error) toast.error(error);
  }, [success, error]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Get In Touch</h2>
              <p className="text-gray-700">
                We’d love to hear from you! Send us a message using the form or contact us using the info below.
              </p>

              <div className="space-y-4">
                <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:example@example.com" className="text-blue-600 hover:underline">example@example.com</a></p>
                <p className="text-gray-700"><strong>Phone:</strong> +123 456 7890</p>
                <p className="text-gray-700"><strong>Address:</strong>Bareilly, Uttar Pradesh, India</p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {/* <button
              type="submit"
              className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
            >
              Send Message
            </button> */}
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className={`w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );

}
