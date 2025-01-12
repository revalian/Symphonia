import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/Components/ui/table';
import { IconArrowsDownUp, IconRefresh } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import { Badge } from '@/Components/ui/badge';

export default function AssignUserTable({ users, meta, onSortable }) {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('id')}>
                            #
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead className="text-left">
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('email')}>
                            Email
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead className="text-left">
                        <Button variant="ghost" className="group inline-flex" onClick={() => onSortable('username')}>
                            Username
                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                            </span>
                        </Button>
                    </TableHead>
                    <TableHead className="text-left">Roles</TableHead>
                    <TableHead className="text-left">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>
                            {user.roles.map((role, index) => (
                                <span className="w-auto text-wrap" key={index}>
                                    <Badge variant="outline" className="my-0.5 mr-2">
                                        {role}
                                    </Badge>
                                </span>
                            ))}
                        </TableCell>
                        <TableCell className="text-left flex items-center gap-x-2">
                            <Button variant="blue" size="sm" asChild>
                                <Link href={route('admin.assign-users.edit', [user])}>
                                    <IconRefresh className="size-4" />
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
