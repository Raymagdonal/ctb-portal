import React, { useState, useEffect } from 'react';
import { Ship, Phone, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenDirectory: () => void;
  onOpenManage: () => void;
  announcementCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDirectory,
  onOpenManage,
  announcementCount
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setTimeStr(now.toLocaleDateString('th-TH', options));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#041e3a]/75 border-b border-white/10 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Company Title */}
        <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 p-2 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
            <Ship className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-light tracking-tight text-white group-hover:text-blue-300 transition-colors m-0">
                CHAO PHRAYA <span className="font-bold">TOURIST BOAT</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 hidden sm:inline-block tracking-widest uppercase">
                PORTAL
              </span>
            </div>
            <p className="text-xs text-blue-300/60 uppercase tracking-[0.15em] font-light m-0 mt-0.5">
              Central Application & Scripts Portal
            </p>
          </div>
        </div>

        {/* Center / Right Meta Information */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-blue-100/80 bg-white/[0.04] px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span>ระบบออนไลน์ :</span>
            <span className="text-white font-mono tracking-wider">{timeStr}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Announcements Badge (Mobile / Quick Info) */}
          <div className="flex lg:hidden items-center text-xs font-mono text-blue-300 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/10">
            {timeStr.split(' ')[timeStr.split(' ').length - 1]}
          </div>


          <button
            onClick={onOpenManage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold tracking-wide transition-all text-xs sm:text-sm shadow-lg shadow-blue-500/20 active:scale-95 border border-blue-400/40"
            title="เพิ่ม/แก้ไข ลิงก์ App Script หรือประกาศบริษัท (สำหรับ IT)"
          >
            <Settings className="w-4 h-4 animate-spin-slow" />
            <span>จัดการลิงก์</span>
            {announcementCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 -ml-1 animate-pulse" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
