import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  ShieldAlert,
  IndianRupee,
  RefreshCw,
  Terminal,
  Download,
  AlertTriangle,
  Award
} from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/mockData';

export const ABDMComplianceModule: React.FC = () => {
  const milestones = [
    { id: 'M1', title: 'Milestone 1: ABHA Number Creation & Verification', status: 'Certified & Production Active', date: 'Certified Aug 2025' },
    { id: 'M2', title: 'Milestone 2: Health Information Provider (HIP)', status: 'Certified & Production Active', date: 'Certified Dec 2025' },
    { id: 'M3', title: 'Milestone 3: Health Information User (HIU)', status: 'Certified & Production Active', date: 'Certified Mar 2026' }
  ];

  const apiLogs = [
    { timestamp: '2026-10-24 16:30:12', endpoint: '/v0.5/consent-requests/on-init', status: '202 Accepted', correlationId: 'req-891024-001' },
    { timestamp: '2026-10-24 16:15:45', endpoint: '/v0.5/health-information/hip/on-request', status: '200 OK', correlationId: 'req-891024-002' },
    { timestamp: '2026-10-24 15:42:01', endpoint: '/v0.5/users/auth/on-confirm', status: '200 OK', correlationId: 'req-891024-003' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <FileCheck size={24} color="var(--royal-700)" />
            Point 33: ABDM Compliance, Sandbox Suite & DHIS Incentive Reporting
          </h2>
          <p className="card-subtitle">
            National Health Authority (NHA) Milestones 1, 2, 3 Certification tracker, Digital Health Incentive Scheme (DHIS) calculator, and DPDP Act immutable audit logs
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">
            <Download size={14} /> Export DHIS Financial Claims PDF
          </button>
        </div>
      </div>

      {/* DHIS Incentive Tracker Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
        color: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', marginBottom: '6px' }}>
            National Health Authority (NHA) Scheme
          </span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Digital Health Incentive Scheme (DHIS) Ledger</h3>
          <p style={{ fontSize: '0.825rem', opacity: 0.9, marginTop: '2px' }}>
            Hospital earns ₹20 per linked care context above transaction threshold under NHA guidelines
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900 }}>₹24,960</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Total Earned for 1,248 Transactions</div>
        </div>
      </div>

      {/* Milestone Certification Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {milestones.map(m => (
          <div key={m.id} className="card" style={{ borderTop: '4px solid var(--emerald-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-success">{m.id}</span>
              <Award size={18} color="var(--emerald-600)" />
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '8px' }}>{m.title}</h4>
            <div style={{ fontSize: '0.75rem', color: 'var(--emerald-700)', fontWeight: 600, marginTop: '4px' }}>✓ {m.status}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '2px' }}>{m.date}</div>
          </div>
        ))}
      </div>

      {/* ABDM Gateway API Request & Callback Event Inspector */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={18} color="var(--royal-700)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Live ABDM Gateway Callback & Transaction Event Log
            </h3>
          </div>
          <span className="badge badge-royal">Audit Trailed</span>
        </div>

        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Gateway Endpoint</th>
                <th>Correlation Request ID</th>
                <th>Response Status</th>
              </tr>
            </thead>
            <tbody>
              {apiLogs.map((log, idx) => (
                <tr key={idx}>
                  <td style={{ fontSize: '0.78rem' }}>{log.timestamp}</td>
                  <td><code>{log.endpoint}</code></td>
                  <td><code style={{ color: 'var(--royal-700)' }}>{log.correlationId}</code></td>
                  <td><span className="badge badge-success">{log.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
