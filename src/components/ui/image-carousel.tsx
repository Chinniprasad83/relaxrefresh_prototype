import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export function ImageCarousel({ images, className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center h-48 ${className}`}>
        <span className="text-muted-foreground">No images available</span>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div className="relative h-48 sm:h-64">
        <img
          src={images[currentIndex]}
          alt={`Stall image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}