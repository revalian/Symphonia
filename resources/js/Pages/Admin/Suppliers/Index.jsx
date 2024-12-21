import Filter from '@/Components/FiltersAndPagination/Filter';
import Pagination from '@/Components/FiltersAndPagination/Pagination';
import HeaderTitle from '@/Components/HeaderTitle';
import SupplierTable from '@/Components/Suppliers/SupplierTable';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { IconBuildingCommunity, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: suppliers, meta } = props.suppliers;
    const [params, setParams] = useState(props.state);

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('admin.suppliers.index'),
        Values: params,
        only: ['suppliers'],
    });

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconBuildingCommunity}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.suppliers.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <Filter params={params} setParams={setParams} state={props.state} />
                </CardHeader>

                <CardContent className="px-0 py-0 [&-td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <SupplierTable suppliers={suppliers} meta={meta} onSortable={onSortable} />
                </CardContent>

                <CardFooter>
                    <Pagination meta={meta} name="Pemasok" />
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
