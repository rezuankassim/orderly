// This type is used to define the shape of our data.

import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {Button} from '../ui/button';
import {MoreHorizontalIcon} from 'lucide-react';

// You can use a Zod schema here if you want.
export type Vehicles = {
  id?: string;
  plate: string;
  description: string;
  customerId?: number;
  createdAt?: string;
  updatedAt?: string;
};

export const columns: ColumnDef<Vehicles>[] = [
  {
    accessorKey: 'plate',
    header: 'Plate',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({row}) => {
      const date = dayjs(row.original.createdAt);

      return date.format('DD MMM YYYY, hh:mm A');
    },
  },
  {
    id: 'actions',
    cell: () => {
      // const vehicle = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon" size="icon" className="h-7 w-7 border-transparent p-1.5">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {/* <Link to={`/customers/${customer.id}`}>View customer details</Link> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
