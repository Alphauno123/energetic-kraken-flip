"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { styleIcons, styleBackgroundClasses } from '@/utils/styles';

interface StylePlaceholderImageProps {
  styleId: string;
  styleName: string;
  className?: string;
  imageUrl?: string; // New prop for the preview image URL
}

const StylePlaceholderImage = ({ styleId, styleName, className, imageUrl }: StylePlaceholderImageProps) => {
  const backgroundClass = styleBackgroundClasses[styleId] || 'bg-gray-200 dark:bg-gray-700';
  const IconComponent = styleIcons[styleId] || styleIcons['white-bg']; // Default to 'white-bg' icon if no specific icon is found

  return (
    <div
      className={cn(
        "w-full h-32 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2 rounded-t-lg overflow-hidden",
        backgroundClass,
        className
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Preview for ${styleName} style`}
          className="w-full h-full object-cover"
        />
      ) : (
        <>
          <IconComponent className="h-8 w-8 mb-2" />
          {styleName}
        </>
      )}
    </div>
  );
};

export default StylePlaceholderImage;