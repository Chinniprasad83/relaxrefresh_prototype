import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";

export default function Interest() {
  const navigate = useNavigate();
  const [likedStalls, setLikedStalls] = useState([
    {
      id: 1,
      name: "HP, Thindivanam",
      address: "GST road ,NH45 Naikar Travan, THINDIVANAM",
      distance: "23 km",
      road: "GST Road, NH45",
      space: "3000 sqft",
      city: "Villupuram",
      image: "/HP_Thindivanam1.jpg",
      images: ["/HP_Thindivanam1.jpg", "/HP_Thindivanam2.jpg", "/HP_Thindivanam3.webp"],
      description: "On key national highways connecting Chennai with southern and western Tamil Nadu, as well as Bengaluru,",
      highlights: [
        "Tourist Magnet: Positioned on a major route to a tourist destination, the petrol bunks court becomes an essential stop for travelers to refuel.",
        "Strategic Location: The proximity to popular attractions, like a famous temple, lake, or historical site, provides a ready-made and consistent customer base of domestic and international tourists.",
        "Convenience & Demand: This combination of hotels, resorts, and hospitals creates a unique and powerful demand.",
      ],
      vehiclesPerDay: 42,
      revenue: "$3,779.58",
      liked: true
    },
    {
      id: 2,
      name: "Sample Station 3",
      address: "Avenue Road, Central Area, MADURAI",
      distance: "12 km",
      road: "Avenue Road",
      space: "1500 sqft",
      city: "Madurai",
      image: "/smaple_station_3.jpg",
      images: ["/smaple_station_3.jpg", "/smaple_station_4.jpg"],
      description: "Located in the heart of Madurai city, this station serves both local and tourist traffic.",
      highlights: [
        "City Center Location: Perfect for urban commuters and city travelers.",
        "High Traffic Area: Consistent customer flow throughout the day.",
        "Tourist Access: Easy access for tourists visiting Madurai attractions.",
      ],
      vehiclesPerDay: 35,
      revenue: "$2,890.45",
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
            <Card key={stall.id} className="p-4 shadow-elegant border-0 bg-white">
              <div className="flex gap-4 flex-wrap sm:flex-nowrap">
                {/* Image on the left */}
                <img
                  src={stall.image}
                  alt={stall.name}
                  className="w-28 rounded-lg object-cover shrink-0"
                  style={{ height: 'auto' }}
                />

                {/* Details and Buttons on the right */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Details */}
                  <div className="space-y-2">
                    <h3 className="text-blue-600 font-semibold text-lg">{stall.name}</h3>

                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm w-2/3">Distance</span>
                      <span className="font-semibold text-black text-sm w-2/3 truncate">{stall.distance}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm w-2/3">Road</span>
                      <span className="font-semibold text-black text-sm w-2/3 truncate">{stall.road}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm w-2/3">Space</span>
                      <span className="font-semibold text-black text-sm w-2/3 truncate">{stall.space}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm w-2/3">City</span>
                      <span className="font-semibold text-black text-sm w-2/3 truncate">{stall.city}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Buttons row - fully below the details */}
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/follow-up/${stall.id}`, { state: { stall } })}
                >
                  Follow Up
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/stall-details/${stall.id}`, { state: { stall } })}
                >
                  View Details
                </Button>
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
