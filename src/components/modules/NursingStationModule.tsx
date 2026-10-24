import React, { useState } from 'react';
import {
  HeartPulse,
  Barcode,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Droplet,
  FileCheck,
  Send,
  Plus,
  ShieldAlert
} from 'lucide-react';
import { INITIAL_MAR_ITEMS } from '../../data/mockData';
import { MARItem } from '../../types/hms';

export const NursingStationModule: React.FC = () => {
  const [marItems, setMarItems] = useState<MARItem[]>(INITIAL_MAR_ITEMS);
  const [activeTab, setActiveTab] = useState<'mar' | 'io' | 'assessment' | 'handover'>('mar');
  const [scannedAlert, setScannedAlert] = useState<string | null>(null);

  // Fall & Braden risk score
  const [fallRiskScore, setFallRiskScore] = useState(45); // High risk
  const [bradenScore, setBradenScore] = useState(14); // Moderate risk

  const handleAdministerDrug = (id: string) => {
    setMarItems(marItems.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status: 'Given',
          barcodeVerified: true,
          administeredTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          administeredBy: 'Sister Mary Joseph, RN'
        };
      }
      return m;
    }));
    setScannedAlert('Barcode Verified! 5 Rights Checked: Right Patient, Right Drug, Right Dose, Right Route, Right Time.');
    setTimeout(() => setScannedAlert(null), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <HeartPulse size={24} color="var(--royal-700)" />
            Point 13: Nursing Station & Medication Administration Record (e-MAR)
          </h2>
          <p className="card-subtitle">
            5-Rights barcode verification, 24-hr Fluid Balance & Intake/Output charts, Fall Risk (Morse) & Pressure Ulcer (Braden) scores, SBAR Shift Handover, and Consumables posting
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">
            <Plus size={14} /> Post Consumables to Billing
          </button>
          <button className="btn btn-primary btn-sm">
            <Barcode size={14} /> Scan Wristband & Drug Barcode
          </button>
        </div>
      </div>

      {scannedAlert && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--emerald-800)' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          {scannedAlert}
        </div>
      )}

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'mar' ? 'active' : ''}`} onClick={() => setActiveTab('mar')}>
          <Barcode size={16} /> e-MAR (Medication Administration)
        </button>
        <button className={`tab-btn ${activeTab === 'io' ? 'active' : ''}`} onClick={() => setActiveTab('io')}>
          <Droplet size={16} /> 24-Hr Fluid Balance & I/O Chart
        </button>
        <button className={`tab-btn ${activeTab === 'assessment' ? 'active' : ''}`} onClick={() => setActiveTab('assessment')}>
          <ShieldAlert size={16} /> Fall Risk & Braden Score
        </button>
        <button className={`tab-btn ${activeTab === 'handover' ? 'active' : ''}`} onClick={() => setActiveTab('handover')}>
          <FileCheck size={16} /> SBAR Shift Handover Notes
        </button>
      </div>

      {/* Tab 1: e-MAR */}
      {activeTab === 'mar' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Scheduled Medication Doses (Ward ICU / CCU)
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Barcode scanner verification prevents drug administration errors
              </p>
            </div>
            <span className="badge badge-royal">{marItems.length} Doses Listed</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Patient & Bed</th>
                  <th>Medication & Dose</th>
                  <th>Route</th>
                  <th>Scheduled Time</th>
                  <th>Administered</th>
                  <th>Verification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {marItems.map(m => (
                  <tr key={m.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--royal-900)' }}>Bed: {m.bedNumber}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.patientUhid}</div>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--royal-950)' }}>{m.medicationName}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Dose: {m.dose}</div>
                    </td>
                    <td><span className="badge badge-royal" style={{ fontSize: '0.7rem' }}>{m.route}</span></td>
                    <td style={{ fontWeight: 600 }}>{m.scheduledTime}</td>
                    <td>
                      {m.administeredTime ? (
                        <span style={{ fontSize: '0.8rem', color: 'var(--emerald-700)', fontWeight: 600 }}>
                          ✓ {m.administeredTime} ({m.administeredBy})
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pending</span>
                      )}
                    </td>
                    <td>
                      {m.barcodeVerified ? (
                        <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                          <CheckCircle2 size={11} /> Barcode Verified
                        </span>
                      ) : (
                        <span className="badge badge-warning" style={{ fontSize: '0.68rem' }}>
                          Unverified
                        </span>
                      )}
                    </td>
                    <td>
                      {m.status !== 'Given' ? (
                        <button
                          onClick={() => handleAdministerDrug(m.id)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          <Barcode size={13} /> Give Dose
                        </button>
                      ) : (
                        <span className="badge badge-success">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Fluid Balance & I/O */}
      {activeTab === 'io' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              24-Hour Fluid Balance & Intake / Output Chart (Bed ICU-102)
            </h3>
            <span className="badge badge-royal">Net Balance: +450 mL (Positive)</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: 'var(--royal-50)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--royal-900)', marginBottom: '8px' }}>
                Total Fluid Intake: 1,850 mL
              </h4>
              <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '18px', lineHeight: 1.6 }}>
                <li>IV Normal Saline (0.9%): 1,000 mL</li>
                <li>IV Dextrose (5%): 500 mL</li>
                <li>Oral fluids & medication sips: 350 mL</li>
              </ul>
            </div>

            <div style={{ background: 'var(--amber-50)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--amber-border)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--amber-900)', marginBottom: '8px' }}>
                Total Fluid Output: 1,400 mL
              </h4>
              <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '18px', lineHeight: 1.6 }}>
                <li>Urine via Foley Catheter: 1,300 mL (Clear, adequate &gt; 0.5 ml/kg/hr)</li>
                <li>Drain / Ryles tube: 100 mL</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Fall Risk & Braden */}
      {activeTab === 'assessment' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Morse Fall Risk Assessment
              </h3>
              <span className="badge badge-danger">Score: {fallRiskScore} (High Fall Risk)</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Interventions deployed: Yellow wristband applied, bed rails elevated x 4, call bell within reach, nurse assistance mandatory for ambulation.
            </p>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Braden Pressure Ulcer Risk Assessment
              </h3>
              <span className="badge badge-warning">Score: {bradenScore} (Moderate Risk)</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Interventions deployed: Air mattress active, 2-hourly lateral turning schedule logged, skin barrier cream applied over sacrum and heels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
