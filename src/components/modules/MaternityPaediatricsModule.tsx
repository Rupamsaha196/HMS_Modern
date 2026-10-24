import React, { useState } from 'react';
import {
  Baby,
  Heart,
  Activity,
  Calendar,
  Share2,
  Plus,
  Eye,
  Smile,
  FileCheck,
  CheckCircle2,
  Syringe
} from 'lucide-react';

export const MaternityPaediatricsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'maternity' | 'paediatrics' | 'specialty'>('paediatrics');
  const [fhirImmunizationPushed, setFhirImmunizationPushed] = useState(false);

  const immunizations = [
    { age: 'Birth', vaccine: 'BCG, OPV-0, Hepatitis B-1', status: 'Given (2020-05-11)', dueBatch: 'BCG-200912', abdmSynced: true },
    { age: '6 Weeks', vaccine: 'Pentavalent-1, Rotavirus-1, IPV-1', status: 'Given (2020-06-25)', dueBatch: 'PNT-201102', abdmSynced: true },
    { age: '10 Weeks', vaccine: 'Pentavalent-2, Rotavirus-2', status: 'Given (2020-07-28)', dueBatch: 'PNT-201244', abdmSynced: true },
    { age: '14 Weeks', vaccine: 'Pentavalent-3, Rotavirus-3, IPV-2', status: 'Given (2020-08-30)', dueBatch: 'PNT-201419', abdmSynced: true },
    { age: '9 Months', vaccine: 'MR-1 (Measles-Rubella), Vitamin A-1', status: 'Given (2021-02-14)', dueBatch: 'MR-210101', abdmSynced: true },
    { age: '5-6 Years', vaccine: 'DPT Booster-2 (Due Now)', status: 'Scheduled Today', dueBatch: 'Pending', abdmSynced: false }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Baby size={24} color="var(--royal-700)" />
            Point 16: Maternity, Paediatrics & Specialty Clinics
          </h2>
          <p className="card-subtitle">
            Antenatal care & WHO Partograph curve, Child Immunization Tracker with ABDM Immunisation Record FHIR export, Dialysis logs, Chemo oncology protocols & Ophthalmology
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFhirImmunizationPushed(true)}
            className="btn btn-secondary btn-sm"
          >
            <Share2 size={14} /> Export ABDM Immunisation FHIR
          </button>
        </div>
      </div>

      {fhirImmunizationPushed && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          ABDM Immunisation FHIR Record pushed to Child's ABHA PHR Account!
        </div>
      )}

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'paediatrics' ? 'active' : ''}`} onClick={() => setActiveTab('paediatrics')}>
          <Syringe size={16} /> Child Immunization & Growth Charts
        </button>
        <button className={`tab-btn ${activeTab === 'maternity' ? 'active' : ''}`} onClick={() => setActiveTab('maternity')}>
          <Baby size={16} /> Maternity & Partograph Curve
        </button>
        <button className={`tab-btn ${activeTab === 'specialty' ? 'active' : ''}`} onClick={() => setActiveTab('specialty')}>
          <Eye size={16} /> Specialty Templates (Dialysis / Chemo / Dental)
        </button>
      </div>

      {/* Tab 1: Paediatrics & Immunization */}
      {activeTab === 'paediatrics' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Master Aarav Deshpande (6 Yrs / Male) - WHO / IAP Immunization Schedule
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                UHID: UHID-2026-00483 • ABHA: aarav.deshpande@abdm
              </p>
            </div>
            <span className="badge badge-success">5 Milestone Vaccines Completed</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Age Milestone</th>
                  <th>Recommended Vaccines</th>
                  <th>Administration Status</th>
                  <th>Batch / Vial Barcode</th>
                  <th>ABDM Sync Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {immunizations.map((im, idx) => (
                  <tr key={idx}>
                    <td><strong>{im.age}</strong></td>
                    <td style={{ fontWeight: 600, color: 'var(--royal-950)' }}>{im.vaccine}</td>
                    <td>
                      <span className={`badge ${im.status.includes('Given') ? 'badge-success' : 'badge-warning'}`}>
                        {im.status}
                      </span>
                    </td>
                    <td><code>{im.dueBatch}</code></td>
                    <td>
                      {im.abdmSynced ? (
                        <span className="badge badge-royal" style={{ fontSize: '0.68rem' }}>
                          ✓ ABDM Synced
                        </span>
                      ) : (
                        <span className="badge badge-warning" style={{ fontSize: '0.68rem' }}>
                          Pending Admin
                        </span>
                      )}
                    </td>
                    <td>
                      {!im.abdmSynced && (
                        <button className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: '0.72rem' }}>
                          Administer Vaccine
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Maternity & Partograph */}
      {activeTab === 'maternity' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Labour Room Monitor & WHO Partograph
            </h3>
            <span className="badge badge-purple">Active Stage 1 Labour</span>
          </div>

          <div style={{ background: 'var(--surface-bg)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cervical Dilation</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--royal-950)' }}>6 cm (Alert Line)</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fetal Heart Rate (FHR)</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)' }}>142 bpm (Normal)</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Uterine Contractions</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--royal-950)' }}>3 in 10 mins (40s)</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Membranes & Liquor</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--royal-700)' }}>Intact</div>
              </div>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Partograph curve plotted within normal Alert & Action boundaries. Pediatrician on-call alerted for delivery.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Specialty Forms */}
      {activeTab === 'specialty' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Haemodialysis Unit Session Log
              </h3>
              <span className="badge badge-royal">Machine #04</span>
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Pre-dialysis weight: 68.2 kg • Target Ultrafiltration: 2.5 L • Dialyzer: High-flux Polysulfone • Blood Flow Rate: 300 ml/min • Dialysate: Bicarbonate • Heparin bolus: 2000 IU.
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Medical Oncology Chemo Protocol Calculator
              </h3>
              <span className="badge badge-purple">Regimen: FOLFOX-6</span>
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Calculated BSA: 1.82 m² • Oxaliplatin 85 mg/m² (155 mg IV) • Leucovorin 400 mg/m² (728 mg IV) • 5-FU Bolus 400 mg/m² followed by 46-hr continuous elastomeric pump infusion.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
