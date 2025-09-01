import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Phone } from "lucide-react";

export default function Interest() {
  const [likedStalls, setLikedStalls] = useState([
    {
      id: 1,
      name: "HP, Thindivanam",
      distance: "23 km",
      road: "GST road, NH45",
      space: "3000 sqft",
      city: "Villupuram",
      image: "/HP_Thindivanam1.jpg",
      liked: true
    },
    {
      id: 2,
      name: "Sample Station 3",
      distance: "12 km", 
      road: "Avenue Road",
      space: "1500 sqft",
      city: "Madurai",
      image: "/smaple_station_3.jpg",
      liked: true
    }
  ]);

  const toggleLike = (id: number) => {
    setLikedStalls(prev => prev.filter(stall => stall.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Your Interests</h1>
          <p className="text-muted-foreground">
            {likedStalls.length} stalls you're interested in
          </p>
        </div>

        <div className="space-y-4">
          {likedStalls.map((stall) => (
            <Card key={stall.id} className="p-4 shadow-elegant border-0">
              <div className="flex gap-4">
                <img 
                  src={stall.image} 
                  alt={stall.name}
                  className="w-20 h-20 object-cover rounded-lg bg-muted"
                  loading="lazy"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{stall.name}</h3>
                    <Button
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleLike(stall.id)}
                      className="p-1 h-auto"
                    >
                      <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{stall.distance} • {stall.road}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Space: {stall.space}</span>
                      <span>City: {stall.city}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      Contact Owner
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {likedStalls.length === 0 && (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No stalls liked yet</p>
              <Button className="mt-4" onClick={() => window.history.back()}>
                Find Stalls
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}