"use client";

import React from 'react';
import { Progress } from "@/components/ui/progress"; // Assuming shadcn/ui Progress component
import { Loader2 } from 'lucide-react';

interface GenerationProgressProps {
  progress: number; // Progress from 0 to 100
  message?: string;
}

const GenerationProgress = ({ progress, message = "Generating your stunning product photos..." }: GenerationProgressProps) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 p-6 text-center text-gray-600 dark:text-gray-400">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
      <p className="text-xl font-medium mb-3">{message}</p>
      <div className="w-full max-w-md">
        <Progress value={progress} className="h-3" />
        <p className="text-sm mt-2">{Math.round(progress)}% Complete</p>
      </div>
      <p className="text-md mt-4">This might take a few moments.</p>
    </div>
  );
};

export default GenerationProgress;