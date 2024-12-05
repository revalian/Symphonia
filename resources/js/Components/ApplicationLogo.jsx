import { IconInnerShadowBottomRight } from '@tabler/icons-react';
import cn from 'classnames';

export default function ApplicationLogo(url = '#', size = 'size-9', isTitle = true) {
    return (
        <div href={url} className="flex items-center gap-2">
            <IconInnerShadowBottomRight
                className={cn(
                    'text-orange-500',
                    size, // Properti size diambil dari parameter
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
