import AlertDialogComponent from '@/Components/molecules/AlertDialogComponent';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { IconArrowsDownUp, IconCreditCardRefund, IconPencil } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function LoanTable({ loans, meta, onSortable }) {
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
                {loans.map((loan, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                        <TableCell>{loan.loan_code}</TableCell>
                        <TableCell>{loan.user.name}</TableCell>
                        <TableCell>{loan.instrument.name}</TableCell>
                        <TableCell>{loan.loan_date}</TableCell>
                        <TableCell>{loan.due_date}</TableCell>
                        <TableCell>{loan.created_at}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-x-1">
                                {!loan.has_return_instrument && (
                                    <Button variant="purple" size="sm" asChild>
                                        <Link href={route('admin.return-instruments.create', [loan])}>
                                            <IconCreditCardRefund className="size-4" />
                                        </Link>
                                    </Button>
                                )}
                                <Button variant="blue" size="sm" asChild>
                                    <Link href={route('admin.loans.edit', [loan])}>
                                        <IconPencil className="size-4" />
                                    </Link>
                                </Button>
                                <AlertDialogComponent
                                    data={() => {
                                        router.delete(route('admin.loans.destroy', [loan]), {
                                            preserveScroll: true,
                                            preserveState: true,
                                            onSuccess: (success) => {
                                                const flash = flashMessage(success);
                                                if (flash) toast[flash.type](flash.message);
                                            },
                                        });
                                    }}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
