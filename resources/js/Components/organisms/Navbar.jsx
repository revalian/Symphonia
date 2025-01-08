import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from '@/Components/molecules/Dropdown';
import { usePage } from '@inertiajs/react';

export default function Navbar({ onSearch }) { // Tambahkan props 'onSearch'
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const user = usePage().props.auth.user;

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/category');
            if (response.data.status) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query); // Simpan query di Navbar
        if (query.length > 2) {
            setSearchLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/search?query=${query}`);
                setSearchResults(response.data.data);
                onSearch(response.data.data, query); // Kirim hasil pencarian dan query ke komponen induk
            } catch (error) {
                console.error('Error fetching search results:', error);
                onSearch([], query); // Tetap kirim query meskipun ada error
            } finally {
                setSearchLoading(false);
            }
        } else {
            setSearchResults([]);
            onSearch([], query); // Kosongkan hasil pencarian jika input terlalu pendek
        }
    };
    

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-orange-500 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <div className="flex items-center space-x-2">
                    <img src="/images/logo.png" alt="Symphonia Logo" className="h-12 w-12" />
                    <div className="text-2xl font-bold text-white">Symphonia</div>
                </div>
                <ul className="flex flex-1 items-center justify-center space-x-6 text-white">
                    <li><a href="/" className="hover:text-gray-300">Beranda</a></li>
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
                                        key={item.id}
                                        href={`/category/${item.slug}`}
                                        className="block transform rounded-md bg-white px-6 py-3 text-center text-black transition duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </li>
                    <li><a href="AboutUs" className="hover:text-gray-300">Tentang Kami</a></li>
                </ul>

                <div className="ml-auto flex items-center space-x-4">
    <div className="relative flex flex-col items-center">
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
            }}
            placeholder="Cari..."
            className="rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button className="absolute right-2 text-orange-500 hover:text-orange-700">
            <FontAwesomeIcon icon={faSearch} className="h-5 w-5 mt-3" />
        </button>
    </div>

    <a
    href="/checkout"
    className="relative flex items-center justify-center rounded-md bg-white px-4 py-2 text-orange-500 hover:bg-gray-200"
    >
        <FontAwesomeIcon icon={faShoppingCart} className="mr-2 h-5 w-5" />
        <span>Cart</span>
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            0
        </span>
    </a>

    {user ? (
        // Jika user sudah login
        <div className="hidden sm:ms-6 sm:flex sm:items-center">
            <div className="relative ms-3">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                            >
                                {user.name}
                                <svg
                                    className="-me-0.5 ms-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    ) : (
        // Jika user belum login
        <a href="/login" className="rounded-md bg-white px-4 py-2 text-orange-500 hover:bg-gray-200">
            Login
        </a>
    )}
</div>

            </div>
        </nav>
    );
}

