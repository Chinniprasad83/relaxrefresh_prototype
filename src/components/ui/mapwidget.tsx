import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type StallLocation = {
  id: number;
  name: string;
  distance: string;
  road: string;
  space: string;
  city: string;
  image: string;
  address: string;
  images: string[];
  description: string;
  highlights: string[];
  vehiclesPerDay: number;
  revenue: string;
  lat?: number;
  lng?: number;
};

type MapWidgetProps = {
  stallLocations: StallLocation[];
  zoom?: number;
  radius?: number;
  className?: string;
};

export default function MapWidget({
  stallLocations,
  zoom = 12,
  radius = 50,
  className,
}: MapWidgetProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};
  const { state, city, supplier, useCurrentLocation } = searchParams;

  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(useCurrentLocation || false);

  // Mock coordinates for cities
  const cityCoordinates: Record<string, { lat: number; lng: number }> = {
    Villupuram: { lat: 11.9369, lng: 79.4873 },
    Madurai: { lat: 9.9252, lng: 78.1198 },
    Chennai: { lat: 13.0827, lng: 80.2707 },
  };

  // Default to HP Thindivanam coordinates
  const defaultLocation = {
    lat: 11.9369,
    lng: 79.4873,
  };

  // Request user's current location
  useEffect(() => {
    if (useCurrentLocation && navigator.geolocation && !userPos) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPos({ lat: position.coords.latitude, lng: position.coords.longitude });
          setPermissionDenied(false);
          setShowPrompt(false);
        },
        (err) => {
          setPermissionDenied(true);
          setUserPos(defaultLocation);
          setShowPrompt(true);
          console.warn("Geolocation error:", err);
        },
        { enableHighAccuracy: false, maximumAge: 1000 * 60 * 5, timeout: 5000 }
      );
    } else if (useCurrentLocation && !navigator.geolocation) {
      setPermissionDenied(true);
      setUserPos(defaultLocation);
      setShowPrompt(true);
    } else if (!useCurrentLocation) {
      setUserPos(defaultLocation);
      setShowPrompt(false);
    }
  }, [useCurrentLocation]);

  // Handle "Allow location" button click
  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPos({ lat: position.coords.latitude, lng: position.coords.longitude });
          setPermissionDenied(false);
          setShowPrompt(false);
        },
        (err) => {
          setPermissionDenied(true);
          setUserPos(defaultLocation);
          setShowPrompt(true);
          console.warn("Geolocation error:", err);
        },
        { enableHighAccuracy: false, maximumAge: 1000 * 60 * 5, timeout: 5000 }
      );
    } else {
      setPermissionDenied(true);
      setUserPos(defaultLocation);
      setShowPrompt(true);
    }
  };

  // Determine map center and query
  let centerLat: number = userPos?.lat || defaultLocation.lat;
  let centerLng: number = userPos?.lng || defaultLocation.lng;
  let mapQuery = "petrol bunks"; // Generic query to show all nearby petrol bunks

  if (!useCurrentLocation && city && cityCoordinates[city]) {
    centerLat = cityCoordinates[city].lat;
    centerLng = cityCoordinates[city].lng;
    mapQuery = supplier
      ? `${supplier} petrol bunks near ${city}`
      : `petrol bunks near ${city}`;
  } else if (state && !city) {
    mapQuery = supplier
      ? `${supplier} petrol bunks in ${state}`
      : `petrol bunks in ${state}`;
  } else if (useCurrentLocation && userPos) {
    mapQuery = supplier
      ? `${supplier} petrol bunks near me`
      : `petrol bunks near me`;
  }

  mapQuery = radius ? `${mapQuery} within ${Math.min(radius, 50)} km` : mapQuery;

  // Map URL
  const centerParam = `&center=${centerLat},${centerLng}`;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${zoom}&output=embed${centerParam}`;

  // Find HP Thindivanam stall for navigation
  const hpThindivanam = stallLocations.find(
    (stall) => stall.name === "HP, Thindivanam"
  );

  // Handle map click
  const handleMapClick = () => {
    if (hpThindivanam) {
      navigate(`/stall-details/${hpThindivanam.id}`, {
        state: { stall: hpThindivanam },
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {showPrompt && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 pointer-events-auto">
          <Card className="pointer-events-auto bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="text-blue-500 text-center mb-4 text-base font-medium">
              This app needs your location to show nearby petrol bunks.
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleAllowLocation}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Allow location
              </Button>
            </div>
            {permissionDenied && (
              <div className="text-red-500 text-center mt-4 text-sm font-medium">
                Location access denied or unavailable — please enable location in your browser
              </div>
            )}
          </Card>
        </div>
      )}
      <div className="relative w-full h-full">
        {/* Transparent overlay for navigation clicks */}
        <div
          className="absolute inset-0 z-10 pointer-events-auto"
          onClick={handleMapClick}
          style={{ opacity: 0 }} // Transparent but clickable
        />
        <iframe
          title="Map showing stall locations"
          src={src}
          loading="lazy"
          className="border-0 w-full h-full block pointer-events-auto"
          allowFullScreen
        />
      </div>
      {useCurrentLocation && !userPos && !showPrompt && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p>Waiting for location...</p>
        </div>
      )}
    </div>
  );
}