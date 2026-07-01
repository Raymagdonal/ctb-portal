import React from 'react';
import {
  Building2,
  Users,
  MonitorCheck,
  FileSpreadsheet,
  Coins,
  ShieldAlert,
  Megaphone,
  Ship,
  CalendarRange,
  Car,
  FolderArchive,
  UserCheck,
  HeartPulse,
  FileText,
  Award,
  Headset,
  Laptop,
  KeyRound,
  Receipt,
  Fuel,
  BookOpenCheck,
  Wallet,
  PlaneTakeoff,
  BadgeDollarSign,
  Scale,
  Siren,
  LifeBuoy,
  PackageCheck,
  Anchor,
  Image as ImageIcon,
  Navigation,
  Wrench,
  Link as LinkIcon,
  HelpCircle
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Building2': return <Building2 className={className} />;
    case 'Users': return <Users className={className} />;
    case 'MonitorCheck': return <MonitorCheck className={className} />;
    case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Megaphone': return <Megaphone className={className} />;
    case 'Ship': return <Ship className={className} />;
    case 'CalendarRange': return <CalendarRange className={className} />;
    case 'Car': return <Car className={className} />;
    case 'FolderArchive': return <FolderArchive className={className} />;
    case 'UserCheck': return <UserCheck className={className} />;
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Award': return <Award className={className} />;
    case 'Headset': return <Headset className={className} />;
    case 'Laptop': return <Laptop className={className} />;
    case 'KeyRound': return <KeyRound className={className} />;
    case 'Receipt': return <Receipt className={className} />;
    case 'Fuel': return <Fuel className={className} />;
    case 'BookOpenCheck': return <BookOpenCheck className={className} />;
    case 'Wallet': return <Wallet className={className} />;
    case 'PlaneTakeoff': return <PlaneTakeoff className={className} />;
    case 'BadgeDollarSign': return <BadgeDollarSign className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Siren': return <Siren className={className} />;
    case 'LifeBuoy': return <LifeBuoy className={className} />;
    case 'PackageCheck': return <PackageCheck className={className} />;
    case 'Anchor': return <Anchor className={className} />;
    case 'Image': return <ImageIcon className={className} />;
    case 'Navigation': return <Navigation className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    default: return <LinkIcon className={className} />;
  }
};
