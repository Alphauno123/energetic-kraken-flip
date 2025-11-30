"use client";

import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from 'lucide-react'; // Removed FileText import

interface ImageUploadProps {
  onImageUpload: (image: string | null) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [image, setImage] = useState<string | null>(null);
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
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={triggerFileInput}
              >
                <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-lg font-medium">Drag & drop or click to upload</p>
                <p className="text-sm text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            ) : (
              <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-gray-200">
                <img src={image} alt="Uploaded Product" className="w-full h-full object-contain bg-gray-100" />
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