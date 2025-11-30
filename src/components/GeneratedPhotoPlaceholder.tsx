"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { styleIcons, styleBackgroundClasses, styleOverlayClasses } from '@/utils/styles';
import { Image as ImageIcon } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox

interface GeneratedPhotoPlaceholderProps {
  styleId: string;
  styleName: string;
  index: number;
  className?: string;
  uploadedImage?: string | null;
  uniqueId: string; // Added uniqueId for selection
  isSelected: boolean; // Added isSelected prop
  onToggleSelect: (uniqueId: string) => void; // Added onToggleSelect prop
}

const GeneratedPhotoPlaceholder = ({
  styleId,
  styleName,
  index,
  className,
  uploadedImage,
  uniqueId,
  isSelected,
  onToggleSelect,
}: GeneratedPhotoPlaceholderProps) => {
  const effectiveStyleId = styleId.startsWith('custom-') ? 'custom' : styleId;

  const backgroundClass = styleBackgroundClasses[effectiveStyleId] || 'bg-gray-200 dark:bg-gray-700';
  const IconComponent = styleIcons[effectiveStyleId] || styleIcons['white-bg'];
  const overlayClass = styleOverlayClasses[effectiveStyleId] || 'bg-transparent';

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening dialog when clicking checkbox
    onToggleSelect(uniqueId);
  };

  // Special handling for the "original" image
  if (styleId === 'original' && uploadedImage) {
    return (
      <div
        className={cn(
          "relative w-full h-48 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2 overflow-hidden",
          "bg-gray-100 dark:bg-gray-800",
          isSelected && "ring-2 ring-blue-500", // Add ring for selection
          className
        )}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(uniqueId)}
          onClick={handleCheckboxClick}
          className="absolute top-3 left-3 z-40"
        />
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
        backgroundClass,
        isSelected && "ring-2 ring-blue-500", // Add ring for selection
        className
      )}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onToggleSelect(uniqueId)}
        onClick={handleCheckboxClick}
        className="absolute top-3 left-3 z-40"
      />
      {uploadedImage ? (
        <>
          <img
            src={uploadedImage}
            alt={`Generated Product Photo for ${styleName}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[70%] max-h-[70%] object-contain z-10"
          />
          <div className={cn("absolute inset-0", overlayClass, "mix-blend-multiply z-20")}></div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-center z-30">
            <p className="text-lg font-bold line-clamp-2">{styleName}</p>
            <p className="text-sm mt-1">Photo {index + 1}</p>
          </div>
        </>
      ) : (
        <>
          <IconComponent className="h-12 w-12 mb-2" />
          <p className="text-lg font-bold line-clamp-2">{styleName}</p>
          <p className="text-xs mt-1">Photo {index + 1}</p>
        </>
      )}
    </div>
  );
};

export default GeneratedPhotoPlaceholder;