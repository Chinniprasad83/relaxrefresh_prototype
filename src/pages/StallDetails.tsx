import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { QueryModal } from "@/components/ui/query-modal";
import Header from "@/components/ui/Header";

export default function StallDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);

  const stallData = location.state?.stall || {
    id: 1,
    name: "HP, Thindivanam",
    address: "GST road ,NH45 Naikar Travan, THINDIVANAM",
    distance: "23 km",
    road: "GST Road, NH45",
    space: "3000 sqft",
    city: "Villupuram",
    images: ["/HP_Thindivanam1.jpg", "/HP_Thindivanam1.jpg", "/HP_Thindivanam1.jpg"],
    description:
      "On key national highways connecting Chennai with southern and western Tamil Nadu, as well as Bengaluru,",
    highlights: [
      "Tourist Magnet: Positioned on a major route to a tourist destination, the petrol bunks court becomes an essential stop for travelers to refuel.",
      "Strategic Location: The proximity to popular attractions, like a famous temple, lake, or historical site, provides a ready-made and consistent customer base of domestic and international tourists.",
      "Convenience & Demand: This combination of hotels, resorts, and hospitals creates a unique and powerful demand.",
    ],
    vehiclesPerDay: 42,
    revenue: "$3,779.58",
  };

  const nearbyAttractions = [
    {
      id: 1,
      name: "KFC",
      distance: "23 km",
      location: "Thiruvamattur",
      road: "GST Road , NH45",
      city: "GST Road , NH45",
      image: "/kfc_city.jpg",
      space: "2000 sqft",
    },
    {
      id: 2,
      name: "Sri Abirameshwarar",
      distance: "30 km",
      location: "GST Road , NH45",
      road: "GST Road , NH45",
      city: "GST Road , NH45",
      image: "/SriAbirameshwararTemple.webp",
      space: "2000 sqft",
    },
    {
      id: 3,
      name: "McDonald's",
      distance: "15 km",
      location: "City Center",
      road: "Main Road",
      city: "Chennai",
      image: "/McDonalds.jpg",
      space: "2000 sqft",
    },
  ];

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    if (newLikedState) setShowQueryModal(true);
  };

  return (
    <div className="min-h-screen bg-background" style={{ paddingTop: '0' }}>
      <Header />
      <div className="space-y-6 p-4">{/* Debug: Stall ID from URL: {id} */}
        {/* Back Arrow */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Stall Name & Address */}
        <div className="flex items-center justify-between space-y-2"
        style={{marginTop: '0px'}}>
          <div>
            <h1 className="text-2xl font-bold">{stallData.name}</h1>
            <p className="text-muted-foreground">{stallData.address}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLikeClick}
            className={`p-2 rounded-full ${
              isLiked ? "bg-red-100" : "bg-white/20"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </Button>
        </div>

        {/* Image Carousel */}
        <ImageCarousel images={stallData.images} className="mb-4" />

        {/* Description */}
        <p className="text-muted-foreground">{stallData.description}</p>

        {/* Highlights */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Highlights</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
            {stallData.highlights.map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center bg bg-violet-200/50">
            <div className="text-2xl font-bold text-violet-600">{stallData.vehiclesPerDay}</div>
            <div className="text-sm text-muted-foreground">Vehicles/day</div>
          </Card>
          <Card className="p-4 text-center bg-pink-200/50">
            <div className="text-2xl font-bold text-pink-600">{stallData.revenue}</div>
            <div className="text-sm text-muted-foreground">Revenue</div>
          </Card>
        </div>

      {/* Nearby Attractions */}
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    {nearbyAttractions.length} attractions found
  </h2>

  {nearbyAttractions.map((attraction) => (
   <Card key={attraction.id} className="p-4 shadow-elegant border-0 bg-white">
              <div className="flex gap-4 flex-wrap sm:flex-nowrap">
                {/* Image on the left */}
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-28 rounded-lg object-cover shrink-0"
                  style={{ height: 'auto' }}
                />

                {/* Details and Buttons on the right */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Details */}
                  <div className="space-y-2">
                    <h3 className="text-blue-600 font-semibold">{attraction.name}</h3>

                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm w-2/3">Distance</span>
                      <span className="font-semibold text-black text-sm w-2/3 truncate">{attraction.distance}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm w-2/3">Road</span>
                      <span className="font-semibold text-black text-sm w-2/3 truncate">{attraction.road}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm w-2/3">Space</span>
                      <span className="font-semibold text-black text-sm w-2/3 truncate">{attraction.space}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm w-2/3">City</span>
                      <span className="font-semibold text-black text-sm w-2/3 truncate">{attraction.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
  ))}
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
