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

  // --- 5 Design Variations States ---
  const [groupStyle, setGroupStyle] = useState<'style1' | 'style2' | 'style3' | 'style4' | 'style5'>('style3');
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({
    company: true,
    hr: true,
    it: true,
    accounting_finance: true,
    legal_ohs: true,
    marketing: true,
    operations: true
  });
  const [activeSidebarDept, setActiveSidebarDept] = useState<string>('company');

  const toggleExpanded = (deptId: string) => {
    setExpandedDepts(prev => ({ ...prev, [deptId]: !(prev[deptId] ?? true) }));
  };

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
          /* Grouped by Department View in Single Container - 5 Variations */
          groupStyle === 'style1' ? (
            /* Style 1: Modern Stack */
            <div className="glass p-6 sm:p-8 md:p-10 border border-white/15 shadow-2xl animate-fade-in divide-y divide-white/10">
              {DEPARTMENTS.map((dept) => {
                const deptLinks = filteredLinks.filter((l) => l.departmentId === dept.id);
                if (deptLinks.length === 0) return null;
                return (
                  <section key={dept.id} className="pt-10 first:pt-0 pb-10 last:pb-0 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-r ${dept.themeColor.gradient} text-white shadow-lg shrink-0`}>
                          <IconRenderer name={dept.iconName} className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white flex flex-wrap items-center gap-2 m-0 tracking-tight">
                            {dept.name}
                            <span className="text-xs font-light text-blue-300/80">({dept.nameEn})</span>
                          </h3>
                          <p className="text-xs text-blue-200/60 font-light m-0 mt-0.5 leading-relaxed max-w-xl">
                            {dept.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-blue-300 border border-white/10 self-start sm:self-center shrink-0">
                        {deptLinks.length} ระบบ
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
                      {deptLinks.map((link) => (
                        <AppCard
                          key={link.id}
                          link={link}
                          department={dept}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : groupStyle === 'style2' ? (
            /* Style 2: Accordion Compact */
            <div className="glass p-6 sm:p-8 md:p-10 border border-white/15 shadow-2xl animate-fade-in space-y-5">
              {DEPARTMENTS.map((dept) => {
                const deptLinks = filteredLinks.filter((l) => l.departmentId === dept.id);
                if (deptLinks.length === 0) return null;
                const isExpanded = expandedDepts[dept.id] ?? true;
                return (
                  <div key={dept.id} className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-all shadow-md">
                    <button
                      onClick={() => toggleExpanded(dept.id)}
                      className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left gap-3"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-r ${dept.themeColor.gradient} text-white shadow-lg shrink-0`}>
                          <IconRenderer name={dept.iconName} className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white flex flex-wrap items-center gap-2 m-0 tracking-tight">
                            {dept.name}
                            <span className="text-xs font-light text-blue-300/80">({dept.nameEn})</span>
                          </h3>
                          <p className="text-xs text-blue-200/60 font-light m-0 mt-0.5 max-w-xl line-clamp-1">
                            {dept.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-blue-300 border border-white/10">
                          {deptLinks.length} ระบบ
                        </span>
                        <div className={`p-1.5 rounded-lg bg-white/5 text-blue-300 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="p-6 border-t border-white/10 bg-black/20 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {deptLinks.map((link) => (
                            <AppCard key={link.id} link={link} department={dept} onToggleFavorite={handleToggleFavorite} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : groupStyle === 'style3' ? (
            /* Style 3: Sidebar Split */
            <div className="glass border border-white/15 shadow-2xl animate-fade-in rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
              <div className="w-full md:w-80 bg-slate-950/60 p-4 border-b md:border-b-0 md:border-r border-white/10 space-y-1.5 shrink-0">
                <div className="px-3 py-2 text-xs font-bold tracking-wider uppercase text-blue-400">
                  หมวดแผนกงาน ({DEPARTMENTS.length})
                </div>
                {DEPARTMENTS.map((dept) => {
                  const deptLinks = filteredLinks.filter((l) => l.departmentId === dept.id);
                  if (deptLinks.length === 0) return null;
                  const isActive = (activeSidebarDept || 'company') === dept.id;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => setActiveSidebarDept(dept.id)}
                      className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600/40 to-cyan-500/20 border border-blue-400/40 text-white shadow-lg shadow-blue-500/10 pl-4'
                          : 'hover:bg-white/5 text-blue-200/70 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${dept.themeColor.gradient} text-white shrink-0`}>
                          <IconRenderer name={dept.iconName} className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold truncate">{dept.name}</span>
                      </div>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-400 text-slate-950 font-bold' : 'bg-white/5 text-blue-300'}`}>
                        {deptLinks.length}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex-1 p-6 sm:p-8 md:p-10 bg-slate-900/40 overflow-y-auto">
                {(() => {
                  const currentDept = DEPARTMENTS.find(d => d.id === (activeSidebarDept || 'company')) || DEPARTMENTS[0];
                  const deptLinks = filteredLinks.filter(l => l.departmentId === currentDept.id);
                  return (
                    <div className="space-y-8 animate-fade-in" key={currentDept.id}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3.5 rounded-2xl bg-gradient-to-r ${currentDept.themeColor.gradient} text-white shadow-xl shrink-0`}>
                            <IconRenderer name={currentDept.iconName} className="w-7 h-7" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 m-0 tracking-tight">
                              {currentDept.name}
                            </h3>
                            <p className="text-xs text-blue-300 font-light m-0 mt-1">
                              {currentDept.nameEn} &bull; {currentDept.description}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 shrink-0">
                          รวม {deptLinks.length} ระบบงาน
                        </span>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {deptLinks.map((link) => (
                          <AppCard key={link.id} link={link} department={currentDept} onToggleFavorite={handleToggleFavorite} />
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : groupStyle === 'style4' ? (
            /* Style 4: Compact Table List */
            <div className="glass p-6 sm:p-8 md:p-10 border border-white/15 shadow-2xl animate-fade-in divide-y divide-white/10">
              {DEPARTMENTS.map((dept) => {
                const deptLinks = filteredLinks.filter((l) => l.departmentId === dept.id);
                if (deptLinks.length === 0) return null;
                return (
                  <section key={dept.id} className="pt-8 first:pt-0 pb-8 last:pb-0 space-y-4">
                    <div className="flex items-center gap-3 pb-2">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${dept.themeColor.gradient} text-white shadow-md shrink-0`}>
                        <IconRenderer name={dept.iconName} className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-white m-0">
                        {dept.name} <span className="text-xs font-light text-blue-300">({dept.nameEn})</span>
                      </h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-blue-300 border border-white/10 ml-auto">
                        {deptLinks.length} ระบบ
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {deptLinks.map((link) => {
                        const isFav = link.isFavorite;
                        return (
                          <div
                            key={link.id}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-blue-400/30 transition-all gap-3 shadow-sm"
                          >
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                              <button
                                onClick={() => handleToggleFavorite(link.id)}
                                className={`p-1.5 rounded-lg transition-colors shrink-0 ${isFav ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'}`}
                                title={isFav ? 'ลบออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
                              >
                                <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                              </button>
                              <div className={`p-2.5 rounded-xl ${dept.themeColor.bg} ${dept.themeColor.text} shrink-0`}>
                                <IconRenderer name={link.iconName} className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm sm:text-base font-bold text-white m-0 truncate group-hover:text-blue-300 transition-colors">
                                    {link.title}
                                  </h4>
                                  {link.status === 'maintenance' && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                                      ปิดปรับปรุง
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-blue-200/60 m-0 truncate mt-0.5 font-light">
                                  {link.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md transition-all"
                              >
                                <span>เปิดระบบ</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            /* Style 5: Bento Grid Focus */
            <div className="glass p-6 sm:p-8 md:p-10 border border-white/15 shadow-2xl animate-fade-in bg-slate-950/80 space-y-8">
              {DEPARTMENTS.map((dept) => {
                const deptLinks = filteredLinks.filter((l) => l.departmentId === dept.id);
                if (deptLinks.length === 0) return null;
                return (
                  <div
                    key={dept.id}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-xl relative overflow-hidden group/bento"
                  >
                    <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${dept.themeColor.gradient}`} />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-white/10 gap-3">
                      <div className="flex items-center gap-3.5 pl-2">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${dept.themeColor.gradient} text-white shadow-lg`}>
                          <IconRenderer name={dept.iconName} className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white m-0 tracking-tight flex items-center gap-2">
                            {dept.name}
                          </h3>
                          <p className="text-xs text-blue-300/80 m-0 mt-0.5">
                            {dept.nameEn} &bull; {dept.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 text-blue-300 border border-white/10">
                        {deptLinks.length} ระบบงาน
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {deptLinks.map((link) => (
                        <AppCard key={link.id} link={link} department={dept} onToggleFavorite={handleToggleFavorite} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )
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
