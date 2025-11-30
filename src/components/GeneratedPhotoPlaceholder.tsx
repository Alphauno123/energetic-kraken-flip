"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Camera,
  Home,
  Leaf,
  LayoutGrid,
  Sparkles,
  User,
  Megaphone,
  Square,
  LucideIcon
} from 'lucide-react';

interface GeneratedPhotoPlaceholderProps {
  styleId: string;
  index: number;
  className?: string;
}

const styleIcons: Record<string, LucideIcon> = {
  'studio': Camera,
  'lifestyle': Home,
  'seasonal': Leaf,
  'flatlay': LayoutGrid,
  'tiktok': Sparkles,
  'in-use': User,
  'social-ad': Megaphone,
  'white-bg': Square,
};

const styleBackgroundClasses: Record<string, string> = {
  'studio': 'bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-800',
  'lifestyle': 'bg-gradient-to-br from-green-300 to-blue-400 dark:from-green-700 dark:to-blue-900',
  'seasonal': 'bg-gradient-to-br from-red-300 to-orange-400 dark:from-red-700 dark:to-orange-900',
  'flatlay': 'bg-gradient-to-br from-purple-300 to-pink-400 dark:from-purple-700 dark:to-pink-900',
  'tiktok': 'bg-gradient-to-br from-cyan-300 to-fuchsia-400 dark:from-cyan-700 dark:to-fuchsia-900',
  'in-use': 'bg-gradient-to-br from-yellow-300 to-lime-400 dark:from-yellow-700 dark:to-lime-900',
  'social-ad': 'bg-gradient-to-br from-indigo-300 to-teal-400 dark:from-indigo-700 dark:to-teal-900',
  'white-bg': 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
};

const GeneratedPhotoPlaceholder = ({ styleId, index, className }: GeneratedPhotoPlaceholderProps) => {
  const backgroundClass = styleBackgroundClasses[styleId] || 'bg-gray-200 dark:bg-gray-700';
  const IconComponent = styleIcons[styleId] || Square;

  return (
    <div
      className={cn(
        "w-full h-48 flex flex-col items-center justify-center text-white text-center text-sm font-semibold p-2",
        backgroundClass,
        className
      )}
    >
      <IconComponent className="h-12 w-12 mb-2" />
      <p className="text-lg font-bold capitalize">{styleId.replace('-', ' ')} Style</p>
      <p className="text-xs mt-1">Photo {index + 1}</p>
    </div>
  );
};

export default GeneratedPhotoPlaceholder;