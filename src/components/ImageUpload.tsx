"use client";

import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Import AspectRatio
import { cn } from '@/lib/utils'; // Import cn for conditional class names

interface ImageUploadProps {
  onImageUpload: (image: string | null) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false); // New state for drag feedback
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        onImageUpload(result); // Pass the image up to the parent
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageUpload(null); // Notify parent that image is removed
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop handlers
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Upload Your Product Image</CardTitle>
        <CardDescription className="text-gray-600">
          Upload a single image of your product to generate stunning variations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="product-image" className="sr-only">Product Image</Label>
            <Input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
            {!image ? (
              <div
                className={cn(
                  "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-200 p-4",
                  isDraggingOver
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">Drag & drop your image here</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                  or
                </p>
                <Button onClick={triggerFileInput} className="px-6 py-3">
                  Browse Files
                </Button>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            ) : (
              <div className="relative w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <AspectRatio ratio={16 / 9} className="bg-gray-100 dark:bg-gray-800">
                  <img src={image} alt="Uploaded Product" className="w-full h-full object-contain" />
                </AspectRatio>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;