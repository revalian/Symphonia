import Filter from '@/Components/molecules/Filter';
import Pagination from '@/Components/molecules/Pagination';
import HeaderTitle from '@/Components/molecules/HeaderTitle';
import PermissionTable from '@/Components/Tables/PermissionTable'; // Menggunakan PermissionTable
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { IconVersions, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Index(props) {
    const { data: permissions, meta } = props.permissions; // Data permissions dan meta
    const [params, setParams] = useState(props.state);

    // Fungsi untuk mengatur sortable field
    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    // Fungsi untuk menghapus permission
    const onDelete = (permissionId) => {
        router.delete(route('admin.permissions.destroy', [permissionId]), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Izin berhasil dihapus.');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat menghapus izin.');
            },
        });
    };

    // Hook untuk mengatur filter
    useFilter({
        route: route('admin.permissions.index'),
        Values: params,
        only: ['permissions'],
    });

    return (
        <div className="flex w-full flex-col pb-32">
            {/* Header */}
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconVersions}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.permissions.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>

            {/* Card untuk Permissions */}
            <Card>
                <CardHeader>
                    <Filter params={params} setParams={setParams} state={props.state} />
                </CardHeader>
                <CardContent className="px-0 py-0">
                    <PermissionTable
                        permissions={permissions}
                        meta={meta}
                        onSortable={onSortable}
                        onDelete={onDelete}
                    />
                </CardContent>
                <CardFooter>
                    <Pagination meta={meta} name="Izin" />
                </CardFooter>
            </Card>
        </div>
    );
}

// Layout dengan AppLayout
Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
