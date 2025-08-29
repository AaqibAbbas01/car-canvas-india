import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Car, Heart, MessageSquare, TrendingUp, Settings, Eye, Plus } from 'lucide-react';

interface UserCar {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  status: string;
  views: number;
  created_at: string;
}

interface Favorite {
  id: string;
  car_id: string;
  cars: {
    title: string;
    brand: string;
    model: string;
    price: number;
    images: string[];
  };
}

interface Inquiry {
  id: string;
  message: string;
  phone: string;
  status: string;
  created_at: string;
  cars: {
    title: string;
    brand: string;
    model: string;
  };
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [userCars, setUserCars] = useState<UserCar[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user's cars
      const { data: cars } = await supabase
        .from('cars')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch user's favorites
      const { data: favs } = await supabase
        .from('favorites')
        .select(`
          id,
          car_id,
          cars (
            title,
            brand,
            model,
            price,
            images
          )
        `)
        .eq('user_id', user.id);

      // Fetch inquiries for user's cars
      const { data: inqs } = await supabase
        .from('inquiries')
        .select(`
          id,
          message,
          phone,
          status,
          created_at,
          cars (
            title,
            brand,
            model
          )
        `)
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      setUserCars(cars || []);
      setFavorites(favs || []);
      setInquiries(inqs || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'sold': return 'bg-destructive';
      case 'inactive': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, manage your cars and activities</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => window.location.href = '/sell'}>
                <Plus className="w-4 h-4 mr-2" />
                Sell Car
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Listed Cars</p>
                    <p className="text-2xl font-bold">{userCars.length}</p>
                  </div>
                  <Car className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                    <p className="text-2xl font-bold">{favorites.length}</p>
                  </div>
                  <Heart className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Inquiries</p>
                    <p className="text-2xl font-bold">{inquiries.length}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">{userCars.reduce((sum, car) => sum + car.views, 0)}</p>
                  </div>
                  <Eye className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="my-cars" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-cars">My Cars</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            </TabsList>

            <TabsContent value="my-cars" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Listed Cars</h2>
              </div>
              {userCars.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Car className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">You haven't listed any cars yet.</p>
                    <Button onClick={() => window.location.href = '/sell'}>
                      <Plus className="w-4 h-4 mr-2" />
                      List Your First Car
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userCars.map((car) => (
                    <Card key={car.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{car.title}</CardTitle>
                          <Badge className={getStatusColor(car.status)}>
                            {car.status}
                          </Badge>
                        </div>
                        <CardDescription>
                          {car.brand} {car.model} • {car.year}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-primary">{formatPrice(car.price)}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {car.views} views
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              <h2 className="text-xl font-semibold">Your Favorite Cars</h2>
              {favorites.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No favorite cars yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((fav) => (
                    <Card key={fav.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{fav.cars.title}</CardTitle>
                        <CardDescription>
                          {fav.cars.brand} {fav.cars.model}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary">{formatPrice(fav.cars.price)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="inquiries" className="space-y-4">
              <h2 className="text-xl font-semibold">Inquiries on Your Cars</h2>
              {inquiries.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No inquiries yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <Card key={inquiry.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{inquiry.cars.title}</CardTitle>
                            <CardDescription>
                              Inquiry from buyer
                            </CardDescription>
                          </div>
                          <Badge variant={inquiry.status === 'open' ? 'default' : 'secondary'}>
                            {inquiry.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-2">{inquiry.message}</p>
                        {inquiry.phone && (
                          <p className="text-sm text-muted-foreground">Phone: {inquiry.phone}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}