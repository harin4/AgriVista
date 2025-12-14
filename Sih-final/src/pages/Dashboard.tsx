import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Calculator, 
  MessageCircle, 
  Map, 
  User,
  Sprout,
  DollarSign,
  Activity,
  Sun,
  Droplets
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const quickStats = [
    {
      title: t('predictedYield'),
      value: '4.2 tons/acre',
      change: '+12%',
      icon: TrendingUp,
      trend: 'up'
    },
    {
      title: t('totalCost'),
      value: '₹45,000',
      change: '-8%',
      icon: DollarSign,
      trend: 'down'
    },
    {
      title: t('cropHealth'),
      value: '92%',
      change: '+5%',
      icon: Activity,
      trend: 'up'
    },
    {
      title: 'Weather Score',
      value: '85%',
      change: 'Favorable',
      icon: Sun,
      trend: 'neutral'
    }
  ];

  const quickActions = [
    {
      title: t('cropPrediction'),
      description: 'Get AI-powered yield predictions for your crops',
      icon: TrendingUp,
      path: '/prediction',
      color: 'bg-gradient-primary'
    },
    {
      title: t('inputCostCalculator'),
      description: 'Calculate detailed input costs for your farming',
      icon: Calculator,
      path: '/calculator',
      color: 'bg-gradient-harvest'
    },
    {
      title: t('chatbot'),
      description: 'Ask questions and get farming advice',
      icon: MessageCircle,
      path: '/chatbot',
      color: 'bg-gradient-land'
    },
    {
      title: t('landMap'),
      description: 'View interactive map of your farmland',
      icon: Map,
      path: '/land-map',
      color: 'bg-accent'
    }
  ];

  const recentActivities = [
    {
      action: 'Crop prediction updated',
      crop: 'Rice',
      time: '2 hours ago',
      status: 'success'
    },
    {
      action: 'Cost calculation completed',
      crop: 'Wheat',
      time: '1 day ago',
      status: 'success'
    },
    {
      action: 'Weather alert received',
      crop: 'All crops',
      time: '2 days ago',
      status: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('welcome')} to {t('appName')}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your intelligent farming companion for better yields and smart decisions
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card border-border hover:shadow-glow transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge 
                      variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">from last season</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.path}>
                  <Card className="shadow-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer group">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        {action.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.crop}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={activity.status === 'success' ? 'default' : 'secondary'}
                      className="mb-1"
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                Weather & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <Sun className="h-12 w-12 text-secondary mx-auto" />
                <h3 className="text-xl font-bold">Sunny</h3>
                <p className="text-2xl font-bold">28°C</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-bold">65%</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Rainfall</p>
                  <p className="font-bold">2mm</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium text-primary">
                  🌱 Perfect conditions for crop growth today!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Quick Access */}
        <Card className="shadow-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Complete Your Profile</h3>
                  <p className="text-muted-foreground">Add your land and crop information for better predictions</p>
                </div>
              </div>
              <Link to="/profile">
                <Button className="bg-gradient-primary hover:shadow-glow">
                  Update Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};