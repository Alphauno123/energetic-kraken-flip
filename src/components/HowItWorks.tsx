"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Palette, Image, Download } from 'lucide-react';

const steps = [
  {
    icon: <UploadCloud className="h-8 w-8 text-blue-500" />,
    title: "Upload Your Product",
    description: "Start by uploading a single image of your product. Our AI will analyze it.",
  },
  {
    icon: <Palette className="h-8 w-8 text-purple-500" />,
    title: "Choose Your Styles",
    description: "Select from a variety of artistic and commercial styles for your product photos.",
  },
  {
    icon: <Image className="h-8 w-8 text-green-500" />,
    title: "Generate Photos",
    description: "Our AI will transform your product image into stunning visuals based on your chosen styles.",
  },
  {
    icon: <Download className="h-8 w-8 text-red-500" />,
    title: "Download & Share",
    description: "Review your generated photos and download them instantly for your e-commerce store or social media.",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-gray-900 dark:text-gray-50">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;