import React, { useState } from 'react';
import { X, Plus, Trash2, Edit, Save, RotateCcw, Download, Upload, AlertCircle, ShieldCheck, Ship, Megaphone, Link as LinkIcon } from 'lucide-react';
import { AppScriptLink, Announcement, Department, DepartmentId, LinkStatus } from '../types';

interface ManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: AppScriptLink[];
  announcements: Announcement[];
  departments: Department[];
  onSaveLinks: (links: AppScriptLink[]) => void;
  onSaveAnnouncements: (anns: Announcement[]) => void;
  onResetData: () => void;
}

export const ManageModal: React.FC<ManageModalProps> = ({
  isOpen,
  onClose,
  links,
  announcements,
  departments,
  onSaveLinks,
  onSaveAnnouncements,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'links' | 'announcements' | 'backup'>('links');
  
  // Link Form State
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [deptId, setDeptId] = useState<DepartmentId>('company');
  const [status, setStatus] = useState<LinkStatus>('active');
  const [access, setAccess] = useState('พนักงานทุกคน');
  const [icon, setIcon] = useState('FileText');
  const [docUrl, setDocUrl] = useState('');

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annDetail, setAnnDetail] = useState('');
  const [annBadge, setAnnBadge] = useState('ประกาศบริษัท');
  const [annImportant, setAnnImportant] = useState(true);

  if (!isOpen) return null;

  // Handle Link Submission
  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    const nowStr = new Date().toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' });

    if (editingLinkId) {
      const updated = links.map(l => l.id === editingLinkId ? {
        ...l,
        title,
        description: desc,
        url,
        departmentId: deptId,
        status,
        accessRequired: access,
        iconName: icon,
        docUrl: docUrl || undefined,
        updatedAt: nowStr
      } : l);
      onSaveLinks(updated);
      setEditingLinkId(null);
    } else {
      const newLink: AppScriptLink = {
        id: 'user-' + Date.now(),
        title,
        description: desc,
        url,
        departmentId: deptId,
        status,
        accessRequired: access,
        iconName: icon,
        docUrl: docUrl || undefined,
        isFavorite: false,
        updatedAt: nowStr
      };
      onSaveLinks([newLink, ...links]);
    }

    // reset form
    setTitle('');
    setDesc('');
    setUrl('');
    setDocUrl('');
  };

  const handleStartEditLink = (link: AppScriptLink) => {
    setEditingLinkId(link.id);
    setTitle(link.title);
    setDesc(link.description);
    setUrl(link.url);
    setDeptId(link.departmentId);
    setStatus(link.status);
    setAccess(link.accessRequired || 'พนักงานทุกคน');
    setIcon(link.iconName);
    setDocUrl(link.docUrl || '');
  };

  const handleDeleteLink = (id: string) => {
    onSaveLinks(links.filter(l => l.id !== id));
    if (editingLinkId === id) setEditingLinkId(null);
  };

  // Handle Announcement Submission
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annDetail) return;
    const nowStr = new Date().toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' });
    
    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      title: annTitle,
      detail: annDetail,
      date: nowStr,
      badge: annBadge,
      isImportant: annImportant
    };
    onSaveAnnouncements([newAnn, ...announcements]);
    setAnnTitle('');
    setAnnDetail('');
  };

  const handleDeleteAnnouncement = (id: string) => {
    onSaveAnnouncements(announcements.filter(a => a.id !== id));
  };

  // Backup Export
  const handleExportJson = () => {
    const data = { links, announcements };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = `ctb_portal_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.links && Array.isArray(parsed.links)) {
          onSaveLinks(parsed.links);
          if (parsed.announcements) onSaveAnnouncements(parsed.announcements);
        }
      } catch (err) {
        console.error('ไฟล์ JSON ไม่ถูกต้อง');
      }
    };
    reader.readAsText(file);
  };

  const ICONS_LIST = ['FileText', 'CalendarRange', 'Car', 'FolderArchive', 'UserCheck', 'HeartPulse', 'Award', 'Headset', 'Laptop', 'KeyRound', 'Receipt', 'Fuel', 'BookOpenCheck', 'Wallet', 'PlaneTakeoff', 'BadgeDollarSign', 'Scale', 'Siren', 'LifeBuoy', 'PackageCheck', 'Anchor', 'Image', 'Navigation', 'Wrench', 'Building2', 'Users'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-blue-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-blue-950/80 border-b border-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl text-slate-950 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                จัดการระบบ CTB Portal Admin
              </h2>
              <p className="text-xs text-blue-300/70">
                สำหรับผู้ดูแลระบบฝ่ายไอที (it@chaophrayatouristboat.com) • แก้ไขข้อมูลและบันทึกอัตโนมัติ
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-blue-400 hover:text-white hover:bg-blue-900 rounded-xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-blue-800/80 bg-slate-900/60 px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('links')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'links' ? 'border-cyan-400 text-cyan-300 bg-blue-950/50 rounded-t-xl' : 'border-transparent text-blue-300/70 hover:text-white'
            }`}
          >
            <LinkIcon className="w-4 h-4" /> ลิงก์ระบบงาน ({links.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'announcements' ? 'border-amber-400 text-amber-300 bg-blue-950/50 rounded-t-xl' : 'border-transparent text-blue-300/70 hover:text-white'
            }`}
          >
            <Megaphone className="w-4 h-4" /> ประกาศข่าวสาร ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'backup' ? 'border-purple-400 text-purple-300 bg-blue-950/50 rounded-t-xl' : 'border-transparent text-blue-300/70 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" /> สำรองข้อมูล (Backup)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: LINKS MANAGEMENT */}
          {activeTab === 'links' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Form Column */}
              <div className="lg:col-span-5 bg-slate-950/70 p-5 rounded-2xl border border-blue-800/80 space-y-4 h-fit">
                <div className="flex items-center justify-between border-b border-blue-900 pb-2">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    {editingLinkId ? <Edit className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-cyan-400" />}
                    {editingLinkId ? 'แก้ไขลิงก์ระบบ' : 'เพิ่มระบบงานใหม่'}
                  </h3>
                  {editingLinkId && (
                    <button onClick={() => setEditingLinkId(null)} className="text-xs text-blue-400 hover:text-white">ยกเลิกแก้ไข</button>
                  )}
                </div>

                <form onSubmit={handleSaveLink} className="space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-medium text-blue-300 mb-1">ชื่อระบบงาน <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="เช่น ระบบเบิกค่าเดินทางออนไลน์"
                      className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-blue-300 mb-1">ลิงก์ Google App Script URL <span className="text-red-400">*</span></label>
                    <input
                      type="url"
                      required
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      placeholder="https://script.google.com/macros/s/..."
                      className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3.5 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-blue-300 mb-1">คำอธิบายสั้นๆ</label>
                    <textarea
                      rows={2}
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                      placeholder="ใช้สำหรับทำอะไร ใครเป็นผู้ใช้..."
                      className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-blue-300 mb-1">แผนกรับผิดชอบ</label>
                      <select
                        value={deptId}
                        onChange={e => setDeptId(e.target.value as DepartmentId)}
                        className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                      >
                        {departments.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-blue-300 mb-1">สถานะ</label>
                      <select
                        value={status}
                        onChange={e => setStatus(e.target.value as LinkStatus)}
                        className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                      >
                        <option value="active">● พร้อมใช้งาน</option>
                        <option value="beta">★ Beta ทดสอบ</option>
                        <option value="new">✦ ระบบใหม่</option>
                        <option value="maintenance">🛠 ปรับปรุงระบบ</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-blue-300 mb-1">สิทธิ์การเข้าถึง</label>
                      <input
                        type="text"
                        value={access}
                        onChange={e => setAccess(e.target.value)}
                        placeholder="เช่น พนักงานทุกคน"
                        className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-blue-300 mb-1">เลือกไอคอน</label>
                      <select
                        value={icon}
                        onChange={e => setIcon(e.target.value)}
                        className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                      >
                        {ICONS_LIST.map(ic => (
                          <option key={ic} value={ic}>{ic}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-blue-300 mb-1">ลิงก์คู่มือ (Doc URL - ถ้ามี)</label>
                    <input
                      type="url"
                      value={docUrl}
                      onChange={e => setDocUrl(e.target.value)}
                      placeholder="https://docs.google.com/..."
                      className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg mt-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingLinkId ? 'บันทึกการแก้ไข' : 'เพิ่มเข้าระบบ'}</span>
                  </button>
                </form>
              </div>

              {/* Existing Links List Column */}
              <div className="lg:col-span-7 space-y-2 max-h-[500px] overflow-y-auto pr-2">
                <h3 className="font-semibold text-blue-300 text-xs uppercase tracking-wider mb-3">
                  ระบบงานทั้งหมดในฐานข้อมูล ({links.length})
                </h3>
                {links.map(l => {
                  const d = departments.find(dep => dep.id === l.departmentId);
                  return (
                    <div key={l.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-blue-900/80 hover:border-blue-700 transition-all text-xs gap-3">
                      <div className="truncate flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-white text-sm truncate">{l.title}</span>
                          <span className="px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-300 text-[10px] shrink-0">{d?.name}</span>
                        </div>
                        <p className="text-blue-300/60 font-mono text-[11px] truncate">{l.url}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => handleStartEditLink(l)} className="p-2 text-amber-400 hover:bg-amber-500/20 rounded-lg" title="แก้ไข">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteLink(l.id); }} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg" title="ลบ">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-slate-950/70 p-5 rounded-2xl border border-blue-800 space-y-4 h-fit">
                <h3 className="font-bold text-white text-base">เพิ่มประกาศ/แจ้งเตือนบริษัท</h3>
                <form onSubmit={handleAddAnnouncement} className="space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-medium text-blue-300 mb-1">หัวข้อประกาศ <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={annTitle}
                      onChange={e => setAnnTitle(e.target.value)}
                      placeholder="เช่น แจ้งอัปเดตระบบเบิกจ่ายใหม่"
                      className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3.5 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-300 mb-1">รายละเอียด <span className="text-red-400">*</span></label>
                    <textarea
                      rows={3}
                      required
                      value={annDetail}
                      onChange={e => setAnnDetail(e.target.value)}
                      placeholder="รายละเอียดสั้นๆ แจ้งกำหนดการ..."
                      className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3.5 py-2 text-white text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-blue-300 mb-1">หมวดหมู่ป้าย</label>
                      <input
                        type="text"
                        value={annBadge}
                        onChange={e => setAnnBadge(e.target.value)}
                        className="w-full bg-slate-900 border border-blue-700 rounded-xl px-3 py-2 text-white text-xs"
                      />
                    </div>
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                        <input
                          type="checkbox"
                          checked={annImportant}
                          onChange={e => setAnnImportant(e.target.checked)}
                          className="rounded bg-slate-900 border-blue-700"
                        />
                        <span>ประกาศด่วน (สำคัญ)</span>
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-2 mt-2">
                    <Plus className="w-4 h-4" /> เพิ่มประกาศ
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <h3 className="font-semibold text-blue-300 text-xs uppercase">ประกาศทั้งหมด</h3>
                {announcements.map(a => (
                  <div key={a.id} className="p-4 rounded-xl bg-slate-950/60 border border-blue-900 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">{a.badge}</span>
                        <span className="font-bold text-white text-sm">{a.title}</span>
                      </div>
                      <p className="text-xs text-blue-200/70">{a.detail}</p>
                      <span className="text-[10px] text-blue-400 block mt-2">{a.date}</span>
                    </div>
                    <button onClick={() => handleDeleteAnnouncement(a.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BACKUP / RESET */}
          {activeTab === 'backup' && (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="p-6 rounded-2xl bg-blue-950/50 border border-blue-800 text-center space-y-3">
                <Download className="w-10 h-10 text-cyan-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">ส่งออกข้อมูลสำรอง (Export Backup JSON)</h3>
                <p className="text-xs text-blue-200/70">
                  ดาวน์โหลดไฟล์ JSON ของลิงก์ App Script และประกาศทั้งหมด เก็บไว้เป็น Backup หรือนำไปเปิดบนเครื่องสำนักงานอื่น
                </p>
                <button onClick={handleExportJson} className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg">
                  <Download className="w-4 h-4" /> ดาวน์โหลดไฟล์ JSON
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-blue-900 text-center space-y-3">
                <Upload className="w-10 h-10 text-amber-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">นำเข้าข้อมูลจากไฟล์สำรอง (Import JSON)</h3>
                <p className="text-xs text-blue-200/70">
                  เลือกไฟล์ JSON ที่เคยส่งออกไว้ เพื่ออัปเดตระบบลิงก์ให้ตรงกัน
                </p>
                <label className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-semibold text-sm inline-flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" /> เลือกไฟล์ JSON เพื่อนำเข้า
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
              </div>

              <div className="p-6 rounded-2xl bg-red-950/30 border border-red-900/50 text-center space-y-3 pt-6 border-t">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
                <h3 className="text-lg font-bold text-red-200">รีเซ็ตค่าเริ่มต้นระบบ (Reset to Factory Defaults)</h3>
                <p className="text-xs text-red-200/70">
                  ล้างลิงก์และประกาศที่แก้ไขทั้งหมด เพื่อกลับมาใช้ลิงก์มาตรฐานเริ่มต้นบริษัท CTB
                </p>
                <button
                  onClick={() => {
                    onResetData();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-800 hover:bg-red-700 text-white font-semibold text-xs inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> คืนค่าเริ่มต้นบริษัท
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
