"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy } from 'lucide-react'; // Import Copy icon
import { cn } from '@/lib/utils';
import { toast } from 'sonner'; // Import toast for user feedback

interface GeneratedPhotosDisplayProps {
  photos: string[];
}

const GeneratedPhotosDisplay = ({ photos }: GeneratedPhotosDisplayProps) => {
  if (photos.length === 0) {
    return null;
  }

  const handleDownloadAll = () => {
    if (photos.length === 0) {
      toast.info("No photos to download.");
      return;
    }

    toast.loading("Preparing your photos for download...", { id: "download-toast" });

    photos.forEach((photoUrl, index) => {
      const link = document.createElement('a');
      link.href = photoUrl;
      link.download = `product-photo-${index + 1}.png`; // Suggest a filename
      document.body.appendChild(link); // Append to body to make it clickable
      link.click(); // Programmatically click the link
      document.body.removeChild(link); // Remove the link after clicking
    });

    toast.success("All photos are downloading!", { id: "download-toast" });
  };

  const handleSharePhoto = async (photoUrl: string) => {
    try {
      await navigator.clipboard.writeText(window.location.origin + photoUrl); // Use window.location.origin for full URL
      toast.success("Image link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy image link: ", err);
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const handleCopyImage = async (photoUrl: string) => {
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      toast.success("Image copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy image: ", err);
      toast.error("Failed to copy image. Please try again.");
    }
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
          {photos.map((photoUrl, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
              <img
                src={photoUrl}
                alt={`Generated Product Photo ${index + 1}`}
                className="w-full h-48 object-cover bg-gray-100"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button variant="secondary" size="sm" asChild>
                  <a href={photoUrl} download={`product-photo-${index + 1}.png`} className="flex items-center">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </a>
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleSharePhoto(photoUrl)} className="flex items-center">
                  <Share2 className="mr-2 h-4 w-4" /> Share Link
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleCopyImage(photoUrl)} className="flex items-center">
                  <Copy className="mr-2 h-4 w-4" /> Copy Image
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