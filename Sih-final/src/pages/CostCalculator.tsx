import React, { useState } from 'react';
import { DollarSign, Sprout, ShieldCheck, Users, Calculator, TrendingUp, Award, ExternalLink, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

// Paste your governmentSchemes array here or import it if defined elsewhere
const governmentSchemes = [
  {
    id: 1,
    title: { en: "PM-KISAN Scheme", hi: "पीएम-किसान योजना", ml: "പിഎം-കിസാൻ പദ്ധതി", ta: "பிஎம்-கிசான் திட்டம்", te: "పిఎం-కిసాన్ పథకం" },
    coverage: { en: "₹6,000 per year", hi: "₹6,000 प्रति वर्ष", ml: "വർഷത്തിൽ ₹6,000", ta: "ஆண்டுக்கு ₹6,000", te: "సంవత్సరానికి ₹6,000" },
    description: { en: "Direct income support to farmers", hi: "किसानों को प्रत्यक्ष आय सहायता", ml: "കർഷകർക്ക് നേരിട്ടുള്ള വരുമാന പിന്തുണ", ta: "விவசாயிகளுக்கு நேரடி வருமான ஆதரவு", te: "రైతులకు ప్రత్యక్ష ఆదాయ మద్దతు" },
    costRange: [0, 100000],
    website: "https://pmkisan.gov.in",
    type: "subsidy"
  },
  {
    id: 2,
    title: { en: "Crop Insurance Scheme", hi: "फसल बीमा योजना", ml: "വിള ഇൻഷുറൻസ് പദ്ധതി", ta: "பயிர் காப்பீட்டு திட்டம்", te: "పంట భీమా పథకం" },
    coverage: { en: "Up to ₹2,00,000 per hectare", hi: "₹2,00,000 प्रति हेक्टेयर तक", ml: "ഹെക്ടറിന് ₹2,00,000 വരെ", ta: "ஹெக்டேருக்கு ₹2,00,000 வரை", te: "హెక్టారుకు ₹2,00,000 వరకు" },
    description: { en: "Insurance against crop loss", hi: "फसल नुकसान के खिलाफ बीमा", ml: "വിള നഷ്ടത്തിനെതിരായ ഇൻഷുറൻസ്", ta: "பயிர் இழப்புக்கு எதிரான காப்பீடு", te: "పంట నష్టానికి వ్యతిరేకంగా భీమా" },
    costRange: [10000, 50000],
    website: "https://pmfby.gov.in",
    type: "insurance"
  },
  {
    id: 3,
    title: { en: "Soil Health Card Scheme", hi: "मृदा स्वास्थ्य कार्ड योजना", ml: "മണ്ണിന്റെ ആരോഗ്യ കാർഡ് പദ്ധതി", ta: "மண் ஆரோக்கிய அட்டை திட்டம்", te: "మట్టి ఆరోగ్య కార్డు పథకం" },
    coverage: { en: "Free soil testing + ₹1,500 subsidy", hi: "मुफ्त मिट्टी परीक्षण + ₹1,500 सब्सिडी", ml: "സൗജന്യ മണ്ണ് പരിശോധന + ₹1,500 സബ്‌സിഡി", ta: "இலவச மண் சோதனை + ₹1,500 மானியம்", te: "ఉచిత మట్టి పరీక్ష + ₹1,500 సబ్సిడీ" },
    description: { en: "Soil testing and nutrient management", hi: "मिट्टी परीक्षण और पोषक तत्व प्रबंधन", ml: "മണ്ണ് പരിശോധനയും പോഷക പരിപാലനവും", ta: "மண் சோதனை மற்றும் ஊட்டச்சத்து மேலாண்மை", te: "మట్టి పరీక్ష మరియు పోషక నిర్వహణ" },
    costRange: [1000, 20000],
    website: "https://soilhealth.dac.gov.in",
    type: "support"
  },
  {
    id: 4,
    title: { en: "Kisan Credit Card", hi: "किसान क्रेडिट कार्ड", ml: "കിസാൻ ക്രെഡിറ്റ് കാർഡ്", ta: "கிசான் கிரெடிட் கார்டு", te: "కిసాన్ క్రెడిట్ కార్డ్" },
    coverage: { en: "Credit up to ₹3,00,000 at 4% interest", hi: "4% ब्याज पर ₹3,00,000 तक का क्रेडिट", ml: "4% പലിശയിൽ ₹3,00,000 വരെ ക്രെഡിറ്റ്", ta: "4% வட்டியில் ₹3,00,000 வரை கடன்", te: "4% వడ్డీకి ₹3,00,000 వరకు రుణం" },
    description: { en: "Low-interest agricultural credit", hi: "कम ब्याज कृषि ऋण", ml: "കുറഞ്ഞ പലിശയിൽ കാർഷിക വായ്പ", ta: "குறைந்த வட்டி விவசாய கடன்", te: "తక్కువ వడ్డీ వ్యవసాయ రుణం" },
    costRange: [5000, 300000],
    website: "https://kcc.gov.in",
    type: "credit"
  },
  {
    id: 5,
    title: { en: "Organic Farming Scheme", hi: "जैविक खेती योजना", ml: "ജൈവകൃഷി പദ്ധതി", ta: "இயற்கை விவசாய திட்டம்", te: "సేంద్రియ వ్యవసాయ పథకం" },
    coverage: { en: "₹20,000 per hectare subsidy", hi: "₹20,000 प्रति हेक्टेयर सब्सिडी", ml: "ഹെക്ടറിന് ₹20,000 സബ്‌സിഡി", ta: "ஹெக்டேருக்கு ₹20,000 மானியம்", te: "హెక్టారుకు ₹20,000 సబ్సిడీ" },
    description: { en: "Support for organic farming transition", hi: "जैविक खेती में बदलाव के लिए सहायता", ml: "സന്ദ്രിയ കൃഷിയിലേക്കുള്ള പരിവർത്തനത്തിന് പിന്തുണ", ta: "இயற்கை விவசாயத்திற்கு மாற்றத்திற்கான ஆதரவு", te: "సేంద్రియ వ్యవసాయ పరివర్తనకు మద్దతు" },
    costRange: [8000, 40000],
    website: "https://organic-farming.gov.in",
    type: "subsidy"
  }
];

const crops = ['rice', 'wheat', 'cotton', 'sugarcane', 'maize', 'soybean'];
const seasons = [
  { value: 'kharif', label: 'Kharif (Monsoon)' },
  { value: 'rabi', label: 'Rabi (Winter)' },
  { value: 'zayad', label: 'Zayad (Summer)' }
];
const locations = [
  'maharashtra',
  'punjab',
  'haryana',
  'karnataka',
  'telangana',
  'tamilnadu'
];

const baseCosts = {
  rice: { seeds: 1800, fertilizer: 2800, pesticide: 1200, labor: 3500 },
  wheat: { seeds: 1200, fertilizer: 2200, pesticide: 800, labor: 2800 },
  cotton: { seeds: 2200, fertilizer: 3500, pesticide: 2800, labor: 4200 },
  sugarcane: { seeds: 8000, fertilizer: 12000, pesticide: 3500, labor: 15000 },
  maize: { seeds: 1500, fertilizer: 2500, pesticide: 1000, labor: 3000 },
  soybean: { seeds: 1800, fertilizer: 2000, pesticide: 1100, labor: 2500 }
};

const locationMultipliers: Record<string, number> = {
  maharashtra: 1.0,
  punjab: 1.2,
  haryana: 1.15,
  karnataka: 0.95,
  telangana: 0.9,
  tamilnadu: 0.92
};

const seasonMultipliers: Record<string, number> = {
  kharif: 1.0,
  rabi: 1.1,
  zayad: 1.25
};

const costCategories = [
  { key: 'seeds', labelKey: 'seedCost', icon: Sprout, color: 'text-primary' },
  { key: 'fertilizer', labelKey: 'fertilizerCost', icon: DollarSign, color: 'text-secondary' },
  { key: 'pesticide', labelKey: 'pesticideCost', icon: ShieldCheck, color: 'text-accent' },
  { key: 'labor', labelKey: 'laborCost', icon: Users, color: 'text-success' },
  { key: 'irrigation', labelKey: 'irrigation', icon: DollarSign, color: 'text-blue-600' },
  { key: 'machinery', labelKey: 'machinery', icon: DollarSign, color: 'text-purple-600' },
  { key: 'other', labelKey: 'otherCosts', icon: DollarSign, color: 'text-gray-600' }
];

export const CostCalculator: React.FC = () => {
  const { t, language } = useLanguage();
  const [calculatorData, setCalculatorData] = useState({
    cropType: '',
    landArea: '',
    season: 'kharif',
    location: 'maharashtra'
  });
  const [costBreakdown, setCostBreakdown] = useState<any>(null);
  const [matchedSchemes, setMatchedSchemes] = useState<typeof governmentSchemes>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setCalculatorData(prev => ({ ...prev, [field]: value }));
  };

  const calculateCosts = () => {
    if (!calculatorData.cropType || !calculatorData.landArea) {
      toast.error(t('required'));
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      const baseCost = baseCosts[calculatorData.cropType as keyof typeof baseCosts];
      const locationMultiplier = locationMultipliers[calculatorData.location];
      const seasonMultiplier = seasonMultipliers[calculatorData.season];
      const area = parseFloat(calculatorData.landArea);

      const adjustedCosts = {
        seeds: Math.round(baseCost.seeds * locationMultiplier * seasonMultiplier * area),
        fertilizer: Math.round(baseCost.fertilizer * locationMultiplier * seasonMultiplier * area),
        pesticide: Math.round(baseCost.pesticide * locationMultiplier * seasonMultiplier * area),
        labor: Math.round(baseCost.labor * locationMultiplier * seasonMultiplier * area),
      };

      const irrigation = Math.round(1500 * area * seasonMultiplier);
      const machinery = Math.round(2000 * area);
      const other = Math.round(800 * area);

      const totalCost =
        adjustedCosts.seeds +
        adjustedCosts.fertilizer +
        adjustedCosts.pesticide +
        adjustedCosts.labor +
        irrigation +
        machinery +
        other;

      // Find matching schemes for total cost:
      const matching = governmentSchemes.filter(scheme =>
        totalCost >= scheme.costRange[0] &&
        totalCost <= scheme.costRange[1]
      );

      setMatchedSchemes(matching);

      const suggestions = [
        {
          category: 'Seeds',
          suggestion: 'Consider certified hybrid seeds for 15-20% better yield',
          potential: 'Save ₹' + Math.round(adjustedCosts.seeds * 0.1),
          priority: 'medium'
        },
        {
          category: 'Fertilizer',
          suggestion: 'Use soil testing for precise fertilizer application',
          potential: 'Save ₹' + Math.round(adjustedCosts.fertilizer * 0.15),
          priority: 'high'
        },
        {
          category: 'Labor',
          suggestion: 'Group farming can reduce labor costs by 10-15%',
          potential: 'Save ₹' + Math.round(adjustedCosts.labor * 0.12),
          priority: 'medium'
        },
        {
          category: 'Water',
          suggestion: 'Drip irrigation can reduce water costs by 30%',
          potential: 'Save ₹' + Math.round(irrigation * 0.3),
          priority: 'high'
        }
      ];

      setCostBreakdown({
        breakdown: {
          ...adjustedCosts,
          irrigation,
          machinery,
          other,
          total: totalCost
        },
        perAcreCost: Math.round(totalCost / area),
        suggestions,
      });

      setIsCalculating(false);
      toast.success(t('costAnalysisComplete').replace('{total}', totalCost.toLocaleString()));
    }, 2000);
  };

  const openSchemeWebsite = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getSchemeIcon = (type: string) => {
    switch (type) {
      case 'insurance': return <ShieldCheck className="h-5 w-5 text-blue-600" />;
      case 'credit': return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'subsidy': return <Award className="h-5 w-5 text-purple-600" />;
      case 'support': return <DollarSign className="h-5 w-5 text-orange-600" />;
      default: return <DollarSign className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSchemeTypeColor = (type: string) => {
    switch (type) {
      case 'insurance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'credit': return 'bg-green-100 text-green-800 border-green-200';
      case 'subsidy': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'support': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              {t('inputCostCalculator')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <Label htmlFor="cropType">{t('Crop Type')}</Label>
                <Select
                  id="cropType"
                  value={calculatorData.cropType}
                  onValueChange={value => handleInputChange('cropType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select')} />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map(crop => (
                      <SelectItem key={crop} value={crop}>
                        {t(crop)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="landArea">{t('Land Area')}</Label>
                <Input
                  type="number"
                  id="landArea"
                  value={calculatorData.landArea}
                  onChange={(e) => handleInputChange('landArea', e.target.value)}
                  placeholder="Acres"
                />
              </div>

              <div>
                <Label htmlFor="season">{t('Season')}</Label>
                <Select
                  id="season"
                  value={calculatorData.season}
                  onValueChange={value => handleInputChange('season', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {t(s.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">{t('Location')}</Label>
                <Select
                  id="location"
                  value={calculatorData.location}
                  onValueChange={value => handleInputChange('location', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {t(loc)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <Button
                onClick={calculateCosts}
                disabled={isCalculating}
                className="w-48"
              >
                {isCalculating ? t('Calculating') : t('Calculate Costs')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {costBreakdown && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {t('Cost Breakdown')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {costCategories.map((category) => {
                    const Icon = category.icon;
                    const amount = costBreakdown.breakdown[category.key];
                    const percent = (amount / costBreakdown.breakdown.total) * 100;
                    return (
                      <div
                        key={category.key}
                        className="p-4 rounded-lg bg-muted border border-border flex flex-col items-center space-y-2"
                      >
                        <Icon className={`h-7 w-7 ${category.color}`} />
                        <p className="font-semibold">{t(category.labelKey)}</p>
                        <p className="text-lg font-bold">₹{amount.toLocaleString()}</p>
                        <Progress value={percent} className="w-full" />
                        <p className="text-sm text-muted">{percent.toFixed(1)}%</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('Cost Optimization')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costBreakdown.suggestions.map((sug: any, idx: number) => (
                    <div key={idx} className="p-4 border rounded shadow-sm bg-muted">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{t(sug.category)}</h4>
                        <Badge variant={sug.priority === 'high' ? 'destructive' : 'secondary'}>
                          {sug.priority === 'high' ? t('High Impact') : t('Medium Impact')}
                        </Badge>
                      </div>
                      <p>{t(sug.suggestion)}</p>
                      <p className="font-semibold text-success">{t('Potential Savings')}: {sug.potential}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {matchedSchemes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                {t('Matched Schemes')}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t('Matched Schemes Description')}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matchedSchemes.map((scheme) => (
                  <div key={scheme.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getSchemeIcon(scheme.type)}
                        <div>
                          <h3 className="font-semibold text-lg">
                            {scheme.title[language as keyof typeof scheme.title]}
                          </h3>
                          <Badge className={`inline-block px-2 py-1 text-xs font-medium rounded border ${getSchemeTypeColor(scheme.type)}`}>
                            {scheme.type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => openSchemeWebsite(scheme.website)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {t('View Scheme')}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('Coverage')}</p>
                        <p className="font-medium text-success">
                          {scheme.coverage[language as keyof typeof scheme.coverage]}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('Description')}</p>
                        <p className="text-sm">
                          {scheme.description[language as keyof typeof scheme.description]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <span>Eligible for costs: ₹{scheme.costRange[0].toLocaleString()} - ₹{scheme.costRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
};
