import React, { useState } from 'react';
import {
  Sparkles,
  Utensils,
  Shirt,
  Brush,
  CheckCircle2,
  Clock,
  Plus,
  RefreshCw
} from 'lucide-react';

export const CSSDHousekeepingModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cssd' | 'dietary' | 'laundry' | 'housekeeping'>('cssd');

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Sparkles size={24} color="var(--royal-700)" />
            Point 23: CSSD, Hospital Dietary, Laundry & Housekeeping
          </h2>
          <p className="card-subtitle">
            Central Sterile Supply Department (CSSD) Autoclave cycles, Therapeutic diet planning & meal delivery, Linen inventory tracking, and Discharge-triggered terminal room cleaning
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'cssd' ? 'active' : ''}`} onClick={() => setActiveTab('cssd')}>
          <Sparkles size={16} /> CSSD Sterilization Cycles
        </button>
        <button className={`tab-btn ${activeTab === 'dietary' ? 'active' : ''}`} onClick={() => setActiveTab('dietary')}>
          <Utensils size={16} /> Dietary & Nutrition Orders
        </button>
        <button className={`tab-btn ${activeTab === 'laundry' ? 'active' : ''}`} onClick={() => setActiveTab('laundry')}>
          <Shirt size={16} /> Laundry & Linen Distribution
        </button>
        <button className={`tab-btn ${activeTab === 'housekeeping' ? 'active' : ''}`} onClick={() => setActiveTab('housekeeping')}>
          <Brush size={16} /> Housekeeping Cleaning Tasks
        </button>
      </div>

      {/* Tab 1: CSSD */}
      {activeTab === 'cssd' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              CSSD Autoclave & ETO Sterilization Cycles Traceability
            </h3>
            <span className="badge badge-success">Biological Indicator: Negative (Passed)</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Cycle Batch #</th>
                  <th>Machine / Autoclave</th>
                  <th>Instrument Sets Packed</th>
                  <th>Temp & Pressure</th>
                  <th>Chemical Indicator</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>CSSD-26-AUTO-104</strong></td>
                  <td>Getinge Steam Autoclave #1</td>
                  <td>Major Laparotomy Set (2), Cardiac Bypass Set (1)</td>
                  <td>134°C @ 2.1 Bar (45 min)</td>
                  <td><span className="badge badge-success">Class 5 Strip Turned Black</span></td>
                  <td>2026-11-24</td>
                </tr>
                <tr>
                  <td><strong>CSSD-26-ETO-042</strong></td>
                  <td>Low-Temp ETO Sterilizer #2</td>
                  <td>Laparoscopic Endoscopes & Cameras (4 Sets)</td>
                  <td>55°C @ 5 hrs Aeration</td>
                  <td><span className="badge badge-success">Gas Tape Passed</span></td>
                  <td>2026-11-15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Dietary */}
      {activeTab === 'dietary' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Therapeutic Inpatient Diet Orders & Kitchen Production
            </h3>
            <span className="badge badge-royal">194 Active Patient Trays</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>Diabetic Diet (1800 kcal)</strong>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>48 Trays</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>Renal Diet (Low Salt, Low K+)</strong>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--purple-900)', marginTop: '4px' }}>22 Trays</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>Soft / Pureed / Post-Op</strong>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--amber-900)', marginTop: '4px' }}>34 Trays</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>Nil Per Os (NPO for OT)</strong>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--rose-900)', marginTop: '4px' }}>8 Patients</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Housekeeping */}
      {activeTab === 'housekeeping' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Discharge-Triggered Terminal Room Sanitization Dispatch
            </h3>
            <span className="badge badge-warning">1 Bed Pending Cleaning</span>
          </div>
          <div style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
            <strong>Bed ICU-103: Terminal Cleaning Dispatched</strong><br />
            Assigned to Housekeeping Attendant: <strong>Ramesh K.</strong><br />
            Protocol: UV-C sanitization & 1% Sodium Hypochlorite fogging. Bed status will auto-update to "Vacant & Ready" upon supervisor sign-off.
          </div>
        </div>
      )}
    </div>
  );
};
