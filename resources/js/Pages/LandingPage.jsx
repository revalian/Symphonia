import CardItemCarousel from '@/Components/CardItem';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function LandingPage() {
    const [instruments, setInstruments] = useState([]); // Semua data
    const [filteredInstruments, setFilteredInstruments] = useState([]); // Data hasil pencarian
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearch = (results, query) => {
        const formattedResults = results.map((result) => ({
            title: result.name,
            description: result.description,
            image: `http://localhost:8000/storage/${result.image}`, // Pastikan URL gambar benar
        }));
        setFilteredInstruments(formattedResults); // Update hasil pencarian
        setSearchQuery(query); // Simpan query yang diketik
        setIsSearching(query.length > 0); // Set status pencarian aktif jika query tidak kosong
    };
    

    useEffect(() => {
        fetchInstruments();
    }, []);

    return (
        <>
            <Navbar onSearch={handleSearch} />
            
                {isSearching ? (
                // Tampilan saat pencarian aktif
                <section className="container mx-auto px-4 py-16">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
                        Menampilkan hasil pencarian untuk "{searchQuery}"
                    </h2>
                    {filteredInstruments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredInstruments.map((instrument, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                <a href={`/instrument/${instrument.title}`} className="block">
                                    <img
                                        src={instrument.image}
                                        alt={instrument.title}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                </a>
                                <h3 className="text-xl font-bold text-gray-800">
                                    <a href={`/instrument/${instrument.title}`}>{instrument.title}</a>
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    <a href={`/instrument/${instrument.title}`}>{instrument.description}</a>
                                </p>
                            </div>
                        ))}
                    </div>                    
                    ) : (
                        <p className="text-center text-gray-600">Tidak ada hasil ditemukan untuk "{searchQuery}".</p>
                    )}
                </section>
            ) : (
                // Tampilan default (tidak sedang mencari)
                <>
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
                        {!loading && instruments.length > 0 ? (
                            <CardItemCarousel cards={instruments} />
                        ) : (
                            <p className="text-center text-gray-600">Loading instruments...</p>
                        )}
                    </section>
                </>
            )}
        <Footer />
        </>
    );
}