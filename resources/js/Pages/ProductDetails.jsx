import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

function ProductDetails() {
  const navigate = useNavigate();

  const product = {
    name: 'Drum Set',
    description: 'Drum Set dengan fitur yang luar biasa.',
    price: 1500000,
    quantity: 1,
    imageUrl: '/images/Drum.png',
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">Rincian Barang</h1>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-800 text-lg mb-2">
              Harga: Rp {product.price.toLocaleString()}
            </p>
            <p className="text-gray-800 text-lg mb-4">
              Jumlah: {product.quantity}
            </p>
            <p className="text-gray-800 text-lg font-bold mb-6">
              Total: Rp {(product.price * product.quantity).toLocaleString()}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/payment')} // Gunakan navigate ke halaman pembayaran
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Lanjutkan ke Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
