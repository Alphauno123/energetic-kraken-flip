"use client";

import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface CustomStyleInputProps {
  onAddCustomStyle: (prompt: string) => void;
}

const CustomStyleInput = ({ onAddCustomStyle }: CustomStyleInputProps) => {
  const [prompt, setPrompt] = useState<string>('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onAddCustomStyle(prompt.trim());
      setPrompt(''); // Clear input after adding
    }
  };

  return (
    <Card className="w-full p-6 shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold">Create Your Own Style</CardTitle>
        <CardDescription className="text-gray-600">
          Describe the scene or style you envision for your product photos.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Textarea
          placeholder="e.g., 'A minimalist scene with soft, natural lighting and a wooden table', 'Product on a beach at sunset'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <Button onClick={handleSubmit} disabled={!prompt.trim()} className="w-full py-3 text-lg">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Custom Style
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomStyleInput;