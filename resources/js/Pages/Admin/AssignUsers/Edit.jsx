import FormActions from '@/Components/molecules/FormActions';
import HeaderSection from '@/Components/organisms/HeaderSection';
import InputField from '@/Components/molecules/InputField';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconLayoutKanban } from '@tabler/icons-react';
import { toast } from 'sonner';
import { MultiSelect } from '@/Components/organisms/MultiSelect';
import { useState } from 'react';

export default function Edit(props) {
    // Log data awal untuk memastikan props.role.permissions berisi data yang benar
     //console.log("Role Permissions yang diterima dari props:", props.role.permissions);

    const [selectedRoles, setSelectedRoles] = useState(
        Array.from(new Set(props.user.roles.map((role) => role.id)))
    )

    const { data, setData, reset, post, processing, errors } = useForm({
        email: props.user.email ?? '',
        roles: selectedRoles,
        _method: props.page_settings.method,
    });
 
    const handleRoleChange = (selected) => {
        setSelectedRoles(selected);
        setData('roles', selected);
    };

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandelSubmit = (e) => {
        e.preventDefault();   
        console.log("Data yang dikirim ke server:", data); 

        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) {
                    toast[flash.type](flash.message);
                }
            },
            onError: (error) => {
            },
        });
    };

    const onHandleReset = () => {
        reset();
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
                backLink={route('admin.assign-users.index')}
                icon={IconLayoutKanban}
            />

            <form className="space-y-6" onSubmit={onHandelSubmit}>
                <InputField
                    name="email"
                    label="Pengguna"
                    placeholder="Masukkan nama..."
                    value={data.email}
                    onChange={onHandleChange}
                    error={errors.email}
                    disabled
                />

                <div>
                    <label htmlFor="roles" className="block text-sm font-medium text-gray-700">
                        Peran
                    </label>
                    <MultiSelect
                        options={props.roles}
                        onValueChange={handleRoleChange}
                        defaultValue={selectedRoles}
                        placeholder="Pilih Peran"
                        variant="inverted"
                    />
                    {errors.roles && (
                        <p className="mt-2 text-sm text-red-600">{errors.roles}</p>
                    )}
                </div>

                <FormActions onReset={onHandleReset} onSubmit={onHandelSubmit} processing={processing} />
            </form>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;

