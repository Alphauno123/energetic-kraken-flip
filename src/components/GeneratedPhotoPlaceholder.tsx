"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { styleOverlayClasses } from '@/utils/styles'; // Only need overlay classes here now
import { Image as ImageIcon } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { getStylePreviewImageUrl } from '@/utils/imageUtils';
import StylePlaceholderImage from './StylePlaceholderImage'; // Import StylePlaceholderImage

interface GeneratedPhotoPlaceholderProps {
  styleId: string;
  styleName: string;
  index: number;
  className?: string;
  uniqueId: string;
  isSelected: boolean;
  onToggleSelect: (uniqueId: string) => void;
  prompt?: string; // Add prompt prop
}

const GeneratedPhotoPlaceholder = ({
  styleId,
  styleName,
  index,
  className,
  uniqueId,
  isSelected,
  onToggleSelect,
  prompt, // Destructure prompt
}: GeneratedPhotoPlaceholderProps) => {
  // The logic for 'original' images is handled by PhotoDetailDialog directly.

  // Determine the effective style ID for overlay classes (still needed here)
  const effectiveStyleIdForOverlay = prompt || styleId.startsWith('custom-') ? 'custom' : styleId;
  const overlayClass = styleOverlayClasses[effectiveStyleIdForOverlay] || 'bg-transparent';

  const previewImageUrl = getStylePreviewImageUrl(styleId); // Use original styleId for image URL

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening dialog when clicking checkbox
    onToggleSelect(uniqueId);
  };

  return (
    <div
      className={cn(
        "relative w-full h-48 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2 overflow-hidden",
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
          {/* Use StylePlaceholderImage for background and icon fallback */}
          <StylePlaceholderImage
            styleId={styleId}
            styleName={styleName}
            prompt={prompt} // Pass prompt to StylePlaceholderImage
            className="absolute inset-0" // Make it cover the whole area for background
          />
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
          {/* Fallback if no previewImageUrl */}
          <StylePlaceholderImage
            styleId={styleId}
            styleName={styleName}
            prompt={prompt} // Pass prompt to StylePlaceholderImage
            className="absolute inset-0" // Make it cover the whole area for background
          />
          <ImageIcon className="h-12 w-12 mb-2 z-10" />
          <p className="text-lg font-bold line-clamp-2 z-10">{styleName}</p>
          <p className="text-xs mt-1 z-10">Photo {index + 1}</p>
        </>
      )}
    </div>
  );
};

export default GeneratedPhotoPlaceholder;