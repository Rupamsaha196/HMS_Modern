import React, { useState } from 'react';
import {
  DownloadCloud,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Lock,
  RefreshCw,
  Clock,
  Eye,
  FileText
} from 'lucide-react';

export const ABDMHIUModule: React.FC = () => {
  const [patientAbha, setPatientAbha] = useState('rajesh.verma@abdm');
  const [requestSent, setRequestSent] = useState(false);

  const externalRecords = [
    { sourceHospital: 'Fortis Hospital (Bannerghatta)', hfrId: 'IN2910008812', recordType: 'Diagnostic Report', date: '2025-08-14', details: 'Coronary Angiogram (Radial Route). Proximal LAD 50% stenosis.', expiresAt: '2026-11-24' },
    { sourceHospital: 'Manipal Hospital (HAL Airport Rd)', hfrId: 'IN2910009941', recordType: 'Discharge Summary', date: '2024-03-10', details: 'Acute Gastroenteritis with moderate dehydration. Treated with IV fluids.', expiresAt: '2026-11-24' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <DownloadCloud size={24} color="var(--royal-700)" />
            Point 32: ABDM Health Information User (HIU - Milestone 3 Certified)
          </h2>
          <p className="card-subtitle">
            Consent request dispatch to patient ABHA, Decryption of received FHIR bundles, Unified clinician EMR view of external records, and Automatic consent-bound data expiry
          </p>
        </div>
      </div>

      {requestSent && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          Consent Request dispatched to patient ABHA app! Request ID: <code>cr-2026-1024-99</code>. Waiting for patient authorization.
        </div>
      )}

      {/* Raise Consent Request Bar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
            Raise New Health Data Consent Request (HIU Flow)
          </h3>
          <span className="badge badge-royal">Consent Manager Bridge</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr auto', gap: '12px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Patient ABHA Address</label>
            <input
              type="text"
              value={patientAbha}
              onChange={(e) => setPatientAbha(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Purpose of Health Record Access</label>
            <select className="form-select">
              <option>Care Management & Inpatient Treatment</option>
              <option>Second Opinion / Specialist Referral</option>
              <option>Diagnostic Evaluation</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Data Validity Duration</label>
            <select className="form-select">
              <option>30 Days (Standard Episode)</option>
              <option>7 Days (Acute Visit)</option>
              <option>1 Year (Chronic Care)</option>
            </select>
          </div>

          <button
            onClick={() => { setRequestSent(true); setTimeout(() => setRequestSent(false), 3000); }}
            className="btn btn-primary"
          >
            Send Consent Request
          </button>
        </div>
      </div>

      {/* External Records Received */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Decrypted External Records Available for Clinician Review
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Patient: Rajesh Kumar Verma (rajesh.verma@abdm) • Consent Validated
            </p>
          </div>
          <span className="badge badge-success">Consent-Bound Access Active</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {externalRecords.map((rec, i) => (
            <div key={i} style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--royal-950)', fontSize: '0.95rem' }}>{rec.sourceHospital}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Facility HFR: {rec.hfrId} • Date of Record: {rec.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-royal">{rec.recordType}</span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '2px' }}>Expires: {rec.expiresAt}</div>
                </div>
              </div>

              <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {rec.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
