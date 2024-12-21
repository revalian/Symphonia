import FormActions from '@/Components/DialogsAndActions/FormActions';
import TextareaField from '@/Components/FormElements/TextareaField';
import HeaderSection from '@/Components/DialogsAndActions/HeaderSection';
import InputField from '@/Components/FormElements/InputField';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconCategory } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        description: '',
        cover: null,
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
            <HeaderSection
                title={props.page_settings.title}
                subtitle={props.page_settings.subtitle}
                backLink={route('admin.categories.index')}
                icon={IconCategory}
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
                <TextareaField
                    name="description"
                    label="Deskripsi"
                    placeholder="Masukan deskripsi..."
                    value={data.description}
                    onChange={onHandleChange}
                    error={errors.description}
                />
                <InputField
                    label="Cover"
                    name="cover"
                    id="cover"
                    type="file"
                    fileRef={fileInputCover}
                    placeholder="Masukan gambar alat musik..."
                    onChange={onHandleChange}
                    error={errors.cover}
                />
                <FormActions onReset={onHandleReset} onSubmit={onHandelSubmit} processing={processing} />
            </form>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
