import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

interface StallLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  supplier: string;
}

interface GoogleMapProps {
  currentLocation?: { lat: number; lng: number };
  stalls?: StallLocation[];
  onStallClick?: (stallId: string) => void;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  currentLocation,
  stalls = [],
  onStallClick,
  className = "",
}) => {
  // Mock Google Map component - in real implementation, use Google Maps API
  const mockStalls: StallLocation[] = [
    { id: "1", name: "HP Thindivanam", lat: 12.2345, lng: 79.6543, supplier: "HP" },
    { id: "2", name: "Indian Oil Station", lat: 12.2445, lng: 79.6643, supplier: "IOCL" },
    { id: "3", name: "BPCL Station", lat: 12.2545, lng: 79.6743, supplier: "BPCL" },
  ];

  return (
    <motion.div 
      className={`relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900 dark:to-cyan-900">
        {/* Grid Pattern for Map Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-300 dark:border-gray-600" />
            ))}
          </div>
        </div>
      </div>

      {/* Current Location */}
      {currentLocation && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75" />
          </div>
        </motion.div>
      )}

      {/* Stall Pins */}
      {mockStalls.map((stall, index) => (
        <motion.div
          key={stall.id}
          className="absolute z-20 cursor-pointer"
          style={{
            top: `${30 + (index * 15)}%`,
            left: `${25 + (index * 20)}%`,
          }}
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          onClick={() => onStallClick?.(stall.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
              <p className="text-xs font-semibold text-foreground">{stall.name}</p>
              <p className="text-xs text-muted-foreground">{stall.supplier}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <span className="text-lg font-bold text-foreground">+</span>
        </button>
        <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <span className="text-lg font-bold text-foreground">-</span>
        </button>
      </div>

      {/* Current Location Button */}
      <button className="absolute bottom-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <Navigation className="w-5 h-5 text-primary" />
      </button>

      {/* Map Loading Indicator */}
      <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-1">
        <p className="text-xs text-muted-foreground">Map View • {mockStalls.length} stalls found</p>
      </div>
    </motion.div>
  );
};

export default GoogleMap;