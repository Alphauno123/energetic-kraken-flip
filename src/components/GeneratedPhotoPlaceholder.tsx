"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { styleIcons, styleBackgroundClasses, styleOverlayClasses } from '@/utils/styles'; // Import styleOverlayClasses
import { Image as ImageIcon } from 'lucide-react'; // Import Image icon for original

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

  // Special handling for the "original" image
  if (styleId === 'original' && uploadedImage) {
    return (
      <div
        className={cn(
          "relative w-full h-48 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2 overflow-hidden",
          "bg-gray-100 dark:bg-gray-800", // Neutral background for original
          className
        )}
      >
        <img
          src={uploadedImage}
          alt={`Original Uploaded Product`}
          className="max-h-full max-w-full object-contain rounded-lg"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-center z-10">
          <p className="font-semibold">{styleName}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-48 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2 overflow-hidden",
        backgroundClass, // This will now be the visible background
        className
      )}
    >
      {uploadedImage ? (
        <>
          {/* Product image, centered and scaled, on top of the style background */}
          <img
            src={uploadedImage}
            alt={`Generated Product Photo for ${styleName}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[70%] max-h-[70%] object-contain z-10"
          />
          {/* Apply the overlay on top of the product image and background */}
          <div className={cn("absolute inset-0", overlayClass, "mix-blend-multiply z-20")}></div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-center z-30">
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