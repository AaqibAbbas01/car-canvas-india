import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Car, Upload, ArrowLeft } from 'lucide-react';

const brands = ['Maruti Suzuki', 'Hyundai', 'Tata', 'Honda', 'Toyota', 'Mahindra', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi'];
const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
const transmissions = ['Manual', 'Automatic', 'CVT'];
const conditions = ['Excellent', 'Good', 'Fair'];

export default function SellCar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    variant: '',
    year: '',
    fuel_type: '',
    transmission: '',
    mileage: '',
    price: '',
    color: '',
    condition: '',
    ownership: '1',
    registration_state: '',
    registration_city: '',
    description: '',
    features: ''
  });

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
      
      const { error } = await supabase
        .from('cars')
        .insert({
          seller_id: user.id,
          title: formData.title,
          brand: formData.brand,
          model: formData.model,
          variant: formData.variant || null,
          year: parseInt(formData.year),
          fuel_type: formData.fuel_type,
          transmission: formData.transmission,
          mileage: parseInt(formData.mileage),
          price: parseInt(formData.price),
          color: formData.color || null,
          condition: formData.condition,
          ownership: parseInt(formData.ownership),
          registration_state: formData.registration_state,
          registration_city: formData.registration_city,
          description: formData.description || null,
          features: featuresArray,
          images: [] // TODO: Add image upload functionality
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Car Listed Successfully!",
        description: "Your car has been added to the marketplace.",
      });

      // Reset form
      setFormData({
        title: '',
        brand: '',
        model: '',
        variant: '',
        year: '',
        fuel_type: '',
        transmission: '',
        mileage: '',
        price: '',
        color: '',
        condition: '',
        ownership: '1',
        registration_state: '',
        registration_city: '',
        description: '',
        features: ''
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to list your car. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Sell Your Car</h1>
              <p className="text-muted-foreground">List your car on CarSale India</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Car Details
              </CardTitle>
              <CardDescription>
                Provide accurate details about your car to attract genuine buyers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Car Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., 2020 Maruti Swift VDI"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Select name="brand" onValueChange={(value) => handleSelectChange('brand', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      name="model"
                      placeholder="e.g., Swift"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variant">Variant</Label>
                    <Input
                      id="variant"
                      name="variant"
                      placeholder="e.g., VDI"
                      value={formData.variant}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      min="1990"
                      max="2024"
                      placeholder="2020"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuel_type">Fuel Type *</Label>
                    <Select name="fuel_type" onValueChange={(value) => handleSelectChange('fuel_type', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map(fuel => (
                          <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission *</Label>
                    <Select name="transmission" onValueChange={(value) => handleSelectChange('transmission', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissions.map(trans => (
                          <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage (km) *</Label>
                    <Input
                      id="mileage"
                      name="mileage"
                      type="number"
                      min="0"
                      placeholder="50000"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      placeholder="500000"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      name="color"
                      placeholder="e.g., White"
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select name="condition" onValueChange={(value) => handleSelectChange('condition', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map(cond => (
                          <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownership">Ownership</Label>
                    <Select name="ownership" value={formData.ownership} onValueChange={(value) => handleSelectChange('ownership', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Owner</SelectItem>
                        <SelectItem value="2">2nd Owner</SelectItem>
                        <SelectItem value="3">3rd Owner</SelectItem>
                        <SelectItem value="4">4+ Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registration_state">Registration State *</Label>
                    <Input
                      id="registration_state"
                      name="registration_state"
                      placeholder="e.g., Maharashtra"
                      value={formData.registration_state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration_city">Registration City *</Label>
                    <Input
                      id="registration_city"
                      name="registration_city"
                      placeholder="e.g., Mumbai"
                      value={formData.registration_city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Input
                    id="features"
                    name="features"
                    placeholder="e.g., AC, Power Steering, ABS, Airbags"
                    value={formData.features}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Additional details about your car..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Listing Your Car..." : "List My Car"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}