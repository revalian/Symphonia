import Navbar from '@/Components/organisms/Navbar';
import Footer from '@/Components/organisms/Footer';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';


const PaymentPage = () => {
    const { data } = usePage().props;
    const [rentalDays, setRentalDays] = useState(1);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [totalPayment, setTotalPayment] = useState(data.price)


    const handleRentalDaysChange = (e) => {
        const days = parseInt(e.target.value, 10) || 1;
        setRentalDays(days);
        setTotalPayment(data.price * days)
    };

     const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/transaction', {
                instrument_id: data.id,
                rental_days: rentalDays,
                total_price: totalPayment,
                customer_name: name,
                phone_number: phoneNumber,
                address: address
             });
             if (response.data.status) {
                alert('Sewa Berhasil');
             } else {
                alert('Sewa Gagal');
             }

            } catch (error) {
                console.error('Error during payment:', error);
            }
      };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };


    return (
        <>
        <Navbar />
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Formulir Penyewaan</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                       Nama Instrument
                    </label>
                    <input type="text" value={data.name}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly/>
                 </div>
                 <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2">
                        Harga Sewa Perhari
                     </label>
                     <input type="text" value={formatRupiah(data.price)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly/>
                  </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rentalDays">
                        Lama Sewa (hari):
                    </label>
                    <input
                        type="number"
                        id="rentalDays"
                        value={rentalDays}
                        onChange={handleRentalDaysChange}
                        min="1"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2">
                       Total Harga
                     </label>
                     <input type="text" value={formatRupiah(totalPayment)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly/>
                  </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nama Lengkap:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                        Nomor Telepon:
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Alamat:
                    </label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                    <button
                            onClick={handlePayment}
                           className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Bayar Sekarang
                        </button>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default PaymentPage;