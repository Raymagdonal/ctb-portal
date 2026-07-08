import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { Announcement } from '../types';

interface HeroBannerProps {
  announcements: Announcement[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  announcements
}) => {
  const [activeAnnIndex, setActiveAnnIndex] = useState(0);
  const [showAnnouncements, setShowAnnouncements] = useState(true);

  const importantAnnouncements = announcements.filter(a => a.isImportant);
  const currentAnn = importantAnnouncements[activeAnnIndex] || announcements[0];

  return (
    <div className="relative pt-6 pb-10 overflow-hidden">
      {/* Glow decorative gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Announcement Banner Box */}
        {showAnnouncements && currentAnn && (
          <div className="mb-8 glass-subtle p-3 rounded-2xl border border-white/10 shadow-xl animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-3 overflow-hidden w-full">
                <span className="flex h-3 w-3 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 truncate">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase rounded-full bg-white/10 text-blue-300 border border-white/10 shrink-0">
                    {currentAnn.badge}
                  </span>
                  <span className="font-semibold text-white truncate">{currentAnn.title}</span>
                  <span className="text-blue-200/60 hidden md:inline truncate font-light">— {currentAnn.detail}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
                {importantAnnouncements.length > 1 && (
                  <div className="flex items-center gap-1.5 text-xs text-blue-300 mr-2 font-mono">
                    {importantAnnouncements.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveAnnIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === activeAnnIndex ? 'w-6 bg-blue-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                        title={`ประกาศที่ ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setShowAnnouncements(false)}
                  className="p-1 rounded-lg text-blue-300/60 hover:text-white hover:bg-white/10 transition-colors text-xs"
                  title="ปิดประกาศนี้"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Title & Welcome */}
        <div className="text-center max-w-3xl mx-auto my-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-blue-300 text-xs font-light tracking-widest uppercase mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Google Apps Script Central Portal v1.1</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white m-0 leading-tight">
            ระบบงานออนไลน์ <span className="font-bold text-white">CTB PORTAL</span>
          </h1>
        </div>

      </div>
    </div>
  );
};
