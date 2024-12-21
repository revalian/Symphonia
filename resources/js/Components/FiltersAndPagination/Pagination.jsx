import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';

export default function SupplierPagination({ meta, name }) {
    return (
        <div className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
            {/* Supplier Info */}
            <p className="mb-2 text-sm text-muted-foreground">
                Menampilkan <span className="font-medium text-orange-500">{meta.from ?? 0}</span> dari {meta.total}{' '}
                {name}
            </p>

            {/* Pagination */}
            {meta.has_pages && (
                <Pagination>
                    <PaginationContent className="ml-auto flex flex-wrap justify-center lg:justify-end">
                        {meta.links.map((link, index) => (
                            <PaginationItem key={index} className="mx-1 mb-1 lg:mb-0">
                                <PaginationLink href={link.url} isActive={link.active}>
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
