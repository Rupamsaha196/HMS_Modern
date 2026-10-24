import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Zap, X, Bed, User, ShieldAlert, FileText, QrCode } from 'lucide-react';
import { ALL_MODULES } from '../layout/Sidebar';
import { INITIAL_PATIENTS } from '../../data/mockData';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (id: number) => void;
  onSelectPatient: (uhid: string) => void;
  onTriggerEmergency: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  onSelectPatient,
  onTriggerEmergency
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredModules = ALL_MODULES.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase()) ||
    m.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  const filteredPatients = INITIAL_PATIENTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.uhid.toLowerCase().includes(query.toLowerCase()) ||
    (p.abhaNumber && p.abhaNumber.includes(query))
  ).slice(0, 4);

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100, alignItems: 'flex-start', paddingTop: '80px' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: 0, overflow: 'hidden', border: '1px solid var(--royal-400)', boxShadow: 'var(--shadow-royal-lg)' }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-light)',
          background: 'var(--pure-white)'
        }}>
          <Search size={20} color="var(--royal-600)" />
          <input
            type="text"
            autoFocus
            placeholder="Search modules, patient UHID, ABHA, beds, commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div style={{ padding: '10px 16px', background: 'var(--surface-bg)', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          <button
            onClick={() => { onSelectModule(5); onClose(); }}
            className="btn btn-outline btn-sm"
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            <User size={13} /> New Registration
          </button>
          <button
            onClick={() => { onSelectModule(6); onClose(); }}
            className="btn btn-outline btn-sm"
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            <QrCode size={13} /> Scan & Share
          </button>
          <button
            onClick={() => { onSelectModule(11); onClose(); }}
            className="btn btn-outline btn-sm"
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            <Bed size={13} /> Bed Board
          </button>
          <button
            onClick={() => { onTriggerEmergency(); onClose(); }}
            className="btn btn-danger btn-sm"
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            <ShieldAlert size={13} /> Break-Glass
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '12px' }}>
          {/* Patients Matching Query */}
          {filteredPatients.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '4px 8px' }}>
                Patients Found ({filteredPatients.length})
              </div>
              {filteredPatients.map(p => (
                <div
                  key={p.uhid}
                  onClick={() => { onSelectPatient(p.uhid); onSelectModule(8); onClose(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--royal-50)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {p.uhid} • {p.age}y / {p.gender} • ABHA: {p.abhaNumber || 'Not Linked'}
                    </div>
                  </div>
                  <span className="badge badge-royal" style={{ fontSize: '0.7rem' }}>Open EMR</span>
                </div>
              ))}
            </div>
          )}

          {/* Modules Matching Query */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '4px 8px' }}>
              Hospital Modules (Points 1-50)
            </div>
            {filteredModules.map(m => (
              <div
                key={m.id}
                onClick={() => { onSelectModule(m.id); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--royal-50)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--royal-700)' }}>{m.icon}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.category}</span>
                  <ArrowRight size={14} color="var(--royal-500)" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div style={{
          padding: '10px 16px',
          background: 'var(--surface-bg)',
          borderTop: '1px solid var(--border-light)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Press <strong>Esc</strong> to exit</span>
          <span><strong>50 Comprehensive Enterprise Modules</strong> available</span>
        </div>
      </div>
    </div>
  );
};
