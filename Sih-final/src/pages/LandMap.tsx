// LandMap.tsx
import React, { useState } from 'react';
import { Map, Sprout, RotateCcw, Zap, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LandPlot {
  id: string;
  x: number; // column index
  y: number; // row index
  width: number;
  height: number;
  crop_type: string;
  growth_stage: number; // 0-100 %
  health_score: number; // 0-100 %
}

const LandMap: React.FC = () => {
  const { t } = useLanguage();

  // Sample crops with colors and stats
  const crops = [
    { name: 'Wheat', color: 'bg-yellow-400', growth: 75, health: 90 },
    { name: 'Rice', color: 'bg-green-400', growth: 60, health: 85 },
    { name: 'Corn', color: 'bg-orange-400', growth: 45, health: 88 },
    { name: 'Cotton', color: 'bg-white border-2 border-gray-300', growth: 30, health: 92 },
    { name: 'Sugarcane', color: 'bg-green-600', growth: 80, health: 85 },
    { name: 'Soybean', color: 'bg-green-300', growth: 55, health: 89 }
  ];

  // Initialize land grid cells (6 rows x 8 columns => 48)
  const landGrid = Array.from({ length: 48 }, (_, index) => ({
    id: `cell-${index}`,
    occupied: false,
    crop: null as string | null
  }));

  const [landPlots, setLandPlots] = useState<LandPlot[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('');

  const handleCropPlacement = (cellIndex: number) => {
    if (!selectedCrop) return;

    setLandPlots((prev) => {
      // Remove existing plot on the cell
      const filtered = prev.filter(
        (plot) => !(plot.x === cellIndex % 8 && plot.y === Math.floor(cellIndex / 8))
      );
      // Add new plot
      const newPlot: LandPlot = {
        id: Date.now().toString(),
        x: cellIndex % 8,
        y: Math.floor(cellIndex / 8),
        width: 1,
        height: 1,
        crop_type: selectedCrop,
        growth_stage: Math.floor(Math.random() * 101), // 0-100%
        health_score: 85 + Math.floor(Math.random() * 16) // 85-100%
      };
      return [...filtered, newPlot];
    });
  };

  const resetLand = () => setLandPlots([]);

  const simulateGrowth = () => {
    setLandPlots((prev) =>
      prev.map((plot) => ({
        ...plot,
        growth_stage: Math.min(100, plot.growth_stage + Math.floor(Math.random() * 20))
      }))
    );
  };

  const optimizePlanting = () => {
    const optimizedPlots: LandPlot[] = Array.from({ length: 6 }, (_, i) => ({
      id: `optimized-${i}`,
      x: i % 3,
      y: Math.floor(i / 3) + 2,
      width: 1,
      height: 1,
      crop_type: crops[i % crops.length].name,
      growth_stage: 70 + Math.floor(Math.random() * 31),
      health_score: 90 + Math.floor(Math.random() * 11)
    }));
    setLandPlots(optimizedPlots);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-4 border">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Map className="w-7 h-7 text-green-600" />
          <span>{t('Land Simulation') || 'Land Simulation'}</span>
        </h1>
        <p className="text-gray-600 mt-2">{t('Get a wider insight on how different crop farming can increase you yield') || 'Drag and drop crops to plant'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Crop Library */}
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('Crop Library')}</h2>
          <div className="space-y-2">
            {crops.map((crop) => (
              <button
                key={crop.name}
                type="button"
                onClick={() => setSelectedCrop(crop.name)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  selectedCrop === crop.name ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`${crop.color} w-4 h-4 rounded`}></div>
                  <span className="font-medium text-gray-900">{crop.name}</span>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Growth: {crop.growth}%</span>
                    <span>Health: {crop.health}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="mt-6 space-y-2">
            <button
              type="button"
              onClick={optimizePlanting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              {t('Optimize Planting') || 'Optimize Planting'}
            </button>
            <button
              type="button"
              onClick={simulateGrowth}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              {t('Simulate Growth') || 'Simulate Growth'}
            </button>
            <button
              type="button"
              onClick={resetLand}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t('Reset Land') || 'Reset Land'}
            </button>
          </div>
        </div>

        {/* Land Grid */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6 border">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{t('Land Grid ') || 'Interactive Land Plot (6x8 grid)'}</h2>
            <p className="text-sm text-gray-600">{t('Place Crops to check yield efficiency') || 'Click cells to plant selected crop'}</p>
          </div>

          <div className="grid grid-cols-8 gap-1 mb-6">
            {landGrid.map((cell, index) => {
              const plot = landPlots.find(p => p.x === index % 8 && p.y === Math.floor(index / 8));
              const crop = plot ? crops.find(c => c.name === plot.crop_type) : null;
              const bgColor = plot ? crop?.color || 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100';
              const borderClass = plot ? 'border-2 border-gray-600' : 'border border-gray-300';
              return (
                <button
                  key={cell.id}
                  type="button"
                  onClick={() => handleCropPlacement(index)}
                  className={`aspect-square ${bgColor} ${borderClass} rounded-lg`}
                  title={plot ? `${plot.crop_type} - Growth: ${plot.growth_stage}%` : 'Empty Plot'}
                >
                  {plot && (
                    <div className="flex items-center justify-center h-full w-full">
                      <Sprout className="w-4 h-4 text-gray-700" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {landPlots.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-800">Plots Planted</h3>
                <p className="text-2xl font-bold text-green-900">{landPlots.length}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">Avg Growth</h3>
                <p className="text-2xl font-bold text-blue-900">
                  {Math.round(landPlots.reduce((a, b) => a + b.growth_stage, 0) / landPlots.length)}
                  %
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-medium text-yellow-800">Avg Health</h3>
                <p className="text-2xl font-bold text-yellow-900">
                  {Math.round(landPlots.reduce((a, b) => a + b.health_score, 0) / landPlots.length)}
                  %
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-medium text-purple-800">Crop Diversity</h3>
                <p className="text-2xl font-bold text-purple-900">
                  {new Set(landPlots.map(p => p.crop_type)).size}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandMap;
