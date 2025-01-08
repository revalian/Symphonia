import FormActions from '@/Components/DialogsAndActions/FormActions';
import HeaderSection from '@/Components/DialogsAndActions/HeaderSection';
import InputField from '@/Components/FormElements/InputField';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconCircleKey } from '@tabler/icons-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { toast } from 'sonner';

export default function Edit(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.role.name ?? '',
        guard_name: props.role.guard_name ?? 'web',
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
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
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
                backLink={route('admin.roles.index')}
                icon={IconCircleKey}
            />
            <form className="space-y-6" onSubmit={onHandelSubmit}>
                <InputField
                    name="name"
                    label="Nama"
                    placeholder="Masukkan nama..."
                    value={data.name}
                    onChange={onHandleChange}
                    error={errors.name}
                />
                
                {/* Dropdown Guard Name */}
                <div>
                    <label htmlFor="guard_name" className="block text-sm font-medium text-gray-700">
                        Guard Name
                    </label>
                    <Select
                        onValueChange={(value) => setData('guard_name', value)}
                        value={data.guard_name}
                    >
                        <SelectTrigger className="w-full mt-1">
                            <SelectValue>
                                {['web', 'api'].find((guard) => guard === data.guard_name) ?? 'Pilih Guard'}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {['web', 'api'].map((guard, index) => (
                                <SelectItem key={index} value={guard}>
                                    {guard.charAt(0).toUpperCase() + guard.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.guard_name && (
                        <p className="mt-2 text-sm text-red-600">{errors.guard_name}</p>
                    )}
                </div>

                <FormActions onReset={onHandleReset} onSubmit={onHandelSubmit} processing={processing} />
            </form>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
