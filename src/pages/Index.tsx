"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import StyleSelector from "@/components/StyleSelector";
import GeneratedPhotosDisplay from "@/components/GeneratedPhotosDisplay";
import HowItWorks from "@/components/HowItWorks";
import GenerationProgress from "@/components/GenerationProgress";
import Header from "@/components/Header"; // Import the new Header component
import React, { useRef, useState } from "react";
// Removed RotateCcw and Button imports as they are now in Header
// Removed ModeToggle import as it is now in Header

const Index = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const styleSelectorRef = useRef<HTMLDivElement>(null);
  const generatedPhotosRef = useRef<HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [generatedPhotos, setGeneratedPhotos] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);

  const scrollToImageUpload = () => {
    imageUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
    setGeneratedPhotos([]);
    setSelectedStyles([]);
    setIsGenerating(false);
    setGenerationProgress(0);
    if (image && styleSelectorRef.current) {
      styleSelectorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStyleSelection = (styles: string[]) => {
    setSelectedStyles(styles);
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedPhotos([]);

    console.log("Selected styles for generation:", styles);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setGenerationProgress(100);
        const simulatedPhotos = styles.map((style, index) => `/placeholder.svg?style=${style}&idx=${index}`);
        setGeneratedPhotos(simulatedPhotos);
        setIsGenerating(false);

        if (generatedPhotosRef.current) {
          generatedPhotosRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        setGenerationProgress(currentProgress);
      }
    }, 200);
  };

  // Removed handleDownloadAll as it's now handled internally by GeneratedPhotosDisplay
  const handleReset = () => {
    setUploadedImage(null);
    setSelectedStyles([]);
    setGeneratedPhotos([]);
    setIsGenerating(false);
    setGenerationProgress(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onReset={handleReset} showResetButton={!!uploadedImage} /> {/* Use the new Header component */}
      <HeroSection onUploadClick={scrollToImageUpload} />
      <HowItWorks />
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Removed the old flex container for buttons */}
        <div ref={imageUploadRef}>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
        {uploadedImage && (
          <div ref={styleSelectorRef}>
            <StyleSelector onSelectStyles={handleStyleSelection} />
          </div>
        )}

        {isGenerating && (
          <GenerationProgress progress={generationProgress} />
        )}

        {!isGenerating && generatedPhotos.length > 0 && (
          <div ref={generatedPhotosRef}>
            <GeneratedPhotosDisplay photos={generatedPhotos} /> {/* Removed onDownloadAll prop */}
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;