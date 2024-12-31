import Filter from '@/Components/FiltersAndPagination/Filter';
import Pagination from '@/Components/FiltersAndPagination/Pagination';
import HeaderTitle from '@/Components/HeaderTitle';
import ReturnInstrumentTable from '@/Components/Tables/ReturnInstrumentTable';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { IconCreditCardRefund } from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: return_instruments, meta } = props.return_instruments;
    const [params, setParams] = useState(props.state);

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('admin.return-instruments.index'),
        Values: params,
        only: ['return_instruments'],
    });

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconCreditCardRefund}
                />
            </div>

            <Card>
                <CardHeader>
                    <Filter params={params} setParams={setParams} state={props.state} />
                </CardHeader>
                <CardContent className="px-0 py-0">
                    <ReturnInstrumentTable
                        return_instruments={return_instruments}
                        meta={meta}
                        onSortable={onSortable}
                    />
                </CardContent>
                <CardFooter>
                    <Pagination meta={meta} name="Pengembalian" />
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
