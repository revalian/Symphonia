import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from the API
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/category');

            if (response.data.status) {
                setCategories(response.data.data); // Assuming the API returns an array
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []); // Empty dependency array to run only once on component mount

    return (
        <nav className="sticky top-0 z-50 bg-orange-500 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo and Title */}
                <div className="flex items-center space-x-2">
                    <img src="./images/logo.png" alt="Symphonia Logo" className="h-12 w-12" />
                    <div className="text-2xl font-bold text-white">Symphonia</div>
                </div>

                {/* Navigation Links */}
                <ul className="flex flex-1 items-center justify-center space-x-6 text-white">
                    <li>
                        <a href="/" className="hover:text-gray-300">
                            Beranda
                        </a>
                    </li>
                    {/* Alat Musik Dropdown */}
                    <li className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-2 rounded-md bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 focus:outline-none"
                        >
                            <span>Alat Musik</span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-40 space-y-2 rounded-md bg-white text-black shadow-lg">
                                {categories.map((item) => (
                                    <a
                                        href="#tradisional"
                                        className="block transform rounded-md bg-white px-6 py-3 text-center text-black transition duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </li>
                    <li>
                        <a href="AboutUs" className="hover:text-gray-300">
                            Tentang Kami
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-gray-300">
                            Kontak
                        </a>
                    </li>
                </ul>

                <div className="ml-auto flex items-center space-x-4">
                    {/* Search Bar */}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Cari..."
                            className="rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />
                        <button className="absolute right-2 text-orange-500 hover:text-orange-700">
                            <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Cart Button */}
                    <button className="relative flex items-center justify-center rounded-md bg-white px-4 py-2 text-orange-500 hover:bg-gray-200">
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2 h-5 w-5" />
                        <span>Cart</span>
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            0
                        </span>
                    </button>

                    {/* Login Button */}
                    <a href="/login" className="rounded-md bg-white px-4 py-2 text-orange-500 hover:bg-gray-200">
                        Login
                    </a>
                </div>
            </div>
        </nav>
    );
}
