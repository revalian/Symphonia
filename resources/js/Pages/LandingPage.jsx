import CardItem from '@/Components/CardItem';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function LandingPage() {
    const instruments = [
        {
            title: 'Gitar Akustik',
            description: 'Sewa gitar akustik berkualitas tinggi.',
            image: 'https://source.unsplash.com/300x200/?guitar',
        },
        {
            title: 'Drum Set',
            description: 'Drum set lengkap untuk semua acara.',
            image: 'https://source.unsplash.com/300x200/?drums',
        },
        {
            title: 'Keyboard',
            description: 'Keyboard modern untuk kebutuhan musik Anda.',
            image: 'https://source.unsplash.com/300x200/?piano',
        },

        {
            title: 'Gitar Akustik',
            description: 'Sewa gitar akustik berkualitas tinggi.',
            image: 'https://source.unsplash.com/300x200/?guitar',
        },
        {
            title: 'Drum Set',
            description: 'Drum set lengkap untuk semua acara.',
            image: 'https://source.unsplash.com/300x200/?drums',
        },
        {
            title: 'Keyboard',
            description: 'Keyboard modern untuk kebutuhan musik Anda.',
            image: 'https://source.unsplash.com/300x200/?piano',
        },
    ];

    return (
        <>
            <Navbar />
            <section id="home" className="bg-gray-100 py-16 text-center text-gray-800">
                <h1 className="mb-6 text-5xl font-bold leading-tight">Selamat Datang di Symphonia</h1>
                <p className="mb-10 text-lg">Temukan alat musik terbaik untuk disewa dengan harga terjangkau!</p>
            </section>

            <section id="services" className="container mx-auto px-4 py-16">
                <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Alat Musik Kami</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {instruments.map((item, index) => (
                        <CardItem key={index} title={item.title} description={item.description} image={item.image} />
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
