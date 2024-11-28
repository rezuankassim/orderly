// This type is used to define the shape of our data.

import {MoreHorizontalIcon} from 'lucide-react';
import {Badge} from '../ui/badge';
import {Button} from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {Link} from '@tanstack/react-router';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {Vehicles} from '../vehicles/columns';

// You can use a Zod schema here if you want.
export type Customer = {
  id: string;
  name: string;
  status: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
  vehicles?: Vehicles[];
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({row}) => {
      let variant: 'none' | 'default' | 'destructive' | null | undefined = null;

      switch (row.getValue('status')) {
        case 'active':
          variant = 'default';
          break;
        case 'suspended':
          variant = 'destructive';
          break;
      }

      return (
        <Badge className="capitalize" variant={variant}>
          {row.getValue('status')}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const customer = row.original;

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
              <Link to={`/customers/${customer.id}`}>View customer details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
