import {PaginationEllipsis, PaginationLink} from '@/components/ui/pagination';

export const generatePaginationLinks = (
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
) => {
  const pages: JSX.Element[] = [];
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationLink
          className="h-8 w-8 rounded"
          onClick={() => onPageChange(i)}
          isActive={i === currentPage}
          key={i}
        >
          {i}
        </PaginationLink>
      );
    }
  } else {
    const pagination = [];

    // Always add the first page
    pagination.push(1);

    // Add ellipsis if current page is greater than 3
    if (currentPage > 3) {
      pagination.push('...');
    }

    // Add pages around the current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pagination.push(i);
    }

    // Add ellipsis if current page is less than totalPages - 2
    if (currentPage < totalPages - 2) {
      pagination.push('...');
    }

    // Always add the last page
    if (totalPages > 1) {
      pagination.push(totalPages);
    }

    console.log(pagination);

    pagination.forEach((page, index) => {
      if (page === '...') {
        pages.push(<PaginationEllipsis key={index} />);
      } else {
        const p = page as number;

        pages.push(
          <PaginationLink
            className="h-8 w-8 rounded"
            onClick={() => onPageChange(p)}
            isActive={p === currentPage}
            key={page.toString() + index}
          >
            {page}
          </PaginationLink>
        );
      }
    });
  }
  return pages;
};
