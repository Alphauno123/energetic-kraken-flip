"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy, Expand } from 'lucide-react';
import GeneratedPhotoPlaceholder from './GeneratedPhotoPlaceholder';
import { toast } from 'sonner';

interface PhotoDetailDialogProps {
  styleId: string;
  index: number;
  children: React.ReactNode; // To wrap the trigger element
  uploadedImage?: string | null; // New prop for the uploaded image
}

const PhotoDetailDialog = ({ styleId, index, children, uploadedImage }: PhotoDetailDialogProps) => {
  const getGenericPlaceholderUrl = () => "/placeholder.svg"; // Placeholder for actual image URL

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = uploadedImage || getGenericPlaceholderUrl(); // Use uploadedImage if available
    link.download = `product-photo-${styleId}-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Photo is downloading!");
  };

  const handleShare = async () => {
    try {
      const imageUrl = uploadedImage || window.location.origin + getGenericPlaceholderUrl();
      await navigator.clipboard.writeText(imageUrl);
      toast.success("Image link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy image link: ", err);
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const handleCopyImage = async () => {
    try {
      const imageUrl = uploadedImage || getGenericPlaceholderUrl();
      const response = await fetch(imageUrl);
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
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold capitalize">{styleId.replace('-', ' ')} Style Photo {index + 1}</DialogTitle>
          <DialogDescription>
            A closer look at your AI-generated product photo.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-4">
          <GeneratedPhotoPlaceholder styleId={styleId} index={index} uploadedImage={uploadedImage} className="w-full h-auto aspect-video rounded-lg mb-4" />
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex-1">
              <Share2 className="mr-2 h-4 w-4" /> Share Link
            </Button>
            <Button variant="outline" onClick={handleCopyImage} className="flex-1">
              <Copy className="mr-2 h-4 w-4" /> Copy Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoDetailDialog;