"use client";

import { useState, useRef } from 'react';
import { SelectedStyleWithCount } from '@/components/StyleSelector';

interface GeneratedPhoto {
  styleId: string;
  uniqueId: string;
}

interface UsePhotoGenerationResult {
  isGenerating: boolean;
  generationProgress: number;
  generatedPhotos: GeneratedPhoto[];
  selectedStylesWithCounts: SelectedStyleWithCount[];
  handleStyleSelection: (stylesWithCounts: SelectedStyleWithCount[], generatedPhotosRef: React.RefObject<HTMLDivElement>) => void;
  resetGeneration: () => void;
}

export function usePhotoGeneration(): UsePhotoGenerationResult {
  const [selectedStylesWithCounts, setSelectedStylesWithCounts] = useState<SelectedStyleWithCount[]>([]);
  const [generatedPhotos, setGeneratedPhotos] = useState<GeneratedPhoto[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const generationIntervalRef = useRef<number | null>(null);

  const handleStyleSelection = (stylesWithCounts: SelectedStyleWithCount[], generatedPhotosRef: React.RefObject<HTMLDivElement>) => {
    // Clear any existing interval to prevent multiple simulations running
    if (generationIntervalRef.current) {
      clearInterval(generationIntervalRef.current);
    }

    setSelectedStylesWithCounts(stylesWithCounts);
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedPhotos([]);

    console.log("Selected styles for generation:", stylesWithCounts);

    const simulatedPhotosData: GeneratedPhoto[] = [];
    let currentProgress = 0;

    generationIntervalRef.current = window.setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 100) {
        clearInterval(generationIntervalRef.current!);
        generationIntervalRef.current = null;
        setGenerationProgress(100);

        stylesWithCounts.forEach(style => {
          for (let i = 0; i < style.count; i++) {
            simulatedPhotosData.push({ styleId: style.id, uniqueId: `${style.id}-${i}-${Date.now()}` }); // Added Date.now() for more uniqueness
          }
        });
        setGeneratedPhotos(simulatedPhotosData);
        setIsGenerating(false);

        if (generatedPhotosRef.current) {
          generatedPhotosRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        setGenerationProgress(currentProgress);
      }
    }, 200);
  };

  const resetGeneration = () => {
    if (generationIntervalRef.current) {
      clearInterval(generationIntervalRef.current);
      generationIntervalRef.current = null;
    }
    setSelectedStylesWithCounts([]);
    setGeneratedPhotos([]);
    setIsGenerating(false);
    setGenerationProgress(0);
  };

  return {
    isGenerating,
    generationProgress,
    generatedPhotos,
    selectedStylesWithCounts,
    handleStyleSelection,
    resetGeneration,
  };
}