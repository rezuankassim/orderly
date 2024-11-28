import {cn} from '@/lib/utils';
import {Input} from './input';
import {forwardRef} from 'react';

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightClickable?: boolean;
}

const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  ({leftIcon, rightIcon, className, rightClickable, ...props}, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {leftIcon}
          </div>
        )}
        <Input
          ref={ref}
          className={`${className} ${leftIcon ? 'pl-9' : ''} ${rightIcon ? 'pr-9' : ''}`}
          {...props}
        />
        {rightIcon && (
          <div
            className={cn(
              rightClickable ? '' : 'pointer-events-none',
              'absolute inset-y-0 right-0 flex items-center pr-3'
            )}
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

export default IconInput;
