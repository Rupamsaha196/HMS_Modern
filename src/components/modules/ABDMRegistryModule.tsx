import React, { useState } from 'react';
import {
  Network,
  Building,
  UserCheck,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';
import { HOSPITAL_INFO, INITIAL_USERS } from '../../data/mockData';

export const ABDMRegistryModule: React.FC = () => {
  const [tokenRefreshed, setTokenRefreshed] = useState(false);

  const handleRefreshToken = () => {
    setTokenRefreshed(true);
    setTimeout(() => setTokenRefreshed(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Network size={24} color="var(--royal-700)" />
            Point 28: ABDM Facility (HFR) & Professional (HPR) Registry Bridge
          </h2>
          <p className="card-subtitle">
            Health Facility Registry (HFR) ID mapping, Healthcare Professional Registry (HPR) Doctor linking, ABDM Gateway Bridge configuration (Client ID/Secret), and Session Token cache
          </p>
        </div>

        <button onClick={handleRefreshToken} className="btn btn-outline btn-sm">
          <RefreshCw size={14} /> Refresh ABDM Gateway Session Token
        </button>
      </div>

      {tokenRefreshed && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          Session token successfully refreshed from <code>https://dev.abdm.gov.in/gateway/v0.5/sessions</code>. Cached in Redis (TTL: 3600s).
        </div>
      )}

      {/* Bridge Credentials & Session Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Bridge Config */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              ABDM Bridge Gateway Authentication Credentials
            </h3>
            <span className="badge badge-success">Bridge Online</span>
          </div>

          <div style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
              <span>Bridge Client ID:</span>
              <code>{HOSPITAL_INFO.abdmBridge.clientId}</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', padding: '6px 0' }}>
              <span>Gateway Endpoint:</span>
              <code>{HOSPITAL_INFO.abdmBridge.gatewayUrl}</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', padding: '6px 0' }}>
              <span>Active Gateway Session Token:</span>
              <span className="badge badge-success">{HOSPITAL_INFO.abdmBridge.sessionTokenExpiry}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px' }}>
              <span>Environment Mode:</span>
              <span className="badge badge-royal">Sandbox / Production Ready</span>
            </div>
          </div>
        </div>

        {/* HFR Facility Registry ID Mapping */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Hospital Health Facility (HFR) Mapping
            </h3>
            <span className="badge badge-purple">3 Facilities Bound</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {HOSPITAL_INFO.branches.map(b => (
              <div key={b.id} style={{ background: 'var(--surface-bg)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{b.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--royal-700)', fontFamily: 'monospace' }}>HFR ID: {b.hfrId}</div>
                </div>
                <span className="badge badge-success">Mapped</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Doctor HPR Registry Table */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
            Practitioner Healthcare Professional Registry (HPR) Linkage
          </h3>
          <span className="badge badge-royal">National Medical Commission (NMC) Mapped</span>
        </div>

        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Practitioner Name</th>
                <th>Specialty</th>
                <th>HPR ID / Address</th>
                <th>State Medical Council Reg</th>
                <th>Digital Signing (DSC)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {INITIAL_USERS.filter(u => u.role === 'Doctor' || u.role === 'Radiologist').map(doc => (
                <tr key={doc.id}>
                  <td><strong>{doc.name}</strong></td>
                  <td>{doc.department}</td>
                  <td><code style={{ color: 'var(--royal-700)', fontWeight: 700 }}>{doc.hprId || '91-DOC-PENDING'}</code></td>
                  <td style={{ fontSize: '0.78rem' }}>KMC Registered</td>
                  <td>
                    <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                      ✓ Class-3 DSC Bound
                    </span>
                  </td>
                  <td><span className="badge badge-success">Verified on HPR</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
