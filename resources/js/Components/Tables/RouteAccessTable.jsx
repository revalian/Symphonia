import AlertDialogComponent from '@/Components/molecules/AlertDialogComponent';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { IconArrowsDownUp, IconPencil } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function RouteAccessTable({ route_accesses, meta, onSortable }) {
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
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('route_name')}>
                            Rute
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('role_id')}>
                            Peran
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('permission_id')}>
                            Izin
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
                {route_accesses.map((route_accsess, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                        <TableCell>{route_accsess.route_name}</TableCell>
                        <TableCell>{route_accsess.role?.name}</TableCell>
                        <TableCell>{route_accsess.permission?.name}</TableCell>
                        <TableCell>{route_accsess.created_at}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-x-1">
                                <Button variant="blue" size="sm" asChild>
                                    <Link href={route('admin.route-accesses.edit', [route_accsess])}>
                                        <IconPencil className="size-4" />
                                    </Link>
                                </Button>
                                <AlertDialogComponent
                                  title="Hapus Akses Rute"
                                  description="Apakah anda yakin ingin menghapus akses rute ini?"
                                  cancelText="Batal"
                                  confirmText="Hapus"
                                   data={()=>
                                        router.delete(
                                            route('admin.route-accesses.destroy', [route_accsess]),{
                                                preserveScroll: true,
                                                preserveState: true,
                                                onSuccess: (success)=>{
                                                    const flash = flashMessage(success);
                                                    if(flash) toast[flash.type](flash.message);
                                                }
                                            }
                                        )
                                       }
                                    >
                                    <Button variant="destructive" size="sm">
                                        Hapus
                                    </Button>
                                </AlertDialogComponent>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}