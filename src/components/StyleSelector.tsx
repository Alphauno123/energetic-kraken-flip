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

// Define a type for the selected styles with their counts
export interface SelectedStyleWithCount {
  id: string;
  count: number;
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

const StyleSelector = ({ onSelectStyles }: { onSelectStyles: (selectedStyles: SelectedStyleWithCount[]) => void }) => {
  // State to store selected styles and their counts
  const [selectedStylesMap, setSelectedStylesMap] = useState<Record<string, number>>({});

  const toggleStyle = (styleId: string) => {
    setSelectedStylesMap((prevSelected) => {
      const newMap = { ...prevSelected };
      if (newMap[styleId]) {
        delete newMap[styleId]; // Deselect
      } else {
        newMap[styleId] = 1; // Select with default count of 1
      }
      return newMap;
    });
  };

  const handleCountChange = (styleId: string, newCount: number) => {
    setSelectedStylesMap((prevSelected) => ({
      ...prevSelected,
      [styleId]: newCount,
    }));
  };

  const handleGenerateClick = () => {
    const stylesToGenerate: SelectedStyleWithCount[] = Object.entries(selectedStylesMap).map(([id, count]) => ({
      id,
      count,
    }));
    onSelectStyles(stylesToGenerate);
  };

  const totalSelectedStyles = Object.keys(selectedStylesMap).length;
  const totalImagesToGenerate = Object.values(selectedStylesMap).reduce((sum, count) => sum + count, 0);

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Choose Your Photo Styles</CardTitle>
        <CardDescription className="text-gray-600 mb-4">
          Select one or more styles and specify the number of photos for each.
          <span className="block text-sm text-blue-600 font-medium mt-2">
            {totalSelectedStyles} style(s) selected, generating {totalImagesToGenerate} photo(s)
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((style) => (
            <StylePreviewCard
              key={style.id}
              styleId={style.id} // Pass the style.id
              styleName={style.name}
              description={style.description}
              isSelected={!!selectedStylesMap[style.id]}
              onClick={() => toggleStyle(style.id)}
              count={selectedStylesMap[style.id] || 1} // Pass current count or default to 1
              onCountChange={(newCount) => handleCountChange(style.id, newCount)}
            />
          ))}
        </div>
        <Button
          className="w-full mt-8 py-3 text-lg"
          onClick={handleGenerateClick}
          disabled={totalSelectedStyles === 0}
        >
          Generate Photos with Selected Styles
        </Button>
      </CardContent>
    </Card>
  );
};

export default StyleSelector;