import React, { useState } from 'react';
import {
  Archive,
  Barcode,
  Search,
  FileCheck,
  ShieldCheck,
  Clock,
  Printer
} from 'lucide-react';

export const MRDModule: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Archive size={24} color="var(--royal-700)" />
            Point 37: Medical Records Department (MRD & Archiving)
          </h2>
          <p className="card-subtitle">
            Physical case sheet barcode tracking (Rack / Shelf / Box location), ICD-10 medical coding audits, Legal record release controls (Court summon / Insurance audit), and Statutory retention
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <Barcode size={14} /> Scan Physical File Barcode
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Physical & Digital Case File Archive
            </h3>
            <span className="badge badge-royal">8,420 Archived Files</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Patient UHID & Name</th>
                  <th>IPD Admission #</th>
                  <th>Physical Shelf Location</th>
                  <th>ICD Coding Audit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>UHID-2026-00481</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rajesh Kumar Verma</div>
                  </td>
                  <td>IP-2026-00918</td>
                  <td><strong>Rack C • Shelf 4 • Box 12</strong></td>
                  <td><span className="badge badge-success">✓ 100% Coded (I21.0)</span></td>
                  <td><span className="badge badge-royal">In Active ICU Ward</span></td>
                </tr>
                <tr>
                  <td>
                    <strong>UHID-2025-00192</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Kavitha Murthy</div>
                  </td>
                  <td>IP-2025-00412</td>
                  <td><strong>Rack A • Shelf 1 • Box 04</strong></td>
                  <td><span className="badge badge-success">✓ Audited & Closed</span></td>
                  <td><span className="badge badge-purple">Archived (Digital+Paper)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Statutory 10-Year Record Retention Policy
            </h3>
            <span className="badge badge-royal">NABH Compliant</span>
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            In compliance with the Medical Council of India (MCI) Regulations, all Inpatient case sheets are retained for a minimum of <strong>3 years for General admissions</strong>, <strong>10 years for Medico-Legal Cases (MLC)</strong>, and <strong>indefinitely in OCR Digital EMR format</strong> on MinIO secure S3 bucket.
          </div>
        </div>
      </div>
    </div>
  );
};
