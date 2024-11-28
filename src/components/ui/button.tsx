import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary-300 text-secondary-300 hover:bg-primary-100',
        outline:
          'border border-greyscale-100 bg-white text-greyscale-900 shadow-sm hover:border-greyscale-900 hover:shadow-none',
        icon: 'border border-greyscale-100 text-greyscale-900',
        ghost: 'rounded-none bg-transparent text-greyscale-400',
      },
      size: {
        default: 'h-10 px-4 py-3',
        sm: 'h-8 rounded-md px-3 py-3 text-xs',
        lg: 'h-11 rounded-md px-8',
        xs: 'h-6 rounded-md px-2 py-2 text-xs',
        icon: 'h-10 w-10 p-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
