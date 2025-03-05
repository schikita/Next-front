"use client";

import React, { useState } from "react";
import { Share2 } from "lucide-react";
import ShareButtons from "@/components/ShareButtons/ShareButtons";

interface DropdownButtonProps {
  shareUrl: string;
  title: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ shareUrl, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        <Share2 className="w-5 h-5" />
      </button>

      <ShareButtons open={open} onClose={() => setOpen(false)} shareUrl={shareUrl} title={title} />
    </div>
  );
};

export default DropdownButton;
