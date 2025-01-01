import GetFineStatusBadge from '@/Components/GetFineStatusBadge';
import HeaderTitle from '@/Components/HeaderTitle';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { formatToRupiah } from '@/lib/utils';
import { Table } from '@/Components/ui/table';
import { IconMoneybag } from '@tabler/icons-react';

export default function Index(props) {
    
console.log(props.return_instrument);

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconMoneybag}
                />
            </div>

            <Card>
                <CardContent className="p-6 space-y-20">
                    <div>
                        <div className='px-4 py-6 rounded-lg'>
                            <dl className='flex flex-col text-sm leading-relaxed gap-x-12 gap-y-4 text-foreground lg:flex-row'>
                                <div className='flex flex-col'>
                                    <dt className='font-semibold'>Kode Peminjaman</dt>
                                    <dd>{props.return_instrument.loan.loan_code}</dd>
                                </div>
                                <div className='flex flex-col'>
                                    <dt className='font-semibold'>Kode Pengembalian</dt>
                                    <dd>{props.return_instrument.return_instrument_code}</dd>
                                </div>
                                <div className='flex flex-col'>
                                    <dt className='font-semibold'>Tanggal Peminjaman</dt>
                                    <dd>{props.return_instrument.loan.loan_date}</dd>
                                </div>
                                <div className='flex flex-col'>
                                    <dt className='font-semibold'>Batas pengembalian</dt>
                                    <dd>{props.return_instrument.loan.due_date}</dd>
                                </div>
                                <div className='flex flex-col'>
                                    <dt className='font-semibold'>Tangal Pengembalian</dt>
                                    <dd>{props.return_instrument.return_date}</dd>
                                </div>
                                <div className='flex flex-col'>
                                    <dt className='font-semibold'>Total Denda</dt>
                                    <dd>{formatToRupiah(props.return_instrument.fine.total_fee)}</dd>
                                </div>
                            </dl>
                        </div> 
                    </div>
                    <Table className='w-full mt-6'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pengguna</TableHead>
                                <TableHead>Alat Musik</TableHead>
                                <TableHead>Denda keterlambatan</TableHead>
                                <TableHead>Denda Lain-Lain</TableHead>
                                <TableHead>Total Denda</TableHead>
                                <TableHead>Status Pembayaran</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>{props.return_instrument.user.name}</TableCell>
                                <TableCell>{props.return_instrument.instrument.name}</TableCell>
                                <TableCell>
                                    {formatToRupiah(props.return_instrument.fine.late_fee)}
                                    <span className='text-red-500'>({props.return_instrument.dayslate}) </span>
                                </TableCell>
                                <TableCell>
                                    {formatToRupiah(props.return_instrument.fine.other_fee)}
                                    <span className='text-red-500'>({props.return_instrument.return_instrument_check.condition}) </span>
                                </TableCell>
                                <TableCell>{formatToRupiah(props.return_instrument.fine.total_fee)}</TableCell>
                                <TableCell>
                                    <GetFineStatusBadge status={props.return_instrument.fine.payment_status}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div className='mt-6 grid w-full items-center gap-1.5'>
                        <Label>Catatan</Label>
                        <Textarea
                            className='resize-none'
                            value={props.return_instrument.return_instrument_check.notes ?? '-'}
                            disabled
                        >
                        </Textarea>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
