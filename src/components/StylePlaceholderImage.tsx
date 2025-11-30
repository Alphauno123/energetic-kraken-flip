"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { styleIcons, styleBackgroundClasses, getStyleNameById } from '@/utils/styles'; // Import from consolidated utility file
// Removed: import { Square } from 'lucide-react'; // Only import Square for default, as others are in styleIcons

interface StylePlaceholderImageProps {
  styleId: string;
  styleName: string;
  className?: string;
}

const StylePlaceholderImage = ({ styleId, styleName, className }: StylePlaceholderImageProps) => {
  const backgroundClass = styleBackgroundClasses[styleId] || 'bg-gray-200 dark:bg-gray-700';
  const IconComponent = styleIcons[styleId] || styleIcons['white-bg']; // Default to 'white-bg' icon if no specific icon is found

  return (
    <div
      className={cn(
        "w-full h-32 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2 rounded-t-lg",
        backgroundClass,
        className
      )}
    >
      <IconComponent className="h-8 w-8 mb-2" />
      {styleName}
    </div>
  );
};

export default StylePlaceholderImage;