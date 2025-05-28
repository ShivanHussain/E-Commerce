import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../../redux/slices/productSlice'; // Adjust path as needed

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            dispatch(searchProducts(searchTerm)); // 🔥 Dispatch search to Redux
        }
        setIsOpen(false);
    };

    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-16 z-50" : "w-auto"}`}>
            {isOpen ? (
                <form onSubmit={handleSearchSubmit} className='relative flex items-center justify-center w-full'>
                    <div className='relative w-1/2'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='bg-gray-100 px-4 py-2 pl-2 pr-2 rounded-lg focus:outline-none w-full placeholder:text-gray-700'
                        />
                        <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <button type="button"
                        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
                        onClick={handleSearchToggle}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </form>
            ) : (
                <button onClick={handleSearchToggle}>
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                </button>
            )}
        </div>
    );
}

export default SearchBar;
