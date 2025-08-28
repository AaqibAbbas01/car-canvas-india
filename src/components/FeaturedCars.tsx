import { motion } from "framer-motion";
import { Heart, MapPin, Fuel, Calendar, Settings, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CarData {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  year: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  location: string;
  image: string;
  isVerified: boolean;
  isPremium: boolean;
  views: number;
}

const featuredCars: CarData[] = [
  {
    id: "1",
    name: "Maruti Suzuki Swift VDI",
    price: "₹4,25,000",
    originalPrice: "₹4,50,000",
    year: 2020,
    mileage: "22.3 kmpl",
    fuelType: "Diesel",
    transmission: "Manual",
    location: "Mumbai, Maharashtra",
    image: "/placeholder.svg",
    isVerified: true,
    isPremium: true,
    views: 1245
  },
  {
    id: "2",
    name: "Hyundai i20 Sportz",
    price: "₹6,75,000",
    year: 2021,
    mileage: "20.4 kmpl",
    fuelType: "Petrol",
    transmission: "Automatic",
    location: "Delhi, NCR",
    image: "/placeholder.svg",
    isVerified: true,
    isPremium: false,
    views: 892
  },
  {
    id: "3",
    name: "Honda City VX",
    price: "₹8,50,000",
    originalPrice: "₹9,00,000",
    year: 2022,
    mileage: "18.5 kmpl",
    fuelType: "Petrol",
    transmission: "CVT",
    location: "Bangalore, Karnataka",
    image: "/placeholder.svg",
    isVerified: true,
    isPremium: true,
    views: 2156
  },
  {
    id: "4",
    name: "Tata Nexon XZ+",
    price: "₹7,25,000",
    year: 2021,
    mileage: "17.6 kmpl",
    fuelType: "Petrol",
    transmission: "Manual",
    location: "Pune, Maharashtra",
    image: "/placeholder.svg",
    isVerified: true,
    isPremium: false,
    views: 1567
  }
];

const CarCard = ({ car, index }: { car: CarData; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className={`overflow-hidden car-card-hover ${car.isPremium ? 'dealer-premium' : ''}`}>
        <div className="relative">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-48 object-cover"
          />
          
          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {car.isVerified && (
              <Badge className="verified-badge">
                ✓ Verified
              </Badge>
            )}
            {car.isPremium && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Premium
              </Badge>
            )}
          </div>
          
          {/* Heart Icon */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full"
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          {/* Price Overlay */}
          {car.originalPrice && (
            <div className="absolute bottom-3 right-3 bg-destructive text-destructive-foreground rounded-md px-2 py-1 text-sm font-semibold">
              Save ₹{parseInt(car.originalPrice.replace(/[₹,]/g, '')) - parseInt(car.price.replace(/[₹,]/g, ''))}
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {car.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              {car.views}
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="price-highlight text-2xl font-bold">
              {car.price}
            </span>
            {car.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                {car.originalPrice}
              </span>
            )}
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {car.year}
              </div>
              <div className="flex items-center gap-1">
                <Fuel className="h-4 w-4" />
                {car.mileage}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                {car.transmission}
              </div>
              <Badge variant="outline">
                {car.fuelType}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {car.location}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1" size="sm">
              View Details
            </Button>
            <Button variant="outline" size="sm">
              Contact Dealer
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const FeaturedCars = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredCars.map((car, index) => (
        <CarCard key={car.id} car={car} index={index} />
      ))}
    </div>
  );
};