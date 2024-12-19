import AlertDialogComponent from '@/Components/Instruments/AlertDialogComponent';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { IconArrowsDownUp, IconPencil } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function InstrumentTable({ instruments, meta, onSortable }) {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('id')}>
                            #
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button
                            variant="ghost"
                            className="group inline-flex"
                            onClick={() => onSortable('instrument_code')}
                        >
                            Kode Alat Musik
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('name')}>
                            Nama
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('brand')}>
                            Merek
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('total')}>
                            Stok
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button
                            variant="ghost"
                            className="group inline-flex"
                            onClick={() => onSortable('manufacture_year')}
                        >
                            Tahun Pembuatan
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button
                            variant="ghost"
                            className="group inline-flex"
                            onClick={() => onSortable('serial_number')}
                        >
                            Seri
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('origin')}>
                            Asal
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('status')}>
                            Status
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button
                            variant="ghost"
                            className="group inline-flex"
                            onClick={() => onSortable('rental_price_per_day')}
                        >
                            Harga Sewa
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('image')}>
                            Image
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('category')}>
                            Kategori
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('supplier')}>
                            Penerbit
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('created_at')}>
                            Dibuat pada
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>Aksi</TableHead>
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
