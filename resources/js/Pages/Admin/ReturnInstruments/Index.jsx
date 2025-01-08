import Filter from '@/Components/molecules/Filter';
import Pagination from '@/Components/molecules/Pagination';
import HeaderTitle from '@/Components/molecules/HeaderTitle';
import ReturnInstrumentTable from '@/Components/Tables/ReturnInstrumentTable';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { IconCreditCardRefund } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import PdfDownloadButton from '@/Components/organisms/PdfDownloadButton';

export default function Index(props) {
    const { data: return_instruments, meta } = props.return_instruments;
    const [params, setParams] = useState(props.state);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('admin.return-instruments.index'),
        Values: params,
        only: ['return_instruments'],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseReturnInstrument = await fetch('http://localhost:8000/api/returninstrument');
                const resultReturnInstrument = await responseReturnInstrument.json();

                const responseUser = await fetch('http://localhost:8000/api/user');
                const resultUser = await responseUser.json();

                const responseInstrument = await fetch('http://localhost:8000/api/instrument');
                const resultInstrument = await responseInstrument.json();

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
    }, []);

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconCreditCardRefund}
                />
            </div>

            <Card>
                <CardHeader>
                    <div className="mt-4 flex justify-between items-center">
                        <Filter params={params} setParams={setParams} state={props.state} />
                        {/* Tombol untuk Download PDF */}
                        <div>
                            {loading && <p>Loading...</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {!loading && !error && (
                                <PdfDownloadButton 
                                    data={data} 
                                    users={users} 
                                    instruments={instruments} 
                                    fileName="return_instruments_report.pdf" 
                                />
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-0 py-0">
                    <ReturnInstrumentTable
                        return_instruments={return_instruments}
                        meta={meta}
                        onSortable={onSortable}
                    />
                </CardContent>
                <CardFooter>
                    <Pagination meta={meta} name="Pengembalian" />
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
