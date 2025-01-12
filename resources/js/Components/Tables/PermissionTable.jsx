import AlertDialogComponent from '@/Components/molecules/AlertDialogComponent';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { IconArrowsDownUp, IconPencil, IconTrash } from '@tabler/icons-react';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { toast } from 'sonner';

export default function PermissionTable({ permissions, meta, onSortable }) {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    {/* # Column */}
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('id')}>
                            #
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>

                    {/* Name Column */}
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('name')}>
                            Nama
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>

                    {/* Guard Column */}
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('guard_name')}>
                            Guard
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>

                    {/* Created At Column */}
                    <TableHead>
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('created_at')}>
                            Dibuat pada
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>

                    {/* Actions Column */}
                    <TableHead>Aksi</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {permissions.map((permission, index) => (
                    <TableRow key={permission.id}>
                        {/* Index */}
                        <TableCell>{meta.from + index}</TableCell>

                        {/* Permission Name */}
                        <TableCell>{permission.name}</TableCell>

                        {/* Guard Name */}
                        <TableCell>{permission.guard_name}</TableCell>

                        {/* Created At */}
                        <TableCell>{permission.created_at}</TableCell>

                        {/* Actions */}
                        <TableCell>
                            <div className="flex items-center gap-x-1">
                                {/* Edit Button */}
                                <Button variant="blue" size="sm" asChild>
                                    <Link href={route('admin.permissions.edit', [permission])}>
                                        <IconPencil className="size-4" />
                                    </Link>
                                </Button>

                                {/* Delete Button with Alert Dialog */}
                                <AlertDialogComponent
                                    data={() => {
                                        router.delete(route('admin.permissions.destroy', [permission]), {
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
