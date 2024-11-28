import React from 'react';
import {Input} from '@/components/ui/input';

const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({onChange, onBlur, value, ...props}, ref) => {
  const formatCurrency = (val: string) => {
    const numericValue = val.replace(/[^0-9]/g, '');
    const formatter = new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter
      .format(Number(numericValue) / 100)
      .replace('RM', '')
      .trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    onChange?.(numericValue as any);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(e.target.value);
    e.target.value = formattedValue;
    onBlur?.(e);
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xs font-semibold text-greyscale-900">
        RM
      </span>
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode="numeric"
        value={value ? formatCurrency(value as string) : ''}
        onChange={handleChange}
        onBlur={handleBlur}
        className="pl-8 pr-3 text-right"
      />
    </div>
  );
});

CurrencyInput.displayName = 'CurrencyInput';
export default CurrencyInput;
