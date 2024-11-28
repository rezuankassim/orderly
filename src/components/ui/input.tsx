import * as React from 'react';

import {cn} from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'md' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, variant = 'md', ...props}, ref) => {
    if (variant === 'lg') {
      return (
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-lg border border-greyscale-100 bg-transparent px-3 py-3.5 text-base font-medium transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-greyscale-300 hover:bg-greyscale-25 focus-visible:border focus-visible:border-primary-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-300/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:bg-greyscale-25 disabled:opacity-50 aria-[invalid=true]:border-error-100 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-error-100/30 aria-[invalid=true]:ring-offset-2 aria-[invalid=true]:ring-offset-white',
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-greyscale-100 bg-transparent px-3 py-3 text-sm font-medium transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-greyscale-300 hover:bg-greyscale-25 focus-visible:border focus-visible:border-primary-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-300/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:bg-greyscale-25 disabled:opacity-50 aria-[invalid=true]:border-error-100 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-error-100/30 aria-[invalid=true]:ring-offset-2 aria-[invalid=true]:ring-offset-white',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export {Input};
