import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  TrendingUp, 
  Calculator, 
  MessageCircle, 
  Map,
  LogOut,
  Sprout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isAuthenticated, onLogout }) => {
  const { t } = useLanguage();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <nav className="bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {t('appName')}
              </span>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </nav>
    );
  }

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('dashboard') },
    { path: '/profile', icon: User, label: t('profile') },
    { path: '/prediction', icon: TrendingUp, label: t('prediction') },
    { path: '/calculator', icon: Calculator, label: t('calculator') },
    { path: '/chatbot', icon: MessageCircle, label: t('chatbot') },
    { path: '/land-map', icon: Map, label: t('landMap') },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('appName')}
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon size={16} />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">{t('logout')}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="flex overflow-x-auto py-2 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2 whitespace-nowrap"
                  >
                    <Icon size={16} />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};