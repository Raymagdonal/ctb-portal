import React, { useState } from 'react';
import { X, Phone, Mail, Search, Building2, Copy, Check, User } from 'lucide-react';
import { ContactItem } from '../types';

interface DirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: ContactItem[];
}

export const DirectoryModal: React.FC<DirectoryModalProps> = ({
  isOpen,
  onClose,
  contacts
}) => {
  const [search, setSearch] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = contacts.filter(c =>
    c.department.toLowerCase().includes(search.toLowerCase()) ||
    c.person.toLowerCase().includes(search.toLowerCase()) ||
    c.ext.includes(search)
  );

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        style={{background: '#0b0f1a', borderColor: '#1e293b'}}
        className="relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up"
      >
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight m-0">
                สมุดติดต่อภายในองค์กร (CTB Directory)
              </h2>
              <p className="text-xs text-slate-400 m-0 mt-0.5">
                รายชื่อ เบอร์ภายใน และอีเมลสำหรับติดต่อสื่อสารภายในบริษัท
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

        {/* Search Bar Container */}
        <div className="p-4 bg-slate-900/40 border-b border-slate-800/80">
          <div 
            style={{background: 'rgba(30, 41, 59, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)'}}
            className="relative flex items-center rounded-xl px-3 focus-within:border-cyan-500/50 transition-all"
          >
            <Search className="w-4 h-4 text-cyan-400 mr-2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="พิมพ์คำเพื่อค้นหาแผนก, ชื่อพนักงาน, เบอร์ต่อ หรืออีเมล..."
              className="w-full py-2.5 bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none font-medium"
            />
          </div>
        </div>

        {/* Dynamic Directory Cards Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950/20">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm font-light">
              ไม่พบข้อมูลการติดต่อที่ตรงกับเงื่อนไข
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  style={{background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255, 255, 255, 0.05)'}}
                  className="p-4.5 rounded-2xl hover:border-slate-700/80 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    {/* Department Tag */}
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-sm text-slate-100">{item.department}</span>
                    </div>
                    {/* Person detail */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-light pl-1">
                      <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{item.person || 'ฝ่ายประสานงานแผนก'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
                    {/* Ext number */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200">
                      <Phone className="w-3 h-3 text-cyan-400" />
                      <span>เบอร์ภายใน: <strong className="text-cyan-400 font-semibold">{item.ext}</strong></span>
                    </div>

                    {/* Email copy */}
                    <button
                      onClick={() => handleCopyEmail(item.email)}
                      style={{background: 'rgba(30, 41, 59, 0.4)'}}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-600 transition-all text-xs font-mono"
                      title="คัดลอกอีเมล"
                    >
                      <Mail className="w-3 h-3 text-cyan-400" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{item.email}</span>
                      {copiedEmail === item.email ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-2.5 h-2.5 opacity-55" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer info */}
        <div className="px-6 py-4 bg-slate-950/80 text-[11px] text-slate-500 text-center border-t border-slate-900">
          เบอร์ติดต่อภายในขัดข้อง? ติดต่อโอเปอเรเตอร์กลางของบริษัท โทร 02-449-3000
        </div>

      </div>
    </div>
  );
};
