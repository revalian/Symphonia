import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/Components/ui/card';
import { flashMessage } from '@/lib/utils';
import AppLayout from '@/Layouts/AppLayout';
import HeaderSection from '@/Components/Categories/HeaderSection';
import InputField from '@/Components/Categories/InputField';
import TextareaField from '@/Components/Categories/TextareaField';
import FileInputField from '@/Components/Categories/FileInputField';
import FormActions from '@/Components/Categories/FormActions';

export default function Edit(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.category.name ?? '',
        description: props.category.description ?? '',
        cover: null,
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
        fileInputCover.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
            />
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandelSubmit}>
                        <InputField
                            name="name"
                            id="name"
                            placeholder="Masukan nama..."
                            value={data.name}
                            onChange={onHandleChange}
                            error={errors.name}
                        />
                        <TextareaField
                            name="description"
                            id="description"
                            placeholder="Masukan deskripsi..."
                            value={data.description}
                            onChange={onHandleChange}
                            error={errors.description}
                        />
                        <FileInputField
                            name="cover"
                            onChange={(e) => setData(e.target.name, e.target.files[0])}
                            error={errors.cover}
                            inputRef={fileInputCover}
                        />
                        <FormActions onReset={onHandleReset} isProcessing={processing} />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
