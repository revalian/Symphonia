import Filter from '@/Components/molecules/Filter';
import Pagination from '@/Components/molecules/Pagination';
import HeaderTitle from '@/Components/molecules/HeaderTitle';
import FrontLoanTable from '@/Components/Tables/FrontLoanTable';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import { Head, Link } from '@inertiajs/react';
import { IconCreditCardPay, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import Navbar from '@/Components/organisms/Navbar';
import Footer from '@/Components/organisms/Footer';

export default function Index(props) {
    const { data: loans, meta } = props.loans;
    const [params, setParams] = useState(props.state);

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('front.loans.index'),
        Values: params,
        only: ['loans'],
    });

    return (
        
        <div className="flex w-full flex-col pb-32">
            <Navbar/>
            <Head title={props.page_settings.title}/>
            {/* Tambahkan div pembungkus */}
            <div className="mx-auto max-w-screen-xl px-4 lg:px-8"> 
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconCreditCardPay}
                />
            </div>

            <Card>
                <CardHeader>
                    <Filter params={params} setParams={setParams} state={props.state} />
                </CardHeader>
                <CardContent className="px-0 py-0">
                    <FrontLoanTable loans={loans} meta={meta} onSortable={onSortable} />
                </CardContent>
                <CardFooter>
                    <Pagination meta={meta} name="Peminjaman" />
                </CardFooter>
            </Card>
            </div>
            <Footer/>
        </div>
    );
}