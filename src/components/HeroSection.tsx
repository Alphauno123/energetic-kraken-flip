"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HeroSection = ({ onUploadClick }: { onUploadClick: () => void }) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            AI Product Photo Generator for E-commerce
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-100">
            Transform one product image into dozens of polished, brand-ready visuals in seconds.
            Replace expensive photoshoots and save weeks of work.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={onUploadClick}
          >
            Get Started - Upload Your Product
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;