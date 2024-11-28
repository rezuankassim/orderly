import dayjs from 'dayjs';
import currency from 'currency.js';
import {ColumnDef} from '@tanstack/react-table';
import {Badge} from '../ui/badge';

import {MoreHorizontalIcon} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Link} from '@tanstack/react-router';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Service = {
  id: string;
  title: string;
  description: string | null;
  status: 'draft' | 'live' | 'suspended';
  price: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({row}) => {
      return currency((row.getValue('price') as number) / 100, {symbol: 'RM '}).format();
    },
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
        case 'draft':
          variant = 'none';
          break;
        case 'live':
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
      const service = row.original;

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
              <Link to={`/services/${service.id}`}>View service details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
