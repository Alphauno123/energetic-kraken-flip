"use client";

import { useState, useRef } from 'react';

interface UseImageUploadResult {
  uploadedImage: string | null;
  imageUploadRef: React.RefObject<HTMLDivElement>;
  handleImageUpload: (image: string | null) => void;
  scrollToImageUpload: () => void;
  resetImageUpload: () => void;
}

export function useImageUpload(onImageUploaded?: (image: string | null) => void): UseImageUploadResult {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const imageUploadRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
    onImageUploaded?.(image); // Callback for parent component
    if (image && imageUploadRef.current) {
      // Optionally scroll to the next section after upload, handled by parent
    }
  };

  const scrollToImageUpload = () => {
    imageUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetImageUpload = () => {
    setUploadedImage(null);
  };

  return {
    uploadedImage,
    imageUploadRef,
    handleImageUpload,
    scrollToImageUpload,
    resetImageUpload,
  };
}