import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div 
        style={{background: 'rgba(15, 23, 42, 0.45)', border: '1px solid rgba(251, 191, 36, 0.25)'}}
        className="p-6 rounded-3xl shadow-xl backdrop-blur-md"
      >
        
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5 text-amber-400">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-white m-0">
              ระบบที่ใช้งานบ่อย <span className="text-amber-400 font-medium">(รายการโปรดของคุณ)</span>
            </h2>
          </div>
          <span className="text-[11px] font-bold text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            รวม {favoriteLinks.length} ระบบ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteLinks.map((link) => {
            const dept = departments.find(d => d.id === link.departmentId);
            return (
              <div
                key={link.id}
                style={{background: 'rgba(30, 41, 59, 0.25)', border: '1px solid rgba(255, 255, 255, 0.05)'}}
                className="group relative flex items-center justify-between p-4 rounded-2xl hover:border-amber-500/30 hover:bg-slate-900/40 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-3 truncate pr-2">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <IconRenderer name={link.iconName} className="w-4.5 h-4.5" />
                  </div>
                  <div className="truncate">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-amber-400 transition-colors duration-300 m-0">
                      {link.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 truncate font-light mt-0.5 m-0">
                      {dept?.name || 'บริการกลาง'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onToggleFavorite(link.id)}
                    className="p-1.5 text-amber-400 hover:text-amber-200 hover:bg-white/5 rounded-lg transition-colors"
                    title="เลิกปักหมุดรายการนี้"
                  >
                    <Star className="w-4 h-4 fill-amber-400" />
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-white transition-all shadow-md flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border border-cyan-400/20 active:scale-95"
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
