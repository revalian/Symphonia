import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { IconPencil, IconArrowsDownUp } from '@tabler/icons-react';
import AlertDialogComponent from '@/Components/Instruments/AlertDialogComponent';
import { router } from '@inertiajs/react';
import { flashMessage } from '@/lib/utils';
import { toast } from 'sonner';

export default function InstrumentTable({ instruments, meta, onSortable }) {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    {['#', 'Kode Alat Musik', 'Nama alat musik', 'Merek', 'Stok', 'Tahun Pembuatan', 'Seri', 'Asal', 'Status', 'Harga', 'Image', 'Kategori', 'Penerbit', 'Dibuat pada', 'Aksi'].map((heading, index) => (
                        <TableHead key={index}>
                            <Button variant="ghost" className="group inline-flex" onClick={() => onSortable(heading)}>
                                {heading}
                                <IconArrowsDownUp className="size-4 ml-2 text-muted-foreground" />
                            </Button>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {instruments.map((instrument, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                        <TableCell>{instrument.instrument_code}</TableCell>
                        <TableCell>{instrument.name}</TableCell>
                        <TableCell>{instrument.brand}</TableCell>
                        <TableCell>{instrument.stock.total}</TableCell>
                        <TableCell>{instrument.manufacture_year}</TableCell>
                        <TableCell>{instrument.serial_number}</TableCell>
                        <TableCell>{instrument.origin}</TableCell>
                        <TableCell>{instrument.status}</TableCell>
                        <TableCell>Rp. {instrument.rental_price_per_day}</TableCell>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={instrument.image} />
                                <AvatarFallback>{instrument.name?.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{instrument.category_id.name}</TableCell>
                        <TableCell>{instrument.supplier_id.name}</TableCell>
                        <TableCell>{instrument.created_at}</TableCell>
                        <TableCell>
                            <Button variant="blue" size="sm" asChild>
                                <Link href={route('admin.instruments.edit', [instrument])}>
                                    <IconPencil className="size-4" />
                                </Link>
                            </Button>
                            <AlertDialogComponent
                                instrument={() => {
                                    router.delete(route('admin.instruments.destroy', [instrument]), {
                                        preserveScroll: true,
                                        preserveState: true,
                                        onSuccess: (success) => {
                                            const flash = flashMessage(success);
                                            if (flash) toast[flash.type](flash.message);
                                        },
                                    });
                                }}
                            />

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
