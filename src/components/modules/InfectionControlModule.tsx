import React, { useState } from 'react';
import {
  Biohazard,
  ShieldAlert,
  AlertTriangle,
  Barcode,
  CheckCircle2,
  Trash2,
  Plus,
  Printer
} from 'lucide-react';
import { INITIAL_BMW_LOGS } from '../../data/mockData';

export const InfectionControlModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bmw' | 'hai' | 'isolation'>('bmw');

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Biohazard size={24} color="var(--amber-600)" />
            Point 38: Infection Control & Biomedical Waste (BMW Rules 2016)
          </h2>
          <p className="card-subtitle">
            Colour-coded waste segregation (Yellow, Red, White, Blue) with barcoded CBMWTF manifests, Hospital-Acquired Infection (HAI) surveillance (CAUTI, CLABSI, SSI, VAP), and Isolation tracking
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Log Daily BMW Weighment
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'bmw' ? 'active' : ''}`} onClick={() => setActiveTab('bmw')}>
          <Biohazard size={16} /> Biomedical Waste Daily Log (Barcoded)
        </button>
        <button className={`tab-btn ${activeTab === 'hai' ? 'active' : ''}`} onClick={() => setActiveTab('hai')}>
          <ShieldAlert size={16} /> HAI Surveillance (CLABSI / CAUTI)
        </button>
        <button className={`tab-btn ${activeTab === 'isolation' ? 'active' : ''}`} onClick={() => setActiveTab('isolation')}>
          <AlertTriangle size={16} /> Isolation Rooms & Outbreak Alerts
        </button>
      </div>

      {/* Tab 1: BMW Log */}
      {activeTab === 'bmw' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Biomedical Waste Category Logs & CBMWTF Vendor Handover Manifest
            </h3>
            <span className="badge badge-success">Pollution Control Board Mapped</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Manifest Barcode</th>
                  <th>Shift & Ward</th>
                  <th>Yellow (Infectious/Anatomical)</th>
                  <th>Red (Contaminated Plastic)</th>
                  <th>White (Sharps/Needles)</th>
                  <th>Blue (Glassware)</th>
                  <th>Vendor Status</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_BMW_LOGS.map(log => (
                  <tr key={log.id}>
                    <td><code>{log.manifestBarcode}</code></td>
                    <td><strong>{log.shift}</strong> ({log.ward})</td>
                    <td style={{ fontWeight: 700, color: '#b45309' }}>{log.yellowBagsKg} kg</td>
                    <td style={{ fontWeight: 700, color: '#dc2626' }}>{log.redBagsKg} kg</td>
                    <td style={{ fontWeight: 700 }}>{log.whiteTranslucentKg} kg</td>
                    <td style={{ fontWeight: 700, color: '#2563eb' }}>{log.blueCardboardKg} kg</td>
                    <td>
                      <span className={`badge ${log.vendorHandoverStatus.includes('Handed') ? 'badge-success' : 'badge-warning'}`}>
                        {log.vendorHandoverStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: HAI Surveillance */}
      {activeTab === 'hai' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Hospital-Acquired Infection (HAI) Benchmark Indicators (Per 1,000 Device Days)
            </h3>
            <span className="badge badge-royal">NABH Accredited Benchmark</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>CLABSI Rate:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>0.8 / 1000</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target &lt; 1.5</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>CAUTI Rate:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>1.1 / 1000</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target &lt; 2.0</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>VAP Rate:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>0.0 / 1000</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Zero cases in Q3</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>Surgical Site Infection:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>0.4%</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Clean surgical wounds</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
