import React from 'react';
import { Star, ExternalLink, Sparkles } from 'lucide-react';
import { AppScriptLink, Department } from '../types';
import { IconRenderer } from './IconRenderer';

interface FavoritesBarProps {
  favoriteLinks: AppScriptLink[];
  departments: Department[];
  onToggleFavorite: (linkId: string) => void;
}

export const FavoritesBar: React.FC<FavoritesBarProps> = ({
  favoriteLinks,
  departments,
  onToggleFavorite
}) => {
  if (favoriteLinks.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="glass p-6 border border-white/15 shadow-2xl">
        
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5 text-amber-300">
            <Star className="w-5 h-5 fill-amber-300 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
            <h2 className="text-base sm:text-lg font-light tracking-tight text-white">
              ระบบที่ใช้งานบ่อย <span className="font-bold">(รายการโปรดของคุณ)</span>
            </h2>
          </div>
          <span className="text-xs text-amber-300 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {favoriteLinks.length} ระบบ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteLinks.map((link) => {
            const dept = departments.find(d => d.id === link.departmentId);
            return (
              <div
                key={link.id}
                className="group relative flex items-center justify-between p-4 rounded-2xl glass-subtle card-hover border border-white/10 hover:border-white/25 shadow-sm"
              >
                <div className="flex items-center gap-3 truncate pr-2">
                  <div className="p-2.5 rounded-xl bg-white/10 text-amber-300 border border-white/15 shrink-0 group-hover:scale-110 transition-transform">
                    <IconRenderer name={link.iconName} className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="truncate">
                    <h3 className="text-sm font-medium text-white truncate group-hover:text-blue-300 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-[11px] text-blue-200/60 truncate font-light mt-0.5">
                      {dept?.name || 'ทั่วไป'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onToggleFavorite(link.id)}
                    className="p-1.5 text-amber-300 hover:text-amber-100 hover:bg-white/10 rounded-lg transition-colors"
                    title="เลิกปักหมุดรายการนี้"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-500 hover:bg-blue-400 text-white rounded-xl transition-all shadow-md flex items-center justify-center border border-white/20 active:scale-95"
                    title="เปิดระบบในแท็บใหม่"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
