"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import StylePlaceholderImage from './StylePlaceholderImage';
import ImageCountSelector from './ImageCountSelector';
import { getStylePreviewImageUrl } from '@/utils/imageUtils';

interface StyleCardProps {
  styleId: string;
  styleName: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  count: number;
  onCountChange: (newCount: number) => void;
  prompt?: string; // Optional prompt for custom styles
}

const StyleCard = ({ styleId, styleName, description, isSelected, onClick, count, onCountChange, prompt }: StyleCardProps) => {
  // Use the original styleId for the preview image URL, as getStylePreviewImageUrl handles it
  const previewImageUrl = getStylePreviewImageUrl(styleId);

  return (
    <div
      className={cn(
        "relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 flex flex-col",
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500 shadow-md bg-blue-50/20 dark:bg-blue-900/20"
          : "border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      )}
      onClick={onClick}
    >
      <StylePlaceholderImage styleId={styleId} styleName={styleName} imageUrl={previewImageUrl} prompt={prompt} />
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{styleName}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {isSelected && (
        <>
          <div className="absolute top-2 right-2 text-blue-500">
            <CheckCircle2 className="h-6 w-6 fill-blue-500 text-white" />
          </div>
          <div
            className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on this div from bubbling up to the card
          >
            <ImageCountSelector
              count={count}
              onCountChange={onCountChange}
              min={1}
              max={5}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default StyleCard;