"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import StyleSelector from "@/components/StyleSelector"; // Import the new component
import React, { useRef, useState } from "react";

const Index = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const styleSelectorRef = useRef<HTMLDivElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const scrollToImageUpload = () => {
    imageUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
    if (image && styleSelectorRef.current) {
      // Scroll to style selector after image upload
      styleSelectorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStyleSelection = (styles: string[]) => {
    setSelectedStyles(styles);
    console.log("Selected styles for generation:", styles);
    // Here you would typically trigger the AI generation process
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <HeroSection onUploadClick={scrollToImageUpload} />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div ref={imageUploadRef}>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
        {uploadedImage && ( // Only show style selector if an image is uploaded
          <div ref={styleSelectorRef}>
            <StyleSelector onSelectStyles={handleStyleSelection} />
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;