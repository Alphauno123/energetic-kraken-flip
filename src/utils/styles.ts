"use client";

import {
  Camera,
  Home,
  Leaf,
  LayoutGrid,
  Sparkles,
  User,
  Megaphone,
  Square,
  LucideIcon,
  Type, // New icon for custom styles
} from 'lucide-react';

// Define specific interfaces for predefined and custom styles
export interface PredefinedStyleOption {
  id: string;
  name: string;
  description: string;
  isCustom?: false; // Explicitly false or absent for predefined
}

export interface CustomStyleOption {
  id: string;
  name: string; // This will be the prompt for display
  description: string; // Generic description for custom styles
  isCustom: true; // Explicitly true for custom
  prompt: string; // Mandatory prompt for custom styles
}

// Union type for all style options
export type StyleOption = PredefinedStyleOption | CustomStyleOption;

// Define a type for the selected styles with their counts
export interface SelectedStyleWithCount {
  id: string;
  count: number;
  prompt?: string; // Include prompt for custom styles, optional as not all selected styles are custom
}

export const predefinedStyles: PredefinedStyleOption[] = [
  { id: 'studio', name: 'Studio Shot', description: 'Clean, professional studio background.' },
  { id: 'lifestyle', name: 'Lifestyle Scene', description: 'Product in a realistic, engaging environment.' },
  { id: 'seasonal', name: 'Seasonal Theme', description: 'Holiday or seasonal specific backgrounds.' },
  { id: 'flatlay', name: 'Flatlay', description: 'Overhead shot with complementary props.' },
  { id: 'tiktok', name: 'TikTok Style', description: 'Dynamic, trendy visuals for social media.' },
  { id: 'in-use', name: 'Product in Use', description: 'Showcasing the product being used by a model.' },
  { id: 'social-ad', name: 'Social Media Ad', description: 'Optimized for various social media platforms.' },
  { id: 'white-bg', name: 'White Background', description: 'Classic e-commerce white background.' },
];

// Updated getStyleNameById to use predefinedStyles internally and prioritize prompt for custom styles
export const getStyleNameById = (id: string, prompt?: string): string => {
  if (prompt) { // If a prompt is provided, it's a custom style
    return prompt;
  }
  const style = predefinedStyles.find(s => s.id === id);
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
  'custom': Type, // Generic icon for custom styles
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
  'custom': 'bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-indigo-700 dark:to-purple-900', // Generic background for custom styles
};

export const styleOverlayClasses: Record<string, string> = {
  'studio': 'bg-gray-700/20',
  'lifestyle': 'bg-green-700/20',
  'seasonal': 'bg-red-700/20',
  'flatlay': 'bg-purple-700/20',
  'tiktok': 'bg-cyan-700/20',
  'in-use': 'bg-yellow-700/20',
  'social-ad': 'bg-indigo-700/20',
  'white-bg': 'bg-gray-500/10',
  'custom': 'bg-indigo-700/20', // Generic overlay for custom styles
};