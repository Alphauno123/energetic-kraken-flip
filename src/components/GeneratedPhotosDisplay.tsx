"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Expand, Image as ImageIcon } from 'lucide-react'; // Import Image icon for the original photo
import { toast } from 'sonner';
import GeneratedPhotoPlaceholder from './GeneratedPhotoPlaceholder';
import PhotoDetailDialog from './PhotoDetailDialog';
import { getStyleNameById, predefinedStyles } from '@/utils/styles'; // Import predefinedStyles
import { getGenericPlaceholderUrl } from '@/utils/imageUtils';

interface GeneratedPhotosDisplayProps {
  photos: Array<{ styleId: string; uniqueId: string; prompt?: string }>; // Include prompt for custom styles
  uploadedImage: string | null;
}

const GeneratedPhotosDisplay = ({ photos, uploadedImage }: GeneratedPhotosDisplayProps) => {
  if (photos.length === 0 && !uploadedImage) {
    return null;
  }

  const handleDownloadAll = () => {
    if (photos.length === 0 && !uploadedImage) {
      toast.info("No photos to download.");
      return;
    }

    toast.loading("Preparing your photos for download...", { id: "download-toast" });

    // Download original image if available
    if (uploadedImage) {
      const link = document.createElement('a');
      link.href = uploadedImage;
      link.download = `original-product-photo.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Download each generated photo (using generic placeholder for simulation)
    photos.forEach((photoData, index) => {
      const link = document.createElement('a');
      link.href = getGenericPlaceholderUrl(); // Use generic placeholder for generated images
      link.download = `product-photo-${photoData.styleId}-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    toast.success("All photos are downloading!", { id: "download-toast" });
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
        <Button onClick={handleDownloadAll} className="mt-4 py-3 text-lg">
          <Download className="mr-2 h-5 w-5" /> Download All Photos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uploadedImage && (
            <PhotoDetailDialog
              styleId="original"
              styleName="Original Upload"
              index={0}
              uploadedImage={uploadedImage}
            >
              <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group cursor-pointer">
                <GeneratedPhotoPlaceholder
                  styleId="original"
                  styleName="Original Upload"
                  index={0}
                  uploadedImage={uploadedImage}
                  className="w-full h-48"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button variant="secondary" size="sm" className="flex items-center">
                    <Expand className="mr-2 h-4 w-4" /> View Original
                  </Button>
                </div>
              </div>
            </PhotoDetailDialog>
          )}

          {photos.map((photoData, index) => (
            <PhotoDetailDialog
              key={photoData.uniqueId}
              styleId={photoData.styleId}
              styleName={getDisplayName(photoData)} // Use helper for display name
              index={index}
              uploadedImage={uploadedImage}
            >
              <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group cursor-pointer">
                <GeneratedPhotoPlaceholder
                  styleId={photoData.styleId}
                  styleName={getDisplayName(photoData)} // Use helper for display name
                  index={index}
                  uploadedImage={uploadedImage}
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