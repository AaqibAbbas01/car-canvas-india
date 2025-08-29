import { motion } from "framer-motion";
import { Search, MapPin, Car, Star, Verified, ArrowRight, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { CarShowcase } from "@/components/CarShowcase";
import { FeaturedCars } from "@/components/FeaturedCars";
import { TrustIndicators } from "@/components/TrustIndicators";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Car className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gradient">CarCanvas</span>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/cars" className="text-foreground hover:text-primary transition-colors">Buy Cars</a>
              <a href="/sell" className="text-foreground hover:text-primary transition-colors">Sell Car</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Dealers</a>
              <a href="/finance" className="text-foreground hover:text-primary transition-colors">Finance</a>
              {user ? (
                <>
                  <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>Dashboard</Button>
                  <Button onClick={() => window.location.href = '/sell'}>Sell Your Car</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="mr-2" onClick={() => window.location.href = '/auth'}>Login</Button>
                  <Button onClick={() => window.location.href = '/auth'}>Sign Up</Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Your Perfect
                <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                  Second-Hand Car
                </span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Discover thousands of verified cars from trusted dealers across India. 
                Get the best deals with complete transparency.
              </p>
              
              {/* Advanced Search */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <Select>
                    <SelectTrigger className="bg-white text-black">
                      <SelectValue placeholder="Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="tata">Tata</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger className="bg-white text-black">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-3">Under ₹3 Lakh</SelectItem>
                      <SelectItem value="3-5">₹3-5 Lakh</SelectItem>
                      <SelectItem value="5-10">₹5-10 Lakh</SelectItem>
                      <SelectItem value="10+">Above ₹10 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Your City" 
                      className="pl-10 bg-white text-black"
                    />
                  </div>
                  
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => window.location.href = '/cars'}>
                    <Search className="mr-2 h-4 w-4" />
                    Search Cars
                  </Button>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <CarShowcase />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Cars</h2>
            <p className="text-xl text-muted-foreground">
              Handpicked premium vehicles from verified dealers
            </p>
          </motion.div>
          
          <FeaturedCars />
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="group" onClick={() => window.location.href = '/cars'}>
              View All Cars
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose CarCanvas?</h2>
            <p className="text-xl text-muted-foreground">
              Your trusted partner in finding the perfect second-hand car
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Verified,
                title: "Verified Dealers",
                description: "All our dealers are verified and trusted partners with proven track records."
              },
              {
                icon: Car,
                title: "Quality Assured",
                description: "Every car undergoes thorough inspection to ensure quality and reliability."
              },
              {
                icon: Star,
                title: "Best Prices",
                description: "Get the best deals with transparent pricing and no hidden charges."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Quick Actions</h2>
            <p className="text-xl text-muted-foreground">
              Whether you're buying or selling, we've got you covered
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Car className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sell Your Car</h3>
                  <p className="text-muted-foreground mb-4">Get the best price for your car with our easy listing process</p>
                  <Button onClick={() => window.location.href = user ? '/sell' : '/auth'}>
                    {user ? 'Sell Now' : 'Login to Sell'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">My Account</h3>
                  <p className="text-muted-foreground mb-4">Manage your listings, favorites, and inquiries</p>
                  <Button onClick={() => window.location.href = user ? '/dashboard' : '/auth'}>
                    {user ? 'Dashboard' : 'Sign Up'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Car Finance</h3>
                  <p className="text-muted-foreground mb-4">Get pre-approved loans with competitive interest rates</p>
                  <Button onClick={() => window.location.href = '/finance'}>
                    Calculate EMI
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">CarCanvas</span>
              </div>
              <p className="text-gray-400">
                India's trusted platform for buying and selling second-hand cars.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Buy Cars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell Car</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dealers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Finance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CarCanvas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;