import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Database,
  Building,
  UserPlus,
  QrCode,
  CalendarCheck,
  Stethoscope,
  FileHeart,
  BedDouble,
  Building2,
  AlertOctagon,
  HeartPulse,
  Scissors,
  Activity,
  Baby,
  Video,
  FlaskConical,
  Scan,
  Pill,
  Boxes,
  Droplet,
  Sparkles,
  Receipt,
  CreditCard,
  ShieldCheck,
  Calculator,
  Network,
  Link2,
  KeyRound,
  UploadCloud,
  DownloadCloud,
  FileCheck,
  Contact2,
  Cpu,
  Truck,
  Archive,
  Biohazard,
  Award,
  Smartphone,
  Send,
  BarChart3,
  FileText,
  Lock,
  HardDrive,
  Workflow,
  Settings,
  Layers,
  Milestone,
  HelpCircle,
  Search,
  ChevronRight,
  ChevronDown,
  Shield
} from 'lucide-react';
import { UserRole } from '../../types/hms';

export interface ModuleItem {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  badge?: string;
  roles: UserRole[];
}

const ALL_ROLES: UserRole[] = ['Super Admin','Doctor','Nurse','Billing Executive','Pharmacist','Lab Technician','Radiologist','Receptionist','Insurance/TPA Executive','Store Keeper','HR Manager','MRD Officer'];
const ADMIN: UserRole[] = ['Super Admin'];
const CLINICAL: UserRole[] = ['Super Admin','Doctor','Nurse'];
const FRONT_DESK: UserRole[] = ['Super Admin','Doctor','Nurse','Receptionist'];
const BILLING_R: UserRole[] = ['Super Admin','Billing Executive','Insurance/TPA Executive'];
const PHARMACY_R: UserRole[] = ['Super Admin','Pharmacist','Doctor','Nurse'];
const LAB_R: UserRole[] = ['Super Admin','Lab Technician','Doctor'];
const RADIOLOGY_R: UserRole[] = ['Super Admin','Radiologist','Doctor'];
const STORES_R: UserRole[] = ['Super Admin','Store Keeper','Pharmacist'];
const ABDM_R: UserRole[] = ['Super Admin','Doctor','Nurse','Receptionist'];
const HR_R: UserRole[] = ['Super Admin','HR Manager'];
const MRD_R: UserRole[] = ['Super Admin','MRD Officer','Doctor'];
const QUALITY_R: UserRole[] = ['Super Admin','Doctor','Nurse','MRD Officer'];
const FINANCE_R: UserRole[] = ['Super Admin','Billing Executive'];
const TECH_R: UserRole[] = ['Super Admin'];

export const ALL_MODULES: ModuleItem[] = [
  { id: 2,  title: 'Executive Dashboard',       category: 'Admin & Governance',     icon: <LayoutDashboard size={15} />, badge:'Live',    roles: ADMIN },
  { id: 1,  title: 'User & Access (RBAC)',       category: 'Admin & Governance',     icon: <Users size={15} />,                           roles: ADMIN },
  { id: 3,  title: 'Master Data Catalog',        category: 'Admin & Governance',     icon: <Database size={15} />,                        roles: ADMIN },
  { id: 4,  title: 'Multi-Branch Hierarchy',     category: 'Admin & Governance',     icon: <Building size={15} />,                        roles: ADMIN },
  { id: 5,  title: 'Patient Registration',       category: 'Patient Front Desk',     icon: <UserPlus size={15} />,                        roles: FRONT_DESK },
  { id: 6,  title: 'ABHA Integration',           category: 'Patient Front Desk',     icon: <QrCode size={15} />,          badge:'DHIS',   roles: FRONT_DESK },
  { id: 7,  title: 'Appointments & Tokens',      category: 'Patient Front Desk',     icon: <CalendarCheck size={15} />,                   roles: FRONT_DESK },
  { id: 40, title: 'Patient Portal & Kiosk',     category: 'Patient Front Desk',     icon: <Smartphone size={15} />,      badge:'Kiosk',  roles: ALL_ROLES },
  { id: 8,  title: 'OPD & E-Prescription',       category: 'Clinical & Inpatient',   icon: <Stethoscope size={15} />,                     roles: CLINICAL },
  { id: 9,  title: 'EMR Longitudinal Records',   category: 'Clinical & Inpatient',   icon: <FileHeart size={15} />,                       roles: CLINICAL },
  { id: 10, title: 'IPD & ADT Workflow',         category: 'Clinical & Inpatient',   icon: <BedDouble size={15} />,                       roles: CLINICAL },
  { id: 11, title: 'Bed & Ward Live Board',      category: 'Clinical & Inpatient',   icon: <Building2 size={15} />,       badge:'Live',   roles: CLINICAL },
  { id: 12, title: 'Emergency & Trauma',         category: 'Clinical & Inpatient',   icon: <AlertOctagon size={15} />,    badge:'Urgent', roles: CLINICAL },
  { id: 13, title: 'Nursing Station & e-MAR',    category: 'Clinical & Inpatient',   icon: <HeartPulse size={15} />,                      roles: ['Super Admin','Nurse','Doctor'] as UserRole[] },
  { id: 14, title: 'Operation Theatre (OT)',     category: 'Clinical & Inpatient',   icon: <Scissors size={15} />,                        roles: CLINICAL },
  { id: 15, title: 'ICU & Critical Care',        category: 'Clinical & Inpatient',   icon: <Activity size={15} />,                        roles: CLINICAL },
  { id: 16, title: 'Maternity & Paediatrics',    category: 'Clinical & Inpatient',   icon: <Baby size={15} />,                            roles: CLINICAL },
  { id: 17, title: 'Telemedicine Consult',       category: 'Clinical & Inpatient',   icon: <Video size={15} />,                           roles: ['Super Admin','Doctor','Receptionist'] as UserRole[] },
  { id: 18, title: 'Laboratory (LIS)',           category: 'Diagnostics & Pharmacy', icon: <FlaskConical size={15} />,                    roles: LAB_R },
  { id: 19, title: 'Radiology (RIS/PACS)',       category: 'Diagnostics & Pharmacy', icon: <Scan size={15} />,                            roles: RADIOLOGY_R },
  { id: 20, title: 'Pharmacy & Narcotics',       category: 'Diagnostics & Pharmacy', icon: <Pill size={15} />,                            roles: PHARMACY_R },
  { id: 21, title: 'Inventory & Stores',         category: 'Diagnostics & Pharmacy', icon: <Boxes size={15} />,                           roles: STORES_R },
  { id: 22, title: 'Blood Bank & Transfusion',   category: 'Diagnostics & Pharmacy', icon: <Droplet size={15} />,                         roles: ['Super Admin','Doctor','Nurse','Lab Technician'] as UserRole[] },
  { id: 23, title: 'CSSD & Dietary Services',    category: 'Diagnostics & Pharmacy', icon: <Sparkles size={15} />,                        roles: ['Super Admin','Nurse'] as UserRole[] },
  { id: 24, title: 'Billing & Revenue Cycle',    category: 'Billing & Finance',      icon: <Receipt size={15} />,                         roles: BILLING_R },
  { id: 25, title: 'Payment Gateways',           category: 'Billing & Finance',      icon: <CreditCard size={15} />,                      roles: BILLING_R },
  { id: 26, title: 'Insurance & TPA Claims',     category: 'Billing & Finance',      icon: <ShieldCheck size={15} />,                     roles: ['Super Admin','Billing Executive','Insurance/TPA Executive'] as UserRole[] },
  { id: 27, title: 'Accounts & Finance',         category: 'Billing & Finance',      icon: <Calculator size={15} />,                      roles: FINANCE_R },
  { id: 28, title: 'ABDM HFR & HPR Registry',    category: 'ABDM Health Stack',      icon: <Network size={15} />,                         roles: ABDM_R },
  { id: 29, title: 'Care Contexts & Linking',    category: 'ABDM Health Stack',      icon: <Link2 size={15} />,                           roles: ABDM_R },
  { id: 30, title: 'Consent Management',         category: 'ABDM Health Stack',      icon: <KeyRound size={15} />,                        roles: ABDM_R },
  { id: 31, title: 'ABDM HIP Provider (M2)',     category: 'ABDM Health Stack',      icon: <UploadCloud size={15} />,                     roles: ABDM_R },
  { id: 32, title: 'ABDM HIU Records (M3)',      category: 'ABDM Health Stack',      icon: <DownloadCloud size={15} />,                   roles: ABDM_R },
  { id: 33, title: 'ABDM Sandbox & DHIS',        category: 'ABDM Health Stack',      icon: <FileCheck size={15} />,                       roles: ADMIN },
  { id: 34, title: 'HR & Staff Payroll',         category: 'Operations & Quality',   icon: <Contact2 size={15} />,                        roles: HR_R },
  { id: 35, title: 'Biomedical Equipment',       category: 'Operations & Quality',   icon: <Cpu size={15} />,                             roles: ['Super Admin','HR Manager'] as UserRole[] },
  { id: 36, title: 'Ambulance & Mortuary',       category: 'Operations & Quality',   icon: <Truck size={15} />,                           roles: ['Super Admin','Doctor','Nurse','Receptionist'] as UserRole[] },
  { id: 37, title: 'Medical Records (MRD)',      category: 'Operations & Quality',   icon: <Archive size={15} />,                         roles: MRD_R },
  { id: 38, title: 'Infection Control & Waste',  category: 'Operations & Quality',   icon: <Biohazard size={15} />,                       roles: QUALITY_R },
  { id: 39, title: 'Quality & Accreditation',    category: 'Operations & Quality',   icon: <Award size={15} />,                           roles: QUALITY_R },
  { id: 41, title: 'Notifications & Alerts',     category: 'Operations & Quality',   icon: <Send size={15} />,                            roles: ALL_ROLES },
  { id: 42, title: 'Reports & Analytics',        category: 'Operations & Quality',   icon: <BarChart3 size={15} />,                       roles: ['Super Admin','Doctor','Billing Executive','HR Manager'] as UserRole[] },
  { id: 43, title: 'Document Management',        category: 'Operations & Quality',   icon: <FileText size={15} />,                        roles: MRD_R },
  { id: 44, title: 'Security & Audit Trail',     category: 'Operations & Quality',   icon: <Lock size={15} />,                            roles: ADMIN },
  { id: 45, title: 'Data Backup & DR',           category: 'Operations & Quality',   icon: <HardDrive size={15} />,                       roles: TECH_R },
  { id: 46, title: 'Integrations & APIs',        category: 'Operations & Quality',   icon: <Workflow size={15} />,                        roles: TECH_R },
  { id: 47, title: 'Hospital Settings',          category: 'Operations & Quality',   icon: <Settings size={15} />,                        roles: ADMIN },
  { id: 48, title: 'Technology Architecture',    category: 'Operations & Quality',   icon: <Layers size={15} />,                          roles: ADMIN },
  { id: 49, title: 'Implementation Roadmap',     category: 'Operations & Quality',   icon: <Milestone size={15} />,                       roles: ADMIN },
  { id: 50, title: 'Technical Support',          category: 'Operations & Quality',   icon: <HelpCircle size={15} />,                      roles: ALL_ROLES },
];

interface SidebarProps {
  activeModuleId: number;
  onSelectModule: (id: number) => void;
  currentRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModuleId, onSelectModule, currentRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const categories = [
    'Admin & Governance',
    'Patient Front Desk',
    'Clinical & Inpatient',
    'Diagnostics & Pharmacy',
    'Billing & Finance',
    'ABDM Health Stack',
    'Operations & Quality'
  ];

  const toggleGroup = (cat: string) => {
    setCollapsedGroups(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Only show modules this role can access
  const roleModules = ALL_MODULES.filter(m => m.roles.includes(currentRole));
  const visibleCount = roleModules.length;

  const filteredModules = roleModules.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: UserRole) => {
    const map: Record<string, { bg: string; color: string }> = {
      'Super Admin': { bg: 'rgba(239,68,68,0.2)', color: '#fca5a5' },
      'Doctor': { bg: 'rgba(59,130,246,0.2)', color: '#93c5fd' },
      'Nurse': { bg: 'rgba(16,185,129,0.2)', color: '#6ee7b7' },
      'Billing Executive': { bg: 'rgba(245,158,11,0.2)', color: '#fcd34d' },
      'Pharmacist': { bg: 'rgba(139,92,246,0.2)', color: '#c4b5fd' },
      'Lab Technician': { bg: 'rgba(6,182,212,0.2)', color: '#67e8f9' },
      'Radiologist': { bg: 'rgba(168,85,247,0.2)', color: '#d8b4fe' },
      'Receptionist': { bg: 'rgba(20,184,166,0.2)', color: '#5eead4' },
      'Insurance/TPA Executive': { bg: 'rgba(99,102,241,0.2)', color: '#a5b4fc' },
      'Store Keeper': { bg: 'rgba(251,146,60,0.2)', color: '#fed7aa' },
      'HR Manager': { bg: 'rgba(236,72,153,0.2)', color: '#f9a8d4' },
      'MRD Officer': { bg: 'rgba(132,204,22,0.2)', color: '#bef264' },
    };
    return map[role] || { bg: 'rgba(148,163,184,0.2)', color: '#cbd5e1' };
  };
  const badge = getRoleBadge(currentRole);

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      background: 'linear-gradient(180deg, #060f28 0%, #0a1f56 50%, #0f2a7a 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      boxShadow: '4px 0 20px rgba(5, 15, 45, 0.4)',
      zIndex: 100,
      userSelect: 'none',
      overflow: 'hidden'
    }}>
      {/* Brand – flush to top, zero gap */}
      <div
        onClick={() => onSelectModule(2)}
        style={{
          height: 'var(--header-height)',
          padding: '0 13px',
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          background: 'rgba(0,0,0,0.3)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 900,
          fontSize: '1.05rem',
          boxShadow: '0 2px 8px rgba(37,99,235,0.5)',
          flexShrink: 0
        }}>+</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '5px' }}>
            MedPulse <span style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.78rem' }}>HMS</span>
            <span style={{ fontSize: '0.57rem', padding: '1px 4px', borderRadius: '4px', background: 'rgba(59,130,246,0.3)', color: '#bfdbfe', fontWeight: 700, marginLeft: '2px' }}>v3.0</span>
          </div>
          <div style={{ fontSize: '0.62rem', color: '#93c5fd', opacity: 0.85 }}>Enterprise Healthcare Suite</div>
        </div>
      </div>

      {/* Role indicator */}
      <div style={{
        padding: '6px 13px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        flexShrink: 0,
        background: 'rgba(0,0,0,0.18)'
      }}>
        <Shield size={11} color="#7dd3fc" />
        <span style={{ fontSize: '0.68rem', color: '#94a3b8', flex: 1 }}>Logged in as</span>
        <span style={{
          fontSize: '0.62rem',
          padding: '2px 7px',
          borderRadius: '20px',
          background: badge.bg,
          color: badge.color,
          fontWeight: 700
        }}>{currentRole}</span>
      </div>

      {/* Search */}
      <div style={{ padding: '7px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: '7px',
          padding: '5px 9px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Search size={13} color="#93c5fd" />
          <input
            type="text"
            placeholder={`Search ${visibleCount} modules...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '0.75rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* Module List with Categories */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '6px 5px 16px'
      }}>
        {searchTerm ? (
          <div>
            <div style={{ fontSize: '0.63rem', color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 10px 5px', fontWeight: 700 }}>
              Results ({filteredModules.length})
            </div>
            {filteredModules.map(m => renderModuleItem(m, activeModuleId, onSelectModule))}
          </div>
        ) : (
          categories.map(cat => {
            const catModules = roleModules.filter(m => m.category === cat);
            if (catModules.length === 0) return null;
            const isCollapsed = collapsedGroups[cat];

            return (
              <div key={cat} style={{ marginBottom: '5px' }}>
                <div
                  onClick={() => toggleGroup(cat)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px 9px',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    color: '#7dd3fc',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    opacity: 0.85
                  }}
                >
                  <span>{cat}</span>
                  <span style={{ opacity: 0.7 }}>
                    {isCollapsed ? <ChevronRight size={11} /> : <ChevronDown size={11} />}
                  </span>
                </div>

                {!isCollapsed && (
                  <div>
                    {catModules.map(m => renderModuleItem(m, activeModuleId, onSelectModule))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Footer */}
      <div style={{
        padding: '8px 12px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(0,0,0,0.35)',
        fontSize: '0.67rem',
        color: '#bfdbfe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div>
          <span style={{ fontWeight: 700, color: '#ffffff' }}>{visibleCount}</span> Modules
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
          <span style={{ color: '#6ee7b7', fontWeight: 600, fontSize: '0.62rem' }}>HIP/HIU Active</span>
        </div>
      </div>
    </aside>
  );
};

function renderModuleItem(m: ModuleItem, activeModuleId: number, onSelectModule: (id: number) => void) {
  const isActive = activeModuleId === m.id;
  return (
    <div
      key={m.id}
      onClick={() => onSelectModule(m.id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '6px',
        padding: '6px 9px',
        borderRadius: '7px',
        marginBottom: '1px',
        cursor: 'pointer',
        fontSize: '0.77rem',
        fontWeight: isActive ? 700 : 450,
        background: isActive ? 'rgba(255,255,255,0.95)' : 'transparent',
        color: isActive ? '#0f2a7a' : '#c7d7f0',
        boxShadow: isActive ? '0 2px 10px rgba(0,0,0,0.25)' : 'none',
        transition: 'all 0.12s ease'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
          e.currentTarget.style.color = '#ffffff';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#c7d7f0';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        <span style={{ color: isActive ? '#1d4ed8' : '#7dd3fc', flexShrink: 0 }}>{m.icon}</span>
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</span>
      </div>
      {m.badge && (
        <span style={{
          fontSize: '0.57rem',
          padding: '1px 5px',
          borderRadius: '4px',
          background: isActive ? '#dbeafe' : 'rgba(255,255,255,0.12)',
          color: isActive ? '#1e40af' : '#e0f2fe',
          fontWeight: 700,
          flexShrink: 0
        }}>
          {m.badge}
        </span>
      )}
    </div>
  );
}
