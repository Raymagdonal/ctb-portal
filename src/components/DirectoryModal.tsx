import React, { useState } from 'react';
import { X, Phone, Mail, Search, Building2, Copy, Check } from 'lucide-react';
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
      <div className="relative w-full max-w-3xl bg-slate-900 border border-blue-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-950 to-indigo-950 border-b border-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-cyan-300">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                สมุดโทรศัพท์และอีเมลติดต่อภายใน (CTB Directory)
              </h2>
              <p className="text-xs text-blue-300/70">
                บริษัท เจ้าพระยาทัวร์ริสท์โบ๊ท จำกัด • ติดต่อประสานงานแต่ละแผนก
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-blue-400 hover:text-white hover:bg-blue-900/60 rounded-xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-slate-950/50 border-b border-blue-900/80">
          <div className="relative flex items-center bg-slate-900 rounded-xl border border-blue-800 focus-within:border-cyan-400 px-3">
            <Search className="w-4 h-4 text-cyan-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ค้นหาแผนก ชื่อบุคคล เบอร์ต่อภายใน หรืออีเมล..."
              className="w-full py-2.5 bg-transparent text-sm text-white placeholder-blue-300/40 focus:outline-none"
            />
          </div>
        </div>

        {/* List Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-blue-300/60 text-sm">ไม่พบข้อมูลติดต่อที่ตรงกับคำค้นหา</div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/70 hover:bg-blue-950/40 border border-blue-900/80 hover:border-blue-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-bold text-white text-base">{item.department}</span>
                  </div>
                  <p className="text-xs text-blue-200/80 pl-6">{item.person}</p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pl-6 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-blue-900/50">
                  {/* Extension badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900/40 border border-blue-700 text-cyan-300 font-mono text-sm shadow-inner">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>ต่อ : <strong className="text-white">{item.ext}</strong></span>
                  </div>

                  {/* Email pill */}
                  <button
                    onClick={() => handleCopyEmail(item.email)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-900 text-blue-200 hover:text-white border border-blue-800 transition-all text-xs font-mono"
                    title="คลิกเพื่อคัดลอกอีเมล"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.email}</span>
                    {copiedEmail === item.email ? <Check className="w-3 h-3 text-emerald-400 ml-1" /> : <Copy className="w-3 h-3 opacity-50 ml-1" />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-slate-950 text-[11px] text-blue-300/60 text-center border-t border-blue-900">
          กรณีเบอร์ติดต่อภายในขัดข้อง กรุณาติดต่อ Call Center กลาง โทร 02-xxx-xxxx กด 0
        </div>

      </div>
    </div>
  );
};
