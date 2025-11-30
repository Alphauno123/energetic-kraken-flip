"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import StyleSelector from "@/components/StyleSelector";
import GeneratedPhotosDisplay from "@/components/GeneratedPhotosDisplay"; // Import the new component
import React, { useRef, useState } from "react";

const Index = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const styleSelectorRef = useRef<HTMLDivElement>(null);
  const generatedPhotosRef = useRef<HTMLDivElement>(null); // Ref for generated photos section

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [generatedPhotos, setGeneratedPhotos] = useState<string[]>([]); // State for generated photos

  const scrollToImageUpload = () => {
    imageUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
    setGeneratedPhotos([]); // Clear generated photos on new upload
    if (image && styleSelectorRef.current) {
      styleSelectorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStyleSelection = (styles: string[]) => {
    setSelectedStyles(styles);
    console.log("Selected styles for generation:", styles);
    // Simulate AI generation with placeholder images
    const simulatedPhotos = styles.map((style, index) => `/placeholder.svg?style=${style}&idx=${index}`);
    setGeneratedPhotos(simulatedPhotos);

    if (generatedPhotosRef.current) {
      generatedPhotosRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadAll = () => {
    // In a real app, you'd trigger a bulk download or zip file creation
    alert("Downloading all generated photos! (Simulated)");
    console.log("Initiating download for all photos:", generatedPhotos);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <HeroSection onUploadClick={scrollToImageUpload} />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div ref={imageUploadRef}>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
        {uploadedImage && (
          <div ref={styleSelectorRef}>
            <StyleSelector onSelectStyles={handleStyleSelection} />
          </div>
        )}
        {generatedPhotos.length > 0 && ( // Only show generated photos if available
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