import React, { useState } from 'react';
import {
  BedDouble,
  Sparkles,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ArrowRightLeft,
  Filter,
  DollarSign,
  Plus
} from 'lucide-react';
import { INITIAL_BEDS } from '../../data/mockData';
import { Bed } from '../../types/hms';

export const BedManagementModule: React.FC = () => {
  const [beds, setBeds] = useState<Bed[]>(INITIAL_BEDS);
  const [filterClass, setFilterClass] = useState<string>('All');
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const filterOptions = ['All', 'ICU', 'General Male', 'Deluxe', 'Emergency', 'NICU'];

  const filteredBeds = filterClass === 'All' ? beds : beds.filter(b => b.bedClass === filterClass);

  const counts = {
    occupied: beds.filter(b => b.status === 'Occupied').length,
    vacant: beds.filter(b => b.status === 'Vacant').length,
    cleaning: beds.filter(b => b.status === 'Cleaning').length,
    reserved: beds.filter(b => b.status === 'Reserved').length,
    blocked: beds.filter(b => b.status === 'Blocked').length
  };

  const toggleBedStatus = (bedId: string) => {
    setBeds(beds.map(b => {
      if (b.id === bedId) {
        if (b.status === 'Cleaning') {
          return { ...b, status: 'Vacant' };
        } else if (b.status === 'Vacant') {
          return { ...b, status: 'Reserved' };
        }
      }
      return b;
    }));
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <BedDouble size={24} color="var(--royal-700)" />
            Point 11: Live Bed Board & Ward Management
          </h2>
          <p className="card-subtitle">
            Visual bed matrix across ICU, Deluxe, Semi-Private, General Wards & ER; Bed allocation, Upgrade/Downgrade, Room rent auto-posting, and Housekeeping triggers
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">
            <DollarSign size={14} /> Room Rent Auto-Post Engine
          </button>
          <button className="btn btn-primary btn-sm">
            <Plus size={14} /> Allocate Bed to Patient
          </button>
        </div>
      </div>

      {/* Status Legend & Quick Metric Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--royal-50)', border: '1px solid var(--royal-300)', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--royal-900)' }}>{counts.occupied} Beds</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--royal-700)', fontWeight: 600 }}>Occupied (Active IPD)</div>
        </div>

        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-800)' }}>{counts.vacant} Beds</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--emerald-600)', fontWeight: 600 }}>Vacant & Ready</div>
        </div>

        <div style={{ background: 'var(--amber-50)', border: '1px solid var(--amber-border)', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--amber-800)' }}>{counts.cleaning} Beds</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--amber-600)', fontWeight: 600 }}>Housekeeping Sanitizing</div>
        </div>

        <div style={{ background: 'var(--purple-50)', border: '1px solid var(--purple-border)', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--purple-800)' }}>{counts.reserved} Beds</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--purple-600)', fontWeight: 600 }}>Reserved for OT/Admit</div>
        </div>

        <div style={{ background: 'var(--rose-50)', border: '1px solid var(--rose-border)', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--rose-800)' }}>{counts.blocked} Beds</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--rose-600)', fontWeight: 600 }}>Blocked / Maintenance</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setFilterClass(opt)}
            className={`btn btn-sm ${filterClass === opt ? 'btn-primary' : 'btn-outline'}`}
          >
            {opt === 'All' ? 'All Wards & Classes' : `${opt} Class`}
          </button>
        ))}
      </div>

      {/* Live Bed Grid */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Interactive Ward & Bed Matrix (Click bed to inspect or mark sanitized)
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Equipped with Oxygen, Ventilator, and Telemetry monitor status indicators
            </p>
          </div>
          <span className="badge badge-royal">Total: {filteredBeds.length} Beds Shown</span>
        </div>

        <div className="bed-board-grid">
          {filteredBeds.map(b => (
            <div
              key={b.id}
              onClick={() => setSelectedBed(b)}
              className={`bed-box ${b.status.toLowerCase()}`}
              style={{
                boxShadow: selectedBed?.id === b.id ? '0 0 0 3px var(--royal-600)' : 'none'
              }}
            >
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, opacity: 0.8 }}>
                {b.bedClass}
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, margin: '6px 0' }}>
                {b.bedNumber}
              </div>

              {b.currentPatientName ? (
                <div style={{ fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {b.currentPatientName}
                </div>
              ) : (
                <div style={{ fontSize: '0.72rem', fontStyle: 'italic', opacity: 0.7 }}>
                  {b.status}
                </div>
              )}

              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '4px', fontSize: '0.65rem' }}>
                {b.hasOxygen && <span title="Oxygen Supply" style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 4px', borderRadius: '3px' }}>O2</span>}
                {b.hasVentilator && <span title="Mechanical Ventilator" style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 4px', borderRadius: '3px' }}>Vent</span>}
                {b.hasMonitor && <span title="Bedside Monitor" style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 4px', borderRadius: '3px' }}>Mon</span>}
              </div>

              <div style={{ marginTop: '6px', fontSize: '0.68rem', opacity: 0.85 }}>
                ₹{b.dailyTariff}/day
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Bed Detail Modal / Drawer */}
      {selectedBed && (
        <div className="modal-backdrop" onClick={() => setSelectedBed(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--royal-950)' }}>
                Bed Details: {selectedBed.bedNumber} ({selectedBed.wardName})
              </h3>
              <button onClick={() => setSelectedBed(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Class & Ward</div>
                  <div style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{selectedBed.bedClass}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily Tariff</div>
                  <div style={{ fontWeight: 800, color: 'var(--emerald-600)' }}>₹{selectedBed.dailyTariff} / Day</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Status</div>
                  <span className={`badge ${selectedBed.status === 'Occupied' ? 'badge-royal' : selectedBed.status === 'Cleaning' ? 'badge-warning' : 'badge-success'}`}>
                    {selectedBed.status}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Features</div>
                  <div style={{ fontSize: '0.8rem' }}>
                    {selectedBed.hasOxygen ? '✓ O2 ' : ''}
                    {selectedBed.hasVentilator ? '✓ Vent ' : ''}
                    {selectedBed.hasMonitor ? '✓ Monitor' : ''}
                  </div>
                </div>
              </div>

              {selectedBed.currentPatientName && (
                <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Inpatient</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--royal-950)' }}>{selectedBed.currentPatientName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--royal-700)' }}>{selectedBed.currentPatientUhid}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Admitted: {selectedBed.admittedAt}</div>
                </div>
              )}

              {selectedBed.status === 'Cleaning' && (
                <div style={{ background: 'var(--amber-50)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.825rem', color: 'var(--amber-900)' }}>
                  Housekeeping terminal cleaning in progress. Click below once sanitization checklist is completed.
                </div>
              )}
            </div>

            <div className="modal-footer">
              {selectedBed.status === 'Cleaning' && (
                <button
                  className="btn btn-success"
                  onClick={() => { toggleBedStatus(selectedBed.id); setSelectedBed(null); }}
                >
                  <Sparkles size={15} /> Mark Bed Ready & Vacant
                </button>
              )}
              {selectedBed.status === 'Occupied' && (
                <button className="btn btn-secondary">
                  <ArrowRightLeft size={15} /> Transfer / Upgrade Bed
                </button>
              )}
              <button className="btn btn-outline" onClick={() => setSelectedBed(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
