import * as React from 'react';

import {cn} from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-24 w-full rounded-lg border border-greyscale-100 bg-transparent px-3 py-3 text-sm font-medium placeholder:text-greyscale-300 focus-visible:border focus-visible:border-primary-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-300/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:bg-greyscale-25 disabled:opacity-50 aria-[invalid=true]:border-error-100 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-error-100/30 aria-[invalid=true]:ring-offset-2 aria-[invalid=true]:ring-offset-white',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
