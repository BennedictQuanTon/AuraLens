import React from 'react';
import { CloudRain, Sun, RefreshCw, Thermometer, ShieldCheck } from 'lucide-react';
import type { WeatherContext } from '../../types/entityGraph.js';

interface WeatherBadgeProps {
  weather: WeatherContext;
  onToggleRain: () => void;
}

export const WeatherBadge: React.FC<WeatherBadgeProps> = ({ weather, onToggleRain }) => {
  return (
    <div className="w-full glass-card p-3 rounded-2xl border border-white/80 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {/* Weather Info */}
        <div className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              weather.isRaining
                ? 'bg-blue-500/15 text-blue-600'
                : 'bg-amber-500/15 text-amber-600'
            }`}
          >
            {weather.isRaining ? (
              <CloudRain className="w-5 h-5 animate-pulse" />
            ) : (
              <Sun className="w-5 h-5 animate-spin [animation-duration:12s]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-gray-900">
                {weather.city} · {weather.currentHour}:00
              </span>
              <span className="text-[10px] font-bold text-gray-500 flex items-center gap-0.5">
                <Thermometer className="w-3 h-3 text-red-500" />
                {weather.temperature}°C
              </span>
            </div>
            <span
              className={`text-[11px] font-bold ${
                weather.isRaining ? 'text-blue-600' : 'text-amber-600'
              }`}
            >
              {weather.isRaining ? '🌧️ Trời đang mưa rào' : '☀️ Nắng đẹp rạng rỡ'}
            </span>
          </div>
        </div>

        {/* Demo Simulation Toggle */}
        <button
          onClick={onToggleRain}
          className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-xl bg-gray-100/90 hover:bg-gray-200 text-gray-700 active:scale-95 transition-all shadow-xs"
          title="Bấm để giả lập trời mưa / trời nắng kiểm tra AI Grounding"
        >
          <RefreshCw className="w-3 h-3 text-gray-500" />
          <span>{weather.isRaining ? 'Chuyển Nắng' : 'Giả Lập Mưa'}</span>
        </button>
      </div>

      {/* Grounding Filter Status Banner */}
      <div
        className={`px-2.5 py-1.5 rounded-xl text-[10px] font-semibold flex items-center gap-1.5 ${
          weather.isRaining
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
        <span>
          {weather.isRaining
            ? 'GraphRAG: Đã tự động lọc 100% quán có máy lạnh trong nhà.'
            : 'GraphRAG: Tự do khám phá không gian mở và photospot ngoài trời.'}
        </span>
      </div>
    </div>
  );
};
