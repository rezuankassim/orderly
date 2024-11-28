'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 text-xs font-medium text-greyscale-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-white data-[state=on]:font-semibold [&:first-child]:rounded-l-lg [&:last-child]:rounded-r-lg [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-greyscale-50',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 min-w-10 px-4',
        sm: 'h-8 min-w-8 px-1.5',
        lg: 'h-10 min-w-10 px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({className, variant, size, ...props}, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({variant, size, className}))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export {Toggle, toggleVariants};
