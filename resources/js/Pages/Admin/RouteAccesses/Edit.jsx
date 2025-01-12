import ComboBox from '@/Components/molecules/ComboBox';
import FormActions from '@/Components/molecules/FormActions';
import HeaderSection from '@/Components/organisms/HeaderSection';
import InputError from '@/Components/atoms/InputError';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconRoute } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Edit(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        route_name: props.routeAccess.route_name ?? null,
        role: props.routeAccess.role?.name ?? null,
        permission: props.routeAccess.permission?.name ?? null,
        
        _method: props.page_settings.method,
    });

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
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
                backLink={route('admin.route-accesses.index')}
                icon={IconRoute}
            />
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="route_name">Rute</Label>
                            <ComboBox
                                items={props.routes.filter((route)=>route.value != null)}
                                selectedItem={data.route_name}
                                onSelect={(currentValue) => setData('route_name', currentValue)}
                            />
                            {errors && <InputError message={errors.route_name} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="role">Peran</Label>
                            <ComboBox
                                items={props.roles}
                                selectedItem={data.role}
                                onSelect={(currentValue) => setData('role', currentValue)}
                            />
                            {errors && <InputError message={errors.role} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="permission">Izin</Label>
                            <ComboBox
                                items={props.permissions}
                                selectedItem={data.permission}
                                onSelect={(currentValue) => setData('permission', currentValue)}
                            />
                            {errors && <InputError message={errors.role} />}
                        </div>
                     
                        <FormActions onReset={onHandleReset} isProcessing={processing} />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
