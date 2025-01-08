import React, { useState, useEffect } from 'react';
import Footer from '@/Components/organisms/Footer';
import Navbar from '@/Components/organisms/Navbar';
import axios from 'axios';

const TraditionalInstrumentsPage = () => {
    const [instruments, setInstruments] = useState([]); // Semua instrumen
    const [filteredInstruments, setFilteredInstruments] = useState([]); // Instrumen yang sudah difilter
    const [loading, setLoading] = useState(true); 
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]); // Untuk menyimpan kategori
    const [validCategoryIds, setValidCategoryIds] = useState([]); // Kategori yang valid

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim().length === 0) {
            // Jika pencarian kosong, hanya tampilkan berdasarkan kategori
            setFilteredInstruments(instruments.filter(instrument => validCategoryIds.includes(instrument.category_id)));
            setIsSearching(false);
        } else {
            // Jika ada pencarian, filter instrumen berdasarkan kategori dan query pencarian
            const filtered = instruments.filter(instrument =>
                validCategoryIds.includes(instrument.category_id) && instrument.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredInstruments(filtered);
            setIsSearching(true);
        }
    };

    const fetchInstruments = async () => {
        try {
            const instrumentsResponse = await axios.get('http://localhost:8000/api/instrument');
            const categoriesResponse = await axios.get('http://localhost:8000/api/category');
            const categoriesData = categoriesResponse.data.data;  
            const validCategoryIds = categoriesData
                .filter(category => category.name === 'Tradisional') 
                .map(category => category.id);
            
            setCategories(categoriesData); 
            setValidCategoryIds(validCategoryIds); 
            if (instrumentsResponse.data.status) {
                const instrumentData = instrumentsResponse.data.data
                    .filter(instrument => validCategoryIds.includes(instrument.category_id))
                    .map(instrument => ({
                        title: instrument.name,
                        description: instrument.description,
                        image: `http://localhost:8000/storage/${instrument.image}`, 
                        rentalPrice: instrument.rental_price_per_day || 0,
                        category_id: instrument.category_id 
                    }));
                setInstruments(instrumentData);  
            }
        } catch (error) {
            console.error('Error fetching data:', error); 
        } finally {
            setLoading(false);  
        }
    };

    useEffect(() => {
        fetchInstruments();  
    }, []); 

    useEffect(() => {
        if (validCategoryIds.length > 0) {
            setFilteredInstruments(instruments.filter(instrument => validCategoryIds.includes(instrument.category_id)));
        }
    }, [validCategoryIds, instruments]); 

    if (loading) {
        return (
            <div className="text-center py-16">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar onSearch={handleSearch} />
            {isSearching ? (
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
                <>
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
                            {filteredInstruments.map((instrument, index) => (
                                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                    <img
                                        src={instrument.image}
                                        alt={instrument.title}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-bold text-gray-800">{instrument.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{instrument.description}</p>
                                    <p className="text-orange-600 font-semibold mb-4">
                                        {formatRupiah(instrument.rentalPrice)}
                                    </p>
                                    <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
                                        Sewa Sekarang
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
            <Footer />
        </>
    );
};

export default TraditionalInstrumentsPage;
