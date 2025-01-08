import { useState } from 'react'; // Menambahkan import useState
import Filter from '@/Components/molecules/Filter';
import Pagination from '@/Components/molecules/Pagination';
import HeaderTitle from '@/Components/molecules/HeaderTitle';
import AnnouncementTable from '@/Components/Tables/AnnouncementTable';
import AlertDialogComponent from '@/Components/molecules/AlertDialogComponent'; // Komponen untuk konfirmasi
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Link, router } from '@inertiajs/react';
import { IconAlertCircle, IconPlus } from '@tabler/icons-react';
import { toast } from 'sonner'; // Untuk menampilkan notifikasi
import AppLayout from '@/Layouts/AppLayout';

export default function Index(props) {
    const { data: announcements, meta } = props.announcements;

    const onSortable = (column) => {
        console.log(`Mengurutkan berdasarkan kolom: ${column}`);
        // Logika pengurutan bisa ditambahkan di sini.
    };

    const [isDialogOpen, setDialogOpen] = useState(false); // Menggunakan useState untuk mengontrol dialog
    const [announcementIdToDelete, setAnnouncementIdToDelete] = useState(null); // Menyimpan ID pengumuman yang akan dihapus

    // Fungsi untuk menampilkan konfirmasi hapus
    const openDeleteDialog = (id) => {
        setAnnouncementIdToDelete(id);
        setDialogOpen(true);
    };

    // Fungsi untuk menangani penghapusan
    const handleDelete = () => {
        router.delete(route('admin.announcements.destroy', { announcement: announcementIdToDelete }), {
            preserveScroll: true,
            onSuccess: (response) => {
                toast.success('Pengumuman berhasil dihapus.');
                setDialogOpen(false); // Menutup dialog setelah penghapusan
            },
            onError: (error) => {
                toast.error('Gagal menghapus pengumuman.');
                setDialogOpen(false); // Menutup dialog jika gagal
            },
        });
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconAlertCircle}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.announcements.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="px-0 py-0">
                    <AnnouncementTable
                        announcements={announcements}
                        meta={meta}
                        onSortable={onSortable}
                        onDelete={openDeleteDialog} // Kirim fungsi openDeleteDialog ke AnnouncementTable
                    />
                </CardContent>
                <CardFooter>
                    <Pagination meta={meta} name="Pengumuman" />
                </CardFooter>
            </Card>

            {/* Alert Dialog untuk konfirmasi hapus */}
            {isDialogOpen && (
                <AlertDialogComponent
                    title="Konfirmasi Hapus"
                    description="Apakah Anda yakin ingin menghapus pengumuman ini?"
                    onConfirm={handleDelete}
                    onCancel={() => setDialogOpen(false)} // Tutup dialog jika dibatalkan
                >
                    <Button variant="red" size="sm">
                        Hapus
                    </Button>
                </AlertDialogComponent>
            )}
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
