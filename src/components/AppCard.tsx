import React, { useState } from 'react';
import { Star, ExternalLink, Copy, Check, BookOpen, Lock, Sparkles, Wrench } from 'lucide-react';
import { AppScriptLink, Department } from '../types';
import { IconRenderer } from './IconRenderer';

interface AppCardProps {
  link: AppScriptLink;
  department?: Department;
  onToggleFavorite: (id: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  link,
  department,
  onToggleFavorite
}) => {
  // Status styling
  const renderStatusBadge = () => {
    switch (link.status) {
      case 'maintenance':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
            <Wrench className="w-3 h-3" /> ปรับปรุงระบบ
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <Sparkles className="w-3 h-3" /> Beta ทดสอบ
          </span>
        );
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-bounce">
            ★ ระบบใหม่
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            ● พร้อมใช้งาน
          </span>
        );
    }
  };

  const isMaintenance = link.status === 'maintenance';

  return (
    <div className={`group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border transition-all duration-300 p-5 ${
      isMaintenance
        ? 'border-red-900/50 opacity-75 hover:opacity-100'
        : 'border-blue-800/60 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1'
    }`}>
      
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-blue-950 border transition-all ${
              department ? department.themeColor.border : 'border-blue-700 text-blue-400'
            } group-hover:scale-110 duration-300 shadow-md`}>
              <IconRenderer name={link.iconName} className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-300/70 block mb-0.5">
                {department?.name || 'บริษัท'}
              </span>
              {renderStatusBadge()}
            </div>
          </div>

          <button
            onClick={() => onToggleFavorite(link.id)}
            className={`p-2 rounded-lg transition-colors ${
              link.isFavorite
                ? 'text-amber-400 hover:text-amber-200 bg-amber-500/10'
                : 'text-blue-500 hover:text-amber-400 hover:bg-blue-900/50'
            }`}
            title={link.isFavorite ? 'เลิกปักหมุดรายการนี้' : 'ปักหมุดไว้รายการโปรด'}
          >
            <Star className={`w-4 h-4 ${link.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
          {link.title}
        </h3>
        <p className="text-xs sm:text-sm text-blue-200/70 line-clamp-2 leading-relaxed font-light mb-4">
          {link.description}
        </p>
      </div>

      {/* Bottom Meta & Actions Row */}
      <div className="pt-4 border-t border-blue-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
        
        {/* Access requirement info */}
        <div className="flex items-center gap-1.5 text-[11px] text-blue-300/80 font-medium truncate">
          <Lock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="truncate">{link.accessRequired || 'พนักงานทุกคน'}</span>
          {link.updatedAt && (
            <span className="text-blue-400/60 hidden md:inline">({link.updatedAt})</span>
          )}
        </div>

        {/* Action Button Shelf */}
        <div className="flex items-center justify-end gap-1.5 shrink-0">
          
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
              isMaintenance
                ? 'bg-red-800/40 text-red-200 hover:bg-red-700/60 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20'
            }`}
            onClick={(e) => {
              if (isMaintenance) {
                e.preventDefault();
                console.warn('ระบบนี้กำลังอยู่ระหว่างปิดปรับปรุงชั่วคราว กรุณาติดต่อฝ่าย IT');
              }
            }}
          >
            <span>เปิดระบบ</span>
            <ExternalLink className="w-4 h-4" />
          </a>

        </div>

      </div>

    </div>
  );
};
