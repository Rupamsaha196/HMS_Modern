import React, { useState } from 'react';
import {
  BedDouble,
  LogOut,
  FileCheck,
  Stethoscope,
  Printer,
  Share2,
  DollarSign,
  AlertTriangle,
  UserCheck,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_PATIENTS } from '../../data/mockData';

export const IPDAdmissionModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rounds' | 'orders' | 'discharge' | 'lama'>('rounds');
  const [dischargeExported, setDischargeExported] = useState(false);

  const roundsNotes = [
    { date: '2026-10-24 10:30 AM', doctor: 'Dr. Shalini Mukhopadhyay', note: 'Patient post-PCI LAD stenting. Stable hemodynamics. Groin puncture site clean, no hematoma. Distal pedal pulses palpable (+2). Continue IV hydration and monitoring.' },
    { date: '2026-10-23 09:00 PM', doctor: 'Dr. George Thomas (ICU Registrar)', note: 'Admitted from ER with acute anterior wall STEMI. Troponin positive. Loaded with DAPT (Aspirin + Ticagrelor). Bedside Echo: anterior wall hypokinesia, EF 45%.' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <BedDouble size={24} color="var(--royal-700)" />
            Point 10: Inpatient (IPD) & ADT Workflow (Admission, Rounds & Discharge)
          </h2>
          <p className="card-subtitle">
            Bed allocation, Advance deposits & TPA pre-auth trigger, Daily clinical rounds notes, Treatment orders, Discharge summaries, and ABDM FHIR export
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">
            <DollarSign size={14} /> IPD Running Bill (₹53,677)
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('discharge')}>
            <LogOut size={14} /> Prepare Discharge Summary
          </button>
        </div>
      </div>

      {/* Current Inpatient Case Banner */}
      <div style={{ background: 'var(--royal-50)', border: '1px solid var(--royal-200)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--royal-950)' }}>Rajesh Kumar Verma</span>
            <span className="badge badge-royal">UHID-2026-00481</span>
            <span className="badge badge-purple">IPD: IP-2026-00918</span>
            <span className="badge badge-warning">Bed: ICU-102</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Admitted: <strong>23 Oct 2026, 18:30</strong> (Day 2 of Admission) • Primary Consultant: <strong>Dr. Shalini Mukhopadhyay</strong>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--royal-800)', marginTop: '4px' }}>
            TPA Pre-Auth: <strong>Star Health (₹1,95,000 Approved)</strong> • Advance Deposit: ₹35,000 Held
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Running Total</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--royal-950)' }}>₹53,677</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--emerald-600)', fontWeight: 600 }}>Within Pre-Auth Limit</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'rounds' ? 'active' : ''}`} onClick={() => setActiveTab('rounds')}>
          <Stethoscope size={16} /> Daily Doctor Rounds & Progress Notes
        </button>
        <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
          <FileCheck size={16} /> Active Treatment Orders & Care Plan
        </button>
        <button className={`tab-btn ${activeTab === 'discharge' ? 'active' : ''}`} onClick={() => setActiveTab('discharge')}>
          <LogOut size={16} /> Comprehensive Discharge Summary
        </button>
        <button className={`tab-btn ${activeTab === 'lama' ? 'active' : ''}`} onClick={() => setActiveTab('lama')}>
          <AlertTriangle size={16} /> LAMA / MLC Summary
        </button>
      </div>

      {/* Tab 1: Doctor Rounds */}
      {activeTab === 'rounds' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              SOAP Daily Progress Rounds Log
            </h3>
            <button className="btn btn-primary btn-sm">+ Add Today's Round Note</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {roundsNotes.map((r, i) => (
              <div key={i} style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{r.doctor}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.date}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {r.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Discharge Summary */}
      {activeTab === 'discharge' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Standard Inpatient Discharge Summary
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Exportable directly as ABDM Discharge Summary FHIR Record
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setDischargeExported(true)}
                className="btn btn-secondary btn-sm"
              >
                <Share2 size={14} /> Export ABDM FHIR Document
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
                <Printer size={14} /> Print Formal Summary
              </button>
            </div>
          </div>

          {dischargeExported && (
            <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
              <CheckCircle2 size={18} color="var(--emerald-600)" />
              ABDM Discharge Summary FHIR Bundle signed with DSC and pushed to National Gateway!
            </div>
          )}

          <div style={{ background: 'var(--surface-bg)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '12px' }}>
              <strong>Admission Diagnosis:</strong> Acute Anterior Wall STEMI.<br />
              <strong>Final Discharge Diagnosis:</strong> Coronary Artery Disease - Single Vessel Disease (SVD), S/P PCI to LAD with 1 DES (Resolute Onyx 3.0x18mm).<br />
              <strong>Hospital Course:</strong> Patient admitted with acute chest pain, elevated Troponin-I. Successfully underwent primary PCI to LAD on 24/10/2026. Post-op recovery uneventful. Mobilized and hemodynamically stable.
            </div>

            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '12px' }}>
              <strong>Discharge Medications:</strong><br />
              1. Tab. Ecosprin 75mg - 1 Tab Once Daily after breakfast (x 1 Year)<br />
              2. Tab. Brilinta (Ticagrelor) 90mg - 1 Tab Twice Daily (x 1 Year)<br />
              3. Tab. Atorva 40mg - 1 Tab at bedtime (Long term)<br />
              4. Tab. Metoprolol ER 25mg - 1 Tab Once Daily morning
            </div>

            <div>
              <strong>Emergency Red-Flags:</strong> Immediate reporting to ER in case of recurrent chest tightness, breathlessness, dizziness, or groin bleeding.<br />
              <strong>Follow-Up:</strong> Review in OPD with Dr. Shalini Mukhopadhyay on 31/10/2026 with repeat ECG.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
