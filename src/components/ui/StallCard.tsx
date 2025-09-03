import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Building2, MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

interface StallCardProps {
  stall: StallData;
  onClick?: () => void;
  className?: string;
  showActions?: boolean;
  actions?: React.ReactNode;
}

const StallCard: React.FC<StallCardProps> = ({
  stall,
  onClick,
  className,
  showActions = false,
  actions,
}) => {
  return (
    <motion.div
      className={cn(
        "bg-card rounded-2xl shadow-card overflow-hidden transition-smooth",
        onClick && "cursor-pointer hover:shadow-elevated hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
      whileHover={onClick ? { y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {/* Image */}
      <div className="relative h-32 bg-muted overflow-hidden">
        <img
          src={stall.image}
          alt={stall.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Supplier Badge */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-semibold text-foreground">{stall.supplier}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-base font-bold text-foreground mb-1">{stall.name}</h3>
          <p className="text-xs text-muted-foreground">{stall.company}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
              <Navigation className="w-3 h-3 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="text-xs font-semibold text-foreground">{stall.distance}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-success/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-3 h-3 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Space</p>
              <p className="text-xs font-semibold text-foreground">
                {stall.space || "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-warning/10 rounded-lg flex items-center justify-center">
              <MapIcon className="w-3 h-3 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Road</p>
              <p className="text-xs font-semibold text-foreground">{stall.road}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-destructive/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-3 h-3 text-destructive" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">City</p>
              <p className="text-xs font-semibold text-foreground">{stall.city}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {showActions && actions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {actions}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StallCard;