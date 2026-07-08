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
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Redesign Status Badge with premium neon look
  const renderStatusBadge = () => {
    switch (link.status) {
      case 'maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/25 animate-pulse">
            <Wrench className="w-3 h-3" /> ปรับปรุงระบบ
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/25">
            <Sparkles className="w-3 h-3" /> Beta ทดสอบ
          </span>
        );
      case 'new':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-400/25 animate-pulse">
            ★ ระบบใหม่
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            ● พร้อมใช้งาน
          </span>
        );
    }
  };

  const isMaintenance = link.status === 'maintenance';
  const deptTheme = department?.themeColor || {
    bg: 'bg-slate-900',
    border: 'border-slate-800',
    text: 'text-slate-400',
    badge: 'bg-slate-800 text-slate-300',
    gradient: 'from-blue-600 to-cyan-500'
  };

  return (
    <div 
      style={{
        background: 'rgba(30, 41, 59, 0.25)', 
        borderColor: isMaintenance ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.05)'
      }}
      className={`group relative flex flex-col justify-between rounded-3xl border transition-all duration-300 p-5 hover:bg-slate-900/40 ${
        isMaintenance
          ? 'opacity-85 hover:opacity-100 hover:border-rose-500/50'
          : 'hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/20 hover:-translate-y-1'
      }`}
    >
      
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Animated Gradient Icon Wrapper */}
            <div className={`p-3 rounded-2xl bg-slate-900 border border-slate-800/80 text-cyan-400 group-hover:scale-105 transition-all duration-300 shadow-inner`}>
              <IconRenderer name={link.iconName} className="w-5.5 h-5.5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-cyan-500/80 block mb-0.5">
                {department?.name || 'บริการกลาง'}
              </span>
              {renderStatusBadge()}
            </div>
          </div>

          {/* Pin Button */}
          <button
            onClick={() => onToggleFavorite(link.id)}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              link.isFavorite
                ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800/50 border border-transparent'
            }`}
            title={link.isFavorite ? 'เลิกปักหมุดรายการนี้' : 'ปักหมุดไว้รายการโปรด'}
          >
            <Star className={`w-4 h-4 ${link.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1 m-0">
          {link.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed font-light mb-4 m-0">
          {link.description}
        </p>
      </div>

      {/* Bottom Meta & Actions Row */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
        
        {/* Access requirement info */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium truncate">
          <Lock className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
          <span className="truncate">{link.accessRequired || 'พนักงานทุกคน'}</span>
          {link.updatedAt && (
            <span className="text-slate-500 hidden md:inline">({link.updatedAt})</span>
          )}
        </div>

        {/* Action Button Shelf */}
        <div className="flex items-center justify-end gap-1.5 shrink-0">
          {/* Copy link */}
          <button
            onClick={handleCopyLink}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition-all"
            title="คัดลอกลิงก์ระบบงาน"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Doc button */}
          {link.docUrl && (
            <a
              href={link.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition-all flex items-center justify-center"
              title="ดูคู่มือการใช้งาน"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          )}
          
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 ${
              isMaintenance
                ? 'bg-rose-950/30 text-rose-400 border border-rose-500/20 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border border-cyan-400/20 shadow-cyan-900/20'
            }`}
            onClick={(e) => {
              if (isMaintenance) {
                e.preventDefault();
                alert('ระบบนี้กำลังอยู่ระหว่างปิดปรับปรุงชั่วคราว กรุณาติดต่อฝ่าย IT');
              }
            }}
          >
            <span>เปิดระบบ</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

        </div>

      </div>

    </div>
  );
};
