import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Share2, Phone, MessageCircle, MapPin, Calendar, Fuel, Settings, Users, Gauge, Shield, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const CarDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const carImages = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];

  const carDetails = {
    name: "Maruti Suzuki Swift VDI",
    price: 425000,
    originalPrice: 450000,
    year: 2020,
    mileage: "22.3 kmpl",
    fuelType: "Diesel",
    transmission: "Manual",
    location: "Mumbai, Maharashtra",
    kmDriven: 35000,
    ownerType: "First Owner",
    isVerified: true,
    isPremium: true,
    views: 1245,
    registrationState: "Maharashtra",
    insurance: "Comprehensive",
    color: "Pearl Arctic White",
    seats: 5,
    engineCC: 1248,
    dealer: {
      name: "Mumbai Auto Center",
      rating: 4.5,
      reviews: 234,
      location: "Andheri, Mumbai",
      phone: "+91 98765 43210",
      verified: true,
      yearsInBusiness: 8
    }
  };

  const specifications = {
    "Engine & Performance": {
      "Engine Type": "1.2L K-Series Petrol",
      "Max Power": "89 bhp @ 6000 rpm",
      "Max Torque": "113 Nm @ 4200 rpm",
      "Displacement": "1197 cc",
      "No. of Cylinders": "4",
      "Turbo Charger": "No"
    },
    "Dimensions & Weight": {
      "Length": "3845 mm",
      "Width": "1735 mm",
      "Height": "1530 mm",
      "Wheelbase": "2450 mm",
      "Kerb Weight": "860 kg",
      "Boot Space": "268 litres"
    },
    "Comfort & Convenience": {
      "Air Conditioner": "Yes",
      "Heater": "Yes",
      "Power Steering": "Yes",
      "Power Windows": "Front & Rear",
      "Remote Central Locking": "Yes",
      "Anti Lock Braking System": "Yes"
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold">{carDetails.name}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className={isFavorited ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-current" : ""}`} />
                {isFavorited ? "Saved" : "Save"}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={carImages[currentImageIndex]}
                    alt={`${carDetails.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  
                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white rounded-md px-3 py-1 text-sm">
                    {currentImageIndex + 1} / {carImages.length}
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {carDetails.isVerified && (
                      <Badge className="verified-badge">
                        ✓ Verified
                      </Badge>
                    )}
                    {carDetails.isPremium && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        Premium Listing
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {carImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-md border-2 overflow-hidden ${
                        index === currentImageIndex ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Car Information Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="inspection">Inspection</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Year:</span>
                            <span className="font-medium">{carDetails.year}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Gauge className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">KM Driven:</span>
                            <span className="font-medium">{carDetails.kmDriven.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Fuel className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Fuel:</span>
                            <span className="font-medium">{carDetails.fuelType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Transmission:</span>
                            <span className="font-medium">{carDetails.transmission}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Owners:</span>
                            <span className="font-medium">{carDetails.ownerType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Registration:</span>
                            <span className="font-medium">{carDetails.registrationState}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Additional Info</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Insurance:</span>
                            <span className="font-medium">{carDetails.insurance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Color:</span>
                            <span className="font-medium">{carDetails.color}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Seats:</span>
                            <span className="font-medium">{carDetails.seats}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Engine:</span>
                            <span className="font-medium">{carDetails.engineCC} cc</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="specifications" className="mt-6">
                    <div className="space-y-6">
                      {Object.entries(specifications).map(([category, specs]) => (
                        <div key={category}>
                          <h3 className="text-lg font-semibold mb-4">{category}</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(specs).map(([spec, value]) => (
                              <div key={spec} className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">{spec}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Safety Features</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-success" />
                            Dual Airbags
                          </li>
                          <li className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-success" />
                            ABS with EBD
                          </li>
                          <li className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-success" />
                            Central Locking
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Comfort Features</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-success rounded-full" />
                            Power Steering
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-success rounded-full" />
                            Air Conditioning
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-success rounded-full" />
                            Power Windows
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="inspection" className="mt-6">
                    <div className="space-y-6">
                      <div className="bg-success/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-5 w-5 text-success" />
                          <h3 className="font-semibold text-success">Inspection Completed</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This vehicle has undergone a comprehensive 200-point inspection by certified mechanics.
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Engine & Performance</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Engine Condition</span>
                              <Badge variant="outline" className="text-success border-success">Good</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Transmission</span>
                              <Badge variant="outline" className="text-success border-success">Excellent</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Exterior & Interior</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Body Condition</span>
                              <Badge variant="outline" className="text-success border-success">Good</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Interior Condition</span>
                              <Badge variant="outline" className="text-success border-success">Excellent</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Contact Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="price-highlight text-3xl font-bold">
                      ₹{(carDetails.price / 100000).toFixed(2)}L
                    </span>
                    {carDetails.originalPrice && (
                      <span className="text-muted-foreground line-through text-lg">
                        ₹{(carDetails.originalPrice / 100000).toFixed(2)}L
                      </span>
                    )}
                  </div>
                  {carDetails.originalPrice && (
                    <p className="text-success text-sm font-medium">
                      You save ₹{((carDetails.originalPrice - carDetails.price) / 1000).toFixed(0)}K
                    </p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Dealer
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Get Best Price</p>
                  <p className="font-medium text-foreground">+91 98765 43210</p>
                </div>
              </CardContent>
            </Card>

            {/* Dealer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Dealer Information</span>
                  {carDetails.dealer.verified && (
                    <Badge className="verified-badge">✓ Verified</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{carDetails.dealer.name}</h3>
                    <p className="text-sm text-muted-foreground">{carDetails.dealer.location}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(carDetails.dealer.rating))}
                    </div>
                    <span className="font-medium">{carDetails.dealer.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({carDetails.dealer.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-muted-foreground">
                      {carDetails.dealer.yearsInBusiness} years in business
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    View All Cars from This Dealer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Financing Options */}
            <Card>
              <CardHeader>
                <CardTitle>Financing Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Loan Available</h4>
                    <p className="text-sm text-blue-700">
                      Get loan up to ₹{(carDetails.price * 0.8 / 100000).toFixed(1)}L
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      EMI starting from ₹{Math.round(carDetails.price * 0.8 / 1200)}/month
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Check Loan Eligibility
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;