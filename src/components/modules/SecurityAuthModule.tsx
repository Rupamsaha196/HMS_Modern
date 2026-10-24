import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  KeyRound,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Server
} from 'lucide-react';

export const SecurityAuthModule: React.FC = () => {
  const auditLogs = [
    { timestamp: '2026-10-24 16:32:01', user: 'Dr. Shalini Mukhopadhyay', action: 'RECORD_VIEW', uhid: 'UHID-2026-00481', ip: '10.20.1.42 (Cath Lab Terminal 1)', result: 'SUCCESS' },
    { timestamp: '2026-10-24 16:20:15', user: 'Sister Mary Joseph', action: 'MEDICATION_ADMINISTER', uhid: 'UHID-2026-00481', ip: '10.20.2.18 (ICU Mobile Scanner)', result: 'SUCCESS' },
    { timestamp: '2026-10-24 14:15:00', user: 'Dr. George Thomas', action: 'BREAK_GLASS_OVERRIDE', uhid: 'UHID-2026-00484', ip: '10.20.0.12 (Emergency Bay 1)', result: 'OVERRIDE_AUTHORIZED' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Lock size={24} color="var(--royal-700)" />
            Point 44: Information Security, MFA & Immutable Audit Trail (DPDP Act)
          </h2>
          <p className="card-subtitle">
            Two-Factor Authentication (TOTP / SMS), Spring Security & Keycloak JWT architecture, OWASP Top-10 protections, and Immutable forensic audit trail
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            <ShieldCheck size={14} /> VAPT Certified: ISO 27001 & DPDP 2023
          </span>
        </div>
      </div>

      {/* Security Status Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <div className="card" style={{ padding: '16px' }}>
          <strong>MFA Enforcement:</strong>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>100% Mandatory</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TOTP Authenticator & SMS</div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <strong>Database Encryption:</strong>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--royal-700)', marginTop: '4px' }}>AES-256 at Rest</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TLS 1.3 in Transit</div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <strong>Session Timeout:</strong>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>15 Minutes</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Auto-lock on idle</div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <strong>OWASP Hardening:</strong>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>WAF Active</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CSRF, XSS, SQLi Blocked</div>
        </div>
      </div>

      {/* Immutable Forensic Audit Trail Table */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
            Immutable Forensic Patient Access Audit Log
          </h3>
          <span className="badge badge-royal">Tamper-Proof Ledger</span>
        </div>

        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Staff Practitioner / User</th>
                <th>Action Type</th>
                <th>Patient UHID Target</th>
                <th>Workstation IP / Device</th>
                <th>Security Outcome</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((a, i) => (
                <tr key={i}>
                  <td style={{ fontSize: '0.78rem' }}>{a.timestamp}</td>
                  <td><strong>{a.user}</strong></td>
                  <td><code style={{ color: 'var(--royal-700)' }}>{a.action}</code></td>
                  <td><strong>{a.uhid}</strong></td>
                  <td style={{ fontSize: '0.75rem' }}>{a.ip}</td>
                  <td><span className="badge badge-success">{a.result}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
