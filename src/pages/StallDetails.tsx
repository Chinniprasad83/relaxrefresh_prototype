import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MapPin } from "lucide-react";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { QueryModal } from "@/components/ui/query-modal";
import Header from "@/components/ui/Header";

export default function StallDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [visibleAttractions, setVisibleAttractions] = useState(2);
  
  const stallData = location.state?.stall || {
    id: 1,
    name: "HP, Thindivanam",
    address: "GST road ,NH45 Naikar Travan, THINDIVANAM",
    distance: "23 km",
    road: "GST Road, NH45",
    space: "3000 sqft",
    city: "Villupuram",
    images: ["/HP_Thindivanam1.jpg", "/HP_Thindivanam1.jpg", "/HP_Thindivanam1.jpg"],
    description: "On key national highways connecting Chennai with southern and western Tamil Nadu, as well as Bengaluru,",
    highlights: ["Highlight 1", "Highlight 2", "Highlight 3"],
    vehiclesPerDay: 42,
    revenue: "$3,779.58"
  };

  const nearbyAttractions = [
    {
      id: 1,
      name: "KFC",
      distance: "23 km",
      location: "Thiruvamattur", 
      road: "GST Road , NH45",
      city: "GST Road , NH45",
      image: "/kfc_city.jpg"
    },
    {
      id: 2,
      name: "Sri Abirameshwarar Temple",
      distance: "30 km",
      location: "GST Road , NH45",
      road: "GST Road , NH45", 
      city: "GST Road , NH45",
      image: "/SriAbirameshwararTemple.webp"
    },
    {
      id: 3,
      name: "McDonald's",
      distance: "15 km",
      location: "City Center", 
      road: "Main Road",
      city: "Chennai",
      image: "/McDonalds.jpg"
    }
  ];

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    // Only show modal when liking (not when removing like)
    if (newLikedState) {
      setShowQueryModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="space-y-6 m-4 p-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Back to search</span>
        </div>

        {/* Stall Name & Address */}
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-2xl font-bold">{stallData.name}</h1>
            <p className="text-muted-foreground">{stallData.address}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLikeClick}
            className={`p-2 rounded-full ${isLiked ? 'bg-red-100' : 'bg-white/20'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>

        {/* Image Carousel */}
        <div>
          <ImageCarousel images={stallData.images} className="mb-4" />
        </div>

        {/* Description */}
        <div>
          <p className="text-muted-foreground">{stallData.description}</p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stallData.highlights.map((highlight, index) => (
            <Card key={index} className="p-3 text-center">
              <div className="mb-2">🏠</div>
              <div className="text-xs font-medium">{highlight}</div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">{stallData.vehiclesPerDay}</div>
            <div className="text-sm text-muted-foreground">Vehicles/day</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">{stallData.revenue}</div>
            <div className="text-sm text-muted-foreground">Revenue</div>
          </Card>
        </div>

        {/* Nearby Attractions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{nearbyAttractions.length} attractions found</h2>
          
          {nearbyAttractions.slice(0, visibleAttractions).map((attraction) => (
            <Card key={attraction.id} className="p-4">
              <div className="flex gap-4">
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-16 h-16 object-cover rounded-lg bg-muted"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold">{attraction.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>Distance: <span className="text-foreground">{attraction.distance}</span></div>
                    <div>Location: <span className="text-foreground">{attraction.location}</span></div>
                    <div>Road: <span className="text-foreground">{attraction.road}</span></div>
                    <div>City: <span className="text-foreground">{attraction.city}</span></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {visibleAttractions < nearbyAttractions.length && (
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setVisibleAttractions(nearbyAttractions.length)}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Query Modal */}
      <QueryModal 
        open={showQueryModal}
        onClose={() => setShowQueryModal(false)}
        stallName={stallData.name}
      />
    </div>
  );
}