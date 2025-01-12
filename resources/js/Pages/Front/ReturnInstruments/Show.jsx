import Filter from '@/Components/molecules/Filter';
import Pagination from '@/Components/molecules/Pagination';
import HeaderTitle from '@/Components/molecules/HeaderTitle';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import { IconChecklist, IconCircleCheck, IconCreditCardRefund, IconMoneybag } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import ReturnFrontInstrumentTable from '@/Components/Tables/ReturnFrontInstrumentTable';
import Navbar from '@/Components/organisms/Navbar';
import Footer from '@/Components/organisms/Footer';
import { Head, Link } from '@inertiajs/react';
import CardStat from '@/Components/molecules/CardStat';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { FINEPAYMENTSTATUS, formatToRupiah } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import GetFineStatusBadge from '@/Components/molecules/GetFineStatusBadge';

export default function Show(props) {
    console.log(props);
    const {SUCCESS} = FINEPAYMENTSTATUS;

return (
        
        <div className="flex w-full flex-col min-h-screen">
            <Navbar />
            <Head title={props.page_settings.title} />
                {/* Gunakan container mx-auto */}
            <div className="container mx-auto max-w-screen-xl px-4 lg:px-8 flex-1">
                <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={props.page_settings.title}
                        subtitle={props.page_settings.subtitle}
                        icon={IconCreditCardRefund}
                    />
                </div>
                <Card>
                <CardHeader className="flex flex-col gap-6 text-sm border-b border-muted lg:flex-row lg:items-center lg:justify-between lg:px-6">
                    <div>
                        <dt className='font-medium text-foreground'>Kode Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_instrument.loan.loan_code}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_instrument.user.name}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Tanggal Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_instrument.loan.loan_date}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Kode Pengembalian</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_instrument.return_instrument_code}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Status</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_instrument.status}</dd>
                    </div> 
                </CardHeader>

                <CardContent className="py-6 divide-y divide-gray-200">
                    <div className='flex items-center lg:items-start'>
                        <div className='flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg lg:h40 lg:w-40'>
                            <img 
                                src={`${props.return_instrument.instrument.image}`} 
                                alt={props.return_instrument.instrument.name} 
                                className='object-cover object-center w-full h-full'
                            />
                        </div>       
                        <div className='flex-1 ml-6 text-sm'>
                            <h5 className='text-lg font-bold leading-relaxed'>{props.return_instrument.instrument.name}</h5>
                            <p className='hidden text-muted-foreground lg:mt-2 lg:block'>{props.return_instrument.instrument.description ? props.return_instrument.instrument.description : '' }</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className='flex items-center'>
                        <IconCircleCheck className='text-green-500 size-5'/>
                        <p className='ml-2 text-sm font-medium text-muted-foreground'>
                            Dikembalikan pada tanggal <time dateTime={props.return_instrument.return_date}>{props.return_instrument.return_date}</time>
                        </p>
                    </div>

                    <div className='flex pt-6 text-sm font-medium lg:items-center lg:border-none lg:pt-0'>
                        <div className='flex justify-center flex-1'>
                            <Button variant="Link">
                                <Link
                                    href={route('front.instruments.show', [props.return_instrument.instrument.name])}
                                >
                                    Lihat Buku
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
            {props.return_instrument.fine && (
                <h2 className='font-semibold leading-relaxed text-foreground'>Informasi Denda</h2>
            )}

            {props.return_instrument.fine && props.return_instrument.fine.payment_status != SUCCESS && (
                <Alert variant='destructive'>
                    <AlertTitle>Informasi</AlertTitle>
                    <AlertDescription>
                        Setelah melalui pengecekan peminjaman alat musik anda terkena denda. Harap untuk melunasi pembayaran denda terlebih dahulu.
                    </AlertDescription>
                </Alert>
            )}

            {props.return_instrument.fine && (
                <Card>
                    <CardContent className='p-6 space-y-20'>
                        <div>
                            <div className='px-4 py-6 rounded-lg'>
                                <dl className='flex flex-col text-sm leading-relaxed gap-x-12 gap-y-4 text-foreground lg:flex-row'>
                                    <div className='flex flex-col'>
                                        <dt className='font-semibold'>Kode Peminjaman</dt>
                                        <dd>{props.return_instrument.loan.loan_code}</dd>
                                    </div>
                                    <div className='flex flex-col'>
                                        <dt className='font-semibold'>Tanggal Peminjaman</dt>
                                        <dd>
                                            <time dateTime={props.return_instrument.loan.loan_date}>
                                                {props.return_instrument.loan.loan_date}
                                            </time>
                                        </dd>
                                    </div>
                                    <div className='flex flex-col'>
                                        <dt className='font-semibold'>Batas Pengembalian</dt>
                                        <dd>
                                            <time dateTime={props.return_instrument.loan.due_date}>
                                                {props.return_instrument.loan.due_date}
                                            </time>
                                        </dd>
                                    </div>
                                    <div className='flex flex-col'>
                                        <dt className='font-semibold'>Total Denda</dt>
                                        <dd className='text-red-500'>{formatToRupiah(props.return_instrument.fine.total_fee)}</dd>
                                    </div>
                                </dl>
                            </div>
                            <Table className="w-full mt-6">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pengguna</TableHead>
                                        <TableHead>Alat Musik</TableHead>
                                        <TableHead>Denda Keterlambatan</TableHead>
                                        <TableHead>Denda Lain-Lain</TableHead>
                                        <TableHead>Total Denda</TableHead>
                                        <TableHead>Status Pembayaran</TableHead>
                                        {props.return_instrument.fine.payment_status != 'Sukses' && (
                                            <TableHead>Aksi</TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                        <TableRow>
                                        <TableCell>{props.return_instrument.user.name}</TableCell>
                                        <TableCell>{props.return_instrument.instrument.name}</TableCell>
                                        <TableCell>
                                            {formatToRupiah(props.return_instrument.fine.late_fee)}
                                            <span className='text-red-500'>({props.return_instrument.dayslate})</span>
                                        </TableCell>
                                        <TableCell>
                                            {formatToRupiah(props.return_instrument.fine.other_fee)}
                                            <span className='text-red-500'>({props.return_instrument.return_instrument_check.condition})</span>
                                        </TableCell>
                                        <TableCell>
                                            {formatToRupiah(props.return_instrument.fine.total_fee)}
                                            
                                        </TableCell>
                                        <TableCell>
                                            <GetFineStatusBadge status={props.return_instrument.fine.payment_status}/>
                                        </TableCell>
                                            {props.return_instrument.fine.payment_status != SUCCESS &&
                                                <TableCell>
                                                    <Button 
                                                        variant="outline"
                                                        onClick={(e) => console.log('bayar')}
                                                        >
                                                            Bayar
                                                        </Button>
                                                </TableCell>
                                            }
                                        </TableRow>
                                </TableBody>   
                            </Table>
                            <p className='mt-12 text-sm'>
                                <span className='font-medium'>Catatan: </span>
                                {props.return_instrument.return_instrument_check.notes}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
            </div>
            <Footer/>
        </div>
    );
}