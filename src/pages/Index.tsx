"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import React, { useRef } from "react";

const Index = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);

  const scrollToImageUpload = () => {
    imageUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <HeroSection onUploadClick={scrollToImageUpload} />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div ref={imageUploadRef}>
          <ImageUpload />
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;