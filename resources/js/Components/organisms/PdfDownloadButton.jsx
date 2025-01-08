import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPdf from './ReportPdf'; // Import komponen PDF yang sudah Anda buat sebelumnya

const App = () => {
    const [data, setData] = useState([]); // Menyimpan data return instrument
    const [users, setUsers] = useState([]); // Menyimpan data user
    const [instruments, setInstruments] = useState([]); // Menyimpan data instrument
    const [loading, setLoading] = useState(true); // Status loading
    const [error, setError] = useState(null); // Status error

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ambil data returninstrument
                const responseReturnInstrument = await fetch('http://localhost:8000/api/returninstrument');
                const resultReturnInstrument = await responseReturnInstrument.json();
                
                // Ambil data user
                const responseUser = await fetch('http://localhost:8000/api/user');
                const resultUser = await responseUser.json();

                // Ambil data instrument
                const responseInstrument = await fetch('http://localhost:8000/api/instrument');
                const resultInstrument = await responseInstrument.json();

                // Periksa apakah data berhasil diambil
                if (resultReturnInstrument.status && resultUser.status && resultInstrument.status) {
                    setData(resultReturnInstrument.data);
                    setUsers(resultUser.data);
                    setInstruments(resultInstrument.data);
                } else {
                    setError('Failed to fetch data');
                }
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Dependency array kosong agar hanya dijalankan sekali saat komponen pertama kali di-render

    return (
        <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
            <PDFDownloadLink
                document={<ReportPdf data={data} users={users} instruments={instruments} />}
                fileName="return_instruments_report.pdf"
            >
                {({ loading }) => (
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 2.22.894 4.223 2.344 5.656l1.656-1.365z"
                                    ></path>
                                </svg>
                                Generating PDF...
                            </span>
                        ) : (
                            <span>Download PDF</span>
                        )}
                    </button>
                )}
            </PDFDownloadLink>
        )}
    </div>
    
    );
};

export default App;
