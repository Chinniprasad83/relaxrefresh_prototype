import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Find Your Perfect Stall
          </h1>
          <p className="text-muted-foreground">
            Discover petrol stations and business opportunities near you
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card className="p-6 shadow-elegant border-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Find Stalls</h3>
                <p className="text-muted-foreground text-sm">
                  Search for available stall locations
                </p>
              </div>
              <Button 
                onClick={() => navigate('/stall-search')} // Changed to /stalls
                size="sm"
              >
                Search
              </Button>
            </div>
          </Card>

          <Card className="p-6 shadow-elegant border-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Near Me</h3>
                <p className="text-muted-foreground text-sm">
                  Find stalls near your location
                </p>
              </div>
              <Button 
                onClick={() => navigate('/stalls', { state: { useCurrentLocation: true } })}
                variant="secondary"
                size="sm"
              >
                Locate
              </Button>
            </div>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center shadow-elegant border-0">
            <div className="text-2xl font-bold text-primary">150+</div>
            <div className="text-sm text-muted-foreground">Available Stalls</div>
          </Card>
          <Card className="p-4 text-center shadow-elegant border-0">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Cities Covered</div>
          </Card>
        </div>
      </div>
    </div>
  );
}