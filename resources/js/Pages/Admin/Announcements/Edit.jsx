import FormActions from '@/Components/DialogsAndActions/FormActions';
import HeaderSection from '@/Components/DialogsAndActions/HeaderSection';
import InputField from '@/Components/FormElements/InputField';
import TextareaField from '@/Components/FormElements/TextareaField';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconAlertCircle } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import EditCategory from '../Categories/Edit';

export default function Edit(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        message: props.announcement.message ?? '',
        url: props.announcement.url ?? '',
        is_active: props.announcement.is_active ?? false,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => {
        if (e.target.type === 'checkbox') {
            setData(e.target.name, e.target.checked);
        } else if (e.target.type === 'file') {
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
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
                backLink={route('admin.announcements.index')}
                icon={IconAlertCircle}
            />
            <form className="space-y-6" onSubmit={onHandelSubmit}>
                <InputField
                    name="message"
                    label="Pesan"
                    placeholder="Masukkan pesan..."
                    value={data.message}
                    onChange={onHandleChange}
                    error={errors.message}
                />
                <TextareaField
                    name="url"
                    label="URL"
                    placeholder="Masukkan URL..."
                    value={data.url}
                    onChange={onHandleChange}
                    error={errors.url}
                />
                <div className="flex items-center space-x-2">
                    <label htmlFor="is_active" className="text-sm">Apakah Aktif</label>
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={data.is_active}
                        onChange={onHandleChange}
                        className="form-checkbox"
                    />
                </div>
                <FormActions onReset={onHandleReset} onSubmit={onHandelSubmit} processing={processing} />
            </form>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
