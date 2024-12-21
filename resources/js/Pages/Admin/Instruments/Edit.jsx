import HeaderSection from '@/Components/DialogsAndActions/HeaderSection';
import SelectGroup from '@/Components/FormElements/SelectGroup';
import InputField from '@/Components/FormElements/InputField';
import { Card, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconMusic } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import FormActions from '@/Components/DialogsAndActions/FormActions';
import TextareaField from '@/Components/FormElements/TextareaField';

export default function Edit(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.instrument.name ?? '',
        brand: props.instrument.brand ?? '',
        manufacture_year: props.instrument.manufacture_year ?? null,
        serial_number: props.instrument.serial_number ?? '',
        origin: props.instrument.origin ?? null,
        description: props.instrument.description ?? '',
        image: null,
        rental_price_per_day: props.instrument.rental_price_per_day ?? 0,
        category_id: props.instrument.category_id ?? null,
        supplier_id: props.instrument.supplier_id ?? null,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => {
        if (e.target.type === 'file') {
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
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
                backLink={route('admin.instruments.index')}
                icon={IconMusic}
            />
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <InputField
                            label="Nama Alat Musik"
                            name="name"
                            placeholder="Masukan nama alat musik..."
                            value={data.name}
                            onChange={onHandleChange}
                            error={errors.name}
                        />
                        <InputField
                            label="Merek"
                            name="brand"
                            placeholder="Masukan merek alat musik..."
                            value={data.brand}
                            onChange={onHandleChange}
                            error={errors.brand}
                        />
                        <SelectGroup
                            name="Tahun Pembuatan"
                            id="manufacture_year"
                            options={props.page_data.manufactureYears.map((year) => ({ value: year, label: year }))}
                            value={data.manufacture_year}
                            onChange={(value) => setData('manufacture_year', value)}
                            error={errors.manufacture_year}
                            placeholder="Pilih Tahun Pembuatan"
                        />
                        <InputField
                            label="Serial Number"
                            name="serial_number"
                            placeholder="Masukan serial alat musik..."
                            value={data.serial_number}
                            onChange={onHandleChange}
                            error={errors.serial_number}
                        />
                        <SelectGroup
                            name="Asal"
                            id="origin"
                            options={props.page_data.origins.map((origin) => ({
                                value: origin.value,
                                label: origin.label,
                            }))}
                            value={data.origin}
                            onChange={(value) => setData('origin', value)}
                            error={errors.origin}
                            placeholder="Pilih Asal Alat Musik"
                        />
                        <TextareaField
                            label="Deskripsi"
                            name="description"
                            value={data.description}
                            onChange={onHandleChange}
                            placeholder="Masukan deskripsi..."
                            error={errors.description}
                        />
                        <InputField
                            label="Image"
                            name="image"
                            type="file"
                            fileRef={fileInputCover}
                            placeholder="Masukan gambar alat musik..."
                            onChange={onHandleChange}
                            error={errors.image}
                        />
                        <InputField
                            label="Harga"
                            name="rental_price_per_day"
                            type="text"
                            placeholder="Masukan harga alat musik..."
                            value={data.rental_price_per_day}
                            onChange={onHandleChange}
                            error={errors.rental_price_per_day}
                        />
                        <SelectGroup
                            name="Kategori"
                            id="category_id"
                            options={props.page_data.categories.map((category_id) => ({
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
                            options={props.page_data.suppliers.map((supplier_id) => ({
                                value: supplier_id.value,
                                label: supplier_id.label,
                            }))}
                            value={data.supplier_id}
                            onChange={(value) => setData('supplier_id', value)}
                            error={errors.supplier_id}
                            placeholder="Pilih Pemasok Alat Musik"
                        />
                        <FormActions onReset={onHandleReset} isProcessing={processing} />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
