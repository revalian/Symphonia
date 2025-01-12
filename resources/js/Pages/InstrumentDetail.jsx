import Navbar from '@/Components/organisms/Navbar';
import Footer from '@/Components/organisms/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { flashMessage } from '@/lib/utils';
import { toast } from 'sonner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';

const InstrumentDetail = (props) => {
    console.log(props);
    const [instrument, setInstrument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [otherInstruments, setOtherInstruments] = useState([]);
    const [dueDate, setDueDate] = useState(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const { auth } = usePage().props;
     const [isInstrumentLoaned, setIsInstrumentLoaned] = useState(false);


    useEffect(() => {
        const path = window.location.pathname;
        const parts = path.split('/');
        const instrumentTitle = parts[parts.length - 1];
        setTitle(decodeURIComponent(instrumentTitle));
    }, []);

     useEffect(() => {
        if(props.instrument){
           setIsInstrumentLoaned(props.instrument.is_loaned)
        }

    },[props.instrument]);



    useEffect(() => {
        const fetchInstrumentDetail = async () => {
            if (!title) return;

            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8000/api/instrument');
                if (response.data.status) {
                    const instrumentData = response.data.data.find(instrument => instrument.name === title);
                    if (instrumentData) {
                        setInstrument({
                            name: instrumentData.name,
                            description: instrumentData.description,
                            image: `http://localhost:8000/storage/${instrumentData.image}`,
                            price: instrumentData.rental_price_per_day,
                            id: instrumentData.id,
                            brand: instrumentData.brand,
                            manufacture_year: instrumentData.manufacture_year,
                            status: instrumentData.status,
                            slug: instrumentData.slug,
                            is_loaned: instrumentData.is_loaned,

                        });

                        // Fetch other instruments
                        const otherInstrument = response.data.data.filter(instrument => instrument.name !== title);
                        setOtherInstruments(otherInstrument);

                    } else {
                        setError('Instrument not found');
                    }
                } else {
                    setError('Instrument not found');
                }
            } catch (error) {
                setError('Failed to fetch instrument detail.');
                console.error('Error fetching instrument detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInstrumentDetail();
    }, [title]);


    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const handleShare = () => {
        const shareUrl = window.location.href;
        const message = `Check out this instrument: ${instrument.name} - ${shareUrl}`;
        if (navigator.share) {
            navigator.share({
                title: 'Share Instrument',
                text: message,
                url: shareUrl,
            }).then(() => {
                console.log('Shared successfully');
            }).catch(error => {
                console.log('Error sharing:', error);
            });
        } else {
            alert('Fitur share tidak tersedia di browser anda')
        }
    }


    const handleRent = () => {
        if (!dueDate) {
            toast.error("Tanggal pengembalian belum dipilih");
            return;
        }

        const generatedRoute = route('front.loans.store', { instrument: instrument.slug });

        // Use date-fns to format the date as 'yyyy-MM-dd' (UTC)
        const formattedDueDate = format(dueDate, 'yyyy-MM-dd', { timeZone: 'UTC' });
        const formattedLoanDate = format(new Date(), 'yyyy-MM-dd', { timeZone: 'UTC' });

        console.log('Generated route:', generatedRoute);
        console.log('Payload:', {
            due_date: formattedDueDate,
            loan_date: formattedLoanDate,
            instrument: instrument.name,
            user: auth.user?.name,
        });


        router.post(
            generatedRoute,
            {
                due_date: formattedDueDate,
                loan_date: formattedLoanDate,
                instrument: instrument.name,
                user: auth.user?.name,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (success) => {
                    const flash = flashMessage(success);
                    if (flash) toast[flash.type](flash.message);
                },
                onError: (error) => {
                    console.error(error);
                },
            }
        );
    };

    if (loading) {
        return <p className="text-center py-8 text-gray-700">Loading instrument details...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 py-8">Error: {error}</p>;
    }

    if (!instrument) {
        return <p className="text-center py-8 text-gray-700">Instrument not found.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Image Container */}
                    <div className="md:w-1/2">
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img
                                src={instrument.image}
                                alt={instrument.name}
                                className="w-full h-auto object-cover transition-transform duration-300 transform-gpu hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Details Container */}
                    <div className="md:w-1/2">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{instrument.name}</h1>
                        <div className="mb-4 flex items-center text-gray-600">
                            <span className="mr-2">Brand:</span> <span className="font-medium">{instrument.brand}</span>
                            <span className="ml-4 mr-2">Tahun:</span> <span className="font-medium">{instrument.manufacture_year}</span>
                        </div>
                        <p className="text-gray-700 text-lg mb-4 leading-relaxed">{instrument.description}</p>
                        <p className="text-gray-700 mb-6">
                            Status: <span className={instrument.status === 'Tersedia' ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                                {instrument.status}
                            </span>
                        </p>
                        <p className="text-2xl font-semibold text-orange-600 mb-6">Harga: {formatRupiah(instrument.price)}</p>
                            {/* Date Picker */}
                             {!isInstrumentLoaned && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Tanggal Pengembalian
                                    </label>
                                    <div className="relative">
                                        <DatePicker
                                            selected={dueDate}
                                            onChange={(date) => setDueDate(date)}
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="Pilih tanggal pengembalian"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            minDate={new Date()}
                                            onClickOutside={() => setIsDatePickerOpen(false)}
                                            onFocus={() => setIsDatePickerOpen(true)}
                                            open={isDatePickerOpen}
                                        />
                                    </div>
                                </div>
                             )}
                        <div className="mb-4 flex items-center gap-4">
                            {!isInstrumentLoaned && (
                                <Button size="lg" onClick={handleRent}>
                                    Sewa Sekarang
                                </Button>
                            )}
                            <button onClick={() => handleShare()} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md transition-colors duration-200">Share</button>
                        </div>
                    </div>
                </div>

                {/* Other Instruments */}
                {otherInstruments.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Produk Lainnya</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {otherInstruments.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src={`http://localhost:8000/storage/${item.image}`}
                                        alt={item.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                                        <p className="text-gray-600">{formatRupiah(item.rental_price_per_day)}</p>
                                        <Link href={`/instrument/${item.name}`} className="mt-4 inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm transition-colors duration-200">
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default InstrumentDetail;