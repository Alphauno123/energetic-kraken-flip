"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from 'lucide-react';

interface ImageCountSelectorProps {
  count: number;
  onCountChange: (newCount: number) => void;
  min?: number;
  max?: number;
}

const ImageCountSelector = ({ count, onCountChange, min = 1, max = 5 }: ImageCountSelectorProps) => {
  const handleDecrement = () => {
    if (count > min) {
      onCountChange(count - 1);
    }
  };

  const handleIncrement = () => {
    if (count < max) {
      onCountChange(count + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onCountChange(value);
    } else if (e.target.value === '') {
      onCountChange(min); // Default to min if input is cleared
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={count <= min}
        className="h-8 w-8"
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease count</span>
      </Button>
      <Input
        type="number"
        min={min}
        max={max}
        value={count}
        onChange={handleInputChange}
        className="w-16 text-center"
        aria-label="Number of images"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={count >= max}
        className="h-8 w-8"
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase count</span>
      </Button>
    </div>
  );
};

export default ImageCountSelector;