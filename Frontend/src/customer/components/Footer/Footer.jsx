/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Facebook,
  Twitter,
  Google,
  Instagram,
  LinkedIn,
  GitHub,
  Home,
  Email,
  Phone,
  Print,
  Diamond
} from '@mui/icons-material';

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-slate-700">
      {/* Top Social Section */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center px-4 py-6 border-b border-slate-600">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <span className='text-slate-900'>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center sm:justify-end space-x-4">
          <a href="/" className="hover:text-black"><Facebook /></a>
          <a href="/" className="hover:text-black"><Twitter /></a>
          <a href="/" className="hover:text-black"><Google /></a>
          <a href="/" className="hover:text-black"><Instagram /></a>
          <a href="/" className="hover:text-black"><LinkedIn /></a>
          <a href="https://github.com/ShivanHussain" className="hover:text-black"><GitHub /></a>
        </div>
      </div>

      {/* Footer Content */}
    
    <footer className="bg-gray-200 text-gray-800 py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

          {/* Company Info */}
          <div className="text-center md:text-left">
            <h6 className="uppercase font-bold mb-4 flex items-center justify-center md:justify-start text-lg">
              <Diamond className="mr-2 text-black" /> ElixBuy
            </h6>
            <p className="text-sm">
              ElixBuy is your one-stop online marketplace, bringing you the latest products at unbeatable prices.
              From everyday essentials to trending finds, we make shopping seamless, secure, and smart.
            </p>
          </div>

          {/* Useful Links */}
          <div className="text-center md:text-left">
            <h6 className="uppercase font-bold mb-4 text-lg">Support</h6>
            <ul className="space-y-2 text-sm">
              <li><a href="/shipping" className="hover:text-black transition">Shipping Policy</a></li>
              <li><a href="/privacy" className="hover:text-black transition">Privacy Policy</a></li>
              <li><a href="/contact" className="hover:text-black transition">Contact</a></li>
              <li><a href="/refundpolicy" className="hover:text-black transition">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h6 className="uppercase font-bold mb-4 text-lg">Contact</h6>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-center md:justify-start">
                <Home className="mr-2 text-black" /> Bareilly, Uttar Pradesh, India
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Email className="mr-2 text-black" /> info@example.com
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="mr-2 text-black" /> +91 234 567 88
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Print className="mr-2 text-black" /> +91 234 567 89
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>

      {/* Bottom Footer */}
      <div className="text-center p-4 bg-gray-400 text-md text-slate-900 font-medium">
        © {new Date().getFullYear()} Copyright:
        <a href="https://shivanportfolio123.netlify.app" className="font-bold text-slate-900 hover:underline ml-1">
          Shivan.com
        </a>
      </div>
    </footer>
  );
}
