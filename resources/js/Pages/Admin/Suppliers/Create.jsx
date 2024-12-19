import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconBuildingCommunity } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

import InputField from '@/Components/Suppliers/InputField';
import TextareaField from '@/Components/Suppliers/TextareaField';

export default function Create(props) {
    const fileInputLogo = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        address: '',
        email: '',
        phone: '',
        logo: null,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => {
        if (e.target.type === 'file') {
            setData(e.target.name, e.target.files[0]);
        } else {
            setData(e.target.name, e.target.value);
        }
    };

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
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconBuildingCommunity}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.suppliers.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
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
                            Label="Logo"
                            name="logo"
                            id="logo"
                            type="file"
                            placeholder="Masukan gambar alat musik..."
                            onChange={onHandleChange}
                            error={errors.logo}
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
