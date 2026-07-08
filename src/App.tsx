import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FavoritesBar } from './components/FavoritesBar';
import { AppCard } from './components/AppCard';
import { IconRenderer } from './components/IconRenderer';
import { ManageModal } from './components/ManageModal';
import { DirectoryModal } from './components/DirectoryModal';
import { Footer } from './components/Footer';

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
    <div className="min-h-screen relative flex flex-col bg-[#041e3a] text-white selection:bg-blue-400 selection:text-slate-950 font-sans overflow-x-hidden">
      <div className="mesh-bg"></div>
      <div className="river-flow"></div>
      
      {/* Sticky Header */}
      <Header
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenManage={() => setIsManageOpen(true)}
        announcementCount={announcements.length}
      />

      {/* Hero Banner & Search Marquee */}
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
        
        {/* Section Title when filtering */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-blue-900/60">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>
              {selectedDept === 'all'
                ? 'ระบบงานทั้งหมดในองค์กร'
                : `ระบบงานประจำ${DEPARTMENTS.find(d => d.id === selectedDept)?.name}`}
            </span>
            {searchQuery && (
              <span className="text-xs font-normal text-cyan-300 ml-2">
                (ผลการค้นหา: &quot;{searchQuery}&quot;)
              </span>
            )}
          </h2>
          <span className="text-xs text-blue-300 font-mono">
            แสดงผล {filteredLinks.length} รายการ
          </span>
        </div>

        
        {/* Empty State */}
        {filteredLinks.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-blue-900/60 max-w-xl mx-auto p-8 my-8 shadow-inner">
            <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center mx-auto mb-4 border border-blue-800 text-cyan-400">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">ไม่พบระบบงานที่ต้องการ</h3>
            <p className="text-sm text-blue-200/70 mb-6 max-w-sm mx-auto">
              ลองตรวจสอบคำสะกด หรือเลือกดูในแท็บ &quot;ทุกแผนก / ระบบทั้งหมด&quot;
            </p>
            <div className="flex items-center justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-md"
                >
                  ล้างคำค้นหา
                </button>
              )}
              {selectedDept !== 'all' && (
                <button
                  onClick={() => setSelectedDept('all')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-200 font-semibold text-sm transition-all border border-blue-700"
                >
                  แสดงทุกแผนก
                </button>
              )}
            </div>
          </div>
        ) : selectedDept === 'all' && !searchQuery ? (
          /* Sidebar Split Layout */
          <div className="mx-auto max-w-7xl rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[580px] w-full border border-blue-200/30 shadow-2xl animate-fade-in" style={{background: '#0f2040'}}>
            <div className="w-full md:w-72 p-5 md:p-6 border-b md:border-b-0 md:border-r shrink-0 flex flex-col shadow-xl" style={{background: '#ffffff', borderColor: '#cbd5e1'}}>
              <div className="px-2 py-2 text-xs font-bold tracking-wider uppercase border-b pb-3 mb-3" style={{color: '#1e40af', borderColor: '#e2e8f0'}}>
                หมวดแผนกงาน ({DEPARTMENTS.length})
              </div>
              <div className="space-y-1.5">
                {DEPARTMENTS.map((dept) => {
                  const deptLinks = filteredLinks.filter((l) => l.departmentId === dept.id);
                  const isActive = (activeSidebarDept || 'company') === dept.id;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => setActiveSidebarDept(dept.id)}
                      style={isActive ? {background: '#1e40af', color: '#ffffff', border: '1px solid #3b82f6'} : {background: '#f1f5f9', color: '#1e293b', border: '1px solid #e2e8f0'}}
                      className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all hover:opacity-90`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div style={isActive ? {background: '#3b82f6', color: '#fff', padding: '6px', borderRadius: '10px'} : {background: '#dbeafe', color: '#1d4ed8', padding: '6px', borderRadius: '10px'}}>
                          <IconRenderer name={dept.iconName} className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold truncate">{dept.name}</span>
                      </div>
                      <span style={isActive ? {background: '#ffffff', color: '#1e40af', padding: '1px 8px', borderRadius: '99px', fontWeight: 700, fontSize: '12px'} : {background: '#e0e7ff', color: '#1e40af', padding: '1px 8px', borderRadius: '99px', fontSize: '12px'}}>
                        {deptLinks.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 p-6 sm:p-8 md:p-10 bg-[#080f1d] overflow-y-auto">
              {(() => {
                const currentDept = DEPARTMENTS.find(d => d.id === (activeSidebarDept || 'company')) || DEPARTMENTS[0];
                const deptLinks = filteredLinks.filter(l => l.departmentId === currentDept.id);
                return (
                  <div className="space-y-10 animate-fade-in" key={currentDept.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-blue-900/50 gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3.5 rounded-2xl bg-gradient-to-r ${currentDept.themeColor.gradient} text-white shadow-xl shrink-0`}>
                          <IconRenderer name={currentDept.iconName} className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 m-0 tracking-tight">
                            {currentDept.name}
                          </h3>
                          <p className="text-xs text-blue-300 font-light m-0 mt-1 max-w-xl">
                            {currentDept.nameEn} &bull; {currentDept.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-blue-950 text-blue-300 border border-blue-900/60 shrink-0">
                        รวม {deptLinks.length} ระบบงาน
                      </span>
                    </div>
                    {deptLinks.length === 0 ? (
                      <div className="py-12 text-center text-blue-200/50">
                        ไม่พบระบบงานในแผนกนี้
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
              })()}
            </div>
          </div>
        ) : (
          /* Cards Grid View in Single Container */
          <div className="glass p-6 sm:p-8 md:p-10 border border-white/15 shadow-2xl animate-fade-in space-y-6">
            {selectedDept !== 'all' && (() => {
              const activeDept = DEPARTMENTS.find(d => d.id === selectedDept);
              if (!activeDept) return null;
              return (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-r ${activeDept.themeColor.gradient} text-white shadow-lg shrink-0`}>
                      <IconRenderer name={activeDept.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex flex-wrap items-center gap-2 m-0 tracking-tight">
                        {activeDept.name}
                        <span className="text-xs font-light text-blue-300/80">({activeDept.nameEn})</span>
                      </h3>
                      <p className="text-xs text-blue-200/60 font-light m-0 mt-0.5 leading-relaxed max-w-xl">
                        {activeDept.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-blue-300 border border-white/10 self-start sm:self-center shrink-0">
                    {filteredLinks.length} ระบบ
                  </span>
                </div>
              );
            })()}
            {searchQuery && (
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-sm font-light text-blue-200">
                <span>ผลการค้นหาสำหรับ &quot;<span className="font-bold text-white">{searchQuery}</span>&quot;</span>
                <span className="font-mono text-xs text-blue-300">{filteredLinks.length} ระบบ</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLinks.map((link) => {
                const dept = DEPARTMENTS.find(d => d.id === link.departmentId);
                return (
                  <AppCard
                    key={link.id}
                    link={link}
                    department={dept}
                    onToggleFavorite={handleToggleFavorite}
                  />
                );
              })}
            </div>
          </div>
        )}

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
