"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface StylePlaceholderImageProps {
  styleName: string;
  className?: string;
}

const StylePlaceholderImage = ({ styleName, className }: StylePlaceholderImageProps) => {
  return (
    <div
      className={cn(
        "w-full h-32 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-center text-sm font-semibold p-2 rounded-t-lg",
        className
      )}
    >
      {styleName} Preview
    </div>
  );
};

export default StylePlaceholderImage;