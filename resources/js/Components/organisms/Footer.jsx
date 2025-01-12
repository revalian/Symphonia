export default function Footer() {
    return (
        <footer className="mt-8 bg-gray-800 py-10 text-white">
            <div className="container mx-auto">
                {/* Bagian atas footer */}
                <div className="flex flex-wrap justify-between gap-8 px-4 text-center md:text-left">
                    {/* Tentang */}
                    <div className="w-full md:w-1/3">
                        <h3 className="mb-4 text-lg font-semibold text-orange-400">Tentang Symphonia</h3>
                        <p className="text-gray-400">
                            Symphonia adalah penyedia alat musik terkemuka yang menghadirkan harmoni di setiap nada.
                            Kami menawarkan berbagai alat musik modern dan tradisional untuk kebutuhan Anda.
                        </p>
                    </div>

                    {/* Navigasi */}
                    <div className="w-full md:w-1/3">
                        <h3 className="mb-4 text-lg font-semibold text-orange-400">Navigasi</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#home" className="hover:text-orange-300">
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-orange-300">
                                    Alat Musik
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-orange-300">
                                    Hubungi Kami
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div className="w-full md:w-1/3">
                        <h3 className="mb-4 text-lg font-semibold text-orange-400">Hubungi Kami</h3>
                        <p className="text-gray-400">Jl. Harmoni Raya No. 123, Bandung</p>
                        <p className="text-gray-400">Email: symphonia@gmail.com</p>
                        <p className="text-gray-400">Telepon: +62 857 1234 </p>
                    </div>
                </div>

                {/* Garis pemisah */}
                <div className="my-6 h-px bg-gray-700"></div>

                {/* Bagian bawah footer */}
                <div className="flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Symphonia. Harmoni dalam Setiap Nada.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://youtube.com" className="text-gray-400 hover:text-white">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
