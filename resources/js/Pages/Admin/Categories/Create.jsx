// resources/js/Pages/Admin/Categories/Create.jsx
import HeaderSection from '@/Components/Categories/HeaderSection';
import InputField from '@/Components/Categories/InputField';
import TextareaField from '@/Components/Categories/TextareaField';
import FileInputField from '@/Components/Categories/FileInputField';
import FormActions from '@/Components/Categories/FormActions';
import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import { flashMessage } from '@/lib/utils';
import { toast } from 'sonner';
import { useRef } from 'react';

export default function Create(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        description: '',
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
                backLink={route('admin.categories.index')} 
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
                <FileInputField 
                    name="cover" 
                    label="Cover" 
                    onChange={(e) => setData(e.target.name, e.target.files[0])} 
                    error={errors.cover} 
                    fileRef={fileInputCover} 
                />
                <FormActions 
                    onReset={onHandleReset} 
                    onSubmit={onHandelSubmit} 
                    processing={processing} 
                />
            </form>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
