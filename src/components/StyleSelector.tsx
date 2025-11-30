"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StylePreviewCard from './StylePreviewCard'; // Import the new component

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
            <StylePreviewCard
              key={style.id}
              styleName={style.name}
              description={style.description}
              isSelected={selectedStyles.includes(style.id)}
              onClick={() => toggleStyle(style.id)}
            />
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