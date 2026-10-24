import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
  TrendingUp,
  BarChart2,
  ExternalLink
} from 'lucide-react';
import { INITIAL_CLAIMS } from '../../data/mockData';
import { InsuranceClaim } from '../../types/hms';

export const InsuranceTPAModule: React.FC = () => {
  const [claims, setClaims] = useState<InsuranceClaim[]>(INITIAL_CLAIMS);
  const [activeTab, setActiveTab] = useState<'claims' | 'nhcx' | 'pmjay' | 'denials'>('claims');

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <ShieldCheck size={24} color="var(--royal-700)" />
            Point 26: Insurance, TPA & Government Schemes (NHCX Ready)
          </h2>
          <p className="card-subtitle">
            Pre-authorizations, Enhancements, Cashless settlements, PM-JAY Ayushman Bharat & CGHS portal processing, National Health Claims Exchange (NHCX), and Denial analytics
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary btn-sm">
            <Plus size={14} /> New Pre-Auth Claim Submission
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'claims' ? 'active' : ''}`} onClick={() => setActiveTab('claims')}>
          <ShieldCheck size={16} /> Cashless Claims Roster
        </button>
        <button className={`tab-btn ${activeTab === 'nhcx' ? 'active' : ''}`} onClick={() => setActiveTab('nhcx')}>
          <ExternalLink size={16} /> NHCX Gateway Integration
        </button>
        <button className={`tab-btn ${activeTab === 'pmjay' ? 'active' : ''}`} onClick={() => setActiveTab('pmjay')}>
          <Building2 size={16} /> Ayushman Bharat (PM-JAY) TMS
        </button>
        <button className={`tab-btn ${activeTab === 'denials' ? 'active' : ''}`} onClick={() => setActiveTab('denials')}>
          <AlertTriangle size={16} /> Rejection & Denial Analytics
        </button>
      </div>

      {/* Tab 1: Claims List */}
      {activeTab === 'claims' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Active Cashless Insurance & TPA Claims
            </h3>
            <span className="badge badge-royal">{claims.length} Claims Active</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Claim ID & NHCX ID</th>
                  <th>Patient Name & UHID</th>
                  <th>Insurer / TPA</th>
                  <th>Scheme</th>
                  <th>Estimated Cost</th>
                  <th>Pre-Auth Approved</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {claims.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{c.claimNumber}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.nhcxClaimId}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--royal-950)' }}>{c.patientName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.uhid}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.insuranceCompany}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TPA: {c.tpaName}</div>
                    </td>
                    <td><span className="badge badge-purple">{c.scheme}</span></td>
                    <td>₹{c.estimatedCost.toLocaleString()}</td>
                    <td style={{ fontWeight: 800, color: 'var(--emerald-600)' }}>₹{c.approvedAmount.toLocaleString()}</td>
                    <td>
                      <span className="badge badge-success">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: NHCX National Health Claims Exchange */}
      {activeTab === 'nhcx' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                National Health Claims Exchange (NHCX) Interoperability
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Standardized FHIR claim lifecycle developed by National Health Authority & IRDAI
              </p>
            </div>
            <span className="badge badge-success">NHCX Connected</span>
          </div>

          <div style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '8px' }}>
              Claims are submitted as standard <strong>FHIR Claim & ClaimResponse Bundles</strong> across 42 empanelled general and health insurers in India.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px' }}>
              <div style={{ background: 'white', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <strong>Average Pre-Auth Turnaround:</strong>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--royal-900)', marginTop: '4px' }}>42 Minutes</div>
              </div>
              <div style={{ background: 'white', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <strong>Claim Approval Ratio:</strong>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>96.8%</div>
              </div>
              <div style={{ background: 'white', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <strong>Total Cashless Settled (MTD):</strong>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--purple-900)', marginTop: '4px' }}>₹1.18 Cr</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Denial Analytics */}
      {activeTab === 'denials' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Top Claim Denial & Query Reasons with Appeal Workflow
            </h3>
            <span className="badge badge-warning">Denial Rate: 3.2%</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '12px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Query: Indoor Case Sheet & Doctor Daily Notes Missing</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Star Health • Resolved via automated EMR FHIR document attach</div>
              </div>
              <span className="badge badge-success">Resolved & Approved</span>
            </div>
            <div style={{ padding: '12px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Query: Justification for ICU Stay vs Ward Admission</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ICICI Lombard • Clinician justification and vital logs sent</div>
              </div>
              <span className="badge badge-success">Approved</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
