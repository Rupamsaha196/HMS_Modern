import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Plus,
  Lock,
  FileCheck
} from 'lucide-react';
import { INITIAL_ABDM_CONSENTS } from '../../data/mockData';
import { ABDMConsentArtefact } from '../../types/hms';

export const ABDMConsentModule: React.FC = () => {
  const [consents, setConsents] = useState<ABDMConsentArtefact[]>(INITIAL_ABDM_CONSENTS);
  const [selectedArtefact, setSelectedArtefact] = useState<ABDMConsentArtefact | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <KeyRound size={24} color="var(--royal-700)" />
            Point 30: ABDM Consent Manager & Data-Sharing Governance
          </h2>
          <p className="card-subtitle">
            Cryptographic consent artefacts with granular HI types, Date ranges & purpose of use; Verification of consent expiry and revocations under the DPDP Act 2023
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Raise New HIU Consent Request
        </button>
      </div>

      {/* Consent Artefacts Table */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
            Active ABDM Consent Artefacts Registry
          </h3>
          <span className="badge badge-success">Cryptographically Signed by Patient</span>
        </div>

        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Consent ID</th>
                <th>Patient ABHA</th>
                <th>Purpose of Use</th>
                <th>Health Info (HI) Types</th>
                <th>Valid Date Range</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {consents.map(c => (
                <tr key={c.id}>
                  <td><code style={{ color: 'var(--royal-700)', fontWeight: 700 }}>{c.consentId}</code></td>
                  <td><strong>{c.patientAbha}</strong></td>
                  <td><span className="badge badge-purple">{c.purpose}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {c.hiTypes.map(h => (
                        <span key={h} className="badge badge-royal" style={{ fontSize: '0.65rem' }}>{h}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.78rem' }}>{c.dateFrom} to {c.dateTo}</td>
                  <td style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.expiryDate}</td>
                  <td><span className="badge badge-success">{c.status}</span></td>
                  <td>
                    <button
                      onClick={() => setSelectedArtefact(c)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                    >
                      <Eye size={12} /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Artefact Detail Modal */}
      {selectedArtefact && (
        <div className="modal-backdrop" onClick={() => setSelectedArtefact(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--royal-950)' }}>
                ABDM Signed Consent Artefact Details
              </h3>
              <button onClick={() => setSelectedArtefact(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div className="modal-body" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '14px' }}>
                <div><strong>Consent ID:</strong> <code>{selectedArtefact.consentId}</code></div>
                <div><strong>Patient ABHA:</strong> {selectedArtefact.patientAbha} ({selectedArtefact.patientName})</div>
                <div><strong>Requester:</strong> {selectedArtefact.requesterEntity}</div>
                <div><strong>Granted At:</strong> {selectedArtefact.grantedAt}</div>
              </div>

              <div>
                <strong>Scope of Record Access:</strong>
                <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                  {selectedArtefact.hiTypes.map(h => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '12px', padding: '10px', background: 'var(--emerald-50)', borderRadius: 'var(--radius-md)', color: 'var(--emerald-800)', fontSize: '0.8rem' }}>
                <CheckCircle2 size={16} color="var(--emerald-600)" style={{ display: 'inline', marginRight: '6px' }} />
                Consent signature verified against patient public key on ABDM Gateway. Compliant with DPDP Act 2023 statutory consent requirements.
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelectedArtefact(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
