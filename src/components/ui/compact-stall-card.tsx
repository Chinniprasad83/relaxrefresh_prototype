import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Building2, MapIcon, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

interface CompactStallCardProps {
  stall: StallData;
  onClick?: () => void;
  onHeartClick?: (stall: StallData) => void;
  className?: string;
  showActions?: boolean;
  actions?: React.ReactNode;
}

const CompactStallCard: React.FC<CompactStallCardProps> = ({
  stall,
  onClick,
  onHeartClick,
  className,
  showActions = false,
  actions,
}) => {
  return (
    <motion.div
      className={cn(
        "bg-card rounded-2xl shadow-card overflow-hidden transition-smooth border border-border/5",
        onClick && "cursor-pointer hover:shadow-elevated hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
      whileHover={onClick ? { y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      <div className="p-3 flex items-center space-x-3">
        {/* Image */}
        <div className="relative flex-shrink-0">
          <img
            src={stall.image}
            alt={stall.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5">
            <span className="text-[8px] font-semibold text-foreground">{stall.supplier}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">{stall.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{stall.company}</p>
            </div>
            
            {/* Heart Button */}
            {onHeartClick && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onHeartClick(stall);
                }}
                className="p-1 h-auto hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Heart 
                  className={cn(
                    "w-4 h-4 transition-colors",
                    stall.isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  )} 
                />
              </Button>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className="flex items-center space-x-1">
              <Navigation className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="text-xs font-medium text-foreground truncate">{stall.distance}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Building2 className="w-3 h-3 text-success flex-shrink-0" />
              <span className="text-xs font-medium text-foreground truncate">
                {stall.space || "—"}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <MapIcon className="w-3 h-3 text-warning flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">{stall.road}</span>
            </div>

            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-destructive flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">{stall.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && actions && (
        <motion.div
          className="px-3 pb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CompactStallCard;