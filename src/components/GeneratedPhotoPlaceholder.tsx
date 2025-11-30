"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { styleIcons, styleBackgroundClasses } from '@/utils/style-constants'; // Import from new utility file
import { Square } from 'lucide-react'; // Only import Square for default, as others are in styleIcons

interface GeneratedPhotoPlaceholderProps {
  styleId: string;
  styleName: string; // New prop for the full style name
  index: number;
  className?: string;
  uploadedImage?: string | null;
}

const GeneratedPhotoPlaceholder = ({ styleId, styleName, index, className, uploadedImage }: GeneratedPhotoPlaceholderProps) => {
  const backgroundClass = styleBackgroundClasses[styleId] || 'bg-gray-200 dark:bg-gray-700';
  const IconComponent = styleIcons[styleId] || Square;

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
            alt="Uploaded Product"
            className="absolute inset-0 w-full h-full object-contain opacity-20"
          />
          <div className="relative z-10 flex flex-col items-center justify-center p-2">
            <img
              src={uploadedImage}
              alt="Uploaded Product"
              className="h-24 w-24 object-contain mb-2 bg-white/80 dark:bg-gray-900/80 rounded-lg p-1 shadow-lg"
            />
            <p className="text-lg font-bold text-white text-shadow-sm">{styleName}</p> {/* Use styleName */}
            <p className="text-xs mt-1 text-gray-100 text-shadow-sm">Photo {index + 1}</p>
          </div>
        </>
      ) : (
        <>
          <IconComponent className="h-12 w-12 mb-2" />
          <p className="text-lg font-bold">{styleName}</p> {/* Use styleName */}
          <p className="text-xs mt-1">Photo {index + 1}</p>
        </>
      )}
    </div>
  );
};

export default GeneratedPhotoPlaceholder;