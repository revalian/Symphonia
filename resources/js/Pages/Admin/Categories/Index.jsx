import CategoryFilter from '@/Components/Categories/CategoryFilter';
import CategoryPagination from '@/Components/Categories/CategoryPagination';
import CategoryTable from '@/Components/Categories/CategoryTable';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { IconMusic, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: categories, meta } = props.categories;
    const [params, setParams] = useState(props.state);

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('admin.categories.index'),
        Values: params,
        only: ['categories'],
    });

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconMusic}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.categories.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CategoryFilter params={params} setParams={setParams} state={props.state} />
                </CardHeader>
                <CardContent className="px-0 py-0">
                    <CategoryTable categories={categories} meta={meta} onSortable={onSortable} />
                </CardContent>
                <CardFooter>
                    <CategoryPagination meta={meta} />
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
