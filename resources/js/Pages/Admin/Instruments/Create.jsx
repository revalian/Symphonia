import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import HeaderTitle from '@/Components/HeaderTitle';
import InputGroup from '@/Components/Instruments/InputGroup';
import SelectGroup from '@/Components/Instruments/SelectGroup';
import TextareaGroup from '@/Components/Instruments/TextareaGroup';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconMusic } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        brand: '',
        manufacture_year: null,
        serial_number: '',
        origin: null,
        description: '',
        image: null,
        rental_price_per_day: 0,
        category_id: null,
        supplier_id: null,
        total: 0,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => {
        if (e.target.type === "file") {
            setData(e.target.name, e.target.files[0]); 
        } else {
            setData(e.target.name, e.target.value); 
        }
    };
    
    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) {
                    toast[flash.type](flash.message);
                }
            },
        });
    };

    const onHandleReset = () => {
        reset();
        fileInputCover.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconMusic}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.instruments.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <InputGroup
                            name="Nama"
                            id="name"
                            placeholder="Masukan nama alat musik..."
                            value={data.name}
                            onChange={onHandleChange}
                            error={errors.name}
                        />
                        <InputGroup
                            name="Merek"
                            id="brand"
                            placeholder="Masukan merek alat musik..."
                            value={data.brand}
                            onChange={onHandleChange}
                            error={errors.brand}
                        />
                        <SelectGroup
                            name="Tahun Pembuatan"
                            id="manufacture_year"
                            options={props.page_data.manufactureYears.map(year => ({ value: year, label: year }))}
                            value={data.manufacture_year}
                            onChange={(value) => setData('manufacture_year', value)}
                            error={errors.manufacture_year}
                            placeholder="Pilih Tahun Pembuatan"
                        />
                        <InputGroup
                            name="Serial Number"
                            id="serial_number"
                            placeholder="Masukan serial alat musik..."
                            value={data.serial_number}
                            onChange={onHandleChange}
                            error={errors.serial_number}
                        />
                        <SelectGroup
                            name="Asal"
                            id="origin"
                            options={props.page_data.origins.map(origin => ({
                                value: origin.value,
                                label: origin.label,
                            }))}
                            value={data.origin}
                            onChange={(value) => setData('origin', value)}
                            error={errors.origin}
                            placeholder="Pilih Asal Alat Musik"
                        />
                        <TextareaGroup
                            name="Deskripsi"
                            id="description"
                            placeholder="Masukan deskripsi..."
                            value={data.description}
                            onChange={onHandleChange}
                            error={errors.description}
                        />
                        <InputGroup
                            name="Image"
                            id="image"
                            type='file'
                            placeholder="Masukan gambar alat musik..."
                            
                            onChange={onHandleChange}
                            error={errors.image}
                        />
                        <InputGroup
                            name="Harga"
                            id="rental_price_per_day"
                            type="text"
                            placeholder="Masukan harga alat musik..."
                            value={data.rental_price_per_day}
                            onChange={onHandleChange}
                            error={errors.rental_price_per_day}
                        />
                        <SelectGroup
                            name="Kategori"
                            id="category_id"
                            options={props.page_data.categories.map(category_id => ({
                                value: category_id.value,
                                label: category_id.label,
                            }))}
                            value={data.category_id}
                            onChange={(value) => setData('category_id', value)}
                            error={errors.category_id}
                            placeholder="Pilih Kategori Alat Musik"
                        />
                        <SelectGroup
                            name="Pemasok"
                            id="supplier_id"
                            options={props.page_data.suppliers.map(supplier_id => ({
                                value: supplier_id.value,
                                label: supplier_id.label,
                            }))}
                            value={data.supplier_id}
                            onChange={(value) => setData('supplier_id', value)}
                            error={errors.supplier_id}
                            placeholder="Pilih Pemasok Alat Musik"
                        />
                        <InputGroup
                            name="Stok"
                            id="total"
                            type="text"
                            placeholder="Masukan harga alat musik..."
                            value={data.total}
                            onChange={onHandleChange}
                            error={errors.total}
                        />
                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="orange" size="lg" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
