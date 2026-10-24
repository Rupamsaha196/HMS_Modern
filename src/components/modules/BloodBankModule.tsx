import React, { useState } from 'react';
import {
  Droplet,
  Users,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Share2,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { INITIAL_BLOOD_UNITS } from '../../data/mockData';
import { BloodUnit } from '../../types/hms';

export const BloodBankModule: React.FC = () => {
  const [bloodUnits, setBloodUnits] = useState<BloodUnit[]>(INITIAL_BLOOD_UNITS);
  const [activeTab, setActiveTab] = useState<'inventory' | 'donors' | 'crossmatch' | 'eraktkosh'>('inventory');

  const bloodGroupSummary = [
    { group: 'O-', units: 1, status: 'Critically Low' },
    { group: 'O+', units: 8, status: 'Adequate' },
    { group: 'A+', units: 6, status: 'Adequate' },
    { group: 'B+', units: 12, status: 'Good Stock' },
    { group: 'AB+', units: 4, status: 'Moderate' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Droplet size={24} color="var(--rose-600)" />
            Point 22: Blood Bank & Transfusion Medicine (e-RaktKosh Ready)
          </h2>
          <p className="card-subtitle">
            Donor registration, Voluntary donation camps, Component separation (PRBC, FFP, Platelets), Cross-matching compatibility, and National e-RaktKosh integration
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '6px 12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--emerald-800)', fontWeight: 600 }}>
            <RefreshCw size={14} color="var(--emerald-600)" /> e-RaktKosh Sync: Active
          </div>
          <button className="btn btn-primary btn-sm">
            <Plus size={14} /> Register Blood Donor
          </button>
        </div>
      </div>

      {/* Blood Group Availability Summary Badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '20px' }}>
        {bloodGroupSummary.map(bg => (
          <div key={bg.group} className="card" style={{ textAlign: 'center', padding: '16px', borderTop: `4px solid ${bg.group === 'O-' ? 'var(--rose-600)' : 'var(--royal-600)'}` }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: bg.group === 'O-' ? 'var(--rose-600)' : 'var(--royal-950)' }}>
              {bg.group}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              {bg.units} Units
            </div>
            <span className={`badge ${bg.status.includes('Low') ? 'badge-danger' : 'badge-success'}`} style={{ fontSize: '0.68rem', marginTop: '6px' }}>
              {bg.status}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
          <Droplet size={16} /> Blood Units Inventory & Expiry
        </button>
        <button className={`tab-btn ${activeTab === 'crossmatch' ? 'active' : ''}`} onClick={() => setActiveTab('crossmatch')}>
          <ShieldCheck size={16} /> Cross-Matching & Compatibility Issues
        </button>
        <button className={`tab-btn ${activeTab === 'donors' ? 'active' : ''}`} onClick={() => setActiveTab('donors')}>
          <Users size={16} /> Donor Screening & Bleed Log
        </button>
        <button className={`tab-btn ${activeTab === 'eraktkosh' ? 'active' : ''}`} onClick={() => setActiveTab('eraktkosh')}>
          <Share2 size={16} /> Ministry e-RaktKosh Portal Link
        </button>
      </div>

      {/* Tab 1: Blood Units Inventory */}
      {activeTab === 'inventory' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Separated Blood Component Inventory (Storage at 2°C - 6°C)
            </h3>
            <span className="badge badge-royal">{bloodUnits.length} Units Logged</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Unit Number & Barcode</th>
                  <th>Blood Group</th>
                  <th>Component</th>
                  <th>Collection Date</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bloodUnits.map(b => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{b.unitNumber}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.bagBarcode}</div>
                    </td>
                    <td>
                      <span className="badge badge-royal" style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                        {b.bloodGroup}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{b.component}</td>
                    <td style={{ fontSize: '0.8rem' }}>{b.collectionDate}</td>
                    <td style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--rose-600)' }}>{b.expiryDate}</td>
                    <td>
                      <span className={`badge ${b.status === 'Available' ? 'badge-success' : 'badge-warning'}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Cross-Matching */}
      {activeTab === 'crossmatch' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Stat Cross-Match Compatibility Slip
            </h3>
            <span className="badge badge-success">Major & Minor Compatible</span>
          </div>

          <div style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>Case: Unknown Male (Polytrauma Emergency Bay 1)</strong>
              <span className="badge badge-danger">Stat Emergency Transfusion</span>
            </div>
            <div>Donor Unit: <strong>PRBC-2026-0912 (O Negative)</strong> cross-matched against recipient blood sample. Indirect Antiglobulin Coombs Test: Negative. Safe to transfuse under clinical supervision.</div>
          </div>
        </div>
      )}
    </div>
  );
};
