"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, CheckSquare, Square } from 'lucide-react';

interface GeneratedPhotosActionsProps {
  totalPhotos: number;
  selectedCount: number;
  isAllSelected: boolean;
  isAnySelected: boolean;
  onDownloadSelected: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const GeneratedPhotosActions = ({
  totalPhotos,
  selectedCount,
  isAllSelected,
  isAnySelected,
  onDownloadSelected,
  onSelectAll,
  onDeselectAll,
}: GeneratedPhotosActionsProps) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold">Your AI-Generated Product Photos</h2>
      <p className="text-gray-600 mt-2">
        Here are the stunning photos generated based on your product and selected styles.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
        <Button onClick={onDownloadSelected} className="py-3 text-lg" disabled={totalPhotos === 0}>
          <Download className="mr-2 h-5 w-5" /> {isAnySelected ? `Download ${selectedCount} Selected` : "Download All Photos"}
        </Button>
        {totalPhotos > 0 && (
          <Button
            variant="outline"
            onClick={isAllSelected ? onDeselectAll : onSelectAll}
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
    </div>
  );
};

export default GeneratedPhotosActions;