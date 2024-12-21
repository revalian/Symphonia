import { Card, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import {  useForm } from '@inertiajs/react';
import {  IconBuildingCommunity } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import InputField from '@/Components/FormElements/InputField';
import HeaderSection from '@/Components/DialogsAndActions/HeaderSection';
import TextareaField from '@/Components/FormElements/TextareaField';
import FormActions from '@/Components/DialogsAndActions/FormActions';

export default function Edit(props) {
    const fileInputLogo = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.supplier.name ?? '',
        address: props.supplier.address ?? '',
        email: props.supplier.email ?? '',
        phone: props.supplier.phone ?? '',
        logo: null,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value);

    const onHandelSubmit = (e) => {
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
        fileInputLogo.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
                backLink={route('admin.suppliers.index')}
                icon={IconBuildingCommunity}
            />
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandelSubmit}>
                        <InputField
                            label="Nama"
                            name="name"
                            value={data.name}
                            onChange={onHandleChange}
                            placeholder="Masukan nama..."
                            error={errors.name}
                        />

                        <TextareaField
                            label="Alamat"
                            name="address"
                            value={data.address}
                            onChange={onHandleChange}
                            placeholder="Masukan alamat..."
                            error={errors.address}
                        />

                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={onHandleChange}
                            placeholder="Masukan email..."
                            error={errors.email}
                        />

                        <InputField
                            label="Nomor Handphone"
                            name="phone"
                            type="phone"
                            value={data.phone}
                            onChange={onHandleChange}
                            placeholder="Masukan nomor handphone..."
                            error={errors.phone}
                        />

                        <InputField
                            label="Logo"
                            name="logo"
                            id="logo"
                            type="file"
                            fileRef={fileInputLogo}
                            placeholder="Masukan gambar alat musik..."
                            onChange={onHandleChange}
                            error={errors.logo}
                        />

                        <FormActions onReset={onHandleReset} isProcessing={processing} />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
