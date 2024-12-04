import { IconInnerShadowBottomRight } from '@tabler/icons-react';

export default function ApplicationLogo(url = '#', size = 'size-9', isTitle = true) {
    return (
        <link href={url} className="flex items-center gap-2">
            <IconInnerShadowBottomRight
                className={cn(
                    'text-orange-500',

                    size,
                )}
            />

            {isTitle && (
                <div className="flex flex-col">
                    <span className="font-bold leading-none text-foreground">Symphonia</span>
                    <span className="text-xs font-medium text-muted-foreground">Harmoni dalam Setiap Nada.</span>
                </div>
            )}
        </link>
    );
}
