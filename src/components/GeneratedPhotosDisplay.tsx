"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Expand } from 'lucide-react';
import { toast } from 'sonner';
import GeneratedPhotoPlaceholder from './GeneratedPhotoPlaceholder';
import PhotoDetailDialog from './PhotoDetailDialog';
import { getStyleNameById } from '@/utils/styles';
import { getGenericPlaceholderUrl } from '@/utils/imageUtils'; // Import from new utility

interface GeneratedPhotosDisplayProps {
  photos: Array<{ styleId: string; uniqueId: string }>;
  uploadedImage: string | null;
}

const GeneratedPhotosDisplay = ({ photos, uploadedImage }: GeneratedPhotosDisplayProps) => {
  if (photos.length === 0) {
    return null;
  }

  const handleDownloadAll = () => {
    if (photos.length === 0) {
      toast.info("No photos to download.");
      return;
    }

    toast.loading("Preparing your photos for download...", { id: "download-toast" });

    photos.forEach((photoData, index) => {
      const link = document.createElement('a');
      link.href = uploadedImage || getGenericPlaceholderUrl();
      link.download = `product-photo-${photoData.styleId}-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    toast.success("All photos are downloading!", { id: "download-toast" });
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
          {photos.map((photoData, index) => (
            <PhotoDetailDialog
              key={photoData.uniqueId}
              styleId={photoData.styleId}
              styleName={getStyleNameById(photoData.styleId)}
              index={index}
              uploadedImage={uploadedImage}
            >
              <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group cursor-pointer">
                <GeneratedPhotoPlaceholder
                  styleId={photoData.styleId}
                  styleName={getStyleNameById(photoData.styleId)}
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