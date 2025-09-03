'use client';

import { useState } from 'react';
import { Share, Copy, Check } from 'lucide-react';

interface ShareButtonProps {
  traitName: string;
  predictionText: string;
  variant?: 'default';
}

export function ShareButton({ traitName, predictionText, variant = 'default' }: ShareButtonProps) {
  const [isShared, setIsShared] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shareText = `🧬 My ${traitName} analysis from GeneVibes: ${predictionText.substring(0, 100)}... Discover your genetic traits too! #GeneVibes #DNA`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My GeneVibes Results',
          text: shareText,
          url: window.location.href,
        });
        setIsShared(true);
      } catch (error) {
        // User canceled or error occurred, fall back to copy
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleShare}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
      >
        <Share className="w-4 h-4 mr-2" />
        {isShared ? 'Shared!' : 'Share to Farcaster'}
      </button>
      
      <button
        onClick={handleCopy}
        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
