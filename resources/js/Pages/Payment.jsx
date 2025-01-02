import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    paymentMethod: '',
    bank: '',
    qris: '',
  });

  const [totalAmount, setTotalAmount] = useState(0); // Total payment state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert('Pembayaran berhasil! Terima kasih atas pesanan Anda.');
  };

  // Bank options for debit
  const bankOptions = [
    'Bank BCA',
    'Bank Mandiri',
    'Bank BRI',
    'Bank BNI',
    'CIMB Niaga',
  ];

  // QRIS options
  const qrisOptions = [
    'QRIS Gopay',
    'QRIS OVO',
    'QRIS DANA',
    'QRIS LinkAja',
    'QRIS ShopeePay',
  ];

  // Update total amount based on selected payment method
  useEffect(() => {
    let calculatedAmount = 300000; // Example base price

    // Add payment method-specific conditions if needed
    if (paymentInfo.paymentMethod === 'debit') {
      // For example, debit might have a discount or surcharge
      calculatedAmount -= 100000; // Discount for debit payment
    } else if (paymentInfo.paymentMethod === 'qris') {
      // QRIS might have a small surcharge
      calculatedAmount += 200000; // QRIS surcharge
    }

    setTotalAmount(calculatedAmount);
  }, [paymentInfo.paymentMethod]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">Pembayaran</h1>
        <form onSubmit={handlePaymentSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={paymentInfo.fullName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={paymentInfo.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={paymentInfo.phoneNumber}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Alamat Pengiriman
            </label>
            <textarea
              id="address"
              name="address"
              value={paymentInfo.address}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              required
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
              Metode Pembayaran
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentInfo.paymentMethod}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Pilih Metode Pembayaran</option>
              <option value="debit">Debit</option>
              <option value="qris">QRIS</option>
              <option value="other">Lainnya</option>
            </select>
          </div>

          {/* Bank options (only show if debit is selected) */}
          {paymentInfo.paymentMethod === 'debit' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bank">
                Pilih Bank
              </label>
              <select
                id="bank"
                name="bank"
                value={paymentInfo.bank}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Pilih Bank</option>
                {bankOptions.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* QRIS options (only show if QRIS is selected) */}
          {paymentInfo.paymentMethod === 'qris' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qris">
                Pilih QRIS
              </label>
              <select
                id="qris"
                name="qris"
                value={paymentInfo.qris}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Pilih QRIS</option>
                {qrisOptions.map((qris) => (
                  <option key={qris} value={qris}>
                    {qris}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Card Number (only show if debit is selected) */}
          {paymentInfo.paymentMethod === 'debit' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                  Nomor Kartu
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardHolder">
                  Nama Pemegang Kartu
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={paymentInfo.cardHolder}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
            </>
          )}

          {/* Total Amount Display */}
          <div className="mb-8  text-gray-600 ">
            <p>Total Pembayaran: Rp {totalAmount.toLocaleString()}</p>
          </div>

          {/* Submit Button */}
<div className="flex items-center justify-between">
  <button
    type="submit"
    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Bayar Sekarang
  </button>
  
  {/* Back Button */}
  <button
    type="button"
    onClick={() => window.history.back()}
    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Kembali
  </button>
</div>

<button
  onClick={() => navigate('/payment', { state: { product } })} // Kirim detail produk ke halaman pembayaran
  >
 
</button>


        </form>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
