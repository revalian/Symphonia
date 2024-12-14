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

import NavLink from '@/Components/NavLink';

export default function Sidebar({ url, auth }) {
    return (
        <nav className="grid items-start px-2 text-sm font-semibold lg:px-4">
            <div className="text-foregorund px-3 py-2 text-sm font-semibold">Dashboard</div>
            <NavLink
                url={route('dashboard')}
                active={url.startsWith('/dashboard')}
                title="Dashboard"
                icon={IconDashboard}
            />

            <div className="text-foregorund px-3 py-2 text-sm font-semibold">Statistik</div>
            <NavLink url="#" title="Statistik Peminjaman" icon={IconChartDots2} />
            <NavLink url="#" title="Laporan Denda" icon={IconMoneybag} />
            <NavLink url="#" title="Laporan Stok Alat Musik" icon={IconPiano} />

            <div className="text-foregorund px-3 py-2 text-sm font-semibold">Master</div>
            <NavLink
                url={route('admin.categories.index')}
                active={url.startsWith('/admin/categories')}
                title="Kategori"
                icon={IconCategory}
            />
            <NavLink url={route('admin.suppliers.index')}active={url.startsWith('/admin/suppliers')} title="Pemasok" icon={IconBuildingCommunity} />
            <NavLink url="#" title="Instrument" icon={IconMusic} />
            <NavLink url="#" title="Pengguna" icon={IconUsersGroup} />
            <NavLink url="#" title="Pengaturan Denda" icon={IconSettingsExclamation} />

            <div className="text-foregorund px-3 py-2 text-sm font-semibold">Peran dan Izin</div>
            <NavLink url="#" title="Peran" icon={IconCircleKey} />
            <NavLink url="#" title="Izin" icon={IconVersions} />
            <NavLink url="#" title="Tetapkan Izin" icon={IconKeyframe} />
            <NavLink url="#" title="Tetapkan Peran" icon={IconLayoutKanban} />
            <NavLink url="#" title="Akses Rute" icon={IconRoute} />

            <div className="text-foregorund px-3 py-2 text-sm font-semibold">Transaksi</div>
            <NavLink url="#" title="Peminjaman" icon={IconCreditCard} />
            <NavLink url="#" title="pengembalian" icon={IconCreditCardRefund} />

            <div className="text-foregorund px-3 py-2 text-sm font-semibold">Lainnya</div>
            <NavLink url="#" title="Pengumuman" icon={IconAlertCircle} />
            <NavLink url={route('profile.edit')} title="Profile" icon={IconUser} />
            <NavLink
                url={route('logout')}
                title="Logout"
                icon={IconLogout}
                method="post"
                as="button"
                className="w-full"
            />
        </nav>
    );
}
