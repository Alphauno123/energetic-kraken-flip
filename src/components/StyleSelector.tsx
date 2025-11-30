"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import StylePlaceholderImage from './StylePlaceholderImage'; // Import the new component

interface StyleOption {
  id: string;
  name: string;
  description: string;
}

const styles: StyleOption[] = [
  { id: 'studio', name: 'Studio Shot', description: 'Clean, professional studio background.' },
  { id: 'lifestyle', name: 'Lifestyle Scene', description: 'Product in a realistic, engaging environment.' },
  { id: 'seasonal', name: 'Seasonal Theme', description: 'Holiday or seasonal specific backgrounds.' },
  { id: 'flatlay', name: 'Flatlay', description: 'Overhead shot with complementary props.' },
  { id: 'tiktok', name: 'TikTok Style', description: 'Dynamic, trendy visuals for social media.' },
  { id: 'in-use', name: 'Product in Use', description: 'Showcasing the product being used by a model.' },
  { id: 'social-ad', name: 'Social Media Ad', description: 'Optimized for various social media platforms.' },
  { id: 'white-bg', name: 'White Background', description: 'Classic e-commerce white background.' },
];

const StyleSelector = ({ onSelectStyles }: { onSelectStyles: (selectedStyles: string[]) => void }) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const toggleStyle = (styleId: string) => {
    setSelectedStyles((prevSelected) =>
      prevSelected.includes(styleId)
        ? prevSelected.filter((id) => id !== styleId)
        : [...prevSelected, styleId]
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Choose Your Photo Styles</CardTitle>
        <CardDescription className="text-gray-600 mb-4">
          Select one or more styles to generate diverse product photos.
          <span className="block text-sm text-blue-600 font-medium mt-2">
            {selectedStyles.length} style(s) selected
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((style) => (
            <div
              key={style.id}
              className={cn(
                "relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200",
                selectedStyles.includes(style.id)
                  ? "border-blue-500 ring-2 ring-blue-500 shadow-md bg-blue-50/20 dark:bg-blue-900/20"
                  : "border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
              onClick={() => toggleStyle(style.id)}
            >
              <StylePlaceholderImage styleName={style.name} /> {/* Use the new component here */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{style.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{style.description}</p>
              </div>
              {selectedStyles.includes(style.id) && (
                <div className="absolute top-2 right-2 text-blue-500">
                  <CheckCircle2 className="h-6 w-6 fill-blue-500 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
        <Button
          className="w-full mt-8 py-3 text-lg"
          onClick={() => onSelectStyles(selectedStyles)}
          disabled={selectedStyles.length === 0}
        >
          Generate Photos with Selected Styles
        </Button>
      </CardContent>
    </Card>
  );
};

export default StyleSelector;