"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Expand } from 'lucide-react';
import GeneratedPhotoPlaceholder from './GeneratedPhotoPlaceholder';
import PhotoDetailDialog from './PhotoDetailDialog';
import { getStyleNameById, predefinedStyles } from '@/utils/styles';
import { getGenericPlaceholderUrl } from '@/utils/imageUtils';
import GeneratedPhotosActions from './GeneratedPhotosActions'; // Import the new component
import { Button } from "@/components/ui/button"; // Ensure Button is imported for PhotoDetailDialog trigger

interface GeneratedPhotosDisplayProps {
  photos: Array<{ styleId: string; uniqueId: string; prompt?: string }>;
  uploadedImage: string | null;
}

const GeneratedPhotosDisplay = ({ photos, uploadedImage }: GeneratedPhotosDisplayProps) => {
  const [selectedPhotoUniqueIds, setSelectedPhotoUniqueIds] = useState<Set<string>>(new Set());

  if (photos.length === 0 && !uploadedImage) {
    return null;
  }

  const allDisplayablePhotos = uploadedImage
    ? [{ styleId: "original", uniqueId: "original-upload", prompt: "Original Upload" }, ...photos]
    : photos;

  const handleToggleSelect = (uniqueId: string) => {
    setSelectedPhotoUniqueIds((prevSelected) => {
      const newSet = new Set(prevSelected);
      if (newSet.has(uniqueId)) {
        newSet.delete(uniqueId);
      } else {
        newSet.add(uniqueId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    const allIds = new Set(allDisplayablePhotos.map((p) => p.uniqueId));
    setSelectedPhotoUniqueIds(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedPhotoUniqueIds(new Set());
  };

  const isAllSelected = selectedPhotoUniqueIds.size === allDisplayablePhotos.length;
  const isAnySelected = selectedPhotoUniqueIds.size > 0;

  const handleDownloadSelected = () => {
    const photosToDownload = isAnySelected
      ? allDisplayablePhotos.filter((p) => selectedPhotoUniqueIds.has(p.uniqueId))
      : allDisplayablePhotos; // If nothing selected, download all

    if (photosToDownload.length === 0) {
      // This case should ideally be prevented by disabling the button, but as a fallback:
      console.warn("No photos selected or available to download.");
      return;
    }

    // Simulate download logic (as per existing implementation)
    photosToDownload.forEach((photoData, index) => {
      const link = document.createElement('a');
      if (photoData.styleId === "original" && uploadedImage) {
        link.href = uploadedImage;
        link.download = `original-product-photo.png`;
      } else {
        link.href = getGenericPlaceholderUrl(); // Use generic placeholder for generated images
        link.download = `product-photo-${photoData.styleId}-${index + 1}.png`;
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Using toast for feedback (assuming it's handled by the parent App component)
    // toast.success(`${photosToDownload.length} photo(s) are downloading!`);
  };

  // Helper to get the display name for a style, considering custom prompts
  const getDisplayName = (photoData: { styleId: string; prompt?: string }) => {
    if (photoData.prompt) {
      return photoData.prompt;
    }
    return getStyleNameById(photoData.styleId, predefinedStyles);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader className="text-center">
        <GeneratedPhotosActions
          totalPhotos={allDisplayablePhotos.length}
          selectedCount={selectedPhotoUniqueIds.size}
          isAllSelected={isAllSelected}
          isAnySelected={isAnySelected}
          onDownloadSelected={handleDownloadSelected}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
        />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allDisplayablePhotos.map((photoData, index) => (
            <PhotoDetailDialog
              key={photoData.uniqueId}
              styleId={photoData.styleId}
              styleName={getDisplayName(photoData)}
              index={index}
              uploadedImage={uploadedImage}
            >
              <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group cursor-pointer">
                <GeneratedPhotoPlaceholder
                  styleId={photoData.styleId}
                  styleName={getDisplayName(photoData)}
                  index={index}
                  uploadedImage={uploadedImage}
                  className="w-full h-48"
                  uniqueId={photoData.uniqueId}
                  isSelected={selectedPhotoUniqueIds.has(photoData.uniqueId)}
                  onToggleSelect={handleToggleSelect}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button variant="secondary" size="sm" className="flex items-center">
                    <Expand className="mr-2 h-4 w-4" /> View Details
                  </Button>
                </div>
              </div>
            </PhotoDetailDialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneratedPhotosDisplay;