"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { styleIcons, styleBackgroundClasses, styleOverlayClasses } from '@/utils/styles';
import { Image as ImageIcon } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import OriginalPhotoDisplay from './OriginalPhotoDisplay';
import { getStylePreviewImageUrl } from '@/utils/imageUtils'; // Import getStylePreviewImageUrl

interface GeneratedPhotoPlaceholderProps {
  styleId: string;
  styleName: string;
  index: number;
  className?: string;
  // uploadedImage?: string | null; // Removed as it's only used by OriginalPhotoDisplay
  uniqueId: string;
  isSelected: boolean;
  onToggleSelect: (uniqueId: string) => void;
}

const GeneratedPhotoPlaceholder = ({
  styleId,
  styleName,
  index,
  className,
  // uploadedImage, // Removed from destructuring
  uniqueId,
  isSelected,
  onToggleSelect,
}: GeneratedPhotoPlaceholderProps) => {
  // Special handling for the "original" image
  // Note: uploadedImage is now passed from the parent GeneratedPhotosDisplay to PhotoDetailDialog,
  // and then to OriginalPhotoDisplay directly.
  // This component (GeneratedPhotoPlaceholder) should not receive uploadedImage directly.
  // The parent GeneratedPhotosDisplay will pass uploadedImage to PhotoDetailDialog,
  // and PhotoDetailDialog will pass it to OriginalPhotoDisplay when styleId is 'original'.
  // For this component, if styleId is 'original', it means the parent is trying to render the original image,
  // but it should be handled by OriginalPhotoDisplay.
  // This conditional rendering here is a safeguard, but the primary logic for 'original' should be in GeneratedPhotosDisplay.
  // For now, I'll assume `uploadedImage` is not passed to this component when `styleId === 'original'`
  // and that `GeneratedPhotosDisplay` handles passing `uploadedImage` to `PhotoDetailDialog` correctly.

  // For generated photos
  const effectiveStyleId = styleId.startsWith('custom-') ? 'custom' : styleId;
  const backgroundClass = styleBackgroundClasses[effectiveStyleId] || 'bg-gray-200 dark:bg-gray-700';
  const IconComponent = styleIcons[effectiveStyleId] || styleIcons['white-bg'];
  const overlayClass = styleOverlayClasses[effectiveStyleId] || 'bg-transparent';

  const previewImageUrl = getStylePreviewImageUrl(effectiveStyleId);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening dialog when clicking checkbox
    onToggleSelect(uniqueId);
  };

  return (
    <div
      className={cn(
        "relative w-full h-48 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2 overflow-hidden",
        backgroundClass,
        isSelected && "ring-2 ring-blue-500",
        className
      )}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onToggleSelect(uniqueId)}
        onClick={handleCheckboxClick}
        className="absolute top-3 left-3 z-40"
      />
      {previewImageUrl ? (
        <>
          <img
            src={previewImageUrl}
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