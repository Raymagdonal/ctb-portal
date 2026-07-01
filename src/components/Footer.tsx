import React from 'react';
import { Ship, ShieldCheck, Mail, PhoneCall } from 'lucide-react';

interface FooterProps {
  onOpenDirectory: () => void;
  onOpenManage: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDirectory, onOpenManage }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-blue-900/60 bg-slate-950 text-blue-200/70 text-xs py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Brand & Copyright */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="p-2 bg-blue-900/50 rounded-xl text-cyan-400 border border-blue-700/50">
              <Ship className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">CHAOPHRAYA TOURIST BOAT</span>
          </div>
          <p className="text-[11px] text-blue-300/60">
            © {year} บริษัท เจ้าพระยาทัวร์ริสท์โบ๊ท จำกัด (CTB Internal Systems) • สงวนลิขสิทธิ์
          </p>
        </div>

        {/* Quick Links Shelf */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-blue-300">
          <button onClick={onOpenDirectory} className="hover:text-cyan-300 underline transition-colors flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
            <span>เบอร์ติดต่อภายในทุกแผนก</span>
          </button>
          <span>•</span>
          <a href="mailto:it@chaophrayatouristboat.com" className="hover:text-cyan-300 underline transition-colors flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>แจ้งปัญหา IT Helpdesk</span>
          </a>
          <span>•</span>
          <button onClick={onOpenManage} className="hover:text-cyan-300 transition-colors">
            สำหรับเจ้าหน้าที่ IT
          </button>
        </div>

        {/* Security & IT Credit */}
        <div className="flex items-center justify-center md:justify-end gap-2 text-[11px] text-blue-400/80">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>ระบบรับรองความปลอดภัย Google Workspace & GAS Secured</span>
        </div>

      </div>
    </footer>
  );
};
