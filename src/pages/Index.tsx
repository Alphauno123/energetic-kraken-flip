"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import StyleSelector from "@/components/StyleSelector";
import GeneratedPhotosDisplay from "@/components/GeneratedPhotosDisplay";
import HowItWorks from "@/components/HowItWorks"; // Import the new component
import React, { useRef, useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const styleSelectorRef = useRef<HTMLDivElement>(null);
  const generatedPhotosRef = useRef<HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [generatedPhotos, setGeneratedPhotos] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const scrollToImageUpload = () => {
    imageUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
    setGeneratedPhotos([]); // Clear generated photos on new upload
    setSelectedStyles([]); // Clear selected styles on new upload
    setIsGenerating(false); // Reset loading state
    if (image && styleSelectorRef.current) {
      styleSelectorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStyleSelection = (styles: string[]) => {
    setSelectedStyles(styles);
    setIsGenerating(true); // Set loading state to true
    setGeneratedPhotos([]); // Clear previous generated photos

    console.log("Selected styles for generation:", styles);

    // Simulate AI generation with a delay
    setTimeout(() => {
      const simulatedPhotos = styles.map((style, index) => `/placeholder.svg?style=${style}&idx=${index}`);
      setGeneratedPhotos(simulatedPhotos);
      setIsGenerating(false); // Set loading state to false after simulation

      if (generatedPhotosRef.current) {
        generatedPhotosRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 2000); // Simulate a 2-second generation time
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
    // Scroll back to the top or hero section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <HeroSection onUploadClick={scrollToImageUpload} />
      <HowItWorks /> {/* Add the HowItWorks component here */}
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
          <div className="flex flex-col items-center justify-center mt-10 p-6 text-center text-gray-600 dark:text-gray-400">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-xl font-medium">Generating your stunning product photos...</p>
            <p className="text-md">This might take a few moments.</p>
          </div>
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