import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations for Smart Agri Advisor
const translations = {
  en: {
    // Navigation & Common
    appName: 'Agri-Vista',
    welcome: 'Welcome',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    dashboard: 'Dashboard',
    profile: 'Profile',
    prediction: 'Crop Prediction',
    calculator: 'Cost Calculator',
    chatbot: 'Expert Assistance',
    landMap: 'Land Map',
    selectLanguage: 'Select Language',
    
    // Authentication
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phoneNumber: 'Phone Number',
    aadhaarNumber: 'Aadhaar Number',
    fullName: 'Full Name',
    loginButton: 'Sign In',
    signupButton: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    
    // Profile
    personalInfo: 'Personal Information',
    landInfo: 'Land Information',
    landArea: 'Land Area (acres)',
    soilType: 'Soil Type',
    location: 'Location',
    cropTypes: 'Crop Types',
    updateProfile: 'Update Profile',
    
    // Crop Prediction
    cropPrediction: 'Crop Yield Prediction',
    selectCrop: 'Select Crop',
    sowingDate: 'Sowing Date',
    weatherConditions: 'Weather Conditions',
    predictYield: 'Predict Yield',
    predictedYield: 'Predicted Yield',
    confidenceScore: 'Confidence Score',
    fertilizerRecommendations: 'Fertilizer Recommendations',
    
    // Cost Calculator
    inputCostCalculator: 'Input Cost Calculator',
    seedsCost: 'Seeds Cost',
    fertilizerCost: 'Fertilizer Cost',
    pesticideCost: 'Pesticide Cost',
    laborCost: 'Labor Cost',
    totalCost: 'Total Cost',
    
    // Chatbot
    askQuestion: 'Ask a farming question...',
    chatbotWelcome: 'Hello! I am your farming assistant. How can I help you today?',
    
    // Land Map
    cropHealth: 'Crop Health',
    growthStage: 'Growth Stage',
    yieldEstimate: 'Yield Estimate',
    
    // Soil Types
    clayLoam: 'Clay Loam',
    sandyLoam: 'Sandy Loam',
    siltLoam: 'Silt Loam',
    blackSoil: 'Black Soil',
    redSoil: 'Red Soil',
    
    // Crops
    rice: 'Rice',
    wheat: 'Wheat',
    cotton: 'Cotton',
    sugarcane: 'Sugarcane',
    maize: 'Maize',
    soybean: 'Soybean',
    
    // Weather
    sunny: 'Sunny',
    rainy: 'Rainy',
    cloudy: 'Cloudy',
    humid: 'Humid'
  },
  
  hi: {
    // Navigation & Common
    appName: 'अग्री विस्‍टा ',
    welcome: 'स्वागत है',
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    dashboard: 'डैशबोर्ड',
    profile: 'प्रोफाइल',
    prediction: 'फसल भविष्यवाणी',
    calculator: 'लागत कैलकुलेटर',
    chatbot: 'AI सहायक',
    landMap: 'भूमि मानचित्र',
    selectLanguage: 'भाषा चुनें',
    
    // Authentication
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    phoneNumber: 'फोन नंबर',
    aadhaarNumber: 'आधार संख्या',
    fullName: 'पूरा नाम',
    loginButton: 'साइन इन करें',
    signupButton: 'खाता बनाएं',
    alreadyHaveAccount: 'पहले से खाता है?',
    noAccount: 'खाता नहीं है?',
    
    // Profile
    personalInfo: 'व्यक्तिगत जानकारी',
    landInfo: 'भूमि की जानकारी',
    landArea: 'भूमि क्षेत्र (एकड़)',
    soilType: 'मिट्टी का प्रकार',
    location: 'स्थान',
    cropTypes: 'फसल के प्रकार',
    updateProfile: 'प्रोफाइल अपडेट करें',
    
    // Crop Prediction
    cropPrediction: 'फसल उत्पादन भविष्यवाणी',
    selectCrop: 'फसल चुनें',
    sowingDate: 'बुआई की तारीख',
    weatherConditions: 'मौसम की स्थिति',
    predictYield: 'उत्पादन की भविष्यवाणी करें',
    predictedYield: 'अनुमानित उत्पादन',
    confidenceScore: 'विश्वसनीयता स्कोर',
    fertilizerRecommendations: 'उर्वरक सिफारिशें',
    
    // Cost Calculator
    inputCostCalculator: 'इनपुट लागत कैलकुलेटर',
    seedsCost: 'बीज की लागत',
    fertilizerCost: 'उर्वरक की लागत',
    pesticideCost: 'कीटनाशक की लागत',
    laborCost: 'श्रम लागत',
    totalCost: 'कुल लागत',
    
    // Chatbot
    askQuestion: 'कृषि संबंधी प्रश्न पूछें...',
    chatbotWelcome: 'नमस्ते! मैं आपका कृषि सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
    
    // Land Map
    cropHealth: 'फसल स्वास्थ्य',
    growthStage: 'वृद्धि चरण',
    yieldEstimate: 'उत्पादन अनुमान',
    
    // Soil Types
    clayLoam: 'मिट्टी चिकनी',
    sandyLoam: 'रेतीली मिट्टी',
    siltLoam: 'गाद मिट्टी',
    blackSoil: 'काली मिट्टी',
    redSoil: 'लाल मिट्टी',
    
    // Crops
    rice: 'चावल',
    wheat: 'गेहूं',
    cotton: 'कपास',
    sugarcane: 'गन्ना',
    maize: 'मक्का',
    soybean: 'सोयाबीन',
    
    // Weather
    sunny: 'धूप',
    rainy: 'बारिश',
    cloudy: 'बादल',
    humid: 'नम'
  },
  
  mr: {
    // Navigation & Common
    appName: 'अॅग्री विस्टा',
    welcome: 'स्वागत आहे',
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    dashboard: 'डॅशबोर्ड',
    profile: 'प्रोफाइल',
    prediction: 'पीक अंदाज',
    calculator: 'खर्च कॅल्क्युलेटर',
    chatbot: 'AI सहाय्यक',
    landMap: 'जमीन नकाशा',
    selectLanguage: 'भाषा निवडा',
    
    // Authentication
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड पुष्टी करा',
    phoneNumber: 'फोन नंबर',
    aadhaarNumber: 'आधार नंबर',
    fullName: 'पूर्ण नाव',
    loginButton: 'साइन इन करा',
    signupButton: 'खाते तयार करा',
    alreadyHaveAccount: 'आधीच खाते आहे?',
    noAccount: 'खाते नाही?',
    
    // Profile
    personalInfo: 'वैयक्तिक माहिती',
    landInfo: 'जमिनीची माहिती',
    landArea: 'जमिनीचे क्षेत्र (एकर)',
    soilType: 'मातीचा प्रकार',
    location: 'ठिकाण',
    cropTypes: 'पिकांचे प्रकार',
    updateProfile: 'प्रोफाइल अपडेट करा',
    
    // Crop Prediction
    cropPrediction: 'पीक उत्पादन अंदाज',
    selectCrop: 'पीक निवडा',
    sowingDate: 'पेरणीची तारीख',
    weatherConditions: 'हवामान परिस्थिती',
    predictYield: 'उत्पादनाचा अंदाज लावा',
    predictedYield: 'अपेक्षित उत्पादन',
    confidenceScore: 'विश्वसनीयता गुण',
    fertilizerRecommendations: 'खत शिफारसी',
    
    // Cost Calculator
    inputCostCalculator: 'इनपुट खर्च कॅल्क्युलेटर',
    seedsCost: 'बियाणे खर्च',
    fertilizerCost: 'खत खर्च',
    pesticideCost: 'कीटकनाशक खर्च',
    laborCost: 'मजूर खर्च',
    totalCost: 'एकूण खर्च',
    
    // Chatbot
    askQuestion: 'शेतीविषयक प्रश्न विचारा...',
    chatbotWelcome: 'नमस्कार! मी तुमचा शेती सहाय्यक आहे. आज मी तुमची कशी मदत करू शकतो?',
    
    // Land Map
    cropHealth: 'पीक आरोग्य',
    growthStage: 'वाढीचा टप्पा',
    yieldEstimate: 'उत्पादन अंदाज',
    
    // Soil Types
    clayLoam: 'चिकणमाती दोमट',
    sandyLoam: 'वालुकामय दोमट',
    siltLoam: 'गाळमाती दोमट',
    blackSoil: 'काळी माती',
    redSoil: 'लाल माती',
    
    // Crops
    rice: 'तांदूळ',
    wheat: 'गहू',
    cotton: 'कापूस',
    sugarcane: 'ऊस',
    maize: 'मका',
    soybean: 'सोयाबीन',
    
    // Weather
    sunny: 'सूर्यप्रकाश',
    rainy: 'पाऊस',
    cloudy: 'ढगाळ',
    humid: 'दमट'
  },
  
  ta: {
    // Navigation & Common
    appName: 'அக்ரி விஸ்டா ',
    welcome: 'வரவேற்கிறோம்',
    login: 'உள்நுழை',
    signup: 'பதிவு செய்க',
    logout: 'வெளியேறு',
    dashboard: 'டாஷ்போர்டு',
    profile: 'சுயவிவரம்',
    prediction: 'பயிர் கணிப்பு',
    calculator: 'செலவு கணிப்பான்',
    chatbot: 'AI உதவியாளர்',
    landMap: 'நில வரைபடம்',
    selectLanguage: 'மொழி தேர்வு செய்க',
    
    // Authentication
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    confirmPassword: 'கடவுச்சொல் உறுதி',
    phoneNumber: 'தொலைபேசி எண்',
    aadhaarNumber: 'ஆதார் எண்',
    fullName: 'முழு பெயர்',
    loginButton: 'உள்நுழைக',
    signupButton: 'கணக்கு உருவாக்கு',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    noAccount: 'கணக்கு இல்லையா?',
    
    // Profile
    personalInfo: 'தனிப்பட்ட தகவல்',
    landInfo: 'நில தகவல்',
    landArea: 'நில பரப்பு (ஏக்கர்)',
    soilType: 'மண் வகை',
    location: 'இடம்',
    cropTypes: 'பயிர் வகைகள்',
    updateProfile: 'சுயவிவரம் புதுப்பிக்க',
    
    // Crop Prediction
    cropPrediction: 'பயிர் விளைச்சல் கணிப்பு',
    selectCrop: 'பயிர் தேர்வு',
    sowingDate: 'விதைப்பு தேதி',
    weatherConditions: 'வானிலை நிலைமை',
    predictYield: 'விளைச்சல் கணிக்க',
    predictedYield: 'எதிர்பார்க்கப்படும் விளைச்சல்',
    confidenceScore: 'நம்பகமான மதிப்பு',
    fertilizerRecommendations: 'உர பரிந்துரைகள்',
    
    // Cost Calculator
    inputCostCalculator: 'உள்ளீட்டு செலவு கணிப்பான்',
    seedsCost: 'விதை செலவு',
    fertilizerCost: 'உர செலவு',
    pesticideCost: 'பூச்சிக்கொல்லி செலவு',
    laborCost: 'தொழிலாளர் செலவு',
    totalCost: 'மொத்த செலவு',
    
    // Chatbot
    askQuestion: 'வேளாண் கேள்வி கேளுங்கள்...',
    chatbotWelcome: 'வணக்கம்! நான் உங்கள் வேளாண் உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    
    // Land Map
    cropHealth: 'பயிர் ஆரோக்கியம்',
    growthStage: 'வளர்ச்சி நிலை',
    yieldEstimate: 'விளைச்சல் மதிப்பீடு',
    
    // Soil Types
    clayLoam: 'களிமண் கலவை',
    sandyLoam: 'மணல் கலவை',
    siltLoam: 'சேறு கலவை',
    blackSoil: 'கருப்பு மண்',
    redSoil: 'சிவப்பு மண்',
    
    // Crops
    rice: 'அரிசி',
    wheat: 'கோதுமை',
    cotton: 'பருத்தி',
    sugarcane: 'கரும்பு',
    maize: 'மக்காச்சோளம்',
    soybean: 'சோயாபீன்',
    
    // Weather
    sunny: 'வெயில்',
    rainy: 'மழை',
    cloudy: 'மேகமூட்டம்',
    humid: 'ஈரப்பதம்'
  },
  
  te: {
    // Navigation & Common
    appName: 'అగ్రి విస్టా',
    welcome: 'స్వాగతం',
    login: 'లాగిన్',
    signup: 'సైన్ అప్',
    logout: 'లాగ్అవుట్',
    dashboard: 'డాష్‌బోర్డ్',
    profile: 'ప్రొఫైల్',
    prediction: 'పంట అంచనా',
    calculator: 'వ్యయ కాలిక్యులేటర్',
    chatbot: 'AI సహాయకుడు',
    landMap: 'భూమి మ్యాప్',
    selectLanguage: 'భాష ఎంచుకోండి',
    
    // Authentication
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
    phoneNumber: 'ఫోన్ నంబర్',
    aadhaarNumber: 'ఆధార్ నంబర్',
    fullName: 'పూర్తి పేరు',
    loginButton: 'సైన్ ఇన్ చేయండి',
    signupButton: 'ఖాతా సృష్టించండి',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    noAccount: 'ఖాతా లేదా?',
    
    // Profile
    personalInfo: 'వ్యక్తిగత సమాచారం',
    landInfo: 'భూమి సమాచారం',
    landArea: 'భూమి విస్తీర్ణం (ఎకరాలు)',
    soilType: 'మట్టి రకం',
    location: 'స్థానం',
    cropTypes: 'పంట రకాలు',
    updateProfile: 'ప్రొఫైల్ అప్‌డేట్ చేయండి',
    
    // Crop Prediction
    cropPrediction: 'పంట దిగుబడి అంచనా',
    selectCrop: 'పంట ఎంచుకోండి',
    sowingDate: 'విత్తన తేదీ',
    weatherConditions: 'వాతావరణ పరిస్థితులు',
    predictYield: 'దిగుబడి అంచనా వేయండి',
    predictedYield: 'అంచనా దిగుబడి',
    confidenceScore: 'విశ్వసనీయత స్కోర్',
    fertilizerRecommendations: 'ఎరువుల సిఫార్సులు',
    
    // Cost Calculator
    inputCostCalculator: 'ఇన్‌పుట్ వ్యయ కాలిక్యులేటర్',
    seedsCost: 'విత్తనాల వ్యయం',
    fertilizerCost: 'ఎరువుల వ్యయం',
    pesticideCost: 'పురుగుమందుల వ్యయం',
    laborCost: 'కూలీల వ్యయం',
    totalCost: 'మొత్తం వ్యయం',
    
    // Chatbot
    askQuestion: 'వ్యవసాయ ప్రశ్న అడగండి...',
    chatbotWelcome: 'నమస్కారం! నేను మీ వ్యవసాయ సహాయకుడను. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?',
    
    // Land Map
    cropHealth: 'పంట ఆరోగ్యం',
    growthStage: 'వృద్ధి దశ',
    yieldEstimate: 'దిగుబడి అంచనా',
    
    // Soil Types
    clayLoam: 'బంకమట్టి మిశ్రమం',
    sandyLoam: 'ఇసుక మిశ్రమం',
    siltLoam: 'సిల్ట్ మిశ్రమం',
    blackSoil: 'నల్లమట్టి',
    redSoil: 'ఎర్రమట్టి',
    
    // Crops
    rice: 'వరి',
    wheat: 'గోధుమ',
    cotton: 'పత్తి',
    sugarcane: 'చెరకు',
    maize: 'మొక్కజొన్న',
    soybean: 'సోయాబీన్',
    
    // Weather
    sunny: 'ఎండ',
    rainy: 'వర్షం',
    cloudy: 'మేఘాలు',
    humid: 'తేమ'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};