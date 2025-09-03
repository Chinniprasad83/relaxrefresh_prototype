import { useState, useEffect } from "react";

interface StallData {
  id: string;
  name: string;
  company: string;
  distance: string;
  road: string;
  space: string;
  city: string;
  supplier: string;
  image: string;
  isLiked?: boolean;
}

export const useInterest = () => {
  const [likedStalls, setLikedStalls] = useState<StallData[]>([]);

  // Load liked stalls from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("likedStalls");
    if (saved) {
      try {
        setLikedStalls(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing liked stalls:", error);
      }
    }
  }, []);

  // Save to localStorage whenever likedStalls changes
  useEffect(() => {
    localStorage.setItem("likedStalls", JSON.stringify(likedStalls));
  }, [likedStalls]);

  const toggleHeart = (stall: StallData) => {
    setLikedStalls(prev => {
      const isCurrentlyLiked = prev.some(s => s.id === stall.id);
      
      if (isCurrentlyLiked) {
        // Remove from liked stalls
        return prev.filter(s => s.id !== stall.id);
      } else {
        // Add to liked stalls
        return [...prev, { ...stall, isLiked: true }];
      }
    });
  };

  const isLiked = (stallId: string) => {
    return likedStalls.some(s => s.id === stallId);
  };

  return {
    likedStalls,
    toggleHeart,
    isLiked,
  };
};