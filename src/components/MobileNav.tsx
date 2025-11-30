"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, RotateCcw } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

interface MobileNavProps {
  onReset: () => void;
  showResetButton: boolean;
}

const MobileNav = ({ onReset, showResetButton }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  const handleResetClick = () => {
    onReset();
    setOpen(false); // Close the sheet after clicking reset
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="flex flex-col gap-4 p-4">
          {showResetButton && (
            <Button variant="outline" onClick={handleResetClick} className="flex items-center gap-2 w-full">
              <RotateCcw className="mr-2 h-4 w-4" /> Start Over
            </Button>
          )}
          <div className="flex justify-center">
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;