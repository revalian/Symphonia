import cn from 'classnames';

export default function ApplicationLogo({
    url = '#',
    size = 'w-12 h-12', // Ukuran default untuk gambar
    isTitle = true,
    imageUrl = '/images/logo.png',
}) {
    return (
        <div href={url} className="flex items-center gap-2">
            {/* Ganti ikon dengan gambar */}
            <img
                src={imageUrl}
                alt="Application Logo"
                className={cn(
                    'rounded', // Tambahkan styling jika perlu
                    size, // Properti size digunakan untuk mengatur ukuran gambar
                )}
            />
            {isTitle && (
                <div className="flex flex-col">
                    <span className="font-bold leading-none text-foreground">Symphonia</span>
                    <span className="text-xs font-medium text-muted-foreground">Harmoni dalam Setiap Nada.</span>
                </div>
            )}
        </div>
    );
}
