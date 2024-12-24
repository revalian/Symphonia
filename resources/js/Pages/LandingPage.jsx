import CardItemCarousel from '@/Components/CardItem'; // Mengimpor Carousel
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function LandingPage() {
    // Data instruments yang akan digunakan dalam carousel
    const instruments = [
        {
            title: 'Gitar Akustik',
            description: 'Sewa gitar akustik terbaik untuk suara yang sempurna.',
            image: '/images/Gitar.png',
        },
        {
            title: 'Drum Set',
            description: 'Drum set lengkap untuk semua kebutuhan musik Anda.',
            image: '/images/Drum.png',
        },
        {
            title: 'Piano',
            description: 'Piano berkualitas untuk pengalaman bermain yang luar biasa.',
            image: '/images/Piano.png',
        },
        {
            title: 'Biola',
            description: 'Biola elegan untuk melodi klasik dan modern.',
            image: '/images/Biola.png',
        },
        {
            title: 'Saxophone',
            description: 'Sewa saxophone dengan suara yang memukau.',
            image: '/images/Saxophone.png',
        },
        {
            title: 'Kendang',
            description: 'Kendang tradisional untuk sentuhan budaya Indonesia.',
            image: '/images/Kendang.png',
        },
        {
            title: 'Angklung',
            description: 'Angklung asli Indonesia untuk musik tradisional.',
            image: '/images/Angklung.png',
        },
        {
            title: 'Gong',
            description: 'Gong megah untuk acara istimewa Anda.',
            image: '/images/Gong.png',
        },
        {
            title: 'Suling',
            description: 'Suling bambu indah dengan suara merdu.',
            image: '/images/Suling.png',
        },
        {
            title: 'Microphone',
            description: 'Microphone canggih untuk pertunjukan atau rekaman.',
            image: '/images/Microphone.png',
        },
    ];

    return (
        <>
            <Navbar />
            <section id="home" className="bg-gray-100 text-center text-gray-800">
                <img
                    src="/images/background.png"
                    alt="Deskripsi gambar"
                    className="mx-auto"
                    width="6912"
                    height="3456"
                />
            </section>

            <section id="services" className="container mx-auto px-4 py-16">
                <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Alat Musik Kami</h2>

                {/* Menggunakan Carousel untuk menampilkan CardItem */}
                <CardItemCarousel cards={instruments} />
            </section>

            <Footer />
        </>
    );
}
