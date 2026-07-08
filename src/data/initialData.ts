import { Department, AppScriptLink, Announcement, ContactItem } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'hr',
    name: 'แผนกบุคคล',
    nameEn: 'Human Resources',
    description: 'ระบบลางาน เบิกสวัสดิการ บันทึกเวลาเข้าออก และขอหนังสือรับรอง',
    iconName: 'Users',
    themeColor: {
      bg: 'bg-emerald-950/40 hover:bg-emerald-950/60',
      border: 'border-emerald-500/30 hover:border-emerald-400',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      gradient: 'from-emerald-600 to-teal-400'
    }
  },
  {
    id: 'it',
    name: 'แผนกไอที',
    nameEn: 'Information Technology',
    description: 'แจ้งซ่อมอุปกรณ์คอมพิวเตอร์ ขอใช้อีเมล์/รหัสผ่าน และยืมอุปกรณ์ IT',
    iconName: 'MonitorCheck',
    themeColor: {
      bg: 'bg-cyan-950/40 hover:bg-cyan-950/60',
      border: 'border-cyan-500/30 hover:border-cyan-400',
      text: 'text-cyan-400',
      badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      gradient: 'from-cyan-500 to-blue-500'
    }
  },
  {
    id: 'accounting_finance',
    name: 'แผนกบัญชีและการเงิน',
    nameEn: 'Accounting & Finance',
    description: 'ส่งใบแจ้งหนี้ เบิกเงินทดรองจ่าย ค่าเดินทาง วางบิล และสรุปยอดรายรับประจำวัน',
    iconName: 'Coins',
    themeColor: {
      bg: 'bg-amber-950/40 hover:bg-amber-950/60',
      border: 'border-amber-500/30 hover:border-amber-400',
      text: 'text-amber-400',
      badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      gradient: 'from-amber-500 to-orange-500'
    }
  },
  {
    id: 'legal_ohs',
    name: 'แผนกกฎหมายและ จป.',
    nameEn: 'Legal & Safety (OHS)',
    description: 'ตรวจสอบร่างสัญญา กฎหมายเดินเรือ รายงานอุบัติเหตุ และความปลอดภัย จป.',
    iconName: 'ShieldAlert',
    themeColor: {
      bg: 'bg-purple-950/40 hover:bg-purple-950/60',
      border: 'border-purple-500/30 hover:border-purple-400',
      text: 'text-purple-400',
      badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      gradient: 'from-purple-500 to-indigo-500'
    }
  },
  {
    id: 'marketing',
    name: 'แผนกการตลาด',
    nameEn: 'Marketing & Sales',
    description: 'จองตั๋วเรือเหมาลำ อัปเดตโปรโมชัน เช็คสต๊อกของที่ระลึก และสถิติลูกค้านักท่องเที่ยว',
    iconName: 'Megaphone',
    themeColor: {
      bg: 'bg-rose-950/40 hover:bg-rose-950/60',
      border: 'border-rose-500/30 hover:border-rose-400',
      text: 'text-rose-400',
      badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      gradient: 'from-rose-500 to-pink-500'
    }
  },
  {
    id: 'operations',
    name: 'ฝ่ายปฏิบัติการเดินเรือ',
    nameEn: 'Boat & Pier Operations',
    description: 'ตารางเดินเรือ (Time Table) เช็คสถานะเรือ ท่าเรือ สภาพอากาศ และตรวจเช็คเครื่องยนต์',
    iconName: 'Ship',
    themeColor: {
      bg: 'bg-sky-950/40 hover:bg-sky-950/60',
      border: 'border-sky-500/30 hover:border-sky-400',
      text: 'text-sky-400',
      badge: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
      gradient: 'from-sky-400 to-blue-600'
    }
  }
];

export const INITIAL_LINKS: AppScriptLink[] = [
  // --- แผนกบุคคล (HR) - โอนย้ายจากบริการกลาง ---
  {
    id: 'comp-1',
    title: 'จองห้องประชุมสำนักงานใหญ่',
    description: 'ตรวจสอบตารางว่างและจองห้องประชุมชั้น 2 และชั้น 3 พร้อมขอใช้อุปกรณ์ Video Conference',
    url: 'https://script.google.com/macros/s/AKfycbx_meeting_room_booking/exec',
    departmentId: 'hr',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'CalendarRange',
    isFavorite: true,
    updatedAt: '24 มิ.ย. 2026',
    docUrl: 'https://docs.google.com/document/d/ctb-meeting-guide'
  },
  {
    id: 'comp-2',
    title: 'ระบบขอรถส่วนกลาง',
    description: 'แจ้งความประสงค์ขอใช้รถยนต์บริษัทเพื่อติดต่อราชการหรือลูกค้าภายนอก',
    url: 'https://script.google.com/macros/s/AKfycbx_company_car_request/exec',
    departmentId: 'hr',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'Car',
    isFavorite: false,
    updatedAt: '10 พ.ค. 2026'
  },
  {
    id: 'comp-3',
    title: 'คลังเอกสารและแบบฟอร์มบริษัท (ISO)',
    description: 'ดาวน์โหลดหัวจดหมาย โลโก้บริษัท แบบฟอร์มมาตรฐาน และนโยบายบริษัทล่าสุด',
    url: 'https://script.google.com/macros/s/AKfycbx_document_center/exec',
    departmentId: 'hr',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'FolderArchive',
    isFavorite: false,
    updatedAt: '15 มิ.ย. 2026'
  },

  // --- แผนกบุคคล (HR) ---
  {
    id: 'hr-1',
    title: 'ระบบใบลาออนไลน์ (E-Leave)',
    description: 'ยื่นใบลาป่วย ลากิจ ลาพักร้อน พร้อมเช็คโควตาวันลาคงเหลือแบบ Real-time',
    url: 'https://script.google.com/macros/s/AKfycbx_ctb_eleave_system/exec',
    departmentId: 'hr',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'UserCheck',
    isFavorite: true,
    updatedAt: '20 มิ.ย. 2026',
    docUrl: 'https://docs.google.com/document/d/eleave-manual'
  },
  {
    id: 'hr-2',
    title: 'ระบบเบิกค่ารักษาพยาบาลและสวัสดิการ',
    description: 'แนบใบเสร็จและใบรับรองแพทย์เพื่อขอเบิกเงินประกันกลุ่มและสวัสดิการพนักงาน',
    url: 'https://script.google.com/macros/s/AKfycbx_hr_welfare_claim/exec',
    departmentId: 'hr',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'HeartPulse',
    isFavorite: false,
    updatedAt: '01 มิ.ย. 2026'
  },
  {
    id: 'hr-3',
    title: 'ระบบขอหนังสือรับรองเงินเดือน/การทำงาน',
    description: 'กรอกวัตถุประสงค์เพื่อขอเอกสารราชการ อนุมัติและส่งผ่านอีเมลภายใน 2 วันทำการ',
    url: 'https://script.google.com/macros/s/AKfycbx_hr_certificate_req/exec',
    departmentId: 'hr',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'FileText',
    isFavorite: false,
    updatedAt: '12 เม.ย. 2026'
  },
  {
    id: 'hr-4',
    title: 'ประเมินผลการปฏิบัติงาน KPI / OKR',
    description: 'ระบบส่งหัวข้อประเมินประจำไตรมาสสำหรับพนักงานและหัวหน้างาน',
    url: 'https://script.google.com/macros/s/AKfycbx_kpi_evaluation/exec',
    departmentId: 'hr',
    status: 'beta',
    accessRequired: 'หัวหน้างานขึ้นไป',
    iconName: 'Award',
    isFavorite: false,
    updatedAt: '18 มิ.ย. 2026'
  },

  // --- แผนกไอที (IT) ---
  {
    id: 'it-1',
    title: 'CTB IT Helpdesk (แจ้งซ่อมคอมพิวเตอร์/เครือข่าย)',
    description: 'เปิด Ticket แจ้งปัญหาปริ้นเตอร์ เน็ตเวิร์ค หน้าท่าเรือ หรือโปรแกรมติดขัด',
    url: 'https://script.google.com/macros/s/AKfycbx_it_helpdesk_portal/exec',
    departmentId: 'it',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'Headset',
    isFavorite: true,
    updatedAt: '24 มิ.ย. 2026',
    docUrl: 'https://docs.google.com/document/d/it-helpdesk-guide'
  },
  {
    id: 'it-2',
    title: 'ระบบขอยืมอุปกรณ์ไอทีส่วนกลาง',
    description: 'ยืมโน้ตบุ๊กสำรอง โปรเจคเตอร์ ตัวกระจายสัญญาณ Wi-Fi สำหรับออกบูธหน้าท่าเรือ',
    url: 'https://script.google.com/macros/s/AKfycbx_it_equipment_loan/exec',
    departmentId: 'it',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'Laptop',
    isFavorite: false,
    updatedAt: '05 พ.ค. 2026'
  },
  {
    id: 'it-3',
    title: 'ระบบขอเปิดสิทธิ์ Google Workspace & VPN',
    description: 'ขอสร้างอีเมลพนักงานใหม่ รีเซ็ตรหัสผ่าน และขอสิทธิ์เชื่อมต่อ VPN เข้า Server บริษัท',
    url: 'https://script.google.com/macros/s/AKfycbx_it_access_control/exec',
    departmentId: 'it',
    status: 'active',
    accessRequired: 'หัวหน้าแผนก',
    iconName: 'KeyRound',
    isFavorite: false,
    updatedAt: '19 มิ.ย. 2026'
  },

  // --- แผนกบัญชีและการเงิน (Accounting & Finance) ---
  {
    id: 'acc-1',
    title: 'ระบบส่งเอกสารตั้งหนี้และวางบิล (E-Billing)',
    description: 'ส่งสแกนใบแจ้งหนี้ ซัพพลายเออร์อะไหล่เรือ ค่าน้ำมัน เพื่อตั้งเบิกจ่ายตามรอบบัญชี',
    url: 'https://script.google.com/macros/s/AKfycbx_accounting_ebilling/exec',
    departmentId: 'accounting_finance',
    status: 'active',
    accessRequired: 'แผนกจัดซื้อ / บัญชี',
    iconName: 'Receipt',
    isFavorite: false,
    updatedAt: '21 มิ.ย. 2026'
  },
  {
    id: 'acc-2',
    title: 'รายงานต้นทุนเชื้อเพลิงและซ่อมบำรุงเรือ',
    description: 'แดชบอร์ดสรุปยอดการใช้น้ำมันดีเซลของเรือท่องเที่ยวแต่ละลำเทียบกับชั่วโมงเดินเรือ',
    url: 'https://script.google.com/macros/s/AKfycbx_boat_fuel_costing/exec',
    departmentId: 'accounting_finance',
    status: 'active',
    accessRequired: 'เฉพาะผู้บริหารและบัญชี',
    iconName: 'Fuel',
    isFavorite: false,
    updatedAt: '23 มิ.ย. 2026'
  },
  {
    id: 'acc-3',
    title: 'ระบบตรวจสอบรหัสผังบัญชี (Chart of Accounts)',
    description: 'ค้นหารหัส GL Code มาตรฐานสำหรับบันทึกรายการบัญชีทั้งระบบเรือด่วนและเรือท่องเที่ยว',
    url: 'https://script.google.com/macros/s/AKfycbx_chart_of_accounts/exec',
    departmentId: 'accounting_finance',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'BookOpenCheck',
    isFavorite: false,
    updatedAt: '10 ม.ค. 2026'
  },
  {
    id: 'fin-1',
    title: 'ระบบเบิกเงินทดรองจ่ายออนไลน์ (Petty Cash)',
    description: 'กรอกแบบฟอร์มเบิกเงินสดฉุกเฉินไม่เกิน 3,000 บาท พร้อมสแกนใบเสร็จเพื่อเคลียร์ยอด',
    url: 'https://script.google.com/macros/s/AKfycbx_petty_cash_system/exec',
    departmentId: 'accounting_finance',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'Wallet',
    isFavorite: true,
    updatedAt: '22 มิ.ย. 2026'
  },
  {
    id: 'fin-2',
    title: 'ระบบเบิกค่าเดินทางและค่ารับรองลูกค้า',
    description: 'คำนวณค่าแท็กซี่ ค่าเรือด่วน ค่าเบี้ยเลี้ยงปฏิบัติงานนอกสถานที่ พร้อมระบบอนุมัติ 2 ชั้น',
    url: 'https://script.google.com/macros/s/AKfycbx_travel_expense_claim/exec',
    departmentId: 'accounting_finance',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'PlaneTakeoff',
    isFavorite: false,
    updatedAt: '14 มิ.ย. 2026'
  },
  {
    id: 'fin-3',
    title: 'ระบบส่งยอดนำฝากประจำวันหน้าท่าเรือ (Daily Pier Cash)',
    description: 'สำหรับนายท่าเรือและแคชเชียร์บันทึกยอดขายตั๋ว Hop-On Hop-Off และส่งหลักฐานโอนเงิน',
    url: 'https://script.google.com/macros/s/AKfycbx_pier_daily_remittance/exec',
    departmentId: 'accounting_finance',
    status: 'active',
    accessRequired: 'พนักงานประจำท่าเรือ / การเงิน',
    iconName: 'BadgeDollarSign',
    isFavorite: false,
    updatedAt: '24 มิ.ย. 2026'
  },

  // --- แผนกกฎหมายและ จป. (Legal & OHS) ---
  {
    id: 'leg-1',
    title: 'ระบบขออนุมัติและตรวจร่างนิติกรรมสัญญา',
    description: 'ส่งร่างสัญญาจ้าง สัญญาเช่าพื้นที่ท่าเรือ และข้อตกลงพันธมิตรให้ฝ่ายกฎหมายตรวจสอบ',
    url: 'https://script.google.com/macros/s/AKfycbx_legal_contract_review/exec',
    departmentId: 'legal_ohs',
    status: 'active',
    accessRequired: 'ผู้จัดการฝ่ายขึ้นไป',
    iconName: 'Scale',
    isFavorite: false,
    updatedAt: '11 พ.ค. 2026'
  },
  {
    id: 'leg-2',
    title: 'ระบบรายงานเหตุฉุกเฉินและอุบัติเหตุทางน้ำ (OHS Incident Report)',
    description: 'แจ้งเหตุเรือเฉี่ยวชน ลูกค้าลื่นล้ม หรือเหตุฉุกเฉินหน้าท่าเรือเพื่อแจ้ง จป. วิชาชีพทันที',
    url: 'https://script.google.com/macros/s/AKfycbx_ohs_incident_report/exec',
    departmentId: 'legal_ohs',
    status: 'active',
    accessRequired: 'พนักงานทุกคน (ด่วน)',
    iconName: 'Siren',
    isFavorite: true,
    updatedAt: '15 มิ.ย. 2026'
  },
  {
    id: 'leg-3',
    title: 'ทะเบียนตรวจความปลอดภัยท่าเรือประจำเดือน (Safety Audit)',
    description: 'แบบฟอร์มตรวจสอบเสื้อชูชีพ ถังดับเพลิง และทางลาดท่าเรือ (จป. เทคนิคประจำท่า)',
    url: 'https://script.google.com/macros/s/AKfycbx_pier_safety_checklist/exec',
    departmentId: 'legal_ohs',
    status: 'active',
    accessRequired: 'จป. และนายท่าเรือ',
    iconName: 'LifeBuoy',
    isFavorite: false,
    updatedAt: '01 มิ.ย. 2026'
  },

  // --- แผนกการตลาด (Marketing) ---
  {
    id: 'mkt-1',
    title: 'ระบบเช็คสต๊อกตั๋วและของที่ระลึก (CTB Merch Stock)',
    description: 'ตรวจสอบจำนวนตั๋ว One Day Pass และสินค้าพรีเมียม (หมวก ร่ม เสื้อ) ประจำจุดขาย',
    url: 'https://script.google.com/macros/s/AKfycbx_mkt_merch_inventory/exec',
    departmentId: 'marketing',
    status: 'active',
    accessRequired: 'ฝ่ายการตลาด / จุดขายตั๋ว',
    iconName: 'PackageCheck',
    isFavorite: false,
    updatedAt: '20 มิ.ย. 2026'
  },
  {
    id: 'mkt-2',
    title: 'ระบบจองเรือท่องเที่ยวเหมาลำ (Charter Boat Booking)',
    description: 'เช็คคิวเรือว่าง ออกใบเสนอราคาเหมาลำ จัดเลี้ยง ดินเนอร์ สำหรับเอเจนซี่ท่องเที่ยว',
    url: 'https://script.google.com/macros/s/AKfycbx_charter_boat_sales/exec',
    departmentId: 'marketing',
    status: 'active',
    accessRequired: 'ฝ่ายขายและการตลาด',
    iconName: 'Anchor',
    isFavorite: true,
    updatedAt: '23 มิ.ย. 2026'
  },
  {
    id: 'mkt-3',
    title: 'ฐานข้อมูลสื่อโฆษณาและภาพถ่ายเรือ (CTB Media Asset)',
    description: 'คลังรูปภาพเรือธงสีน้ำเงิน วิดีโอแนะนำเส้นทาง และโบรชัวร์ดิจิทัลความละเอียดสูง',
    url: 'https://script.google.com/macros/s/AKfycbx_mkt_media_library/exec',
    departmentId: 'marketing',
    status: 'active',
    accessRequired: 'พนักงานทุกคน',
    iconName: 'Image',
    isFavorite: false,
    updatedAt: '18 มิ.ย. 2026'
  },

  // --- ฝ่ายปฏิบัติการเดินเรือ (Operations) ---
  {
    id: 'ops-1',
    title: 'ระบบรายงานตารางเดินเรือ Real-time (CTB Fleet Monitor)',
    description: 'ติดตามตำแหน่งเรือผ่าน GPS ความเร็ว กระแสน้ำ และตารางออกจากท่าเรือสาทร-พระอาทิตย์',
    url: 'https://script.google.com/macros/s/AKfycbx_fleet_gps_monitor/exec',
    departmentId: 'operations',
    status: 'active',
    accessRequired: 'ฝ่ายเดินเรือ และ Call Center',
    iconName: 'Navigation',
    isFavorite: false,
    updatedAt: '24 มิ.ย. 2026'
  },
  {
    id: 'ops-2',
    title: 'แจ้งซ่อมเครื่องยนต์และอุปกรณ์เรือ (Marine Maintenance)',
    description: 'สำหรับกัปตันและช่างเครื่องแจ้งเปลี่ยนน้ำมันเครื่อง แบตเตอรี่ หรือระบบปรับอากาศบนเรือ',
    url: 'https://script.google.com/macros/s/AKfycbx_marine_maintenance/exec',
    departmentId: 'operations',
    status: 'active',
    accessRequired: 'กัปตันเรือ และฝ่ายช่าง',
    iconName: 'Wrench',
    isFavorite: false,
    updatedAt: '19 มิ.ย. 2026'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'อัปเดตระบบเบิกจ่ายออนไลน์ (Petty Cash) เวอร์ชัน 2.1',
    detail: 'เพิ่มฟีเจอร์สแกน QR Code ใบเสร็จรับเงินเพื่อดึงยอดอัตโนมัติ เริ่มใช้งานตั้งแต่วันที่ 1 กรกฎาคม เป็นต้นไป',
    date: '24 มิ.ย. 2026',
    badge: 'ระบบการเงิน',
    isImportant: true
  },
  {
    id: 'ann-2',
    title: 'แจ้งปิดปรับปรุงเซิร์ฟเวอร์สำนักงานใหญ่ชั่วคราว',
    detail: 'ฝ่าย IT จะทำการอัปเดตอุปกรณ์ Firewall ในคืนวันเสาร์ที่ 27 มิ.ย. เวลา 23.00 - 03.00 น. ส่งผลให้ระบบ VPN เข้าไม่ได้ชั่วคราว',
    date: '23 มิ.ย. 2026',
    badge: 'ประกาศ IT',
    isImportant: true
  },
  {
    id: 'ann-3',
    title: 'ตารางเดินเรือพิเศษช่วงเทศกาลท่องเที่ยวเดือนกรกฎาคม',
    detail: 'เพิ่มเที่ยวเรือ Hop-On Hop-Off รอบค่ำ (Sunset Route) ออกจากท่าเรือสาทร เวลา 18:30 น. และ 19:15 น.',
    date: '20 มิ.ย. 2026',
    badge: 'ฝ่ายเดินเรือ'
  }
];

export const DIRECTORY_CONTACTS: ContactItem[] = [
  { department: 'แผนกไอที (IT Support)', person: 'คุณสมชาย (IT Manager) / Helpdesk', ext: '108, 109', email: 'it@chaophrayatouristboat.com' },
  { department: 'แผนกบุคคล (HR)', person: 'คุณวิภาวรรณ / คุณสุดา', ext: '101, 102', email: 'hr@chaophrayatouristboat.com' },
  { department: 'แผนกการเงินและบัญชี', person: 'คุณกรรณิการ์ (การเงิน) / คุณอรัญญา (บัญชี)', ext: '114, 115', email: 'finance@chaophrayatouristboat.com' },
  { department: 'แผนกกฎหมาย และ จป.', person: 'ทนายธนพล / คุณนพดล (จป.วิชาชีพ)', ext: '120, 122', email: 'safety@chaophrayatouristboat.com' },
  { department: 'แผนกการตลาดและจองตั๋ว', person: 'คุณแพรวพรรณ (Sales & Mkt)', ext: '130, 131', email: 'sales@chaophrayatouristboat.com' },
  { department: 'ศูนย์ควบคุมการเดินเรือ (Pier Ops)', person: 'นายท่าเรือสาทร / ศูนย์วิทยุสื่อสาร', ext: '144, 081-xxx-xxxx', email: 'operations@chaophrayatouristboat.com' }
];
