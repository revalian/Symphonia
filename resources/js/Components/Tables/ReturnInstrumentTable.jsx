import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { formatToRupiah } from '@/lib/utils';
import { IconArrowsDownUp } from '@tabler/icons-react';

export default function ReturnInstrumentTable({ return_instruments, meta, onSortable }) {
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
                            onClick={() => onSortable('return_instrument_code')}
                        >
                            Kode Pengembalian
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('loan_code')}>
                            Kode Peminjaman
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('user_id')}>
                            Nama
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button
                            variant="ghost"
                            className="group inline-flex"
                            onClick={() => onSortable('instrument_id')}
                        >
                            Alat Musik
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
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('loan_date')}>
                            Tanggal Peminjaman
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('due_date')}>
                            Batas Pengembalian
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('return_date')}>
                            Tanggal Pengembalian
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>Denda</TableHead>
                    <TableHead>Kondisi</TableHead>
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
                {return_instruments.map((return_instrument, index) => {
                    console.log(return_instrument.return_instrument_check); // Tambahkan log di sini

                    return (
                        <TableRow key={index}>
                            <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                            <TableCell>{return_instrument.return_instrument_code}</TableCell>
                            <TableCell>{return_instrument.loan.loan_code}</TableCell>
                            <TableCell>{return_instrument.user.name}</TableCell>
                            <TableCell>{return_instrument.instrument.name}</TableCell>
                            <TableCell>{return_instrument.status}</TableCell>
                            <TableCell>{return_instrument.loan.loan_date}</TableCell>
                            <TableCell>{return_instrument.loan.due_date}</TableCell>
                            <TableCell>{return_instrument.return_date}</TableCell>
                            <TableCell className="text-red-500">{formatToRupiah(return_instrument.fine)}</TableCell>
                            <TableCell>{return_instrument.return_instrument_check}</TableCell>
                            <TableCell>{return_instrument.created_at}</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
