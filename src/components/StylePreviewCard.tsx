"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import StylePlaceholderImage from './StylePlaceholderImage';
import { Input } from "@/components/ui/input"; // Import Input component

interface StylePreviewCardProps {
  styleName: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  count: number; // New prop for the number of images
  onCountChange: (newCount: number) => void; // New prop for handling count changes
}

const StylePreviewCard = ({ styleName, description, isSelected, onClick, count, onCountChange }: StylePreviewCardProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 5) { // Limit to 1-5 images for now
      onCountChange(value);
    } else if (e.target.value === '') {
      onCountChange(1); // Default to 1 if input is cleared
    }
  };

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
      <StylePlaceholderImage styleName={styleName} />
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1">{styleName}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {isSelected && (
        <>
          <div className="absolute top-2 right-2 text-blue-500">
            <CheckCircle2 className="h-6 w-6 fill-blue-500 text-white" />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <label htmlFor={`count-${styleName}`} className="sr-only">Number of images for {styleName}</label>
            <Input
              id={`count-${styleName}`}
              type="number"
              min="1"
              max="5"
              value={count}
              onChange={handleInputChange}
              onClick={(e) => e.stopPropagation()} // Prevent card click when changing count
              className="w-full text-center"
              aria-label={`Number of images for ${styleName}`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default StylePreviewCard;