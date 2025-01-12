import Filter from '@/Components/molecules/Filter';
import Pagination from '@/Components/molecules/Pagination';
import HeaderTitle from '@/Components/molecules/HeaderTitle';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { IconLayoutKanban } from '@tabler/icons-react';
import { useState } from 'react';
import AssignUserTable from '@/Components/Tables/AssignUserTable';

export default function Index(props) {
    const { data: users, meta } = props.users;
    const [params, setParams] = useState(props.state);

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('admin.assign-users.index'),
        Values: params,
        only: ['users'],
    });

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconLayoutKanban}
                />
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                        <Filter params={params} setParams={setParams} state={props.state} />
                    </div>
                </CardHeader>
                <CardContent>
                    <AssignUserTable
                        users={users}
                        meta={meta}
                        onSortable={onSortable}
                    />
                </CardContent>
                <CardFooter>
                    <Pagination meta={meta} name="tetapkan peran" />
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
