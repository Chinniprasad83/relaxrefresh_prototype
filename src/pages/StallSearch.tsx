import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/ui/Header";

type Props = {
  showBackToStall?: boolean;
};

export default function StallSearch({ showBackToStall = false }: Props) {
  const navigate = useNavigate();
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [stateInput, setStateInput] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [showStateAutocomplete, setShowStateAutocomplete] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showCityAutocomplete, setShowCityAutocomplete] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const stateInputRef = useRef<HTMLInputElement>(null);

  const indianStates = ["Tamil Nadu", "Karnataka", "Maharashtra"];
  const citiesByState: Record<string, string[]> = {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangalore"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  };
  const petroleumSuppliers = ["IOCL", "HPCL", "BPCL", "Reliance", "Essar"];

  const filteredStates = indianStates.filter(s => 
    s.toLowerCase().includes(stateInput.toLowerCase())
  );
  const filteredCities = selectedState && citiesByState[selectedState]
    ? citiesByState[selectedState].filter(c => 
        c.toLowerCase().includes(cityInput.toLowerCase())
      )
    : [];

  const stateCityDisabled = useCurrentLocation;

  const handleSearch = () => {
    if (selectedSupplier) {
      navigate('/stalls', {
        state: { 
          state: selectedState, 
          city: selectedCity, 
          supplier: selectedSupplier,
          useCurrentLocation 
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {showBackToStall && <Header />}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {showBackToStall ? (
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/stalls')}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Back to Stall</h1>
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-foreground">Find Stall Location</h1>
          )}
        </div>

        <Card className="p-6 bg-violet-300/5">
          <div className="space-y-6">
            {/* Current Location Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="current-location">Use Current Location</Label>
              <Switch
                id="current-location"
                checked={useCurrentLocation}
                onCheckedChange={(checked) => {
                  setUseCurrentLocation(checked);
                  if (checked) {
                    setStateInput("");
                    setSelectedState("");
                    setCityInput("");
                    setSelectedCity("");
                  }
                }}
              />
            </div>

            <div className="text-center text-muted-foreground">
              <span>(or)</span>
            </div>

            {/* State and City Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="state-input">State</Label>
                <Input
                  id="state-input"
                  ref={stateInputRef}
                  value={stateInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setStateInput(value);
                    setSelectedState("");
                    setShowStateAutocomplete(true);
                    if (value === "") {
                      setCityInput("");
                      setSelectedCity("");
                    }
                  }}
                  onFocus={() => setShowStateAutocomplete(true)}
                  onBlur={() => setTimeout(() => setShowStateAutocomplete(false), 100)}
                  placeholder="Search state..."
                  disabled={stateCityDisabled}
                  className="border-2 border-violet-300 focus:border-violet-400 focus:ring-1 focus:ring-violet-300"
                />
                {stateInput && showStateAutocomplete && (
                  <div className="absolute z-10 w-full bg-background border border-violet-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredStates.map((state) => (
                      <div
                        key={state}
                        className="p-2 hover:bg-muted cursor-pointer"
                        onMouseDown={() => {
                          setSelectedState(state);
                          setStateInput(state);
                          setShowStateAutocomplete(false);
                        }}
                      >
                        {state}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="city-input">City</Label>
                <Input
                  id="city-input"
                  value={cityInput}
                  onChange={(e) => {
                    setCityInput(e.target.value);
                    setSelectedCity("");
                    setShowCityAutocomplete(true);
                  }}
                  onFocus={() => setShowCityAutocomplete(true)}
                  onBlur={() => setTimeout(() => setShowCityAutocomplete(false), 100)}
                  placeholder={selectedState ? "Search city..." : "Select state first"}
                  disabled={stateCityDisabled || !selectedState}
                  className="border-2 border-violet-300 focus:border-violet-400 focus:ring-1 focus:ring-violet-300"
                />
                {cityInput && selectedState && showCityAutocomplete && (
                  <div className="absolute z-10 w-full bg-background border border-violet-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredCities.map((city) => (
                      <div
                        key={city}
                        className="p-2 hover:bg-muted cursor-pointer"
                        onMouseDown={() => {
                          setSelectedCity(city);
                          setCityInput(city);
                          setShowCityAutocomplete(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Petroleum Supplier */}
            <div className="space-y-2">
              <Label>Petroleum Supplier</Label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger className="border-2 border-violet-500 focus:border-violet-400 focus:ring-1 focus:ring-violet-300">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent className="border-2 border-violet-500">
                  {petroleumSuppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              disabled={!selectedSupplier}
              className="w-full"
              size="lg"
            >
              Search Locations
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
