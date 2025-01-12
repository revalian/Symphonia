import Filter from '@/Components/molecules/Filter';
import Pagination from '@/Components/molecules/Pagination';
import HeaderTitle from '@/Components/molecules/HeaderTitle';
import FrontLoanTable from '@/Components/Tables/FrontLoanTable';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import { Head, Link, router } from '@inertiajs/react';
import { IconCircleCheck, IconCreditCardPay, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import Navbar from '@/Components/organisms/Navbar';
import Footer from '@/Components/organisms/Footer';
import { flashMessage } from '@/lib/utils';
import { toast } from 'sonner';

export default function Show(props) {

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
                <CardHeader className="flex flex-col gap-6 text-sm border-b border-muted lg:flex-row lg:items-center lg:justify-between lg:px-6">
                    <div>
                        <dt className='font-medium text-foreground'>Kode Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.loan.loan_code}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.loan.user.name}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Tanggal Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.loan.loan_date}</dd>
                    </div>
                </CardHeader>

                <CardContent className="py-6 divide-y divide-gray-200">
                    <div className='flex items-center lg:items-start'>
                        <div className='flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg lg:h40 lg:w-40'>
                            <img 
                                src={`http://localhost:8000/storage/${props.loan.instrument.image}`} 
                                alt={props.loan.instrument.name} 
                                className='object-cover object-center w-full h-full'
                            />
                        </div>       
                        <div className='flex-1 ml-6 text-sm'>
                            <h5 className='text-lg font-bold leading-relaxed'>{props.loan.instrument.name}</h5>
                            <p className='hidden text-muted-foreground lg:mt-2 lg:block'>{props.loan.instrument.description ? props.loan.instrument.description : '' }</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className='flex items-center'>
                        <IconCircleCheck className='text-green-500 size-5'/>
                        <p className='ml-2 text-sm font-medium text-muted-foreground'>
                            Kembalikan sebelum tanggal <time dateTime={props.loan.due_date}>{props.loan.due_date}</time>
                        </p>
                    </div>

                    <div className='flex pt-6 text-sm font-medium lg:items-center lg:border-none lg:pt-0'>
                        <div className='flex justify-center flex-1'>
                            <Button variant="Link">
                                <Link
                                    href={route('front.instruments.show', [props.loan.instrument.name])}
                                >
                                    Lihat Buku
                                </Link>
                            </Button>
                            {!props.loan.return_instrument && (
                                <Button
                                    variant='orange'
                                    onClick={() => 
                                        router.post(
                                            route('front.return-instruments.store', [
                                                props.loan.instrument.slug,
                                                props.loan.loan_code,
                                            ]),{},
                                            {
                                                preserveScroll: true,
                                                preserveState:true,
                                                onSuccess: (success) => {
                                                    const flash = flashMessage(success);
                                                    if(flash) toast[flash.type](flash.message)
                                                }
                                            }
                                        )

                                    }
                                >
                                    Kembalikan
                                </Button>
                            )}
                        </div>
                    </div>
                </CardFooter>
            </Card>
            </div>
            <Footer/>
        </div>
    );
}