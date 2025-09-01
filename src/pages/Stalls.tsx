import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardPagination } from "@/components/ui/card-pagination";
import { ModeSelector } from "@/components/ui/mode-selector";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import MapWidget from "@/components/ui/mapwidget";

export default function Stalls() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};
  const [viewMode, setViewMode] = useState<"map" | "list">("list");

  // Stall locations with coordinates
  const stallLocations = [
    {
      id: 1,
      name: "HP, Thindivanam",
      distance: "23 km",
      road: "GST road, NH45",
      space: "3000 sqft",
      city: "Villupuram",
      image: "/HP_Thindivanam1.jpg",
      address: "GST road ,NH45 Naikar Travan, THINDIVANAM",
      images: ["/HP_Thindivanam1.jpg", "/HP_Thindivanam2.jpg", "/HP_Thindivanam3.webp"],
      description: "On key national highways connecting Chennai with southern and western Tamil Nadu, as well as Bengaluru.",
      highlights: ["Highlight 1", "Highlight 2", "Highlight 3"],
      vehiclesPerDay: 42,
      revenue: "$3,779.58",
      lat: 11.9369, // Villupuram coordinates
      lng: 79.4873,
    },
    {
      id: 2,
      name: "Indian oil",
      distance: "23 km",
      road: "GST Road, NH45",
      space: "—",
      city: "Villupuram",
      image: "/indian_oil.jpg",
      address: "GST Road, NH45, Villupuram",
      images: ["/indian_oil.jpg"],
      description: "A well-located fuel station with moderate traffic.",
      highlights: ["Highlight A", "Highlight B"],
      vehiclesPerDay: 30,
      revenue: "$2,500.00",
      lat: 11.9369,
      lng: 79.4873,
    },
    {
      id: 3,
      name: "Sample Station 3",
      distance: "12 km",
      road: "Avenue Road",
      space: "1500 sqft",
      city: "Madurai",
      image: "/smaple_station_3.jpg",
      address: "Avenue Road, Madurai",
      images: ["/smaple_station_3.jpg"],
      description: "Conveniently located in the heart of Madurai.",
      highlights: ["Highlight X", "Highlight Y"],
      vehiclesPerDay: 50,
      revenue: "$4,000.00",
      lat: 9.9252, // Madurai coordinates
      lng: 78.1198,
    },
    {
      id: 4,
      name: "Sample Station 4",
      distance: "45 km",
      road: "Ring Road",
      space: "—",
      city: "Chennai",
      image: "/smaple_station_4.jpg",
      address: "Ring Road, Chennai",
      images: ["/smaple_station_4.jpg"],
      description: "Strategically placed on Chennai's Ring Road.",
      highlights: ["Highlight P", "Highlight Q"],
      vehiclesPerDay: 60,
      revenue: "$5,000.00",
      lat: 13.0827, // Chennai coordinates
      lng: 80.2707,
    },
  ];

  const renderStallCard = (item: typeof stallLocations[0]) => (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="space-y-1">
          <div>
            <span className="text-muted-foreground">Distance:</span>{" "}
            <span className="font-medium">{item.distance}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Road:</span>{" "}
            <span className="font-medium">{item.road}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div>
            <span className="text-muted-foreground">Space:</span>{" "}
            <span className="font-medium">{item.space}</span>
          </div>
          <div>
            <span className="text-muted-foreground">City:</span>{" "}
            <span className="font-medium">{item.city}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Find Stalls</h1>
          <Button onClick={() => navigate("/stall-search/from-stalls")}>Search Location</Button>
        </div>

        <ModeSelector
          selectedMode={viewMode}
          onSelect={setViewMode}
          mapCount={stallLocations.length}
          listCount={stallLocations.length}
        />

        {viewMode === "list" ? (
          <CardPagination
            items={stallLocations}
            initialVisible={4}
            renderImage={(item) => (
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg bg-muted"
              />
            )}
            renderHeader={(item) => item.name}
            renderDetails={renderStallCard}
            onCardClick={(item) => {
              navigate(`/stall-details/${item.id}`, { state: { stall: item } });
            }}
            resultsLabel="Locations found"
          />
        ) : (
          <Card className="p-6">
            <MapWidget
              stallLocations={stallLocations}
              className="w-full h-[calc(100vh-6rem)]"
            />
          </Card>
        )}
      </div>
    </div>
  );
}