import * as React from 'react';
import {ChevronLeft, ChevronRight, MoreHorizontal} from 'lucide-react';

import {cn} from '@/lib/utils';
import {ButtonProps, buttonVariants} from '@/components/ui/button';

const Pagination = ({className, ...props}: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({className, ...props}, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({className, ...props}, ref) => (
    <li ref={ref} className={cn('hover:cursor-pointer', className)} {...props} />
  )
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  disabled = false,
  ...props
}: PaginationLinkProps) => (
  <PaginationItem>
    <a
      aria-current={isActive ? 'page' : undefined}
      role="link"
      aria-disabled={disabled}
      className={cn(
        'w-8 p-2',
        buttonVariants({
          variant: isActive ? 'default' : 'outline',
          size,
        }),
        disabled && 'pointer-events-none cursor-not-allowed',
        className
      )}
      {...props}
    />
  </PaginationItem>
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({...props}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="sm" {...props}>
    <ChevronLeft className="text-greyscale-900" />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({...props}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="sm" {...props}>
    <ChevronRight className="text-greyscale-900" />
  </PaginationLink>
);

const PaginationEllipsis = ({className, ...props}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
