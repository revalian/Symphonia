import React from 'react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

const TraditionalInstrumentsPage = () => {
    const cardData = [
        {
            image: 'images/Kendang.png',
            title: 'Kendang',
            description: 'Kendang adalah salah satu alat musik perkusi yang sangat penting.',
            rentalPrice: 'Rp 50.000/hari',
        },
        {
            image: 'images/Angklung.png',
            title: 'Angklung',
            description: 'Angklung adalah alat musik tradisional Indonesia, yang terbuat dari bambu.',
            rentalPrice: 'Rp 30.000/hari',
        },
        {
            image: 'images/Gong.png',
            title: 'Gong',
            description: 'Gong adalah alat musik perkusi yang berasal dari Asia Tenggara dan Asia Timur.',
            rentalPrice: 'Rp 70.000/hari',
        },
        {
            image: 'images/Suling.png',
            title: 'Seruling',
            description: 'Seruling tradisional untuk melodi yang indah, dan juga bentuknya yang unik.',
            rentalPrice: 'Rp 20.000/hari',
        },
        {
            image: 'images/Sasando.png',
            title: 'Sasando',
            description: 'Alat musik petik unik berbentuk melingkar yang terbuat dari daun lontar.',
            rentalPrice: 'Rp 100.000/hari',
        },       
        {
            image: 'images/Rebab.png',
            title: 'Rebab',
            description: 'Alat musik gesek dengan dua atau tiga senar yang dimainkan menggunakan busur.',
            rentalPrice: 'Rp 50.000/hari',
        },
        {
            image: 'images/Saluang.png',
            title: 'Saluang',
            description: 'Alat musik tiup tradisional Minangkabau yang terbuat dari bambu tipis.',
            rentalPrice: 'Rp 100.000/hari',
        },
        {
            image: 'images/Sampek.png',
            title: 'Sampek',
            description: 'Alat musik petik khas Dayak yang biasanya terbuat dari kayu ulin atau meranti.',
            rentalPrice: 'Rp 80.000/hari',
        },
        {
            image: 'images/Bonang.png',
            title: 'Bonang',
            description: 'Bagian dari gamelan yang terdiri dari gong-gong kecil berbentuk bulat.',
            rentalPrice: 'Rp 70.000/hari',
        },
        {
            image: 'images/Kecapi.png',
            title: 'Kecapi',
            description: 'Alat musik petik tradisional Bugis-Makassar yang digunakan untuk mengiringi lagu.',
            rentalPrice: 'Rp 50.000/hari',
        },
        {
            image: 'images/Talempong.png',
            title: 'Talempong',
            description: 'Alat musik pukul berbentuk kecil yang terbuat dari logam.',
            rentalPrice: 'Rp 80.000/hari',
        },
        {
            image: 'images/Bedug.png',
            title: 'Bedug',
            description: 'Drum besar yang sering digunakan untuk keperluan religi.',
            rentalPrice: 'Rp 60.000/hari',
        },
        {
            image: 'images/Ganda.png',
            title: 'Ganda',
            description: 'Alat musik perkusi tradisional suku Kaili, dimainkan dengan dipukul.',
            rentalPrice: 'Rp 50.000/hari',
        },
        {
            image: 'images/Calung.png',
            title: 'Calung',
            description: 'Alat musik bambu yang dimainkan dengan cara dipukul.',
            rentalPrice: 'Rp 100.000/hari',
        },
        {
            image: 'images/Calempung.png',
            title: 'Calempung',
            description: 'Alat musik petik tradisional Sunda yang digunakan sebagai pengiring dalam musik gamelan.',
            rentalPrice: 'Rp 150.000/hari',
        },
        {
            image: 'images/Karindi.png',
            title: 'Karinding',
            description: 'Alat musik tiup tradisional yang terbuat dari bambu atau pelepah aren, sering digunakan untuk menghasilkan suara bernada rendah.',
            rentalPrice: 'Rp 90.000/hari',
        },
        {
            image: 'images/Doli-doli.png',
            title: 'Doli-doli',
            description: 'Alat musik pukul berbentuk bilah-bilah kayu yang menghasilkan nada unik.',
            rentalPrice: 'Rp 100.000/hari',
        },
        {
            image: 'images/Hapetan.png',
            title: 'Hapetan',
            description: 'Alat musik petik tradisional Batak yang menyerupai kecapi.',
            rentalPrice: 'Rp 80.000/hari',
        },
        {
            image: 'images/Tarawangsa.png',
            title: 'Tarawangsa',
            description: 'Alat musik gesek tradisional Sunda dengan dua dawai, dimainkan bersama dengan kecapi.',
            rentalPrice: 'Rp 50.000/hari',
        },
        {
            image: 'images/Tehyan.png',
            title: 'Tehyan',
            description: 'Alat musik gesek yang terbuat dari kayu dengan suara khas Betawi.',
            rentalPrice: 'Rp 100.000/hari',
        },
    ];

    return (
        <>
            <Navbar />
            <section id="home" className="bg-gray-100 text-center text-gray-800">
            </section>

            <section id="services" className="container mx-auto px-4 py-16">
                <h2 className="mb-8 text-center text-4xl font-bold text-orange-600">Alat Musik Tradisional</h2>
                <h1 className="mb-8 text-center max-width: 500px text-1xl font-bold text-yellow-900">
                    Ingin bermusik tanpa perlu membeli alat musik mahal? Sewa saja di Toko Alat Penyewaan Musik Terbaik Symphonia! 
                    Kami menyediakan berbagai macam alat musik dengan kualitas terbaik. 
                    Mulai dari Suling, Kendang, Gong, hingga alat musik Modern. Sewa sekarang dan dapatkan harga spesial!
                </h1>
                <h2 className="mb-8 text-center text-2xl font-bold text-orange-600">"Musikmu, Sewaanmu."</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cardData.map((card, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                            <p className="text-gray-600 mb-4">{card.description}</p>
                            <p className="text-orange-600 font-semibold mb-4">{card.rentalPrice}</p>
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

export default TraditionalInstrumentsPage;
