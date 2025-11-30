"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Expand, CheckSquare, Square } from 'lucide-react'; // Import CheckSquare and Square for select all/none
import { toast } from 'sonner';
import GeneratedPhotoPlaceholder from './GeneratedPhotoPlaceholder';
import PhotoDetailDialog from './PhotoDetailDialog';
import { getStyleNameById, predefinedStyles } from '@/utils/styles';
import { getGenericPlaceholderUrl } from '@/utils/imageUtils';

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
      toast.info("No photos to download.");
      return;
    }

    toast.loading("Preparing your photos for download...", { id: "download-toast" });

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

    toast.success(`${photosToDownload.length} photo(s) are downloading!`, { id: "download-toast" });
  };

  // Helper to get the display name for a style, considering custom prompts
  const getDisplayName = (photoData: { styleId: string; prompt?: string }) => {
    if (photoData.prompt) {
      return photoData.prompt;
    }
    // For predefined styles, we need to pass all available styles to getStyleNameById
    // Since GeneratedPhotosDisplay doesn't know about customStyles state from StyleSelector,
    // we'll just use predefinedStyles for lookup here. This is a limitation of the current
    // component structure for displaying generated photos.
    return getStyleNameById(photoData.styleId, predefinedStyles);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Your AI-Generated Product Photos</CardTitle>
        <CardDescription className="text-gray-600">
          Here are the stunning photos generated based on your product and selected styles.
        </CardDescription>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
          <Button onClick={handleDownloadSelected} className="py-3 text-lg" disabled={photos.length === 0 && !uploadedImage}>
            <Download className="mr-2 h-5 w-5" /> {isAnySelected ? `Download ${selectedPhotoUniqueIds.size} Selected` : "Download All Photos"}
          </Button>
          {allDisplayablePhotos.length > 0 && (
            <Button
              variant="outline"
              onClick={isAllSelected ? handleDeselectAll : handleSelectAll}
              className="py-3 text-lg"
            >
              {isAllSelected ? (
                <Square className="mr-2 h-5 w-5" />
              ) : (
                <CheckSquare className="mr-2 h-5 w-5" />
              )}
              {isAllSelected ? "Deselect All" : "Select All"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allDisplayablePhotos.map((photoData, index) => (
            <PhotoDetailDialog
              key={photoData.uniqueId}
              styleId={photoData.styleId}
              styleName={getDisplayName(photoData)}
              index={index}
              uploadedImage={photoData.styleId === "original" ? uploadedImage : uploadedImage} // Pass uploadedImage for generated too
            >
              <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group cursor-pointer">
                <GeneratedPhotoPlaceholder
                  styleId={photoData.styleId}
                  styleName={getDisplayName(photoData)}
                  index={index}
                  uploadedImage={photoData.styleId === "original" ? uploadedImage : uploadedImage}
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