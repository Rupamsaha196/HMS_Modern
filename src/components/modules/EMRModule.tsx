import React, { useState } from 'react';
import {
  FileHeart,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  Download,
  ShieldCheck,
  CheckCircle2,
  Lock,
  GitCommit,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { INITIAL_PATIENTS } from '../../data/mockData';

export const EMRModule: React.FC = () => {
  const patient = INITIAL_PATIENTS[0]; // Rajesh Kumar Verma
  const [activeTab, setActiveTab] = useState<'timeline' | 'problems' | 'cds' | 'externalAbdm'>('timeline');

  const timelineEvents = [
    { date: '2026-10-24 16:30', title: 'Cardiac Angioplasty (PCI LAD)', type: 'OT Surgery', dept: 'Cath Lab', doctor: 'Dr. Shalini M.', badge: 'In Surgery', badgeColor: 'warning' },
    { date: '2026-10-24 11:15', title: 'Critical Troponin-I Lab Result', type: 'Laboratory', dept: 'Biochemistry', doctor: 'Dr. K. S. Ramanathan', badge: '0.94 ng/mL [PANIC]', badgeColor: 'danger' },
    { date: '2026-10-24 09:30', title: 'OPD Cardiology Consultation', type: 'OPD Visit', dept: 'Cardiology', doctor: 'Dr. Shalini M.', badge: 'I21.0 Acute MI', badgeColor: 'royal' },
    { date: '2026-10-23 18:30', title: 'Emergency Admission to ICU', type: 'IPD ADT', dept: 'Critical Care', doctor: 'Dr. George Thomas', badge: 'Bed ICU-102', badgeColor: 'purple' },
    { date: '2025-11-12 14:00', title: 'Routine Diabetic Screening & HbA1c', type: 'OPD Visit', dept: 'Endocrinology', doctor: 'Dr. A. Verma', badge: 'HbA1c 7.4%', badgeColor: 'royal' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <FileHeart size={24} color="var(--royal-700)" />
            Point 9: Electronic Medical Record (EMR / EHR) Suite
          </h2>
          <p className="card-subtitle">
            Longitudinal patient timeline across OPD, IPD, emergency and diagnostics, CDS alert engines, and ABDM HIU interoperable record viewer
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">
            <Upload size={14} /> Upload Diagnostic PDF / Scans
          </button>
          <button className="btn btn-primary btn-sm">
            <ExternalLink size={14} /> Request External ABDM Records
          </button>
        </div>
      </div>

      {/* Patient Header Banner */}
      <div style={{ background: 'var(--royal-50)', border: '1px solid var(--royal-200)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--royal-950)' }}>{patient.name}</span>
            <span className="badge badge-royal">{patient.uhid}</span>
            <span className="badge badge-success">ABHA: {patient.abhaAddress}</span>
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            52 Yrs / Male • Blood: <strong>{patient.bloodGroup}</strong> • Indiranagar, Bengaluru
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <span className="badge badge-danger">Allergy: Penicillin</span>
            <span className="badge badge-danger">Allergy: Sulfa Drugs</span>
            <span className="badge badge-purple">Type 2 Diabetes</span>
            <span className="badge badge-purple">Hypertension</span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Longitudinal Record Status</div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--emerald-600)' }}>100% Interoperable (ABDM M3)</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--royal-700)' }}>Consent Granted: abdm-cns-8921</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
          <Clock size={16} /> Longitudinal Timeline
        </button>
        <button className={`tab-btn ${activeTab === 'problems' ? 'active' : ''}`} onClick={() => setActiveTab('problems')}>
          <FileText size={16} /> Active Problem List & Allergies
        </button>
        <button className={`tab-btn ${activeTab === 'cds' ? 'active' : ''}`} onClick={() => setActiveTab('cds')}>
          <Sparkles size={16} /> Clinical Decision Support (CDS) Alerts
        </button>
        <button className={`tab-btn ${activeTab === 'externalAbdm' ? 'active' : ''}`} onClick={() => setActiveTab('externalAbdm')}>
          <ShieldCheck size={16} /> External Health Records via ABDM HIU
        </button>
      </div>

      {/* Tab 1: Longitudinal Timeline */}
      {activeTab === 'timeline' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Unified Chronological Clinical Event Stream
            </h3>
            <span className="badge badge-royal">5 Longitudinal Events</span>
          </div>

          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            <div style={{
              position: 'absolute',
              top: '8px',
              bottom: '8px',
              left: '11px',
              width: '2px',
              background: 'var(--royal-200)'
            }}></div>

            {timelineEvents.map((ev, idx) => (
              <div key={idx} style={{ position: 'relative', marginBottom: '24px' }}>
                <div style={{
                  position: 'absolute',
                  left: '-28px',
                  top: '2px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--royal-600)',
                  border: '3px solid white',
                  boxShadow: '0 0 0 2px var(--royal-400)'
                }}></div>

                <div style={{
                  background: 'var(--surface-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 18px',
                  transition: 'all 0.15s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span className="badge badge-royal" style={{ fontSize: '0.68rem', marginRight: '8px' }}>{ev.type}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ev.date}</span>
                    </div>
                    <span className={`badge badge-${ev.badgeColor}`} style={{ fontSize: '0.72rem' }}>
                      {ev.badge}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '6px' }}>
                    {ev.title}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Department: <strong>{ev.dept}</strong> • Recorded By: <strong>{ev.doctor}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Clinical Decision Support (CDS) Alerts */}
      {activeTab === 'cds' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ borderLeft: '4px solid var(--rose-500)' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <AlertCircle size={24} color="var(--rose-500)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--rose-600)' }}>
                  CDS Alert: Severe Drug-Allergy Warning
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Patient has documented <strong>Type 1 IgE-Mediated Penicillin Allergy</strong>. Prescribing any Beta-Lactam antibiotics (Amoxicillin, Piperacillin, Cephalosporins) will trigger an anaphylactic risk!
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  CDS Rule ID: <code>CDS-ALLERGY-BETALACTAM-01</code> • Verified against SNOMED CT allergen code <code>91936005</code>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--amber-500)' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <AlertCircle size={24} color="var(--amber-600)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--amber-700)' }}>
                  CDS Clinical Pathway: Acute Coronary Syndrome (ACS) Protocol
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  High-sensitive Troponin-I &gt; 0.04 ng/mL with chest pain requires immediate Dual Antiplatelet Therapy (DAPT), high-intensity statin, anticoagulation (LMWH), and coronary angiography within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: External ABDM Records (HIU View) */}
      {activeTab === 'externalAbdm' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Decrypted Interoperable External Records (ABDM HIU Milestone 3)
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Retrieved under Patient Consent <code>abdm-cns-8921</code> from Apollo Hospitals Bangalore
              </p>
            </div>
            <span className="badge badge-success">Curve25519 Decrypted</span>
          </div>

          <div style={{ background: 'var(--royal-50)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--royal-950)', fontSize: '0.95rem' }}>Apollo Super-Specialty Hospital (HFR: IN2910001002)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Discharge Summary • Inpatient Admission (May 2024)</div>
              </div>
              <span className="badge badge-royal">FHIR R4 Bundle</span>
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>Diagnosis:</strong> Non-ST Elevation Myocardial Infarction (NSTEMI).<br />
              <strong>Intervention:</strong> Diagnostic Coronary Angiogram showed 50% lesion in LAD. Managed conservatively with Aspirin 75mg and Atorvastatin 20mg.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
