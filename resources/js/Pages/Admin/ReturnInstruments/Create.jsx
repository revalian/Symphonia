import FormActions from '@/Components/DialogsAndActions/FormActions';
import HeaderSection from '@/Components/DialogsAndActions/HeaderSection';
import InputField from '@/Components/FormElements/InputField';
import SelectGroup from '@/Components/FormElements/SelectGroup';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconCreditCardRefund } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Create(props) {
    const { data, setData, reset, put, processing, errors } = useForm({
        loan_date: props.loan.loan_date,
        loan_code: props.loan.loan_code,
        due_date: props.loan.due_date,
        return_date: props.date.return_date,
        condition: null,
        notes: '',
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
        put(props.page_settings.action, {
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
        <div className="flex w-full flex-col space-y-4 pb-32">
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
                backLink={route('admin.return-instruments.index')}
                icon={IconCreditCardRefund}
            />
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Peminjam</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Nama</Label>
                            <Input type="text" value={props.loan.user.name} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Username</Label>
                            <Input type="text" value={props.loan.user.username} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Email</Label>
                            <Input type="text" value={props.loan.user.email} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Nomor Handphone</Label>
                            <Input type="text" value={props.loan.user.phone} disabled />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Data Alat Musik</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Kode Alat Musik</Label>
                            <Input type="text" value={props.loan.instrument.instrument_code} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Nama Alat Musik</Label>
                            <Input type="text" value={props.loan.instrument.name} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Merek</Label>
                            <Input type="text" value={props.loan.instrument.brand} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Pemasok</Label>
                            <Input type="text" value={props.loan.instrument.supplier.name} disabled />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Peminjaman</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <InputField
                            label="Kode Peminjaman"
                            name="loan_code"
                            value={data.loan_code}
                            onChange={onHandleChange}
                            error={errors.loan_code}
                            disabled={true}
                        />
                        <InputField
                            label="Tanggal Peminjaman"
                            name="loan_date"
                            type="date"
                            value={data.loan_date}
                            onChange={onHandleChange}
                            error={errors.loan_date}
                            disabled={true}
                        />
                        <InputField
                            label="Batas Pengembalian"
                            name="due_date"
                            type="date"
                            value={data.due_date}
                            onChange={onHandleChange}
                            error={errors.due_date}
                            disabled={true}
                        />
                        <InputField
                            label="Tanggal Pengembalian"
                            name="return_date"
                            type="date"
                            value={data.return_date}
                            onChange={onHandleChange}
                            error={errors.return_date}
                            disabled={true}
                        />
                        <SelectGroup
                            name="Kondisi Alat Musik"
                            id="condition"
                            options={props.conditions.map((condition) => ({
                                value: condition.value,
                                label: condition.label,
                            }))}
                            value={data.condition}
                            onChange={(value) => setData('condition', value)}
                            error={errors.condition}
                            placeholder="Pilih Kondisi"
                        />
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="notes">Catatan</Label>
                            <Textarea
                                name="notes"
                                id="notes"
                                onChange={onHandleChange}
                                placeholder="Masukan catatan..."
                                value={data.notes}
                            ></Textarea>
                            {errors.notes && <InputError message={errors.notes} />}
                        </div>
                        <FormActions onReset={onHandleReset} isProcessing={processing} />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
