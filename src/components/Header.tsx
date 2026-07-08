import React, { useState, useEffect, useRef } from 'react';
import { Ship, Phone, Settings, Search, X, Clock } from 'lucide-react';

interface HeaderProps {
  onOpenDirectory: () => void;
  onOpenManage: () => void;
  announcementCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDirectory,
  onOpenManage,
  announcementCount,
  searchQuery,
  setSearchQuery
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
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

  // Listen for '/' key to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b border-[#1e293b]/80 shadow-2xl transition-all" style={{background: 'rgba(11, 15, 26, 0.8)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Company Title */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3.5 group cursor-pointer shrink-0"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-2.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
            <Ship className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors m-0">
                CHAO PHRAYA <span className="text-cyan-400 font-normal">TOURIST BOAT</span>
              </h1>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-cyan-400 border border-cyan-400/20 tracking-wider">
                PORTAL
              </span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-light m-0 mt-0.5">
              Application Central Hub
            </p>
          </div>
        </div>

        {/* Dynamic Center Search Bar */}
        <div className="flex-1 max-w-md relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="ค้นหาชื่อระบบงาน หรือคีย์เวิร์ด... (กด '/' เพื่อค้นหา)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)'}}
            className="w-full pl-9 pr-10 py-2 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 transition-all font-medium"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                /
              </kbd>
            </div>
          )}
        </div>

        {/* Right Info and Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Clock Widget */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-slate-800/80 font-medium">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono tracking-wide">{timeStr}</span>
          </div>

          {/* Directory Button */}
          <button
            onClick={onOpenDirectory}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white transition-all text-xs font-semibold"
            style={{background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)'}}
            title="เบอร์ติดต่อภายในองค์กร"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">เบอร์ติดต่อ</span>
          </button>

          {/* Manage Button */}
          <button
            onClick={onOpenManage}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white font-bold tracking-wide transition-all text-xs border bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border-cyan-400/20 shadow-md shadow-blue-900/20 active:scale-95"
            title="จัดการระบบ"
          >
            <Settings className="w-4 h-4 text-white" />
            <span className="hidden md:inline">จัดการระบบ</span>
            {announcementCount > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse ml-0.5" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
