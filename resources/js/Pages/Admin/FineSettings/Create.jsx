import FormActions from '@/Components/DialogsAndActions/FormActions';
import InputField from '@/Components/FormElements/InputField';
import HeaderTitle from '@/Components/HeaderTitle';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconSettingsExclamation } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        late_fee_per_day: props.fine_setting?.late_fee_per_day ?? 0,
        damage_fee_percentage: props.fine_setting?.damage_fee_percentage ?? 0,
        lost_fee_percentage: props.fine_setting?.lost_fee_percentage ?? 0,

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
        fileInputCover.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconSettingsExclamation}
                />
            </div>
            <form className="space-y-6" onSubmit={onHandelSubmit}>
                <InputField
                    name="late_fee_per_day"
                    label="Denda Keterlambatan"
                    type="number"
                    value={data.late_fee_per_day}
                    onChange={onHandleChange}
                    error={errors.late_fee_per_day}
                />
                <InputField
                    name="damage_fee_percentage"
                    label="Denda Rusak (%)"
                    type="number"
                    value={data.damage_fee_percentage}
                    onChange={onHandleChange}
                    error={errors.damage_fee_percentage}
                />
                <InputField
                    name="lost_fee_percentage"
                    label="Denda Hilang (%)"
                    type="number"
                    value={data.lost_fee_percentage}
                    onChange={onHandleChange}
                    error={errors.lost_fee_percentage}
                />
                <FormActions onReset={onHandleReset} onSubmit={onHandelSubmit} processing={processing} />
            </form>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
