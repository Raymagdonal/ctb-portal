import React, { useState, useEffect } from 'react';
import { Megaphone, X, Bell } from 'lucide-react';
import { Announcement } from '../types';

interface HeroBannerProps {
  announcements: Announcement[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  announcements
}) => {
  const [activeAnnIndex, setActiveAnnIndex] = useState(0);
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [greeting, setGreeting] = useState('สวัสดีครับ');

  const importantAnnouncements = announcements.filter(a => a.isImportant);
  const currentAnn = importantAnnouncements[activeAnnIndex] || announcements[0];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('สวัสดีตอนเช้า (Good Morning)');
    } else if (hour < 17) {
      setGreeting('สวัสดีตอนบ่าย (Good Afternoon)');
    } else {
      setGreeting('สวัสดีตอนเย็น (Good Evening)');
    }
  }, []);

  return (
    <div className="relative pt-6 pb-6 overflow-hidden">
      {/* Dynamic ambient blur background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-36 bg-gradient-to-b from-cyan-500/5 via-blue-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sleek Announcement Alert Ribbon */}
        {showAnnouncements && currentAnn && (
          <div 
            style={{background: 'rgba(30, 41, 59, 0.35)', border: '1px solid rgba(6, 182, 212, 0.25)'}}
            className="mb-6 p-4 rounded-2xl shadow-lg backdrop-blur-md animate-fade-in"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm">
              
              <div className="flex items-center gap-3 overflow-hidden w-full">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0">
                  <Megaphone className="w-4.5 h-4.5 text-cyan-400" />
                </div>
                <div className="flex flex-col overflow-hidden w-full">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 shrink-0">
                      {currentAnn.badge}
                    </span>
                    <span className="font-semibold text-white truncate">{currentAnn.title}</span>
                  </div>
                  <span className="text-slate-300 text-xs mt-0.5 truncate font-light">
                    {currentAnn.detail}
                  </span>
                </div>
              </div>

              {/* Slider Dots & Close */}
              <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 border-slate-800/80 pt-2.5 md:pt-0">
                {importantAnnouncements.length > 1 && (
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
                    {importantAnnouncements.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveAnnIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === activeAnnIndex ? 'w-5 bg-cyan-400' : 'w-1.5 bg-slate-700 hover:bg-slate-600'}`}
                        title={`ประกาศที่ ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setShowAnnouncements(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                  title="ปิดประกาศ"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Dynamic Greeting Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>{greeting}</span>
              <span className="text-cyan-400 animate-pulse">👋</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
              ยินดีต้อนรับสู่ระบบพอร์ทัลรวมแอปพลิเคชันและเครื่องมืออำนวยความสะดวกสำหรับพนักงาน CTB
            </p>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/40 border border-slate-800/80 px-4 py-2.5 rounded-2xl backdrop-blur-sm self-start md:self-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">ทุกระบบออนไลน์และทำงานปกติ</span>
          </div>
        </div>

      </div>
    </div>
  );
};
