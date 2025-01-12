    import Filter from '@/Components/molecules/Filter';
    import Pagination from '@/Components/molecules/Pagination';
    import HeaderTitle from '@/Components/molecules/HeaderTitle';
    import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
    import { useFilter } from '@/hooks/useFilter';
    import { IconChecklist, IconCreditCardRefund, IconMoneybag } from '@tabler/icons-react';
    import React, { useState, useEffect } from 'react';
    import ReturnFrontInstrumentTable from '@/Components/Tables/ReturnFrontInstrumentTable';
    import Navbar from '@/Components/organisms/Navbar';
    import Footer from '@/Components/organisms/Footer';
    import { Head } from '@inertiajs/react';
import CardStat from '@/Components/molecules/CardStat';

    export default function Index(props) {
        const { data: return_instruments, meta } = props.return_instruments;
        const [params, setParams] = useState(props.state);
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
            route: route('front.return-instruments.index'),
            Values: params,
            only: ['return_instruments'],
        });

        useEffect(() => {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const responseReturnInstrument = await fetch('http://localhost:8000/api/returninstrument');
                    const resultReturnInstrument = await responseReturnInstrument.json();
                

                    if (resultReturnInstrument.status) {
                        
                    } else {
                        setError('Failed to fetch data. Status not OK.');
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
            
            <div className="flex w-full flex-col pb-32 space-y-4">
                <Navbar />
                <Head title={props.page_settings.title} />
                    {/* Gunakan container mx-auto */}
                <div className="container mx-auto max-w-screen-xl px-4 lg:px-8">
                    <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                        <HeaderTitle
                            title={props.page_settings.title}
                            subtitle={props.page_settings.subtitle}
                            icon={IconCreditCardRefund}
                        />
                    </div>

                    <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
                        <CardStat
                            data={{ 
                                title: "Dikembalikan",
                                icon: IconCreditCardRefund,
                                background: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500',
                                iconClassName: 'text-white'
                            }}
                        >
                            <div className='text-2xl font-bold'>
                                {props.page_data.returned}
                            </div>
                        </CardStat>
                        <CardStat
                            data={{ 
                                title: "Pengecekan",
                                icon: IconChecklist,
                                background: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500',
                                iconClassName: 'text-white'
                            }}
                        >
                            <div className='text-2xl font-bold'>
                                {props.page_data.checked}
                            </div>
                        </CardStat>
                        <CardStat
                            data={{ 
                                title: "Denda",
                                icon: IconMoneybag,
                                background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                                iconClassName: 'text-white'
                            }}
                        >
                            <div className='text-2xl font-bold'>
                                {props.page_data.fine}
                            </div>
                        </CardStat>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="mt-4 flex justify-between items-center">
                                <Filter params={params} setParams={setParams} state={props.state} />
                                {loading && <p>Loading...</p>}
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                        </CardHeader>
                        <CardContent className="px-0 py-0">
                            <ReturnFrontInstrumentTable
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
                <Footer/>
            </div>
        );
    }