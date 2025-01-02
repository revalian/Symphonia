import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Inertia } from '@inertiajs/inertia';

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
    Inertia.visit('/payment', 'productdetails');
};
  

  // Disable checkout button if cart is empty
  const isCheckoutDisabled = cartItems.length === 0;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">Keranjang Saya</h1>
        <h2 className="text-1xl font-bold text-center text-orange-600 mb-4">"Produk eksklusif yang tidak akan Anda temukan di tempat lain."</h2>

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

        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
          disabled={isCheckoutDisabled}
        >
          Checkout 
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;