"use client";

import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import StyleSelector from "@/components/StyleSelector";
import GeneratedPhotosDisplay from "@/components/GeneratedPhotosDisplay";
import HowItWorks from "@/components/HowItWorks";
import GenerationProgress from "@/components/GenerationProgress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useRef, useState, useEffect } from "react";
import { usePhotoGeneration } from "@/hooks/usePhotoGeneration";

const Index = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const styleSelectorRef = useRef<HTMLDivElement>(null);
  const generatedPhotosRef = useRef<HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const {
    isGenerating,
    generationProgress,
    generatedPhotos,
    selectedStylesWithCounts,
    handleStyleSelection,
    resetGeneration,
  } = usePhotoGeneration();

  // Effect to scroll to generated photos when they appear
  useEffect(() => {
    if (!isGenerating && generatedPhotos.length > 0 && generatedPhotosRef.current) {
      generatedPhotosRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isGenerating, generatedPhotos]);

  const scrollToImageUpload = () => {
    imageUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
    resetGeneration(); // Reset generation state when a new image is uploaded
    if (image && styleSelectorRef.current) {
      styleSelectorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    resetGeneration(); // Reset generation state
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