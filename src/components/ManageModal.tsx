import React, { useState } from 'react';
import { X, Plus, Trash2, Edit, Save, RotateCcw, Download, Upload, AlertCircle, ShieldCheck, Megaphone, Link as LinkIcon } from 'lucide-react';
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
  const [deptId, setDeptId] = useState<DepartmentId>('hr');
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
    if (confirm('คุณต้องการลบลิงก์ระบบงานนี้ใช่หรือไม่?')) {
      onSaveLinks(links.filter(l => l.id !== id));
      if (editingLinkId === id) setEditingLinkId(null);
    }
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
    if (confirm('คุณต้องการลบประกาศนี้ใช่หรือไม่?')) {
      onSaveAnnouncements(announcements.filter(a => a.id !== id));
    }
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
          alert('นำเข้าข้อมูลสำเร็จแล้ว!');
        }
      } catch (err) {
        alert('ไฟล์ JSON ไม่ถูกต้อง');
      }
    };
    reader.readAsText(file);
  };

  const ICONS_LIST = ['FileText', 'CalendarRange', 'Car', 'FolderArchive', 'UserCheck', 'HeartPulse', 'Award', 'Headset', 'Laptop', 'KeyRound', 'Receipt', 'Fuel', 'BookOpenCheck', 'Wallet', 'PlaneTakeoff', 'BadgeDollarSign', 'Scale', 'Siren', 'LifeBuoy', 'PackageCheck', 'Anchor', 'Image', 'Navigation', 'Wrench', 'Building2', 'Users'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        style={{background: '#0b0f1a', borderColor: '#1e293b'}}
        className="relative w-full max-w-5xl border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
      >
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-md">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 m-0">
                จัดการระบบ CTB Portal Admin
              </h2>
              <p className="text-xs text-slate-400 m-0 mt-0.5">
                สำหรับฝ่ายไอทีในการจัดการอัปเดตระบบงาน เอกสารคู่มือ และข่าวสารบริษัท
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800/80 bg-slate-900/10 px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('links')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'links' ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-4 h-4" /> ลิงก์ระบบงาน ({links.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'announcements' ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Megaphone className="w-4 h-4" /> ประกาศข่าวสาร ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'backup' ? 'border-purple-500 text-purple-400 bg-purple-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" /> สำรองข้อมูล (Backup)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950/20 space-y-6">
          
          {/* TAB 1: LINKS MANAGEMENT */}
          {activeTab === 'links' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Form Column */}
              <div 
                style={{background: 'rgba(30, 41, 59, 0.15)', borderColor: 'rgba(255, 255, 255, 0.05)'}}
                className="lg:col-span-5 p-5 rounded-2xl border space-y-4 h-fit"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2 m-0">
                    {editingLinkId ? <Edit className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-cyan-400" />}
                    {editingLinkId ? 'แก้ไขข้อมูลระบบ' : 'เพิ่มระบบงานใหม่'}
                  </h3>
                  {editingLinkId && (
                    <button onClick={() => setEditingLinkId(null)} className="text-xs text-cyan-400 hover:text-white transition-colors">ยกเลิกแก้ไข</button>
                  )}
                </div>

                <form onSubmit={handleSaveLink} className="space-y-3.5 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">ชื่อระบบงาน <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="เช่น ระบบเบิกเงินสดย่อย"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">ลิงก์ Google App Script URL <span className="text-rose-500">*</span></label>
                    <input
                      type="url"
                      required
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      placeholder="https://script.google.com/macros/s/..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 placeholder-slate-600 font-mono text-[10px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">คำอธิบายระบบงาน</label>
                    <textarea
                      rows={2}
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                      placeholder="อธิบายหน้าที่ของระบบงานสั้นๆ ให้พนักงานเข้าใจ"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs font-light"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">แผนกรับผิดชอบ</label>
                      <select
                        value={deptId}
                        onChange={e => setDeptId(e.target.value as DepartmentId)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none"
                      >
                        {departments.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">สถานะระบบ</label>
                      <select
                        value={status}
                        onChange={e => setStatus(e.target.value as LinkStatus)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none"
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
                      <label className="block text-xs font-semibold text-slate-300 mb-1">สิทธิ์การใช้งาน</label>
                      <input
                        type="text"
                        value={access}
                        onChange={e => setAccess(e.target.value)}
                        placeholder="เช่น พนักงานทุกคน"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">เลือกไอคอน</label>
                      <select
                        value={icon}
                        onChange={e => setIcon(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none"
                      >
                        {ICONS_LIST.map(ic => (
                          <option key={ic} value={ic}>{ic}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">ลิงก์คู่มือใช้งาน (Google Drive / Doc)</label>
                    <input
                      type="url"
                      value={docUrl}
                      onChange={e => setDocUrl(e.target.value)}
                      placeholder="ใส่ลิงก์ PDF คู่มือการใช้งาน (ถ้ามี)"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-600 font-mono text-[10px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg mt-3"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingLinkId ? 'บันทึกการแก้ไข' : 'เพิ่มระบบงาน'}</span>
                  </button>
                </form>
              </div>

              {/* Existing Links List Column */}
              <div className="lg:col-span-7 space-y-2.5 max-h-[520px] overflow-y-auto pr-2">
                <h3 className="font-bold text-slate-300 text-xs uppercase tracking-wider mb-2">
                  ระบบงานที่ทำงานอยู่ในปัจจุบัน ({links.length})
                </h3>
                {links.map(l => {
                  const d = departments.find(dep => dep.id === l.departmentId);
                  return (
                    <div 
                      key={l.id} 
                      style={{background: 'rgba(30, 41, 59, 0.15)', borderColor: 'rgba(255, 255, 255, 0.04)'}}
                      className="flex items-center justify-between p-3.5 rounded-2xl border hover:border-slate-700 transition-all text-xs gap-3"
                    >
                      <div className="truncate flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white text-sm truncate">{l.title}</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 text-[9px] font-semibold shrink-0">
                            {d?.name || 'บริการกลาง'}
                          </span>
                        </div>
                        <p className="text-slate-500 font-mono text-[10px] truncate m-0">{l.url}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button 
                          onClick={() => handleStartEditLink(l)} 
                          className="p-2 text-amber-400 hover:bg-amber-500/10 rounded-xl border border-transparent hover:border-amber-500/20" 
                          title="แก้ไข"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteLink(l.id)} 
                          className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20" 
                          title="ลบ"
                        >
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
              <div 
                style={{background: 'rgba(30, 41, 59, 0.15)', borderColor: 'rgba(255, 255, 255, 0.05)'}}
                className="lg:col-span-5 p-5 rounded-2xl border space-y-4 h-fit"
              >
                <h3 className="font-bold text-white text-sm m-0">สร้างรายการประกาศข่าวสาร</h3>
                <form onSubmit={handleAddAnnouncement} className="space-y-3.5 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">หัวข้อข่าวประกาศ <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={annTitle}
                      onChange={e => setAnnTitle(e.target.value)}
                      placeholder="เช่น ประกาศวันหยุดราชการประจำเดือน"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">รายละเอียด <span className="text-rose-500">*</span></label>
                    <textarea
                      rows={3}
                      required
                      value={annDetail}
                      onChange={e => setAnnDetail(e.target.value)}
                      placeholder="เนื้อหารายละเอียดของประกาศแจ้งเรื่อง..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs font-light"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">ป้ายกำกับ</label>
                      <input
                        type="text"
                        value={annBadge}
                        onChange={e => setAnnBadge(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                        <input
                          type="checkbox"
                          checked={annImportant}
                          onChange={e => setAnnImportant(e.target.checked)}
                          className="rounded bg-slate-900 border-slate-800 text-amber-500 focus:ring-0"
                        />
                        <span>ประกาศสำคัญ (ด่วน)</span>
                      </label>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold flex items-center justify-center gap-2 mt-3"
                  >
                    <Plus className="w-4 h-4" /> เพิ่มข่าวประกาศ
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 space-y-3 max-h-[520px] overflow-y-auto pr-2">
                <h3 className="font-bold text-slate-300 text-xs uppercase tracking-wider mb-2">ประกาศทั้งหมด</h3>
                {announcements.map(a => (
                  <div 
                    key={a.id} 
                    style={{background: 'rgba(30, 41, 59, 0.15)', borderColor: 'rgba(255, 255, 255, 0.04)'}}
                    className="p-4 rounded-2xl border flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold">
                          {a.badge}
                        </span>
                        <span className="font-bold text-white text-sm">{a.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-light m-0 leading-relaxed">{a.detail}</p>
                      <span className="text-[10px] text-slate-500 font-mono block mt-2">{a.date}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteAnnouncement(a.id)} 
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl shrink-0 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BACKUP / RESET */}
          {activeTab === 'backup' && (
            <div className="max-w-2xl mx-auto space-y-5 py-4">
              <div 
                style={{background: 'rgba(30, 41, 59, 0.15)', borderColor: 'rgba(255, 255, 255, 0.05)'}}
                className="p-6 rounded-2xl border text-center space-y-3"
              >
                <Download className="w-10 h-10 text-cyan-400 mx-auto" />
                <h3 className="text-base font-bold text-white m-0">ส่งออกข้อมูลสำรอง (Export Backup JSON)</h3>
                <p className="text-xs text-slate-400 m-0">
                  ดาวน์โหลดฐานข้อมูลลิงก์ของระบบงานและข่าวสารประกาศทั้งหมด เป็นไฟล์ JSON ไว้สำรองบนคอมพิวเตอร์
                </p>
                <button 
                  onClick={handleExportJson} 
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4" /> ดาวน์โหลดไฟล์ JSON สำรอง
                </button>
              </div>

              <div 
                style={{background: 'rgba(30, 41, 59, 0.15)', borderColor: 'rgba(255, 255, 255, 0.05)'}}
                className="p-6 rounded-2xl border text-center space-y-3"
              >
                <Upload className="w-10 h-10 text-amber-400 mx-auto" />
                <h3 className="text-base font-bold text-white m-0">นำเข้าข้อมูลสำรอง (Import JSON)</h3>
                <p className="text-xs text-slate-400 m-0">
                  เลือกไฟล์ JSON ข้อมูลสำรองที่เคยจัดเก็บไว้เพื่อนำกลับมาใช้อัปโหลดเข้าระบบในพอร์ทัลนี้
                </p>
                <label className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs inline-flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" /> เลือกไฟล์ JSON นำเข้า
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
              </div>

              <div 
                style={{background: 'rgba(244, 63, 94, 0.05)', borderColor: 'rgba(244, 63, 94, 0.15)'}}
                className="p-6 rounded-2xl border text-center space-y-3"
              >
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto animate-pulse" />
                <h3 className="text-base font-bold text-rose-400 m-0">คืนค่าระบบเริ่มต้นบริษัท (Reset to Factory Defaults)</h3>
                <p className="text-xs text-slate-400 m-0">
                  คืนค่าและเคลียร์ประวัติการแก้ไขทั้งหมดเพื่อกลับไปใช้ลิงก์ฐานระบบมาตรฐานตั้งต้นของ CTB
                </p>
                <button
                  onClick={() => {
                    if (confirm('คุณต้องการรีเซ็ตฐานระบบล้างข้อมูลทั้งหมด และคืนค่าตั้งต้นบริษัทใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนคืนได้')) {
                      onResetData();
                      alert('รีเซ็ตระบบกลับเป็นค่าเริ่มต้นเสร็จสิ้น!');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900 border border-rose-500/30 text-rose-300 font-bold text-xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> รีเซ็ตกลับเป็นค่าเริ่มต้นบริษัท
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
