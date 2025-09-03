import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Car,
  DollarSign,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import CompactStallCard from "@/components/ui/compact-stall-card";
import { useInterest } from "@/hooks/use-interest";
import { mockStallData } from "@/data/mockStallData";

const StallDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggleHeart, isLiked } = useInterest();
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [query, setQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find stall data by ID
  const stallData = mockStallData.find((stall) => stall.id === id) || null;

  // Handle case where stall is not found
  if (!stallData) {
    return (
      <div className="min-h-screen bg-background-secondary">
        <motion.div
          className="sticky top-0 z-40 bg-gradient-primary text-white p-6 flex items-center justify-between shadow-elevated"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">Stall Not Found</h1>
          <div className="w-6 h-6" />
        </motion.div>
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold text-foreground">Stall Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The stall with ID {id} could not be found.
          </p>
          <Button
            onClick={() => navigate("/app/stalls")}
            className="mt-4 bg-primary hover:bg-primary-dark"
          >
            Back to Stalls
          </Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    toggleHeart(stallData);
    if (!isLiked(stallData.id)) {
      setShowQueryModal(true);
    }
    toast({
      title: isLiked(stallData.id) ? "Removed from interests" : "Added to interests",
      description: isLiked(stallData.id)
        ? `${stallData.name} removed from your interests`
        : `${stallData.name} added to your interests`,
    });
  };

  const handleAttractionClick = (attractionId) => {
    navigate(`/app/stall/${attractionId}`);
  };

  const handleAttractionHeartClick = (attraction) => {
    toggleHeart(attraction);
    toast({
      title: isLiked(attraction.id) ? "Removed from interests" : "Added to interests",
      description: isLiked(attraction.id)
        ? `${attraction.name} removed from your interests`
        : `${attraction.name} added to your interests`,
    });
  };

  const handleQuerySubmit = () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter your query before submitting",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Query Submitted",
      description: "Your query has been sent successfully",
    });
    setQuery("");
    setShowQueryModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % stallData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + stallData.images.length) % stallData.images.length
    );
  };

  return (
    <div className="min-h-screen bg-background-secondary" 
    style={{paddingBottom: '170px'}}>
      {/* Header */}
      <motion.div
        className="sticky top-0 z-40 bg-gradient-primary text-white p-6 flex items-center justify-between shadow-elevated"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-semibold">{stallData.name}</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLike}
          className="text-white hover:bg-white/10"
        >
          <Heart
            className={`w-6 h-6 ${isLiked(stallData.id) ? "fill-current text-red-400" : ""}`}
          />
        </Button>
      </motion.div>
      <div className="pb-6">
        {/* Image Carousel */}
        <motion.div
          className="relative h-64 bg-muted overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={stallData.images[currentImageIndex]}
              alt={`${stallData.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {stallData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
        {/* Content */}
        <motion.div
          className="p-6 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Basic Info */}
          <div className="bg-card rounded-3xl p-6 shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {stallData.name}
            </h2>
            <p className="text-muted-foreground mb-4">{stallData.location}</p>
            <p className="text-foreground leading-relaxed">{stallData.description}</p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl p-4 text-center shadow-card">
              <div className="w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stallData.vehiclesPerDay}</p>
              <p className="text-sm text-muted-foreground">Vehicles/day</p>
            </div>
            <div className="bg-card rounded-2xl p-4 text-center shadow-card">
              <div className="w-12 h-12 bg-success/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stallData.revenue}</p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
          </div>
          {/* Highlights */}
          <div className="bg-card rounded-3xl p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Highlights</h3>
            <div className="space-y-3">
              {stallData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <Star className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Nearby Attractions */}
          <div className="bg-card rounded-3xl p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {stallData.attractions.length} attractions found
            </h3>
            <div className="space-y-3">
              {stallData.attractions.map((attraction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CompactStallCard
                    stall={{ ...attraction, id: `att${index + 1}`, isLiked: isLiked(`att${index + 1}`) }}
                    onClick={() => handleAttractionClick(`att${index + 1}`)}
                    onHeartClick={() => handleAttractionHeartClick({ ...attraction, id: `att${index + 1}` })}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      {/* Query Modal */}
      <Dialog open={showQueryModal} onOpenChange={setShowQueryModal}>
        <DialogContent className="mx-4 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center">Do you have any questions?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Type your queries here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-32 resize-none border-input-border focus:border-primary rounded-2xl"
            />
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowQueryModal(false)}
                className="flex-1 border-input-border hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                onClick={handleQuerySubmit}
                className="flex-1 bg-primary hover:bg-primary-dark"
              >
                Post Query
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StallDetail;