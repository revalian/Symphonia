import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

function CartItem({ item, onIncrement, onDecrement, onRemove }) {
    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600">Harga: Rp {item.price}</p>
                    <p className="text-gray-600">Subtotal: Rp {item.price * item.quantity}</p>
                </div>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => onDecrement(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                >
                    -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                    onClick={() => onIncrement(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                >
                    +
                </button>
                <button
                    onClick={() => onRemove(item.id)}
                    className="ml-4 text-red-500 hover:underline"
                >
                    Hapus
                </button>
            </div>
        </div>
    );
}

function Checkout() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            image: '/images/Gitar.png',
            name: 'Gitar Akustik',
            price: 100000,
            quantity: 1,
        },
        {
            id: 2,
            image: '/images/Drum.png',
            name: 'Drum Set',
            price: 200000,
            quantity: 1,
        },
    ]);

    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const handleIncrement = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Checkout berhasil! Terima kasih telah menyewa alat musik.');
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

                {/* Cart Items */}
                <div className="mb-8">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4 mb-8">
                    <h2 className="text-xl font-bold">Ringkasan Pesanan</h2>
                    <p className="text-gray-600">Total Harga: <span className="font-bold">Rp {total}</span></p>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <h2 className="text-xl font-bold mb-4">Informasi Pengiriman</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Nama</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700">Alamat</label>
                        <textarea
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700">Nomor Telepon</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
                    >
                        Selesaikan Pesanan
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Checkout;
