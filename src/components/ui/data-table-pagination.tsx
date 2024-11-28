// import {Table} from '@tanstack/react-table';
// import {ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight} from 'lucide-react';

// import {Button} from './button';
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './select';

// interface DataTablePaginationProps<TData> {
//   table: Table<TData>;
// }

// export function DataTablePagination<TData>({table}: DataTablePaginationProps<TData>) {
//   return (
//     <div className="flex items-center justify-between border-t border-greyscale-100 p-4">
//       {/* <div className="flex-1 text-sm text-muted-foreground">
//         {table.getFilteredSelectedRowModel().rows.length} of{' '}
//         {table.getFilteredRowModel().rows.length} row(s) selected.
//       </div> */}
//       <div className="flex-1 items-center justify-center text-sm font-medium text-greyscale-900">
//         Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//       </div>
//       <div className="flex items-center space-x-6 lg:space-x-8">
//         {/* <div className="flex items-center space-x-2">
//           <p className="text-sm font-medium">Rows per page</p>
//           <Select
//             value={`${table.getState().pagination.pageSize}`}
//             onValueChange={value => {
//               table.setPageSize(Number(value));
//             }}
//           >
//             <SelectTrigger className="h-8 w-[70px]">
//               <SelectValue placeholder={table.getState().pagination.pageSize} />
//             </SelectTrigger>
//             <SelectContent side="top">
//               {[10, 20, 30, 40, 50].map(pageSize => (
//                 <SelectItem key={pageSize} value={`${pageSize}`}>
//                   {pageSize}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div> */}
//         <div className="flex items-center space-x-2">
//           {/* <Button
//             variant="outline"
//             className="hidden h-8 w-8 p-0 lg:flex"
//             onClick={() => table.setPageIndex(0)}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <span className="sr-only">Go to first page</span>
//             <ChevronsLeft />
//           </Button> */}
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded p-2"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <span className="sr-only">Go to previous page</span>
//             <ChevronLeftIcon className="text-greyscale-900" />
//           </Button>
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded p-2"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             <span className="sr-only">Go to next page</span>
//             <ChevronRightIcon className="text-greyscale-900" />
//           </Button>
//           {/* <Button
//             variant="outline"
//             className="hidden h-8 w-8 p-0 lg:flex"
//             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//             disabled={!table.getCanNextPage()}
//           >
//             <span className="sr-only">Go to last page</span>
//             <ChevronsRight />
//           </Button> */}
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {generatePaginationLinks} from './generate-pages';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  showPreviousNext: boolean;
};

export default function Paginator({
  currentPage,
  totalPages,
  onPageChange,
  showPreviousNext,
}: PaginatorProps) {
  return (
    <Pagination>
      <PaginationContent>
        {showPreviousNext && totalPages ? (
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage - 1 < 1}
          />
        ) : null}
        {generatePaginationLinks(currentPage, totalPages, onPageChange)}
        {showPreviousNext && totalPages ? (
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage > totalPages - 1}
          />
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
