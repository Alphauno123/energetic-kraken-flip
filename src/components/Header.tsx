"use client";

import React from 'react';
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface HeaderProps {
  onReset: () => void;
  showResetButton: boolean;
}

const Header = ({ onReset, showResetButton }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          {/* You can add a logo or app title here */}
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">AI Photo Generator</h1>
        </div>
        <div className="flex items-center gap-4">
          {showResetButton && (
            <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" /> Start Over
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;