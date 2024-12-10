import {
    IconAlertCircle,
    IconBuildingCommunity,
    IconCategory,
    IconChartDots2,
    IconCircleKey,
    IconCreditCard,
    IconCreditCardRefund,
    IconDashboard,
    IconKeyframe,
    IconLayoutKanban,
    IconLogout,
    IconMoneybag,
    IconMusic,
    IconPiano,
    IconRoute,
    IconSettingsExclamation,
    IconUser,
    IconUsersGroup,
    IconVersions,
} from '@tabler/icons-react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLinkResponsive from '@/Components/NavLinkResponsive';

export default function SidebarResponsive({ url, auth }) {
    return (
        <nav className="grid gap-6 text-lg font-medium">
            <ApplicationLogo />

            <nav className="grid items-start text-sm font-semibold lg:px-4">
                <div className="text-foregorund px-3 py-2 text-sm font-semibold">Dashboard</div>
                <NavLinkResponsive
                    url={route('dashboard')}
                    active={url.startsWith('/dashboard')}
                    title="Dashboard"
                    icon={IconDashboard}
                />

                <div className="text-foregorund px-3 py-2 text-sm font-semibold">Statistik</div>
                <NavLinkResponsive url="#" title="Statistik Peminjaman" icon={IconChartDots2} />
                <NavLinkResponsive url="#" title="Laporan Denda" icon={IconMoneybag} />
                <NavLinkResponsive url="#" title="Laporan Stok Alat Musik" icon={IconPiano} />

                <div className="text-foregorund px-3 py-2 text-sm font-semibold">Master</div>
                <NavLinkResponsive
                    url={route('admin.categories.index')}
                    active={url.startsWith('/admin/categories')}
                    title="Kategori"
                    icon={IconCategory}
                />
                <NavLinkResponsive url="#" title="Pemasok" icon={IconBuildingCommunity} />
                <NavLinkResponsive url="#" title="Instrument" icon={IconMusic} />
                <NavLinkResponsive url="#" title="Pengguna" icon={IconUsersGroup} />
                <NavLinkResponsive url="#" title="Pengaturan Denda" icon={IconSettingsExclamation} />

                <div className="text-foregorund px-3 py-2 text-sm font-semibold">Peran dan Izin</div>
                <NavLinkResponsive url="#" title="Peran" icon={IconCircleKey} />
                <NavLinkResponsive url="#" title="Izin" icon={IconVersions} />
                <NavLinkResponsive url="#" title="Tetapkan Izin" icon={IconKeyframe} />
                <NavLinkResponsive url="#" title="Tetapkan Peran" icon={IconLayoutKanban} />
                <NavLinkResponsive url="#" title="Akses Rute" icon={IconRoute} />

                <div className="text-foregorund px-3 py-2 text-sm font-semibold">Transaksi</div>
                <NavLinkResponsive url="#" title="Peminjaman" icon={IconCreditCard} />
                <NavLinkResponsive url="#" title="pengembalian" icon={IconCreditCardRefund} />

                <div className="text-foregorund px-3 py-2 text-sm font-semibold">Lainnya</div>
                <NavLinkResponsive url="#" title="Pengumuman" icon={IconAlertCircle} />
                <NavLinkResponsive url={route('profile.edit')} title="Profile" icon={IconUser} />
                <NavLinkResponsive
                    url={route('logout')}
                    title="Logout"
                    icon={IconLogout}
                    method="post"
                    as="button"
                    className="w-full"
                />
            </nav>
        </nav>
    );
}
