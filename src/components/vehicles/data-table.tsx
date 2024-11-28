import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {cn} from '@/lib/utils';
import Paginator from '../ui/data-table-pagination';
import {SearchIcon} from 'lucide-react';
import {useState} from 'react';
import {ToggleGroup, ToggleGroupItem} from '../ui/toggle-group';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [statusFilterToggle, setStatusFilterToggle] = useState<'all'>('all');
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  return (
    <div className="p-0">
      <div className="-mx-4 flex items-center justify-between px-4">
        <div>
          <ToggleGroup
            type="single"
            value={statusFilterToggle}
            onValueChange={(value: 'all') => {
              setStatusFilterToggle(value);
              table.getColumn('status')?.setFilterValue(value === 'all' ? undefined : value);
            }}
            disabled
          >
            <ToggleGroupItem value="all">All</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="relative h-full w-full">
            <input
              type="input"
              className="w-60 rounded-full border border-greyscale-100 bg-white py-2 pl-8 pr-3 text-sm font-medium text-greyscale-900 shadow-sm outline-none focus-visible:border-primary-300 focus-visible:ring focus-visible:ring-primary-50"
              placeholder="Search vehicles..."
              value={(table.getColumn('plate')?.getFilterValue() as string) ?? ''}
              onChange={event => table.getColumn('plate')?.setFilterValue(event.target.value)}
            />

            <SearchIcon className="absolute left-0 top-0 ml-3 mt-[11px] size-4 text-greyscale-900" />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-greyscale-100 shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="[&>th:first-child]:rounded-tl-xl [&>th:last-child]:rounded-tr-xl"
              >
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.id === 'plate' && 'min-w-80',
                        header.id === 'description' && 'min-w-64',
                        header.id === 'date' && 'min-w-64'
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t border-greyscale-100 p-4">
          <div className="flex-1 items-center justify-center text-sm font-medium text-greyscale-900">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex justify-end">
            <Paginator
              currentPage={table.getState().pagination.pageIndex + 1}
              totalPages={table.getPageCount()}
              onPageChange={pageNumber => table.setPageIndex(pageNumber - 1)}
              showPreviousNext
            />
          </div>
        </div>
      </div>
    </div>
  );
}
