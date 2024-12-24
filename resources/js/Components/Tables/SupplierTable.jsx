import AlertDialogComponent from '@/Components/DialogsAndActions/AlertDialogComponent'; // This can be an additional component for AlertDialog
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { IconArrowsDownUp, IconPencil } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function SupplierTable({ suppliers, meta, onSortable }) {
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
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('name')}>
                            Nama
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('address')}>
                            Alamat
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('email')}>
                            Email
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('phone')}>
                            Nomor Handphone
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
                {suppliers.map((suppliers, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                        <TableCell>{suppliers.name}</TableCell>
                        <TableCell>{suppliers.address}</TableCell>
                        <TableCell>{suppliers.email}</TableCell>
                        <TableCell>{suppliers.phone}</TableCell>
                        <TableCell>{suppliers.created_at}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-x-1">
                                <Button variant="blue" size="sm" asChild>
                                    <Link href={route('admin.suppliers.edit', [suppliers])}>
                                        <IconPencil className="size-4" />
                                    </Link>
                                </Button>
                                <AlertDialogComponent
                                    data={() => {
                                        router.delete(route('admin.suppliers.destroy', [suppliers]), {
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
