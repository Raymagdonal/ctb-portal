import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FavoritesBar } from './components/FavoritesBar';
import { AppCard } from './components/AppCard';
import { IconRenderer } from './components/IconRenderer';
import { ManageModal } from './components/ManageModal';
import { DirectoryModal } from './components/DirectoryModal';
import { Footer } from './components/Footer';
import ctbLogo from './Final-CTB LOGO-03.png';

import { DEPARTMENTS, INITIAL_LINKS, INITIAL_ANNOUNCEMENTS, DIRECTORY_CONTACTS } from './data/initialData';
import { AppScriptLink, Announcement, DepartmentId } from './types';
import { SearchX, RotateCcw, LayoutGrid, List, ChevronsUpDown, Columns, Sidebar, ChevronDown, ChevronRight, Copy, ExternalLink, Star, Check, Sparkles } from 'lucide-react';

const LINKS_STORAGE_KEY = 'ctb_portal_links_v2';
const ANNOUNCEMENTS_STORAGE_KEY = 'ctb_portal_announcements_v1';

export default function App() {
  // --- Persistent States ---
  const [links, setLinks] = useState<AppScriptLink[]>(() => {
    try {
      const savedV2 = localStorage.getItem(LINKS_STORAGE_KEY);
      if (savedV2) return JSON.parse(savedV2);

      const savedV1 = localStorage.getItem('ctb_portal_links_v1');
      if (savedV1) {
        const parsed: AppScriptLink[] = JSON.parse(savedV1);
        return parsed.map(l => {
          if ((l.departmentId as any) === 'accounting' || (l.departmentId as any) === 'finance') {
            return { ...l, departmentId: 'accounting_finance' as any };
          }
          return l;
        });
      }
    } catch (e) {
      console.error('Error loading links cache', e);
    }
    return INITIAL_LINKS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading announcements cache', e);
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  // --- UI Filter & Navigation States ---
  const [selectedDept, setSelectedDept] = useState<DepartmentId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

  const [activeSidebarDept, setActiveSidebarDept] = useState<string>('company');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
  }, [announcements]);


  // --- Handlers ---
  const handleToggleFavorite = (id: string) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, isFavorite: !l.isFavorite } : l));
  };

  const handleSaveLinks = (newLinks: AppScriptLink[]) => {
    setLinks(newLinks);
  };

  const handleSaveAnnouncements = (newAnns: Announcement[]) => {
    setAnnouncements(newAnns);
  };

  const handleResetData = () => {
    setLinks(INITIAL_LINKS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    localStorage.removeItem(LINKS_STORAGE_KEY);
    localStorage.removeItem(ANNOUNCEMENTS_STORAGE_KEY);
  };

  // --- Computed Filtered List ---
  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      // Dept filter
      if (selectedDept !== 'all' && link.departmentId !== selectedDept) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const deptName = DEPARTMENTS.find(d => d.id === link.departmentId)?.name.toLowerCase() || '';
        const matchesTitle = link.title.toLowerCase().includes(q);
        const matchesDesc = link.description.toLowerCase().includes(q);
        const matchesDept = deptName.includes(q);
        const matchesUrl = link.url.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesDept || matchesUrl;
      }
      return true;
    });
  }, [links, selectedDept, searchQuery]);

  // Favorite Links
  const favoriteLinks = useMemo(() => {
    return links.filter(l => l.isFavorite);
  }, [links]);

  // Link counts per dept
  const linkCountsByDept = useMemo(() => {
    const counts: Record<string, number> = {};
    links.forEach(l => {
      counts[l.departmentId] = (counts[l.departmentId] || 0) + 1;
    });
    return counts;
  }, [links]);

  return (
    <div className="min-h-screen relative flex flex-col bg-[#030712] text-white selection:bg-cyan-500 selection:text-slate-950 font-sans overflow-x-hidden">
      <div className="mesh-bg"></div>
      <div className="river-flow"></div>
      
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[-15] opacity-[0.035] select-none">
        <img src={ctbLogo} alt="CTB Logo Watermark" className="w-[600px] max-w-[85vw] object-contain animate-float" />
      </div>
      
      {/* Sticky Header */}
      <Header
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenManage={() => setIsManageOpen(true)}
        announcementCount={announcements.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Banner */}
      <HeroBanner
        announcements={announcements}
      />

      {/* Favorites / Frequent Shelf (Hide when searching specifically) */}
      {!searchQuery && (
        <FavoritesBar
          favoriteLinks={favoriteLinks}
          departments={DEPARTMENTS}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-12">

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6 pb-2.5 border-b border-slate-800/85">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2 m-0">
            <span>ระบบงานทั้งหมดในองค์กร</span>
            {searchQuery && (
              <span className="text-xs font-normal text-cyan-400 ml-2">
                (ค้นหาสำหรับ: &quot;{searchQuery}&quot;)
              </span>
            )}
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            แสดงผล {filteredLinks.length} รายการ
          </span>
        </div>

        {/* Always-Visible Sidebar Split Layout */}
        <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row w-full border shadow-2xl animate-fade-in" style={{minHeight: '600px', background: '#0b0f1a', borderColor: 'rgba(255,255,255,0.06)'}}>

          {/* === LEFT SIDEBAR — always visible === */}
          <div className="w-full md:w-72 p-5 md:p-6 border-b md:border-b-0 md:border-r shrink-0 flex flex-col gap-2" style={{background: '#ffffff', borderColor: '#e2e8f0'}}>
            <div className="text-xs font-extrabold tracking-wider uppercase pb-3 mb-1 border-b" style={{color: '#1e40af', borderColor: '#f1f5f9'}}>
              หมวดแผนกงาน ({DEPARTMENTS.length})
            </div>
            {DEPARTMENTS.map((dept) => {
              const deptLinkCount = links.filter((l) => l.departmentId === dept.id).length;
              const isActive = activeSidebarDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => { setActiveSidebarDept(dept.id); setSearchQuery(''); }}
                  style={isActive
                    ? {background: '#1e40af', color: '#ffffff', border: '1px solid #3b82f6', borderRadius: '14px', padding: '10px 14px'}
                    : {background: '#f8fafc', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '10px 14px'}
                  }
                  className="w-full flex items-center justify-between text-left transition-all hover:opacity-90 active:scale-98 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div style={isActive
                      ? {background: '#3b82f6', color: '#fff', padding: '6px', borderRadius: '10px', flexShrink: 0}
                      : {background: '#e0e7ff', color: '#1d4ed8', padding: '6px', borderRadius: '10px', flexShrink: 0}
                    }>
                      <IconRenderer name={dept.iconName} className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold truncate">{dept.name}</span>
                  </div>
                  <span style={isActive
                    ? {background: '#ffffff', color: '#1e40af', padding: '2px 8px', borderRadius: '99px', fontWeight: 700, fontSize: '11px', flexShrink: 0}
                    : {background: '#e2e8f0', color: '#1e40af', padding: '2px 8px', borderRadius: '99px', fontSize: '11px', fontWeight: 600, flexShrink: 0}
                  }>
                    {deptLinkCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* === RIGHT CONTENT PANEL === */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto" style={{background: '#090d16'}}>
            {searchQuery ? (
              /* Search Results Mode */
              filteredLinks.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-slate-800 text-cyan-400">
                    <SearchX className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">ไม่พบระบบงานที่ต้องการ</h3>
                  <p className="text-xs text-slate-400 mb-6 font-light">ลองตรวจสอบคำสะกด หรือเลือกแผนกจากเมนูด้านซ้าย</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
                  >
                    ล้างคำค้นหา
                  </button>
                </div>
              ) : (
                <div className="space-y-8 animate-fade-in">
                  <div className="pb-4 border-b border-slate-800/80 text-sm text-slate-400">
                    ผลการค้นหา &quot;<span className="font-bold text-white">{searchQuery}</span>&quot; — พบ {filteredLinks.length} ระบบงาน
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredLinks.map((link) => {
                      const dept = DEPARTMENTS.find(d => d.id === link.departmentId);
                      return (
                        <AppCard key={link.id} link={link} department={dept} onToggleFavorite={handleToggleFavorite} />
                      );
                    })}
                  </div>
                </div>
              )
            ) : (
              /* Department Content Mode */
              (() => {
                const currentDept = DEPARTMENTS.find(d => d.id === activeSidebarDept) || DEPARTMENTS[0];
                const deptLinks = links.filter(l => l.departmentId === currentDept.id);
                return (
                  <div className="space-y-8 animate-fade-in" key={currentDept.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3.5 rounded-2xl bg-gradient-to-r ${currentDept.themeColor.gradient} text-white shadow-xl shrink-0`}>
                          <IconRenderer name={currentDept.iconName} className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white m-0 tracking-tight">
                            {currentDept.name}
                          </h3>
                          <p className="text-xs text-slate-400 font-light m-0 mt-1">
                            {currentDept.nameEn} &bull; {currentDept.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-slate-900 text-cyan-400 border border-slate-850 shrink-0">
                        รวม {deptLinks.length} ระบบงาน
                      </span>
                    </div>
                    {deptLinks.length === 0 ? (
                      <div className="py-16 text-center text-slate-500 font-light text-sm">
                        ยังไม่มีระบบงานลงทะเบียนในแผนกนี้
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {deptLinks.map((link) => (
                          <AppCard key={link.id} link={link} department={currentDept} onToggleFavorite={handleToggleFavorite} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()
            )}
          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenManage={() => setIsManageOpen(true)}
      />

      {/* Modals */}
      <ManageModal
        isOpen={isManageOpen}
        onClose={() => setIsManageOpen(false)}
        links={links}
        announcements={announcements}
        departments={DEPARTMENTS}
        onSaveLinks={handleSaveLinks}
        onSaveAnnouncements={handleSaveAnnouncements}
        onResetData={handleResetData}
      />

      <DirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        contacts={DIRECTORY_CONTACTS}
      />

    </div>
  );
}
