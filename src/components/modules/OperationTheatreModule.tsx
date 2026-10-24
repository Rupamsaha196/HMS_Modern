import React, { useState } from 'react';
import {
  Scissors,
  CheckSquare,
  ShieldCheck,
  Clock,
  Heart,
  Plus,
  Printer,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { INITIAL_OT_CASES } from '../../data/mockData';

export const OperationTheatreModule: React.FC = () => {
  const [otCases, setOtCases] = useState(INITIAL_OT_CASES);
  const [activeTab, setActiveTab] = useState<'schedule' | 'whoChecklist' | 'implants'>('schedule');

  // WHO Checklist status
  const [signIn, setSignIn] = useState(true);
  const [timeOut, setTimeOut] = useState(true);
  const [signOut, setSignOut] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Scissors size={24} color="var(--royal-700)" />
            Point 14: Operation Theatre (OT) Management & Surgical Safety
          </h2>
          <p className="card-subtitle">
            OT scheduling, WHO Surgical Safety Checklist (Sign In, Time Out, Sign Out), Anaesthesia intra-operative vitals, Implant barcode tracking with billing link, and PACU monitoring
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary btn-sm">
            <Plus size={14} /> Schedule New Surgery
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}>
          <Clock size={16} /> OT Roster & Surgery Schedule
        </button>
        <button className={`tab-btn ${activeTab === 'whoChecklist' ? 'active' : ''}`} onClick={() => setActiveTab('whoChecklist')}>
          <CheckSquare size={16} /> WHO Surgical Safety Checklist
        </button>
        <button className={`tab-btn ${activeTab === 'implants' ? 'active' : ''}`} onClick={() => setActiveTab('implants')}>
          <ShieldCheck size={16} /> Surgical Implants & Consumable Tracking
        </button>
      </div>

      {/* Tab 1: Schedule */}
      {activeTab === 'schedule' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Today's Operation Theatre Roster (OT 1 to 6)
            </h3>
            <span className="badge badge-royal">{otCases.length} Active Procedures</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>OT Suite</th>
                  <th>Patient UHID / Name</th>
                  <th>Planned Surgical Procedure</th>
                  <th>Surgeon & Anaesthetist</th>
                  <th>Anaesthesia</th>
                  <th>WHO Checklist</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {otCases.map(ot => (
                  <tr key={ot.id}>
                    <td><strong>{ot.otRoom}</strong></td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{ot.patientName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ot.patientUhid}</div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{ot.procedureName}</td>
                    <td>
                      <div>Lead: <strong>{ot.leadSurgeon}</strong></div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Anaesth: {ot.anaesthetist}</div>
                    </td>
                    <td><span className="badge badge-purple">{ot.anaesthesiaType}</span></td>
                    <td>
                      {ot.whoChecklistSigned ? (
                        <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                          ✓ WHO Signed
                        </span>
                      ) : (
                        <span className="badge badge-warning">Pending</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${ot.status === 'In Surgery' ? 'badge-danger' : 'badge-royal'}`}>
                        {ot.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: WHO Checklist */}
      {activeTab === 'whoChecklist' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                WHO Surgical Safety Checklist - Mandatory Clinical Protocol
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Case: Percutaneous Coronary Intervention / Hybrid Suite (OT-1)</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Phase 1: Sign In */}
            <div style={{ background: 'var(--royal-50)', border: '1px solid var(--royal-200)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 800, color: 'var(--royal-900)', fontSize: '0.9rem' }}>1. SIGN IN (Before Induction)</span>
                <span className="badge badge-success">✓ Completed</span>
              </div>
              <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: 1.6 }}>
                <li>✓ Patient identity, site & procedure confirmed</li>
                <li>✓ Surgical site marked</li>
                <li>✓ Anaesthesia safety check completed</li>
                <li>✓ Pulse oximeter on patient & functioning</li>
                <li>✓ Known allergy documented (Penicillin)</li>
                <li>✓ Difficult airway / aspiration risk evaluated</li>
              </ul>
            </div>

            {/* Phase 2: Time Out */}
            <div style={{ background: 'var(--purple-50)', border: '1px solid var(--purple-border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 800, color: 'var(--purple-900)', fontSize: '0.9rem' }}>2. TIME OUT (Before Incision)</span>
                <span className="badge badge-success">✓ Completed</span>
              </div>
              <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: 1.6 }}>
                <li>✓ All team members introduced by name & role</li>
                <li>✓ Surgeon, anaesthetist & nurse review critical steps</li>
                <li>✓ Antibiotic prophylaxis given within 60 mins</li>
                <li>✓ Essential imaging displayed on monitors</li>
                <li>✓ Anticipated blood loss estimated</li>
              </ul>
            </div>

            {/* Phase 3: Sign Out */}
            <div style={{ background: 'var(--amber-50)', border: '1px solid var(--amber-border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 800, color: 'var(--amber-900)', fontSize: '0.9rem' }}>3. SIGN OUT (Before Leaving OT)</span>
                <span className="badge badge-warning">In Progress</span>
              </div>
              <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: 1.6 }}>
                <li>Name of procedure recorded</li>
                <li>Instrument, sponge & needle count correct</li>
                <li>Specimen labeled with patient details</li>
                <li>Equipment issues to be addressed</li>
                <li>Surgeon, anaesthetist & nurse review PACU plan</li>
              </ul>
              <button
                className="btn btn-primary btn-sm"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => setSignOut(true)}
              >
                Sign Off & Transfer to PACU
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Implants */}
      {activeTab === 'implants' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              High-Value Surgical Implants & Consumable Linkage
            </h3>
            <span className="badge badge-success">Linked to Inpatient Bill</span>
          </div>

          <div style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--royal-950)', fontSize: '1rem' }}>Resolute Onyx Drug Eluting Stent (DES) 3.0 x 18mm</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Manufacturer: Medtronic • Batch: ST-26910 • Exp: 2029-08</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--royal-700)', marginTop: '2px' }}>Implanted in LAD (Proximal to Mid Segment) by Dr. Shalini M.</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--royal-950)' }}>₹28,500</div>
                <span className="badge badge-royal">GST 5% Covered</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
