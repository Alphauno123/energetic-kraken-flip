"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox";

interface OriginalPhotoDisplayProps {
  uploadedImage: string;
  styleName: string;
  uniqueId: string;
  isSelected: boolean;
  onToggleSelect: (uniqueId: string) => void;
  className?: string;
}

const OriginalPhotoDisplay = ({
  uploadedImage,
  styleName,
  uniqueId,
  isSelected,
  onToggleSelect,
  className,
}: OriginalPhotoDisplayProps) => {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening dialog when clicking checkbox
    onToggleSelect(uniqueId);
  };

  return (
    <div
      className={cn(
        "relative w-full h-48 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2 overflow-hidden",
        "bg-gray-100 dark:bg-gray-800",
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
};

export default OriginalPhotoDisplay;