'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: { url: string; caption?: string | null }[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 lightbox-overlay flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Image viewer"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image */}
      <div
        className="relative w-full max-w-4xl max-h-[85vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].caption || `Image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 80vw"
            priority
          />
        </div>

        {/* Caption & Counter */}
        <div className="text-center mt-4">
          {images[currentIndex].caption && (
            <p className="text-white text-sm mb-2">{images[currentIndex].caption}</p>
          )}
          <p className="text-white/60 text-xs">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
