"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { styleIcons, styleBackgroundClasses, styleOverlayClasses } from '@/utils/styles'; // Import styleOverlayClasses

interface GeneratedPhotoPlaceholderProps {
  styleId: string;
  styleName: string; // New prop for the full style name
  index: number;
  className?: string;
  uploadedImage?: string | null;
}

const GeneratedPhotoPlaceholder = ({ styleId, styleName, index, className, uploadedImage }: GeneratedPhotoPlaceholderProps) => {
  const backgroundClass = styleBackgroundClasses[styleId] || 'bg-gray-200 dark:bg-gray-700';
  const IconComponent = styleIcons[styleId] || styleIcons['white-bg']; // Default to 'white-bg' icon
  const overlayClass = styleOverlayClasses[styleId] || 'bg-transparent'; // Get the overlay class

  return (
    <div
      className={cn(
        "relative w-full h-48 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2 overflow-hidden",
        backgroundClass,
        className
      )}
    >
      {uploadedImage ? (
        <>
          <img
            src={uploadedImage}
            alt={`Generated Product Photo for ${styleName}`}
            className="absolute inset-0 w-full h-full object-contain"
          />
          {/* Apply the overlay */}
          <div className={cn("absolute inset-0", overlayClass, "mix-blend-multiply")}></div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-center z-10">
            <p className="text-lg font-bold">{styleName}</p>
            <p className="text-sm mt-1">Photo {index + 1}</p>
          </div>
        </>
      ) : (
        <>
          <IconComponent className="h-12 w-12 mb-2" />
          <p className="text-lg font-bold">{styleName}</p>
          <p className="text-xs mt-1">Photo {index + 1}</p>
        </>
      )}
    </div>
  );
};

export default GeneratedPhotoPlaceholder;