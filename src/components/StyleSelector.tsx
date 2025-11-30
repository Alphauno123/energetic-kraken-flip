"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StylePreviewCard from './StylePreviewCard';
import CustomStyleInput from './CustomStyleInput'; // Import the new component
import { predefinedStyles, SelectedStyleWithCount, StyleOption, getStyleNameById } from '@/utils/styles'; // Import predefinedStyles and getStyleNameById

const StyleSelector = ({ onSelectStyles }: { onSelectStyles: (selectedStyles: SelectedStyleWithCount[]) => void }) => {
  const [customStyles, setCustomStyles] = useState<StyleOption[]>([]);
  const [selectedStylesMap, setSelectedStylesMap] = useState<Record<string, number>>({});

  const allAvailableStyles = [...predefinedStyles, ...customStyles];

  const handleAddCustomStyle = (prompt: string) => {
    const newCustomStyle: StyleOption = {
      id: `custom-${Date.now()}`, // Unique ID for custom style
      name: prompt, // Use prompt as name for display in card
      description: 'User-defined AI style',
      isCustom: true,
      prompt: prompt,
    };
    setCustomStyles((prev) => [...prev, newCustomStyle]);
    // Automatically select the new custom style with a count of 1
    setSelectedStylesMap((prevSelected) => ({
      ...prevSelected,
      [newCustomStyle.id]: 1,
    }));
  };

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
    const stylesToGenerate: SelectedStyleWithCount[] = Object.entries(selectedStylesMap).map(([id, count]) => {
      const styleOption = allAvailableStyles.find(s => s.id === id);
      return {
        id,
        count,
        ...(styleOption?.isCustom && { prompt: styleOption.prompt }), // Include prompt for custom styles
      };
    });
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
        <div className="mb-8">
          <CustomStyleInput onAddCustomStyle={handleAddCustomStyle} />
        </div>
        <h3 className="text-2xl font-bold mb-6 text-center">Predefined Styles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAvailableStyles.map((style) => (
            <StylePreviewCard
              key={style.id}
              styleId={style.isCustom ? 'custom' : style.id} // Use 'custom' for icon/background lookup
              styleName={style.isCustom ? style.prompt || style.name : style.name} // Display prompt for custom
              description={style.description}
              isSelected={!!selectedStylesMap[style.id]}
              onClick={() => toggleStyle(style.id)}
              count={selectedStylesMap[style.id] || 1}
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