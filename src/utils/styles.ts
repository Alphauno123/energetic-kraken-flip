"use client";

import {
  Camera,
  Home,
  Leaf,
  LayoutGrid,
  Sparkles,
  User,
  Megaphone,
  Square, // Square is now correctly included here
  LucideIcon
} from 'lucide-react';

export interface StyleOption {
  id: string;
  name: string;
  description: string;
}

// Define a type for the selected styles with their counts
export interface SelectedStyleWithCount {
  id: string;
  count: number;
}

export const styles: StyleOption[] = [
  { id: 'studio', name: 'Studio Shot', description: 'Clean, professional studio background.' },
  { id: 'lifestyle', name: 'Lifestyle Scene', description: 'Product in a realistic, engaging environment.' },
  { id: 'seasonal', name: 'Seasonal Theme', description: 'Holiday or seasonal specific backgrounds.' },
  { id: 'flatlay', name: 'Flatlay', description: 'Overhead shot with complementary props.' },
  { id: 'tiktok', name: 'TikTok Style', description: 'Dynamic, trendy visuals for social media.' },
  { id: 'in-use', name: 'Product in Use', description: 'Showcasing the product being used by a model.' },
  { id: 'social-ad', name: 'Social Media Ad', description: 'Optimized for various social media platforms.' },
  { id: 'white-bg', name: 'White Background', description: 'Classic e-commerce white background.' },
];

export const getStyleNameById = (id: string): string => {
  const style = styles.find(s => s.id === id);
  return style ? style.name : id.replace('-', ' '); // Fallback to formatted ID if not found
};

export const styleIcons: Record<string, LucideIcon> = {
  'studio': Camera,
  'lifestyle': Home,
  'seasonal': Leaf,
  'flatlay': LayoutGrid,
  'tiktok': Sparkles,
  'in-use': User,
  'social-ad': Megaphone,
  'white-bg': Square,
};

export const styleBackgroundClasses: Record<string, string> = {
  'studio': 'bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-800',
  'lifestyle': 'bg-gradient-to-br from-green-300 to-blue-400 dark:from-green-700 dark:to-blue-900',
  'seasonal': 'bg-gradient-to-br from-red-300 to-orange-400 dark:from-red-700 dark:to-orange-900',
  'flatlay': 'bg-gradient-to-br from-purple-300 to-pink-400 dark:from-purple-700 dark:to-pink-900',
  'tiktok': 'bg-gradient-to-br from-cyan-300 to-fuchsia-400 dark:from-cyan-700 dark:to-fuchsia-900',
  'in-use': 'bg-gradient-to-br from-yellow-300 to-lime-400 dark:from-yellow-700 dark:to-lime-900',
  'social-ad': 'bg-gradient-to-br from-indigo-300 to-teal-400 dark:from-indigo-700 dark:to-teal-900',
  'white-bg': 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
};