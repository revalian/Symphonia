import Footer from '@/Components/organisms/Footer';
import Navbar from '@/Components/organisms/Navbar';

export default function AboutUs() {
    return (
        <div>
            {/* Navbar akan muncul di atas konten halaman */}
            <Navbar />

            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Tentang Kami</h1>
                    <p className="text-lg text-gray-600">
                        Symphonia adalah penyedia alat musik terkemuka yang hadir untuk memenuhi kebutuhan musik Anda.
                    </p>
                </div>

                {/* Konten Halaman */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {/* Kolom Kiri */}
                    <div className="space-y-6">
                        <p className="text-lg text-gray-700">
                            Selamat datang di <strong>Symphonia</strong>, penyedia alat musik terpercaya di Indonesia.
                            Kami hadir untuk memenuhi kebutuhan musik Anda, baik untuk acara, latihan, maupun
                            pertunjukan profesional.
                        </p>
                        <p className="text-lg text-gray-700">
                            Didirikan pada tahun 2024, Symphonia bertujuan untuk menghadirkan pengalaman bermusik yang
                            menyenangkan dengan menyediakan alat musik berkualitas tinggi, baik modern maupun
                            tradisional. Kami percaya bahwa musik adalah bahasa universal yang menyatukan semua orang.
                        </p>

                        {/* Misi dan Visi */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Misi Kami</h2>
                            <p className="text-lg text-gray-700">
                                Menyediakan solusi musik terbaik dengan pelayanan yang ramah, profesional, dan
                                terpercaya.
                            </p>

                            <h2 className="text-2xl font-semibold text-gray-800">Visi Kami</h2>
                            <p className="text-lg text-gray-700">
                                Menjadi pilihan utama masyarakat dalam memenuhi kebutuhan alat musik di Indonesia.
                            </p>
                        </div>
                    </div>

                    {/* Kolom Kanan - Gambar */}
                    <div className="flex items-center justify-center">
                        <img src="/images/logo.png" alt="About Us" className="w-full max-w-md rounded-lg shadow-xl" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
