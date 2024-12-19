import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';

export default function CategoryPagination({ meta }) {
    if (!meta.has_pages) return null;

    return (
        <Pagination>
            <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                {meta.links.map((link, index) => (
                    <PaginationItem key={index} className="mx-1 mb-1 lg:mb-0">
                        <PaginationLink href={link.url} isActive={link.active}>
                            {link.label}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    );
}
