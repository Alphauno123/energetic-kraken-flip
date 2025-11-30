"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import StyleSelector from "@/components/StyleSelector";
import GeneratedPhotosDisplay from "@/components/GeneratedPhotosDisplay";
import HowItWorks from "@/components/HowItWorks";
import GenerationProgress from "@/components/GenerationProgress"; // Import the new component
import React, { useRef, useState } from "react";
import { RotateCcw } from "lucide-react"; // Loader2 is now used inside GenerationProgress
import { Button } from "@/components/ui/button";

const Index = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const styleSelectorRef = useRef<HTMLDivElement>(null);
  const generatedPhotosRef = useRef<HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [generatedPhotos, setGeneratedPhotos] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0); // New state for progress

  const scrollToImageUpload = () => {
    imageUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
    setGeneratedPhotos([]); // Clear generated photos on new upload
    setSelectedStyles([]); // Clear selected styles on new upload
    setIsGenerating(false); // Reset loading state
    setGenerationProgress(0); // Reset progress
    if (image && styleSelectorRef.current) {
      styleSelectorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStyleSelection = (styles: string[]) => {
    setSelectedStyles(styles);
    setIsGenerating(true); // Set loading state to true
    setGenerationProgress(0); // Reset progress before starting
    setGeneratedPhotos([]); // Clear previous generated photos

    console.log("Selected styles for generation:", styles);

    // Simulate AI generation with a delay and progress updates
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10; // Increment progress
      if (currentProgress >= 100) {
        clearInterval(interval);
        setGenerationProgress(100);
        const simulatedPhotos = styles.map((style, index) => `/placeholder.svg?style=${style}&idx=${index}`);
        setGeneratedPhotos(simulatedPhotos);
        setIsGenerating(false); // Set loading state to false after simulation

        if (generatedPhotosRef.current) {
          generatedPhotosRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        setGenerationProgress(currentProgress);
      }
    }, 200); // Update progress every 200ms for a 2-second total
  };

  const handleDownloadAll = () => {
    alert("Downloading all generated photos! (Simulated)");
    console.log("Initiating download for all photos:", generatedPhotos);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedStyles([]);
    setGeneratedPhotos([]);
    setIsGenerating(false);
    setGenerationProgress(0); // Reset progress on start over
    // Scroll back to the top or hero section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <HeroSection onUploadClick={scrollToImageUpload} />
      <HowItWorks />
      <main className="flex-grow container mx-auto px-4 py-12">
        {uploadedImage && ( // Show reset button once an image is uploaded
          <div className="flex justify-end mb-8">
            <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" /> Start Over
            </Button>
          </div>
        )}
        <div ref={imageUploadRef}>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
        {uploadedImage && (
          <div ref={styleSelectorRef}>
            <StyleSelector onSelectStyles={handleStyleSelection} />
          </div>
        )}

        {isGenerating && (
          <GenerationProgress progress={generationProgress} /> // Use the new progress component
        )}

        {!isGenerating && generatedPhotos.length > 0 && (
          <div ref={generatedPhotosRef}>
            <GeneratedPhotosDisplay photos={generatedPhotos} onDownloadAll={handleDownloadAll} />
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;