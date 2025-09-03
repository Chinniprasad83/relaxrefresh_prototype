import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import FloatingSelect from "@/components/ui/floating-select";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const states = [
    "Tamil Nadu",
    "Karnataka",
    "Kerala",
    "Andhra Pradesh",
    "Telangana",
  ];

  const cities = {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  };

  const suppliers = ["IOCL", "HPCL", "BPCL", "Reliance", "Essar"];

  const handleSearch = () => {
    if (!useCurrentLocation && (!selectedState || !selectedCity)) {
      // toast({
      //   title: "Missing Information",
      //   description: "Please select state and city or enable current location",
      //   variant: "destructive",
      // });
      return;
    }

    if (!selectedSupplier) {
      // toast({
      //   title: "Missing Supplier",
      //   description: "Please select a petroleum supplier",
      //   variant: "destructive",
      // });
      return;
    }

    // Create area query for the map
    const areaQuery = useCurrentLocation 
      ? "Current Location" 
      : `${selectedCity}, ${selectedState}`;

    // Navigate with search parameters
    navigate("/app/stalls", {
      state: {
        useCurrentLocation,
        selectedState,
        selectedCity,
        selectedSupplier,
        areaQuery
      }
    });
  };

  const isSearchEnabled = () => {
    if (useCurrentLocation && selectedSupplier) return true;
    if (!useCurrentLocation && selectedState && selectedCity && selectedSupplier) return true;
    return false;
  };

  return (
    <div className="content-area bg-background-secondary min-h-screen">
      <motion.div
        className="p-4 space-y-4 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h1
            className="text-2xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find Stall Location
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover the perfect location for your business
          </motion.p>
        </div>

        {/* Location Card */}
        <motion.div
          className="bg-card rounded-3xl p-4 shadow-card space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Use Current Location */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Use Current Location</p>
                <p className="text-xs text-muted-foreground">Enable GPS location</p>
              </div>
            </div>
            <Switch
              checked={useCurrentLocation}
              onCheckedChange={(checked) => {
                setUseCurrentLocation(checked);
                if (checked) {
                  setSelectedState("");
                  setSelectedCity("");
                }
              }}
            />
          </div>

          {/* Manual Location Selection */}
          {!useCurrentLocation && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FloatingSelect
                label="State"
                value={selectedState}
                onChange={setSelectedState}
                options={states}
                placeholder="Search state..."
              />

              <FloatingSelect
                label="City"
                value={selectedCity}
                onChange={setSelectedCity}
                options={selectedState ? cities[selectedState as keyof typeof cities] || [] : []}
                placeholder={selectedState ? "Search city..." : "Select state first"}
                disabled={!selectedState}
              />
            </motion.div>
          )}

          {/* Supplier Selection */}
          <FloatingSelect
            label="Petroleum Supplier"
            value={selectedSupplier}
            onChange={setSelectedSupplier}
            options={suppliers}
            placeholder="Select supplier"
          />

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={!isSearchEnabled()}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-2xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Locations
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;