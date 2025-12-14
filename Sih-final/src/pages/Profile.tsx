import React, { useState } from 'react';
import { User, MapPin, Sprout, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

export const Profile: React.FC = () => {
  const { t } = useLanguage();
  
  const [profileData, setProfileData] = useState({
    fullName: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    phoneNumber: '+91 9876543210',
    aadhaarNumber: '1234-5678-9012',
    landArea: '5',
    soilType: 'clayLoam',
    location: 'Maharashtra, India',
    cropTypes: ['rice', 'wheat', 'cotton']
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const soilTypes = [
    { value: 'clayLoam', label: t('clayLoam') },
    { value: 'sandyLoam', label: t('sandyLoam') },
    { value: 'siltLoam', label: t('siltLoam') },
    { value: 'blackSoil', label: t('blackSoil') },
    { value: 'redSoil', label: t('redSoil') }
  ];

  const availableCrops = [
    { value: 'rice', label: t('rice') },
    { value: 'wheat', label: t('wheat') },
    { value: 'cotton', label: t('cotton') },
    { value: 'sugarcane', label: t('sugarcane') },
    { value: 'maize', label: t('maize') },
    { value: 'soybean', label: t('soybean') }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleCropToggle = (cropValue: string, checked: boolean) => {
    setProfileData(prev => ({
      ...prev,
      cropTypes: checked 
        ? [...prev.cropTypes, cropValue]
        : prev.cropTypes.filter(crop => crop !== cropValue)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save process
    setTimeout(() => {
      setIsEditing(false);
      setIsSaving(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1000);
  };

  const predictedYield = {
    totalYield: '21 tons',
    perAcreYield: '4.2 tons/acre',
    confidence: '89%'
  };

  const estimatedCosts = {
    seeds: '₹8,000',
    fertilizer: '₹15,000',
    pesticide: '₹7,000',
    labor: '₹15,000',
    total: '₹45,000'
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('profile')}
          </h1>
          <p className="text-muted-foreground">
            Manage your personal and farming information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="shadow-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('personalInfo')}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('fullName')}</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">{t('phoneNumber')}</Label>
                <Input
                  id="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber">{t('aadhaarNumber')}</Label>
                <Input
                  id="aadhaarNumber"
                  value={profileData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>

          {/* Land Information */}
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t('landInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="landArea">{t('landArea')}</Label>
                <Input
                  id="landArea"
                  type="number"
                  value={profileData.landArea}
                  onChange={(e) => handleInputChange('landArea', e.target.value)}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">{t('soilType')}</Label>
                <Select
                  value={profileData.soilType}
                  onValueChange={(value) => handleInputChange('soilType', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map(soil => (
                      <SelectItem key={soil.value} value={soil.value}>
                        {soil.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t('location')}</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>

              <div className="space-y-3">
                <Label>{t('cropTypes')}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {availableCrops.map(crop => (
                    <div key={crop.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={crop.value}
                        checked={profileData.cropTypes.includes(crop.value)}
                        onCheckedChange={(checked) => handleCropToggle(crop.value, checked as boolean)}
                        disabled={!isEditing}
                      />
                      <Label htmlFor={crop.value} className="text-sm font-normal">
                        {crop.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5" />
                {t('predictedYield')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">{predictedYield.totalYield}</div>
                <p className="text-muted-foreground">Total Expected Yield</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Per Acre</p>
                  <p className="font-bold">{predictedYield.perAcreYield}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">{t('confidenceScore')}</p>
                  <p className="font-bold">{predictedYield.confidence}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Estimated Input Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('seedsCost')}</span>
                  <span className="font-medium">{estimatedCosts.seeds}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('fertilizerCost')}</span>
                  <span className="font-medium">{estimatedCosts.fertilizer}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('pesticideCost')}</span>
                  <span className="font-medium">{estimatedCosts.pesticide}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('laborCost')}</span>
                  <span className="font-medium">{estimatedCosts.labor}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{t('totalCost')}</span>
                    <span className="font-bold text-lg text-primary">{estimatedCosts.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-primary hover:shadow-glow px-8 py-3 text-lg"
            >
              {isSaving ? 'Saving...' : t('updateProfile')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};