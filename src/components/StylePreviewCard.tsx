"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import StylePlaceholderImage from './StylePlaceholderImage';

interface StylePreviewCardProps {
  styleName: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const StylePreviewCard = ({ styleName, description, isSelected, onClick }: StylePreviewCardProps) => {
  return (
    <div
      className={cn(
        "relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200",
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500 shadow-md bg-blue-50/20 dark:bg-blue-900/20"
          : "border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      )}
      onClick={onClick}
    >
      <StylePlaceholderImage styleName={styleName} />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{styleName}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 text-blue-500">
          <CheckCircle2 className="h-6 w-6 fill-blue-500 text-white" />
        </div>
      )}
    </div>
  );
};

export default StylePreviewCard;