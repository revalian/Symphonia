import FormActions from '@/Components/DialogsAndActions/FormActions';
import HeaderSection from '@/Components/DialogsAndActions/HeaderSection';
import SelectGroup from '@/Components/FormElements/SelectGroup';
import { Card, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconCreditCardPay, IconMusic } from '@tabler/icons-react';
import { toast } from 'sonner';
import { Label } from '@/Components/ui/label';
import ComboBox from '@/Components/ComboBox';
import InputError from '@/Components/InputError';


export default function Create(props) {

    const { data, setData, reset, post, processing, errors } = useForm({
        user: null,
        instrument: null,
        loan_date: props.page_data.date.loan_date,
        due_date: props.page_data.date.due_date,
        _method: props.page_settings.method,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();
        console.log("Data yang dikirim:", data);  
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
                backLink={route('admin.loans.index')}
                icon={IconCreditCardPay}
            />
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="user">Nama</Label>
                            <ComboBox
                                items ={props.page_data.users}
                                selectedItem={data.user}
                                onSelect={(currentValue) => setData('user', currentValue)}
                            />
                            {errors && <InputError message={errors.user} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="instrument">Alat Musik</Label>
                            <ComboBox
                                items ={props.page_data.instruments}
                                selectedItem={data.instrument}
                                onSelect={(currentValue) => setData('instrument', currentValue)}
                            />
                            {errors && <InputError message={errors.user} />}
                        </div>
                        <FormActions onReset={onHandleReset} isProcessing={processing} />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
