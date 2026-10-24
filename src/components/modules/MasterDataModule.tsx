import React, { useState } from 'react';
import { Database, Plus, Search, Tag, FileCode, Pill, Stethoscope, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { INITIAL_DRUGS } from '../../data/mockData';

export const MasterDataModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'departments' | 'doctors' | 'formulary' | 'codesets' | 'tariffs' | 'insurance'>('departments');
  const [codeQuery, setCodeQuery] = useState('');

  const icdCodes = [
    { code: 'I21.0', name: 'Acute transmural myocardial infarction of anterior wall', system: 'ICD-10-CM' },
    { code: 'I10', name: 'Essential (primary) hypertension', system: 'ICD-10-CM' },
    { code: 'E11.9', name: 'Type 2 diabetes mellitus without complications', system: 'ICD-10-CM' },
    { code: 'J45.909', name: 'Unspecified asthma, uncomplicated', system: 'ICD-10-CM' },
    { code: 'S06.0X0A', name: 'Concussion without loss of consciousness, initial encounter', system: 'ICD-10-CM' }
  ];

  const loincCodes = [
    { loinc: '58410-2', name: 'Complete blood count (CBC) with differential', specimen: 'Whole Blood' },
    { loinc: '42757-5', name: 'Troponin I.cardiac [Mass/volume] in Serum or Plasma', specimen: 'Serum' },
    { loinc: '24325-3', name: 'Hepatic function panel - Serum or Plasma', specimen: 'Serum' },
    { loinc: '24323-8', name: 'Comprehensive metabolic panel', specimen: 'Serum/Plasma' },
    { loinc: '2160-0', name: 'Creatinine [Mass/volume] in Serum or Plasma', specimen: 'Serum' }
  ];

  const tariffs = [
    { service: 'OPD Super-Specialist Consultation', generalRate: 850, tpaRate: 750, cghsRate: 350, gst: '0% (Exempt)' },
    { service: 'ICU Bed Charges (Per Day)', generalRate: 12500, tpaRate: 11000, cghsRate: 4500, gst: '0% (Exempt)' },
    { service: 'Coronary Angiography (CAG)', generalRate: 18500, tpaRate: 16500, cghsRate: 9800, gst: '0% (Exempt)' },
    { service: 'CT Scan Coronary Angio 3D', generalRate: 14500, tpaRate: 13000, cghsRate: 6200, gst: '0% (Exempt)' },
    { service: 'Surgical Consumables & Drapes Pack', generalRate: 4200, tpaRate: 3800, cghsRate: 2800, gst: '12% GST' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Database size={24} color="var(--royal-700)" />
            Point 3: Master Data Management (Catalog, Code Sets & Tariffs)
          </h2>
          <p className="card-subtitle">
            Configure clinical catalogs, Doctor master, Drug formulary, ICD-10, LOINC, SNOMED CT standard code sets, Tariff slabs, and Payer masters
          </p>
        </div>
        <button className="btn btn-primary btn-sm">
          <Plus size={15} /> Add Master Record
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'departments' ? 'active' : ''}`} onClick={() => setActiveTab('departments')}>
          <Building size={16} /> Departments & Wards
        </button>
        <button className={`tab-btn ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>
          <Stethoscope size={16} /> Doctor Master
        </button>
        <button className={`tab-btn ${activeTab === 'formulary' ? 'active' : ''}`} onClick={() => setActiveTab('formulary')}>
          <Pill size={16} /> Formulary & Drug Master
        </button>
        <button className={`tab-btn ${activeTab === 'codesets' ? 'active' : ''}`} onClick={() => setActiveTab('codesets')}>
          <FileCode size={16} /> Standard Codes (ICD-10 / LOINC)
        </button>
        <button className={`tab-btn ${activeTab === 'tariffs' ? 'active' : ''}`} onClick={() => setActiveTab('tariffs')}>
          <Tag size={16} /> Tariffs & Price Lists
        </button>
        <button className={`tab-btn ${activeTab === 'insurance' ? 'active' : ''}`} onClick={() => setActiveTab('insurance')}>
          <ShieldCheck size={16} /> TPA & Corporate Master
        </button>
      </div>

      {/* Tab 1: Departments & Wards */}
      {activeTab === 'departments' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Hospital Departments, Wards & Operation Theatres Catalog
            </h3>
            <span className="badge badge-royal">18 Configured</span>
          </div>
          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Department / Unit Code</th>
                  <th>Classification</th>
                  <th>Head of Department (HOD)</th>
                  <th>Total Beds / Capacity</th>
                  <th>ABDM Diagnostic Mapping</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Cardiology & Cath Lab (DEPT-CARD)</strong></td>
                  <td>Super-Specialty Clinical</td>
                  <td>Dr. Shalini Mukhopadhyay</td>
                  <td>42 Beds (12 ICCU + 30 Ward)</td>
                  <td><span className="badge badge-success">LOINC/SNOMED Active</span></td>
                  <td><span className="badge badge-royal">Active</span></td>
                </tr>
                <tr>
                  <td><strong>Orthopaedics & Joint Replacement</strong></td>
                  <td>Surgical Specialty</td>
                  <td>Dr. Vikramaditya Rao</td>
                  <td>36 Beds (4 HDU + 32 Ward)</td>
                  <td><span className="badge badge-success">Mapped</span></td>
                  <td><span className="badge badge-royal">Active</span></td>
                </tr>
                <tr>
                  <td><strong>Medical ICU (MICU Complex)</strong></td>
                  <td>Critical Care High Dependency</td>
                  <td>Dr. George Thomas</td>
                  <td>24 Ventilator Beds</td>
                  <td><span className="badge badge-success">HL7/IoT Connected</span></td>
                  <td><span className="badge badge-royal">Active</span></td>
                </tr>
                <tr>
                  <td><strong>Operation Theatre Complex (OT 1 to 6)</strong></td>
                  <td>Surgical Suite</td>
                  <td>Dr. George Thomas</td>
                  <td>6 Modular Laminar Flow OTs</td>
                  <td><span className="badge badge-success">WHO Checklist Active</span></td>
                  <td><span className="badge badge-royal">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Doctor Master */}
      {activeTab === 'doctors' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Practitioner Master with ABDM HPR IDs & Visiting Rules
            </h3>
            <span className="badge badge-royal">32 Active Consultants</span>
          </div>
          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Doctor Name & Degree</th>
                  <th>Specialty</th>
                  <th>ABDM HPR ID</th>
                  <th>OPD Fee</th>
                  <th>Visiting Consultant Split</th>
                  <th>Schedule</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Dr. Shalini Mukhopadhyay, MD, DM</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Reg # KMC-49102 • Full-time Senior Consultant</div>
                  </td>
                  <td>Cardiology</td>
                  <td><code style={{ color: 'var(--royal-700)', fontWeight: 600 }}>91-DOC-4821-BLR</code></td>
                  <td>₹850</td>
                  <td>Institutional Full-Time (Fixed)</td>
                  <td>Mon - Sat (09:00 - 14:00)</td>
                </tr>
                <tr>
                  <td>
                    <strong>Dr. Vikramaditya Rao, MS (Ortho), MCh</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Reg # KMC-33812 • Visiting Consultant</div>
                  </td>
                  <td>Orthopaedics</td>
                  <td><code style={{ color: 'var(--royal-700)', fontWeight: 600 }}>91-DOC-8821-BLR</code></td>
                  <td>₹950</td>
                  <td>70% Consultant / 30% Hospital</td>
                  <td>Tue, Thu, Sat (15:00 - 18:00)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Drug Formulary */}
      {activeTab === 'formulary' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Hospital Formulary with Schedule H/H1/X Controls
            </h3>
            <span className="badge badge-royal">{INITIAL_DRUGS.length} Listed</span>
          </div>
          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Brand Name</th>
                  <th>Generic Molecule</th>
                  <th>Schedule Class</th>
                  <th>Form & Dose</th>
                  <th>Stock Available</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_DRUGS.map(d => (
                  <tr key={d.id}>
                    <td><strong>{d.brandName}</strong></td>
                    <td style={{ color: 'var(--text-secondary)' }}>{d.genericName}</td>
                    <td>
                      <span className={`badge ${d.schedule === 'Schedule X' ? 'badge-danger' : d.schedule === 'Schedule H' ? 'badge-warning' : 'badge-royal'}`}>
                        {d.schedule}
                      </span>
                    </td>
                    <td>{d.form} ({d.dosage})</td>
                    <td style={{ fontWeight: 700 }}>{d.stockQuantity} units</td>
                    <td style={{ fontWeight: 600, color: 'var(--emerald-600)' }}>₹{d.pricePerUnit.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Standard Code Sets */}
      {activeTab === 'codesets' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Standard Code Sets Browser (ICD-10, LOINC & SNOMED CT)
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Required for NRCeS FHIR profile compliance in ABDM Milestones 2 & 3
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-bg)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <Search size={14} color="var(--royal-600)" />
              <input
                type="text"
                placeholder="Search ICD-10 or LOINC..."
                value={codeQuery}
                onChange={(e) => setCodeQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8rem', width: '180px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--royal-900)', marginBottom: '8px' }}>
                ICD-10 Diagnosis Codes
              </h4>
              <div className="table-container">
                <table className="hms-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Clinical Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {icdCodes.map(c => (
                      <tr key={c.code}>
                        <td><code style={{ color: 'var(--royal-700)', fontWeight: 700 }}>{c.code}</code></td>
                        <td style={{ fontSize: '0.8rem' }}>{c.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--royal-900)', marginBottom: '8px' }}>
                LOINC Diagnostic Codes
              </h4>
              <div className="table-container">
                <table className="hms-table">
                  <thead>
                    <tr>
                      <th>LOINC</th>
                      <th>Observation / Test Name</th>
                      <th>Specimen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loincCodes.map(l => (
                      <tr key={l.loinc}>
                        <td><code style={{ color: 'var(--purple-700)', fontWeight: 700 }}>{l.loinc}</code></td>
                        <td style={{ fontSize: '0.8rem' }}>{l.name}</td>
                        <td><span className="badge badge-royal" style={{ fontSize: '0.68rem' }}>{l.specimen}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Tariffs & Price Lists */}
      {activeTab === 'tariffs' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Master Tariff Matrix by Payer Category & GST Slabs
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Differential pricing across Cash, TPA Insurance, CGHS / PM-JAY and Corporate
              </p>
            </div>
          </div>
          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Hospital Service / Procedure</th>
                  <th>Cash / General</th>
                  <th>Private TPA Tariff</th>
                  <th>Govt Scheme (CGHS/PMJAY)</th>
                  <th>GST Slabs</th>
                </tr>
              </thead>
              <tbody>
                {tariffs.map((t, idx) => (
                  <tr key={idx}>
                    <td><strong>{t.service}</strong></td>
                    <td style={{ fontWeight: 600 }}>₹{t.generalRate}</td>
                    <td style={{ fontWeight: 600, color: 'var(--royal-700)' }}>₹{t.tpaRate}</td>
                    <td style={{ fontWeight: 600, color: 'var(--purple-700)' }}>₹{t.cghsRate}</td>
                    <td><span className="badge badge-royal" style={{ fontSize: '0.7rem' }}>{t.gst}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Insurance & Corporate Master */}
      {activeTab === 'insurance' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Insurance Companies, TPAs & Corporate Employers Master
            </h3>
            <span className="badge badge-royal">28 Empaneled</span>
          </div>
          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Payer Name</th>
                  <th>Type</th>
                  <th>NHCX Registry ID</th>
                  <th>Cashless Pre-Auth TAT</th>
                  <th>Default Tariff Surcharge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Star Health & Allied Insurance</strong></td>
                  <td>Stand-alone Health Insurer</td>
                  <td><code>NHCX-INS-0012</code></td>
                  <td>2 Hours Guarantee</td>
                  <td>TPA Master Tariff</td>
                </tr>
                <tr>
                  <td><strong>Medi Assist Healthcare Services</strong></td>
                  <td>Third Party Administrator (TPA)</td>
                  <td><code>NHCX-TPA-0004</code></td>
                  <td>3 Hours Guarantee</td>
                  <td>TPA Master Tariff</td>
                </tr>
                <tr>
                  <td><strong>National Health Authority (PM-JAY)</strong></td>
                  <td>Government Health Scheme</td>
                  <td><code>NHA-PMJAY-TMS</code></td>
                  <td>Instant Pre-Auth TMS</td>
                  <td>Ayushman Bharat Package Tariff</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
