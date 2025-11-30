"use client";

import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import StyleSelector, { SelectedStyleWithCount } from "@/components/StyleSelector";
import GeneratedPhotosDisplay from "@/components/GeneratedPhotosDisplay";
import HowItWorks from "@/components/HowItWorks";
import GenerationProgress from "@/components/GenerationProgress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useRef, useState } from "react";

const Index = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const styleSelectorRef = useRef<HTMLDivElement>(null);
  const generatedPhotosRef = useRef<HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStylesWithCounts, setSelectedStylesWithCounts] = useState<SelectedStyleWithCount[]>([]);
  const [generatedPhotos, setGeneratedPhotos] = useState<Array<{ styleId: string; uniqueId: string }>>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);

  const scrollToImageUpload = () => {
    imageUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
    setGeneratedPhotos([]);
    setSelectedStylesWithCounts([]); // Reset selected styles
    setIsGenerating(false);
    setGenerationProgress(0);
    if (image && styleSelectorRef.current) {
      styleSelectorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStyleSelection = (stylesWithCounts: SelectedStyleWithCount[]) => {
    setSelectedStylesWithCounts(stylesWithCounts);
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedPhotos([]);

    console.log("Selected styles for generation:", stylesWithCounts);

    const totalImagesToGenerate = stylesWithCounts.reduce((sum, style) => sum + style.count, 0);
    const simulatedPhotosData: Array<{ styleId: string; uniqueId: string }> = [];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setGenerationProgress(100);

        stylesWithCounts.forEach(style => {
          for (let i = 0; i < style.count; i++) {
            simulatedPhotosData.push({ styleId: style.id, uniqueId: `${style.id}-${i}` });
          }
        });
        setGeneratedPhotos(simulatedPhotosData);
        setIsGenerating(false);

        if (generatedPhotosRef.current) {
          generatedPhotosRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        setGenerationProgress(currentProgress);
      }
    }, 200);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedStylesWithCounts([]);
    setGeneratedPhotos([]);
    setIsGenerating(false);
    setGenerationProgress(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showResetButton = !!uploadedImage || selectedStylesWithCounts.length > 0 || generatedPhotos.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onReset={handleReset} showResetButton={showResetButton} />
      <HeroSection onUploadClick={scrollToImageUpload} />
      <HowItWorks />
      <main className="flex-grow container mx-auto px-4 py-12">
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
            <GeneratedPhotosDisplay photos={generatedPhotos} uploadedImage={uploadedImage} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;