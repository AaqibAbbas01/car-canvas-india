import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List, MapPin, Fuel, Calendar, Settings, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

interface CarListing {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  year: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  location: string;
  image: string;
  isVerified: boolean;
  isPremium: boolean;
  views: number;
  kmDriven: number;
  ownerType: string;
  dealer: {
    name: string;
    rating: number;
    location: string;
  };
}

const carListings: CarListing[] = [
  {
    id: "1",
    name: "Maruti Suzuki Swift VDI",
    price: 425000,
    originalPrice: 450000,
    year: 2020,
    mileage: "22.3 kmpl",
    fuelType: "Diesel",
    transmission: "Manual",
    location: "Mumbai, Maharashtra",
    image: "/placeholder.svg",
    isVerified: true,
    isPremium: true,
    views: 1245,
    kmDriven: 35000,
    ownerType: "First Owner",
    dealer: {
      name: "Mumbai Auto Center",
      rating: 4.5,
      location: "Andheri, Mumbai"
    }
  },
  // Add more listings...
];

const CarListings = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Used Cars for Sale</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="year-new">Year: Newest First</SelectItem>
                  <SelectItem value="year-old">Year: Oldest First</SelectItem>
                  <SelectItem value="mileage">Best Mileage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000000}
                    step={50000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{(priceRange[0] / 100000).toFixed(1)}L</span>
                    <span>₹{(priceRange[1] / 100000).toFixed(1)}L</span>
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-2">
                    {['Maruti Suzuki', 'Hyundai', 'Honda', 'Tata', 'Mahindra'].map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox 
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand));
                            }
                          }}
                        />
                        <label htmlFor={brand} className="text-sm">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Fuel Type</h3>
                  <div className="space-y-2">
                    {['Petrol', 'Diesel', 'CNG', 'Electric'].map((fuel) => (
                      <div key={fuel} className="flex items-center space-x-2">
                        <Checkbox id={fuel} />
                        <label htmlFor={fuel} className="text-sm">{fuel}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Transmission</h3>
                  <div className="space-y-2">
                    {['Manual', 'Automatic', 'CVT'].map((transmission) => (
                      <div key={transmission} className="flex items-center space-x-2">
                        <Checkbox id={transmission} />
                        <label htmlFor={transmission} className="text-sm">{transmission}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Car Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {carListings.length} cars out of 50,000+ available
              </p>
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
              {carListings.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`overflow-hidden car-card-hover ${car.isPremium ? 'dealer-premium' : ''}`}>
                    <div className={`${viewMode === 'list' ? 'md:flex' : ''}`}>
                      <div className={`relative ${viewMode === 'list' ? 'md:w-80' : ''}`}>
                        <img
                          src={car.image}
                          alt={car.name}
                          className={`w-full object-cover ${viewMode === 'list' ? 'h-48 md:h-full' : 'h-48'}`}
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
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <CardContent className="p-4 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{car.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {car.views}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="price-highlight text-2xl font-bold">
                            ₹{(car.price / 100000).toFixed(2)}L
                          </span>
                          {car.originalPrice && (
                            <span className="text-muted-foreground line-through text-sm">
                              ₹{(car.originalPrice / 100000).toFixed(2)}L
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {car.year}
                          </div>
                          <div className="flex items-center gap-1">
                            <Fuel className="h-4 w-4" />
                            {car.mileage}
                          </div>
                          <div className="flex items-center gap-1">
                            <Settings className="h-4 w-4" />
                            {car.transmission}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {car.kmDriven.toLocaleString()} km
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline">{car.fuelType}</Badge>
                          <Badge variant="outline">{car.ownerType}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          {car.location}
                        </div>
                        
                        {/* Dealer Info */}
                        <div className="border-t pt-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{car.dealer.name}</p>
                              <p className="text-xs text-muted-foreground">{car.dealer.location}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="flex text-yellow-400">
                                {'★'.repeat(Math.floor(car.dealer.rating))}
                              </div>
                              <span className="text-sm">{car.dealer.rating}</span>
                            </div>
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
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button size="lg" variant="outline">
                Load More Cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListings;