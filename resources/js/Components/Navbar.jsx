export default function Navbar() {
    return (
        <nav className="bg-orange-500 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <div className="flex items-center space-x-2">
                    <img src="./images/logo.png" alt="Symphonia Logo" className="h-8 w-8" />
                    <div className="text-2xl font-bold text-white">Symphonia</div>
                </div>
                <ul className="flex flex-1 items-center justify-center space-x-6 text-white">
                    <li>
                        <a href="#home" className="hover:text-gray-300">
                            Beranda
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="hover:text-gray-300">
                            Alat Musik
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-gray-300">
                            Tentang Kami
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-gray-300">
                            Kontak
                        </a>
                    </li>
                </ul>
                <a href="/login" className="ml-auto rounded-md bg-white px-4 py-2 text-orange-500 hover:bg-gray-200">
                    Login
                </a>
            </div>
        </nav>
    );
}
