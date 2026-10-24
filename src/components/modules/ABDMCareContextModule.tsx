import React, { useState } from 'react';
import {
  Link2,
  QrCode,
  CheckCircle2,
  RefreshCw,
  Send,
  Smartphone,
  Lock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ABDMCareContextModule: React.FC = () => {
  const [linkingStep, setLinkingStep] = useState<'discover' | 'otp' | 'linked'>('discover');
  const [otpVal, setOtpVal] = useState('');

  const careContexts = [
    { contextId: 'OPD-2026-1024-01', type: 'OP Consultation', patient: 'Rajesh Kumar Verma', abha: 'rajesh.verma@abdm', date: '2026-10-24', status: 'Linked & Confirmed' },
    { contextId: 'IPD-2026-00918-01', type: 'IP Admission & PCI', patient: 'Rajesh Kumar Verma', abha: 'rajesh.verma@abdm', date: '2026-10-23', status: 'Linked & Confirmed' },
    { contextId: 'LAB-2026-902', type: 'Diagnostic Report', patient: 'Rajesh Kumar Verma', abha: 'rajesh.verma@abdm', date: '2026-10-24', status: 'Linked & Confirmed' },
    { contextId: 'OPD-2026-1024-02', type: 'OP Consultation', patient: 'Priya Sharma', abha: 'priya.sharma97@abdm', date: '2026-10-24', status: 'Linking In Progress' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Link2 size={24} color="var(--royal-700)" />
            Point 29: ABDM Care Context Generation & Patient Linking
          </h2>
          <p className="card-subtitle">
            Care Contexts across OPD visits, IPD admissions & Diagnostics; HIP-initiated and Patient-initiated linking (Discover &gt; Link &gt; Confirm OTP), and Asynchronous gateway callback correlation
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <Link2 size={14} /> Link New Care Episode
        </button>
      </div>

      {/* Linking Interactive Flow Simulator (Discover > OTP > Confirm) */}
      <div className="card" style={{ marginBottom: '24px', border: '1px solid var(--royal-400)', background: 'linear-gradient(to right, var(--royal-50), #ffffff)' }}>
        <div className="card-header">
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--royal-950)' }}>
              Interactive ABDM Linkage Simulator: Patient-Initiated (Discover & Link)
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Simulates incoming Discover request from patient PHR mobile app (e.g. ABHA App, Aarogya Setu)
            </p>
          </div>
          <span className="badge badge-royal">Webhook Listener Ready</span>
        </div>

        {linkingStep === 'discover' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--royal-950)' }}>Patient: Priya Sharma (priya.sharma97@abdm)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Found matching UHID-2026-00482 at MedPulse Apex Main Hospital with 1 unlinked OPD Care Context.</div>
            </div>
            <button onClick={() => setLinkingStep('otp')} className="btn btn-primary btn-sm">
              Send Link OTP to Patient Mobile
            </button>
          </div>
        )}

        {linkingStep === 'otp' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 0' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Enter 6-digit OTP received on +91 98452 34567:</span>
            <input
              type="text"
              placeholder="123456"
              value={otpVal}
              onChange={(e) => setOtpVal(e.target.value)}
              className="form-control"
              style={{ width: '140px', letterSpacing: '0.2em', textAlign: 'center' }}
            />
            <button onClick={() => setLinkingStep('linked')} className="btn btn-success btn-sm">
              Confirm & Bind Care Context
            </button>
          </div>
        )}

        {linkingStep === 'linked' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', color: 'var(--emerald-800)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
              <CheckCircle2 size={18} color="var(--emerald-600)" />
              Care Context <code>OPD-2026-1024-02</code> successfully linked to <code>priya.sharma97@abdm</code>!
            </div>
            <button onClick={() => setLinkingStep('discover')} className="btn btn-outline btn-sm">
              Reset Simulator
            </button>
          </div>
        )}
      </div>

      {/* Care Contexts Table */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
            Generated Clinical Care Contexts & ABDM Binding Registry
          </h3>
          <span className="badge badge-royal">{careContexts.length} Contexts</span>
        </div>

        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Care Context ID</th>
                <th>Encounter Type</th>
                <th>Patient Name</th>
                <th>ABHA Address</th>
                <th>Date Generated</th>
                <th>ABDM Gateway Link Status</th>
              </tr>
            </thead>
            <tbody>
              {careContexts.map((cc, i) => (
                <tr key={i}>
                  <td><code style={{ fontWeight: 700, color: 'var(--royal-700)' }}>{cc.contextId}</code></td>
                  <td><span className="badge badge-royal" style={{ fontSize: '0.7rem' }}>{cc.type}</span></td>
                  <td><strong>{cc.patient}</strong></td>
                  <td>{cc.abha}</td>
                  <td style={{ fontSize: '0.8rem' }}>{cc.date}</td>
                  <td>
                    <span className={`badge ${cc.status.includes('Confirmed') ? 'badge-success' : 'badge-warning'}`}>
                      {cc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
