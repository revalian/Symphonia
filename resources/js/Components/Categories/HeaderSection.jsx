// resources/js/Components/HeaderSection.jsx
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { IconArrowLeft } from '@tabler/icons-react';

export default function HeaderSection({ title, subtitle, backLink }) {
    return (
        <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
            <HeaderTitle title={title} subtitle={subtitle} icon={IconArrowLeft} />
            <Button variant="orange" size="lg" asChild>
                <Link href={backLink}>
                    <IconArrowLeft className="size-4" />
                    Kembali
                </Link>
            </Button>
        </div>
    );
}
