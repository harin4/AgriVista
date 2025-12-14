import React, { useState } from 'react';
import { TrendingUp, Sprout, Calendar, CloudRain, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

export const CropPrediction: React.FC = () => {
  const { t } = useLanguage();
  
  const [predictionData, setPredictionData] = useState({
    cropType: '',
    sowingDate: '',
    landArea: '5',
    seedVariety: '',
    soilType: '',
    soilTemperature: '',
    rainfall: '',
    windSpeed: '',
    temperature: ''
    
  });
  
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const crops = [
    { value: 'rice', label: t('rice') },
    { value: 'wheat', label: t('wheat') },
    { value: 'cotton', label: t('cotton') },
    { value: 'sugarcane', label: t('sugarcane') },
    { value: 'maize', label: t('maize') },
    { value: 'soybean', label: t('soybean') }
  ];

  const weatherConditions = [
    { value: 'sunny', label: t('sunny') },
    { value: 'rainy', label: t('rainy') },
    { value: 'cloudy', label: t('cloudy') },
    { value: 'humid', label: t('humid') }
  ];

  const handleInputChange = (field: string, value: string) => {
    setPredictionData(prev => ({ ...prev, [field]: value }));
  };

  const generatePrediction = () => {
    if (!predictionData.cropType || !predictionData.sowingDate) {
      toast({
        title: "Incomplete Information",
        description: "Please select crop type and sowing date",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Mock AI prediction based on input
    setTimeout(() => {
      const mockPredictions = {
        rice: { yield: 4.8, confidence: 92, quality: 'Premium' },
        wheat: { yield: 3.2, confidence: 87, quality: 'High' },
        cotton: { yield: 2.1, confidence: 89, quality: 'Premium' },
        sugarcane: { yield: 65, confidence: 91, quality: 'High' },
        maize: { yield: 5.5, confidence: 85, quality: 'Medium' },
        soybean: { yield: 2.8, confidence: 88, quality: 'High' }
      };

      const cropPrediction = mockPredictions[predictionData.cropType as keyof typeof mockPredictions];
      const totalYield = cropPrediction.yield * parseFloat(predictionData.landArea);

      const mockResult = {
        predictedYield: {
          total: totalYield.toFixed(1),
          perAcre: cropPrediction.yield.toFixed(1),
          unit: predictionData.cropType === 'sugarcane' ? 'tons' : 'tons'
        },
        confidence: cropPrediction.confidence,
        quality: cropPrediction.quality,
        recommendations: [
          {
            type: 'fertilizer',
            title: 'Nitrogen Fertilizer',
            description: 'Apply 120kg/acre of Urea in 3 split doses',
            priority: 'high'
          },
          {
            type: 'fertilizer',
            title: 'Phosphorus',
            description: 'Apply 60kg/acre of DAP at sowing time',
            priority: 'medium'
          },
          {
            type: 'care',
            title: 'Irrigation Schedule',
            description: 'Water every 7-10 days based on soil moisture',
            priority: 'high'
          },
          {
            type: 'protection',
            title: 'Pest Control',
            description: 'Monitor for common pests and apply organic neem spray',
            priority: 'medium'
          }
        ],
        marketPrice: {
          current: '₹2,850/quintal',
          expected: '₹3,100/quintal',
          trend: 'up'
        }
      };

      setPrediction(mockResult);
      setIsLoading(false);
      
      toast({
        title: "Prediction Generated",
        description: `AI prediction ready for ${predictionData.cropType}`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
            <TrendingUp className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('cropPrediction')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered yield predictions based on your crop, weather, and land conditions
          </p>
        </div>

        {/* Input Form */}
        <Card className="shadow-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Prediction Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">{t('selectCrop')}</Label>
                <Select
                  value={predictionData.cropType}
                  onValueChange={(value) => handleInputChange('cropType', value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Choose your crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map(crop => (
                      <SelectItem key={crop.value} value={crop.value}>
                        {crop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sowingDate">{t('sowingDate')}</Label>
                <Input
                  id="sowingDate"
                  type="date"
                  value={predictionData.sowingDate}
                  onChange={(e) => handleInputChange('sowingDate', e.target.value)}
                  className="h-11"
                />
              </div>

               <div className="space-y-2">
                <Label htmlFor="seedVariety">{t('Seed Variety')}</Label>
                <Input
                  id="seedVariety"
                  
                  value={predictionData.seedVariety}
                  onChange={(e) => handleInputChange('seedVariety', e.target.value)}
                  className="h-11"
                />
              </div>

  <div className="space-y-2">
                <Label htmlFor="soilTemperature">{t('Soil Temperature')}</Label>
                <Input
                  id="soilTemperature"
                  type="number"
                  value={predictionData.soilTemperature}
                  onChange={(e) => handleInputChange('soilTemperature', e.target.value)}
                  className="h-11"
                  placeholder="In celsius"
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="windSpeed">{t('Wind Speed')}</Label>
                <Input
                  id="windSpeed"
                  type="number"
                  value={predictionData.windSpeed}
                  onChange={(e) => handleInputChange('windSpeed', e.target.value)}
                  className="h-11"
                  placeholder="windspeed in km/h"
                />
              </div>

             

              <div className="space-y-2">
                <Label htmlFor="rainfall">{t('Rainfall')}</Label>
                <Input
                  id="rainfall"
                  type="number"
                  value={predictionData.rainfall}
                  onChange={(e) => handleInputChange('rainfall', e.target.value)}
                  className="h-11"
                  placeholder="Rainfall in mm"
                />
              </div>

             <div className="space-y-2">
                <Label htmlFor="temperature">{t('Temperature')}</Label>
                <Input
                  id="temperature"
                  type="number"
                  value={predictionData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  className="h-11"
                  placeholder="weather temperature"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weatherCondition">{t('weatherConditions')}</Label>
                <Select
                  value={predictionData.weatherCondition}
                  onValueChange={(value) => handleInputChange('weatherCondition', value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Current weather" />
                  </SelectTrigger>
                  <SelectContent>
                    {weatherConditions.map(weather => (
                      <SelectItem key={weather.value} value={weather.value}>
                        {weather.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="landArea">{t('landArea')}</Label>
                <Input
                  id="landArea"
                  type="number"
                  value={predictionData.landArea}
                  onChange={(e) => handleInputChange('landArea', e.target.value)}
                  className="h-11"
                  placeholder="Area in acres"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={generatePrediction}
                disabled={isLoading}
                className="bg-gradient-primary hover:shadow-glow px-8 py-3 text-lg"
              >
                {isLoading ? 'Analyzing...' : t('predictYield')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        {prediction && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Main Prediction Card */}
            <Card className="shadow-card border-border bg-gradient-to-r from-primary/5 to-primary-glow/5">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Target className="h-6 w-6" />
                  {t('predictedYield')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">{prediction.predictedYield.total}</div>
                  <p className="text-lg text-muted-foreground">
                    Total Expected Yield ({prediction.predictedYield.perAcre} {prediction.predictedYield.unit}/acre)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-card">
                    <Award className="h-8 w-8 text-secondary mx-auto mb-2" />
                    <div className="text-xl font-bold">{prediction.confidence}%</div>
                    <p className="text-sm text-muted-foreground">{t('confidenceScore')}</p>
                    <Progress value={prediction.confidence} className="mt-2" />
                  </div>

                  <div className="text-center p-4 rounded-lg bg-card">
                    <Sprout className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-xl font-bold">{prediction.quality}</div>
                    <p className="text-sm text-muted-foreground">Expected Quality</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-card">
                    <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
                    <div className="text-lg font-bold">{prediction.marketPrice.expected}</div>
                    <p className="text-sm text-muted-foreground">Expected Price</p>
                    <Badge variant="default" className="mt-1">
                      ↗ {prediction.marketPrice.trend === 'up' ? 'Rising' : 'Stable'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5" />
                  {t('fertilizerRecommendations')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prediction.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        rec.priority === 'high' ? 'bg-destructive' : 'bg-secondary'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                        <Badge 
                          variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                          className="mt-2 text-xs"
                        >
                          {rec.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Information */}
          <Card className="shadow-card border-border">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <TrendingUp className="h-5 w-5" />
      Market Information
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Best Case */}
      <div className="space-y-3 p-4 rounded-lg bg-green-50 border border-green-200">
        <h3 className="text-lg font-semibold text-green-700">Best Case</h3>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expected Yield</span>
          <span className="font-bold">5.4 tons/acre</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expected Price</span>
          <span className="font-bold">₹3,200/quintal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Potential Revenue</span>
          <span className="font-bold">₹1,72,800</span>
        </div>
      </div>

      {/* Moderate Case */}
      <div className="space-y-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-700">Moderate Case</h3>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expected Yield</span>
          <span className="font-bold">4.7 tons/acre</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expected Price</span>
          <span className="font-bold">₹2,950/quintal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Potential Revenue</span>
          <span className="font-bold">₹1,38,500</span>
        </div>
      </div>

      {/* Worst Case */}
      <div className="space-y-3 p-4 rounded-lg bg-red-50 border border-red-200">
        <h3 className="text-lg font-semibold text-red-700">Worst Case</h3>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expected Yield</span>
          <span className="font-bold">3.2 tons/acre</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expected Price</span>
          <span className="font-bold">₹2,400/quintal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Potential Revenue</span>
          <span className="font-bold">₹74,400</span>
        </div>
      </div>
    </div>

    <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
      <h4 className="text-base font-medium">Market Outlook</h4>
      <p className="text-sm text-gray-700">
        Based on current trends, your crop is expected to have variable outcomes depending on weather conditions. Plan your resources accordingly to maximize returns.
      </p>
    </div>
  </CardContent>
</Card>


          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="shadow-card border-border">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Analyzing Your Data</h3>
                <p className="text-muted-foreground">
                  Our AI is processing weather patterns, soil conditions, and historical data...
                </p>
              </div>
              <Progress value={75} className="max-w-md mx-auto" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};