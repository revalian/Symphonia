import Filter from '@/Components/molecules/Filter';
import Pagination from '@/Components/molecules/Pagination';
import HeaderTitle from '@/Components/molecules/HeaderTitle';
import RouteAccessTable from '@/Components/Tables/RouteAccessTable';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { IconCircleKey, IconPlus, IconRoute } from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: route_accesses, meta } = props.route_accesses; 
    const [params, setParams] = useState(props.state);

    // Fungsi untuk mengatur sortable field
    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    // Hook untuk mengatur filter
    useFilter({
        route: route('admin.route-accesses.index'),
        Values: params,
        only: ['route_accesses'],
    });

    return (
        <div className="flex w-full flex-col pb-32">
            {/* Header */}
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconRoute}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.route-accesses.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>

            {/* Card untuk Roles */}
            <Card>
                <CardHeader>
                    <Filter params={params} setParams={setParams} state={props.state} />
                </CardHeader>
                <CardContent className="px-0 py-0">
                    <RouteAccessTable route_accesses={route_accesses} meta={meta} onSortable={onSortable} />
                </CardContent>
                <CardFooter>
                    <Pagination meta={meta} name="rute akses" />
                </CardFooter>
            </Card>
        </div>
    );
}

// Layout dengan AppLayout
Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
