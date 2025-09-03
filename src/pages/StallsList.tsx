import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, List, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompactStallCard from "@/components/ui/compact-stall-card";
import GoogleMap from "@/components/ui/google-map";
import { useInterest } from "@/hooks/use-interest";
import { mockStallData } from "@/data/mockStallData";

const StallsList = () => {
  const navigate = useNavigate();
  const { toggleHeart, isLiked } = useInterest();
  const [activeTab, setActiveTab] = useState("map");

  const handleStallClick = (stallId) => {
    navigate(`/app/stall/${stallId}`);
  };

  const handleHeartClick = (stall) => {
    toggleHeart(stall);
  };

  return (
    <div className="min-h-screen bg-background-secondary" style={{ paddingBottom: "170px" }}>
      {/* Header */}
      <motion.div
        className="sticky top-0 z-40 bg-gradient-primary text-white px-4 shadow-elevated"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">Found Stalls</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>
      {/* Tab Navigation */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Map View</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <List className="w-4 h-4" />
              <span>List View</span>
            </TabsTrigger>
          </TabsList>
          {/* Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <motion.div
              className="h-[80vh] rounded-2xl overflow-hidden shadow-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GoogleMap
                currentLocation={{ lat: 12.2345, lng: 79.6543 }}
                onStallClick={handleStallClick}
              />
            </motion.div>
          </TabsContent>
          {/* List Tab */}
          <TabsContent value="list" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                All Stalls ({mockStallData.length})
              </h3>
              <div className="space-y-3">
                {mockStallData.map((stall, index) => (
                  <motion.div
                    key={stall.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CompactStallCard
                      stall={{ ...stall, isLiked: isLiked(stall.id) }}
                      onClick={() => handleStallClick(stall.id)}
                      onHeartClick={handleHeartClick}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StallsList;