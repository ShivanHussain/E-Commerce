'use client';

import React, { useState } from 'react';
import {
  Dialog,
  Popover,
} from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import DiamondIcon from '@mui/icons-material/Diamond';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import {  logout as logoutUser } from '../../../redux/slices/userSlice'; // Adjust the path
import SearchBar from '../Common/SearchBar';
import CardDrawer from '../Common/CardDrawer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const userNavigation = [
  { id: 'Printing Service', name: 'Printing Service', href: '/printingservices' },
  { id: 'Stationary', name: 'Stationary', href: '/stationary' },
  { id: 'Books', name: 'Books', href: '/books' },
  { id: 'Stores', name: 'Stores', href: '/store' },
];

const adminNavigation = [
  { id: 'Users', name: 'Users', href: '/admin/users' },
  { id: 'Products', name: 'Products', href: '/admin/products' },
  { id: 'Orders', name: 'Orders', href: '/admin/orders' },
  { id: 'AddProduct', name: 'AddProduct', href: '/admin/addproduct' },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated , message } = useSelector((state) => state.user); // Adjust slice if needed

  const [open, setOpen] = useState(false);
  const [drawOpen, setDrawOpen] = useState(false);

  const isAdmin = user?.role === 'Admin';

  const handleToggleCardDrawer = () => setDrawOpen(!drawOpen);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success(message || 'Logged out successfully');
    
    navigate("/");
  };

  const navigation = isAdmin ? adminNavigation : userNavigation;

  return (
    <>
      {/* Admin Header */}
      {isAdmin && (
        <div className="bg-gray-100 sticky top-0 flex flex-col z-50">
          <header className="w-full bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-400">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              <LogoutIcon fontSize="small" />
              Logout
            </button>
          </header>
        </div>
      )}

      {/* Navbar Container */}
      <div className={`z-50 bg-white sticky top-0 w-full shadow-md ${isAdmin ? 'sticky top-16' : ''}`}>
        {/* Mobile Menu */}
        <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
          <div className="fixed inset-0 z-50 flex">
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="space-y-6 px-4 py-6 border-t border-gray-200">
                {navigation.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
                <div className="flow-root">
                  {isAuthenticated ? (
                    <>
                      <a href="/profile" className="-m-2 block p-2 font-medium text-gray-900">My Account</a>
                    </>
                  ) : (
                    <>
                      <a href="/login" className="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
                      <a href="/signup" className="-m-2 mt-2 block p-2 font-medium text-gray-900">Create account</a>
                    </>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Desktop Navbar */}
        <header className="relative">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                {/* Mobile Button */}
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                >
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="/">
                    <DiamondIcon className="mr-2 text-gray-700" />
                  </a>
                </div>

                {/* Navigation Links */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                </Popover.Group>

                {/* Right Side */}
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:items-center lg:space-x-6">
                    {isAuthenticated ? (
                      <>
                        <a href="/profile" className="flex items-center text-gray-700 hover:text-gray-800">
                          <AccountCircleIcon className="mr-1" />
                          <span className="text-sm font-medium">My Account</span>
                        </a>
                      </>
                    ) : (
                      <>
                        <a href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-800">Sign in</a>
                        <span className="h-6 w-px bg-gray-200" />
                        <a href="/signup" className="text-sm font-medium text-gray-500 hover:text-gray-800">Create account</a>
                      </>
                    )}
                  </div>

                  {/* Country Selector */}
                  <div className="hidden lg:flex lg:ml-6">
                    <a href="/" className="flex items-center text-gray-700 hover:text-gray-800">
                      <img
                        alt="India"
                        src="https://th.bing.com/th/id/OIP.ubt810BdSHruJv5WyUjgdAHaFj?cb=iwp2&rs=1&pid=ImgDetMain"
                        className="h-5 w-5"
                      />
                      <span className="ml-3 text-sm font-medium">INDIA</span>
                    </a>
                  </div>

                  {/* Search and Cart */}
                  {!isAdmin && (
                    <>
                      <div className="lg:ml-6 hidden lg:flex">
                        <SearchBar />
                      </div>
                      <div className="ml-4 flow-root lg:ml-6">
                        <button onClick={handleToggleCardDrawer} className="group -m-2 flex items-center p-2">
                          <ShoppingBagIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>

          {/* Cart Drawer */}
          <CardDrawer drawOpen={drawOpen} handleToggleCardDrawer={handleToggleCardDrawer} />
        </header>
      </div>
    </>
  );
}
