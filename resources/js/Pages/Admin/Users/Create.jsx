// resources/js/Pages/Admin/Categories/Create.jsximport TextareaField from '@/Components/FormElements/TextareaField';
import FormActions from '@/Components/DialogsAndActions/FormActions';
import HeaderSection from '@/Components/DialogsAndActions/HeaderSection';
import InputField from '@/Components/FormElements/InputField';
import SelectGroup from '@/Components/FormElements/SelectGroup';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconUsersGroup } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const fileInputAvatar = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        avatar: null,
        gender: null,
        date_of_birth: '',
        address: '',
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
        fileInputAvatar.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
                backLink={route('admin.users.index')}
                icon={IconUsersGroup}
            />
            <form className="space-y-6" onSubmit={onHandelSubmit}>
                <InputField
                    name="name"
                    label="Nama"
                    placeholder="Masukan nama..."
                    value={data.name}
                    onChange={onHandleChange}
                    error={errors.name}
                />
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Masukan email..."
                    value={data.email}
                    onChange={onHandleChange}
                    error={errors.email}
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Masukan password..."
                    value={data.password}
                    onChange={onHandleChange}
                    error={errors.password}
                    type="password"
                />
                <InputField
                    name="password_confirmation"
                    label="Konfirmasi Pssword"
                    placeholder="Masukan konfirmasi password..."
                    value={data.password_confirmation}
                    onChange={onHandleChange}
                    error={errors.password_confirmation}
                    type="password"
                />
                <InputField
                    name="phone"
                    label="Nomor Handphone"
                    placeholder="Masukan nomor handphone..."
                    value={data.phone}
                    onChange={onHandleChange}
                    error={errors.phone}
                />
                <InputField
                    name="avatar"
                    label="Avatar"
                    type="file"
                    fileRef={fileInputAvatar}
                    placeholder="Masukan gambar ..."
                    onChange={onHandleChange}
                    error={errors.avatar}
                />

                <SelectGroup
                    name="Gender"
                    id="gender"
                    options={props.page_data.genders.map((gender) => ({
                        value: gender.value,
                        label: gender.label,
                    }))}
                    value={data.gender}
                    onChange={(value) => setData('gender', value)}
                    error={errors.gender}
                    placeholder="Pilih jenis kelamin"
                />

                <FormActions onReset={onHandleReset} onSubmit={onHandelSubmit} processing={processing} />
            </form>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
