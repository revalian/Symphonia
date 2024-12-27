import CardItemCarousel from '@/Components/CardItem'; // Mengimpor Carousel
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function LandingPage() {
    // State untuk menyimpan data instruments
    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk mengambil data instruments dari API
    const fetchInstruments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/instrument');

            if (response.data.status) {
                const instrumentData = response.data.data.map((instrument) => ({
                    title: instrument.name,
                    description: instrument.description,
                    image: `http://localhost:8000/storage/${instrument.image}`,
                }));
                setInstruments(instrumentData);
            }
        } catch (error) {
            console.error('Error fetching instruments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstruments();
    }, []);

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

                {/* Menampilkan Carousel jika data sudah ada */}
                {!loading && instruments.length > 0 ? (
                    <CardItemCarousel cards={instruments} />
                ) : (
                    <p className="text-center">Loading instruments...</p>
                )}
            </section>

            <Footer />
        </>
    );
}
