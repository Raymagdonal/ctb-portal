import React from 'react';
import { Ship, ShieldCheck, Mail, PhoneCall } from 'lucide-react';

interface FooterProps {
  onOpenDirectory: () => void;
  onOpenManage: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDirectory, onOpenManage }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800/80 text-slate-400 text-xs py-10 transition-colors" style={{background: '#0b0f1a'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Brand & Copyright */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-cyan-400">
              <Ship className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">CHAOPHRAYA TOURIST BOAT</span>
          </div>
          <p className="text-[10px] text-slate-500 m-0">
            © {year} บริษัท เจ้าพระยาทัวร์ริสท์โบ๊ท จำกัด (CTB Systems) • All Rights Reserved.
          </p>
        </div>

        {/* Quick Links Shelf */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
          <button onClick={onOpenDirectory} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer">
            <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
            <span>สมุดติดต่อภายใน</span>
          </button>
          <span className="text-slate-700">•</span>
          <a href="mailto:it@chaophrayatouristboat.com" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-amber-500" />
            <span>แจ้งปัญหา IT Helpdesk</span>
          </a>
          <span className="text-slate-700">•</span>
          <button onClick={onOpenManage} className="hover:text-cyan-400 transition-colors cursor-pointer">
            สำหรับฝ่ายไอที
          </button>
        </div>

        {/* Security & IT Credit */}
        <div className="flex items-center justify-center md:justify-end gap-2 text-[10px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Google Workspace Secured Portal</span>
        </div>

      </div>
    </footer>
  );
};
