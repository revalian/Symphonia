import React from 'react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

const ModernInstruments = () => {
    const cardData = [
        {
            image: '/images/Gitar.png',
            title: 'Gitar Akustik',
            description: 'Sewa gitar akustik terbaik untuk suara yang sempurna.',
            rentalPrice: 'Rp 100.000/hari',
        },
        {
            image: '/images/Drum.png',
            title: 'Drum Set',
            description: 'Drum set lengkap untuk semua kebutuhan musik Anda.',
            rentalPrice: 'Rp 250.000/hari',
        },
        {
            image: '/images/piano.png',
            title: 'Piano',
            description: 'Piano berkualitas untuk pengalaman bermain yang luar biasa.',
            rentalPrice: 'Rp 200.000/hari',
        },
        {
            image: 'images/Biola.png',
            title: 'Biola',
            description: 'Biola berkualitas tinggi dengan suara jernih dan halus.',
            rentalPrice: 'Rp 100.000/hari',
        },
        {
            image: 'images/Saxophone.png',
            title: 'Saxophone',
            description: 'Saxophone berkualitas tinggi dengan suara merdu dan ekspresif.',
            rentalPrice: 'Rp 100.000/hari',
        },
        {
            image: 'images/Microphone.png',
            title: 'Microphone',
            description: 'Mikrofon adalah alat yang mengubah suara menjadi sinyal listrik.',
            rentalPrice: 'Rp 70.000/hari',
        },
        {
            image: 'images/Ukulele.png',
            title: 'Ukulele',
            description: 'Alat musik kecil yang populer di Indonesia untuk musik akustik dan folk.',
            rentalPrice: 'Rp 80.000/hari',
        },
        {
            image: 'images/Percussion.png',
            title: 'Percussion Pads',
            description: 'Instrumen elektronik yang populer untuk menciptakan beat modern dalam pertunjukan live.',
            rentalPrice: 'Rp 150.000/hari',
        },
        {
            image: 'images/Electric.png',
            title: 'Electric Cello',
            description: 'Versi modern dari cello yang digunakan dalam genre musik klasik hingga fusion.',
            rentalPrice: 'Rp 70.000/hari',
        },
        {
            image: 'images/Microphone Wireless.png',
            title: 'Microphone Wireless',
            description: 'Sangat penting untuk penyanyi dan musisi Indonesia dalam pertunjukan live.',
            rentalPrice: 'Rp 90.000/hari',
        },
        {
            image: 'images/Tamborin.png',
            title: 'Tamborin Modern',
            description: 'Modifikasi dari alat musik tradisional, digunakan dalam band dan orkestra.',
            rentalPrice: 'Rp 150.000/hari',
        },
        {
            image: 'images/Mandolin.png',
            title: 'Mandolin Elektrik',
            description: 'Digunakan untuk menghasilkan suara folk dan tradisional dalam aransemen modern.',
            rentalPrice: 'Rp 100.000/hari',
        },
        {
            image: 'images/Sampler.png',
            title: 'Sampler',
            description: 'Alat elektronik yang digunakan untuk merekam dan memutar ulang suara, sering digunakan dalam musik EDM dan hip-hop lokal.',
            rentalPrice: 'Rp 150.000/hari',
        },
        {
            image: 'images/Cajon.png',
            title: 'Cajon',
            description: 'Instrumen perkusi berbentuk kotak yang dimainkan dengan menepuk sisi-sisinya, populer dalam pertunjukan akustik.',
            rentalPrice: 'Rp 100.000/hari',
        },
        {
            image: 'images/Clarinet.png',
            title: 'Clarinet',
            description: 'Alat tiup modern yang digunakan dalam musik klasik dan jazz.',
            rentalPrice: 'Rp 200.000/hari',
        },
    ];

    return (
        <>
            <Navbar />
            <section id="home" className="bg-gray-100 text-center text-gray-800">
            </section>

            <section id="services" className="container mx-auto px-4 py-16">
                <h2 className="mb-8 text-center text-4xl font-bold text-orange-600">Alat Musik Modern</h2>
                <h1 className="mb-8 text-center max-width: 500px text-1xl font-bold text-yellow-900">
                    Ingin bermusik tanpa perlu membeli alat musik mahal? Sewa saja di Toko Alat Penyewaan Musik Terbaik Symphonia! 
                    Kami menyediakan berbagai macam alat musik dengan kualitas terbaik. 
                    Mulai dari gitar, drum, mikrofon, hingga alat musik tradisional. Sewa sekarang dan dapatkan harga spesial!
                </h1>
                <h2 className="mb-8 text-center text-2xl font-bold text-orange-600">"Musikmu, Sewaanmu."</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cardData.map((card, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800 mb-5">{card.title}</h3>
                            <p className="text-gray-600 mb-4">{card.description}</p>
                            <p className="text-orange-600 font-semibold mb-5">{card.rentalPrice}</p>
                            <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
                                Sewa Sekarang
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ModernInstruments;
