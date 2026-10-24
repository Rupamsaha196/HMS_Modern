import React, { useState } from 'react';
import {
  ShieldAlert,
  Building2,
  UserCheck,
  Search,
  Bell,
  Globe,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/mockData';
import { UserRole } from '../../types/hms';
import { ALL_MODULES } from './Sidebar';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentBranch: string;
  onBranchChange: (branch: string) => void;
  currentLang: 'en' | 'hi' | 'bn';
  onLangChange: (lang: 'en' | 'hi' | 'bn') => void;
  onOpenBreakGlass: () => void;
  onOpenCommandPalette: () => void;
  onTogglePatientPortal: () => void;
  isPatientPortal: boolean;
  onSelectModule: (moduleId: number) => void;
  activeModuleId: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  currentBranch,
  onBranchChange,
  currentLang,
  onLangChange,
  onOpenBreakGlass,
  onOpenCommandPalette,
  onTogglePatientPortal,
  isPatientPortal,
  onSelectModule,
  activeModuleId
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Critical Lab Alert', desc: 'Troponin-I elevated — UHID-2026-00481 (0.94 ng/mL)', time: '2m', type: 'danger' },
    { id: 2, title: 'Code Blue – Trauma', desc: 'RTA patient via Outer Ring Road', time: '14m', type: 'danger' },
    { id: 3, title: 'ABDM Consent Received', desc: 'Priya Sharma granted record access', time: '22m', type: 'info' },
    { id: 4, title: 'DHIS Incentive Credited', desc: '₹200 added for 10 ABHA links today', time: '1h', type: 'success' }
  ];

  const roles: UserRole[] = [
    'Super Admin', 'Doctor', 'Nurse', 'Billing Executive',
    'Pharmacist', 'Lab Technician', 'Radiologist', 'Receptionist',
    'Insurance/TPA Executive', 'Store Keeper', 'HR Manager', 'MRD Officer'
  ];

  const roleLabel = (r: UserRole) => {
    const map: Record<string, string> = {
      'Super Admin': 'Super Admin', 'Doctor': 'Doctor', 'Nurse': 'Nurse',
      'Billing Executive': 'Billing Exec', 'Pharmacist': 'Pharmacist',
      'Lab Technician': 'Lab Tech', 'Radiologist': 'Radiologist',
      'Receptionist': 'Reception', 'Insurance/TPA Executive': 'TPA Exec',
      'Store Keeper': 'Store', 'HR Manager': 'HR Mgr', 'MRD Officer': 'MRD'
    };
    return map[r] || r;
  };

  const currentModule = ALL_MODULES.find(m => m.id === activeModuleId);

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'var(--pure-white)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '0 12px',
      position: 'relative',
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)',
      boxSizing: 'border-box',
      width: '100%',
      overflow: 'visible',
      flexShrink: 0
    }}>

      {/* LEFT: Active module breadcrumb */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, flex: '0 1 200px' }}>
        <div style={{ fontSize: '0.62rem', color: 'var(--text-light)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {currentModule?.category || 'Module'} · Pt {activeModuleId}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--royal-950)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.2 }}>
          {currentModule?.title || 'Executive Dashboard'}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '26px', background: 'var(--border-light)', flexShrink: 0 }} />

      {/* Branch selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
        <Building2 size={12} color="var(--royal-600)" />
        <select
          value={currentBranch}
          onChange={(e) => onBranchChange(e.target.value)}
          style={{ border: 'none', background: 'transparent', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', outline: 'none', maxWidth: '85px' }}
        >
          {HOSPITAL_INFO.branches.map(b => (
            <option key={b.id} value={b.name}>{b.name.split(' (')[0].replace('MedPulse ', '')}</option>
          ))}
        </select>
        <ChevronDown size={10} color="var(--text-muted)" />
      </div>

      {/* Grow spacer */}
      <div style={{ flex: 1 }} />

      {/* SEARCH */}
      <div
        onClick={onOpenCommandPalette}
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          background: 'var(--royal-50)', border: '1px solid var(--royal-200)',
          borderRadius: '18px', padding: '4px 9px', width: '118px',
          cursor: 'pointer', flexShrink: 0
        }}
        title="Ctrl+K — search all modules"
      >
        <Search size={11} color="var(--royal-500)" />
        <span style={{ flex: 1, fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Search</span>
        <kbd style={{ fontSize: '0.57rem', padding: '1px 3px', borderRadius: '3px', background: 'white', border: '1px solid var(--royal-200)', color: 'var(--royal-600)', fontWeight: 700 }}>⌘K</kbd>
      </div>

      {/* Grow spacer */}
      <div style={{ flex: 1 }} />

      {/* RIGHT CONTROLS — fixed, no overflow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>

        {/* ABDM */}
        <button
          onClick={() => onSelectModule(28)}
          style={{
            display: 'flex', alignItems: 'center', gap: '3px',
            background: '#ecfdf5', border: '1px solid #a7f3d0',
            padding: '3px 7px', borderRadius: '18px',
            fontSize: '0.66rem', fontWeight: 700, color: '#059669',
            cursor: 'pointer', whiteSpace: 'nowrap'
          }}
          title="ABDM National Health Stack — Active"
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          ABDM Active
        </button>

        {/* Break-Glass */}
        <button
          onClick={onOpenBreakGlass}
          style={{
            display: 'flex', alignItems: 'center', gap: '3px',
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: 'white', border: 'none',
            padding: '4px 8px', borderRadius: '6px',
            fontSize: '0.68rem', fontWeight: 700,
            cursor: 'pointer', whiteSpace: 'nowrap',
            boxShadow: '0 2px 6px rgba(220,38,38,0.3)'
          }}
          title="Break-glass Emergency Override"
        >
          <ShieldAlert size={11} />
          Break-Glass
        </button>

        {/* Role dropdown */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => { setShowRoleMenu(!showRoleMenu); setShowNotifications(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              background: 'var(--royal-50)', border: '1px solid var(--royal-200)',
              borderRadius: '6px', padding: '4px 7px',
              fontSize: '0.7rem', fontWeight: 600, color: 'var(--royal-800)',
              cursor: 'pointer', whiteSpace: 'nowrap'
            }}
          >
            <UserCheck size={11} color="var(--royal-600)" />
            {roleLabel(currentRole)}
            <ChevronDown size={10} />
          </button>
          {showRoleMenu && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              background: 'white', borderRadius: '10px',
              boxShadow: '0 8px 28px rgba(15,41,116,0.2)',
              border: '1px solid var(--border-royal)', zIndex: 2000,
              minWidth: '175px', overflow: 'hidden'
            }}>
              <div style={{ padding: '8px 12px 6px', fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-light)' }}>
                Switch Role
              </div>
              {roles.map(r => (
                <div
                  key={r}
                  onClick={() => { onRoleChange(r as UserRole); setShowRoleMenu(false); }}
                  style={{
                    padding: '7px 12px', fontSize: '0.77rem',
                    fontWeight: r === currentRole ? 700 : 400,
                    color: r === currentRole ? 'var(--royal-700)' : 'var(--text-primary)',
                    background: r === currentRole ? 'var(--royal-50)' : 'transparent',
                    cursor: 'pointer',
                    borderLeft: r === currentRole ? '3px solid var(--royal-600)' : '3px solid transparent'
                  }}
                  onMouseEnter={e => { if (r !== currentRole) e.currentTarget.style.background = 'var(--surface-bg)'; }}
                  onMouseLeave={e => { if (r !== currentRole) e.currentTarget.style.background = 'transparent'; }}
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
          <Globe size={11} color="var(--text-muted)" />
          <select
            value={currentLang}
            onChange={(e) => onLangChange(e.target.value as 'en' | 'hi' | 'bn')}
            style={{ border: 'none', background: 'transparent', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', cursor: 'pointer', outline: 'none' }}
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="bn">BN</option>
          </select>
        </div>

        {/* Notifications Bell */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowRoleMenu(false); }}
            style={{
              width: '29px', height: '29px', borderRadius: '7px',
              border: '1px solid var(--border-light)',
              background: showNotifications ? 'var(--royal-100)' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--royal-600)', position: 'relative'
            }}
            title="Notifications"
          >
            <Bell size={13} />
            <span style={{ position: 'absolute', top: '4px', right: '4px', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0, width: '280px',
              background: 'white', borderRadius: '12px',
              boxShadow: '0 12px 32px rgba(15,41,116,0.18)',
              border: '1px solid var(--border-royal)', padding: '12px', zIndex: 2000
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--royal-950)' }}>Live Alerts</span>
                <span style={{ fontSize: '0.6rem', padding: '2px 7px', borderRadius: '10px', background: '#fef2f2', color: '#dc2626', fontWeight: 700, border: '1px solid #fecaca' }}>4 New</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{
                  padding: '7px 10px', borderRadius: '7px', marginBottom: '6px',
                  background: n.type === 'danger' ? '#fef2f2' : n.type === 'success' ? '#ecfdf5' : '#eff6ff',
                  borderLeft: `3px solid ${n.type === 'danger' ? '#ef4444' : n.type === 'success' ? '#10b981' : '#3b82f6'}`
                }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</div>
                  <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)', marginTop: '1px' }}>{n.desc}</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-light)', marginTop: '1px' }}>{n.time} ago</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Patient Portal */}
        <button
          onClick={onTogglePatientPortal}
          style={{
            display: 'flex', alignItems: 'center', gap: '3px',
            background: isPatientPortal ? 'var(--royal-700)' : 'var(--royal-50)',
            color: isPatientPortal ? 'white' : 'var(--royal-700)',
            border: `1px solid ${isPatientPortal ? 'var(--royal-700)' : 'var(--royal-200)'}`,
            borderRadius: '6px', padding: '4px 8px',
            fontSize: '0.68rem', fontWeight: 700,
            cursor: 'pointer', whiteSpace: 'nowrap'
          }}
          title="Toggle Patient Portal vs Staff ERP"
        >
          <ExternalLink size={11} />
          {isPatientPortal ? 'Staff View' : 'Portal'}
        </button>
      </div>
    </header>
  );
};

