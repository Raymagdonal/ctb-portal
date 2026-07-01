export type DepartmentId = 
  | 'company'
  | 'hr'
  | 'it'
  | 'accounting_finance'
  | 'legal_ohs'
  | 'marketing'
  | 'operations';

export interface Department {
  id: DepartmentId;
  name: string;
  nameEn: string;
  description: string;
  iconName: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    gradient: string;
  };
}

export type LinkStatus = 'active' | 'maintenance' | 'beta' | 'new';

export interface AppScriptLink {
  id: string;
  title: string;
  description: string;
  url: string;
  departmentId: DepartmentId;
  status: LinkStatus;
  accessRequired?: string; // e.g. "พนักงานทุกคน", "เฉพาะผู้จัดการ", "เฉพาะฝ่าย IT"
  iconName: string;
  isFavorite?: boolean;
  updatedAt: string;
  docUrl?: string; // ลิงก์คู่มือการใช้งาน
}

export interface Announcement {
  id: string;
  title: string;
  detail: string;
  date: string;
  badge: string;
  isImportant?: boolean;
}

export interface ContactItem {
  department: string;
  person: string;
  ext: string;
  email: string;
}
