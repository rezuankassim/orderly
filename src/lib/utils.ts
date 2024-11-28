import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstAndLastChars = (str: string) => {
  const words = str.trim().split(' ');
  if (words.length === 0) return '';

  const firstChar = words[0].charAt(0).toUpperCase();
  const lastChar = words[words.length - 1].charAt(0).toUpperCase();

  return `${firstChar}${lastChar}`.toUpperCase();
};
