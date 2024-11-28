import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const badgeVariants = cva(
  'font-mdium inline-flex items-center rounded-md border px-2 py-0.5 text-xs transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-success-0 text-success-200 border-success-25',
        none: 'border-greyscale-100 bg-greyscale-25 text-greyscale-400',
        destructive: 'border-error-25 bg-error-0 text-error-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({className, variant, ...props}: BadgeProps) {
  return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}

export {Badge, badgeVariants};
