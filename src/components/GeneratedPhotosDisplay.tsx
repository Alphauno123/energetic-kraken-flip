"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GeneratedPhotosDisplayProps {
  photos: string[];
  onDownloadAll: () => void;
}

const GeneratedPhotosDisplay = ({ photos, onDownloadAll }: GeneratedPhotosDisplayProps) => {
  if (photos.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-6xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Your AI-Generated Product Photos</CardTitle>
        <CardDescription className="text-gray-600">
          Here are the stunning photos generated based on your product and selected styles.
        </CardDescription>
        <Button onClick={onDownloadAll} className="mt-4 py-3 text-lg">
          <Download className="mr-2 h-5 w-5" /> Download All Photos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photoUrl, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
              <img
                src={photoUrl}
                alt={`Generated Product Photo ${index + 1}`}
                className="w-full h-48 object-cover bg-gray-100"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button variant="secondary" size="sm" asChild>
                  <a href={photoUrl} download={`product-photo-${index + 1}.png`} className="flex items-center">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneratedPhotosDisplay;