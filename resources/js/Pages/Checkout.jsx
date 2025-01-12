import React, { useState } from 'react';
import Navbar from '@/Components/organisms/Navbar';
import Footer from '@/Components/organisms/Footer';

function CartItem({ item, onIncrement, onDecrement, onRemove, onToggle, isChecked }) {
    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(item.id)}
                    className="mr-4"
                />
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

    const [selectedItems, setSelectedItems] = useState([]);

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
        setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    };

    const handleToggleItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const handleToggleAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map((item) => item.id));
        }
    };

    const total = cartItems
        .filter((item) => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Checkout berhasil! Terima kasih telah menyewa alat musik.');
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-center mb-8">Keranjang Belanja</h1>

                {/* Checkbox All */}
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={selectedItems.length === cartItems.length}
                        onChange={handleToggleAll}
                        className="mr-2"
                    />
                    <label>Pilih Semua</label>
                </div>

                {/* Cart Items */}
                <div className="mb-8">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                            onRemove={handleRemove}
                            onToggle={handleToggleItem}
                            isChecked={selectedItems.includes(item.id)}
                        />
                    ))}
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4 mb-8">
                    <h2 className="text-xl font-bold">Ringkasan Pesanan</h2>
                    <p className="text-gray-600">
                        Total Harga: <span className="font-bold">Rp {total}</span>
                    </p>
                </div>

                {/* Checkout Button */}
                <button
                    onClick={handleSubmit}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                    disabled={selectedItems.length === 0}
                >
                    Checkout
                </button>
            </div>
            <Footer />
        </>
    );
}

export default Checkout;
