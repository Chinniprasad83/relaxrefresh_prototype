import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CompactStallCard from "@/components/ui/compact-stall-card";
import { Button } from "@/components/ui/button";
import { useInterest } from "@/hooks/use-interest";
import { useToast } from "@/hooks/use-toast";

const Interest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { likedStalls, toggleHeart } = useInterest();

  const handleViewDetails = (stallId: string) => {
    navigate(`/app/stall/${stallId}`);
  };

  const handleFollowUp = (stallId: string) => {
    navigate(`/app/follow-up/${stallId}`);
  };

  const handleHeartClick = (stall: any) => {
    toggleHeart(stall);
    toast({
      title: "Removed from interests",
      description: `${stall.name} removed from your interests`,
    });
  };

  return (
    <div className="min-h-screen bg-background-secondary"
    style={{paddingBottom: '170px'}} >
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-bold text-foreground mb-2">Your Interests</h2>
          <p className="text-muted-foreground">
            {likedStalls.length} stall{likedStalls.length !== 1 ? 's' : ''} you're interested in
          </p>
        </motion.div>

        {likedStalls.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg mb-4">No interests yet</p>
            <p className="text-muted-foreground mb-6">
              Start exploring stalls and add them to your interests
            </p>
            <Button
              onClick={() => navigate("/app")}
              className="bg-primary hover:bg-primary-dark text-white"
            >
              Explore Stalls
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {likedStalls.map((stall, index) => (
              <motion.div
                key={stall.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CompactStallCard
                  stall={stall}
                  onHeartClick={handleHeartClick}
                  showActions
                  actions={
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleFollowUp(stall.id)}
                        className="flex-1 bg-primary hover:bg-primary-dark text-white text-sm py-2"
                      >
                        Follow Up
                      </Button>
                      <Button
                        onClick={() => handleViewDetails(stall.id)}
                        variant="outline"
                        className="flex-1 border-primary text-primary hover:bg-primary hover:text-white text-sm py-2"
                      >
                        View Details
                      </Button>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interest;