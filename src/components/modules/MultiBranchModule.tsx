import React, { useState } from 'react';
import { Building, GitFork, ArrowLeftRight, ShieldCheck, Plus, CheckCircle, RefreshCw, Send, Check } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/mockData';

export const MultiBranchModule: React.FC = () => {
  const [tenantIsolation, setTenantIsolation] = useState(true);
  const [stockTransferRequested, setStockTransferRequested] = useState(false);

  const stockTransfers = [
    { id: 'ST-901', fromBranch: 'Apex Main Hospital', toBranch: 'North Care Center', item: 'Inj. Clexane 40mg (50 PFS)', date: '2026-10-24 11:30', status: 'In Transit', driver: 'KA-04-MG-8822' },
    { id: 'ST-900', fromBranch: 'Apex Main Hospital', toBranch: 'South Diagnostic Center', item: 'Troponin I Reagent Kits (2 Packs)', date: '2026-10-23 16:00', status: 'Received & Verified', driver: 'KA-04-MG-8821' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Building size={24} color="var(--royal-700)" />
            Point 4: Multi-Facility & Multi-Branch Management
          </h2>
          <p className="card-subtitle">
            Hospital group hierarchy, tenant-wise data separation, inter-branch patient record sharing, pharmacy stock transfers, and branch HFR facility mapping
          </p>
        </div>
        <button className="btn btn-primary btn-sm">
          <Plus size={15} /> Add New Facility Unit
        </button>
      </div>

      {/* Group Hierarchy Tree & HFR Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {HOSPITAL_INFO.branches.map(b => (
          <div key={b.id} className="card" style={{ borderTop: '4px solid var(--royal-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge badge-royal" style={{ fontSize: '0.7rem' }}>{b.id}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>
                  {b.name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.city} • {b.beds} Licensed Beds</div>
              </div>
            </div>

            <div style={{ marginTop: '16px', padding: '10px 12px', background: 'var(--royal-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--royal-800)', fontWeight: 600 }}>ABDM Facility ID (HFR Registry)</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--royal-950)', fontFamily: 'monospace' }}>{b.hfrId}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <CheckCircle size={12} /> HFR Bridge Active & Mapped
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', fontSize: '0.78rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Inter-branch Sharing:</span>
              <span className="badge badge-success">Enabled (DPDP Safe)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Columns: Tenant Isolation Controls & Inter-Branch Stock Transfers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
        {/* Tenant Configuration */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Tenant-Wise Data Isolation Policy
            </h3>
            <span className="badge badge-purple">Enterprise Multi-Tenant</span>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '12px' }}>
              Each branch operates with logical tenant data separation. Financial ledgers, pharmacy sub-stores, and local employee rosters are isolated, while the <strong>Master Patient Index (MPI)</strong> and <strong>ABDM Care Contexts</strong> can be securely resolved across facilities.
            </p>

            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, color: 'var(--royal-950)' }}>Strict Financial Ledger Isolation</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, color: 'var(--royal-950)' }}>Centralized Patient Master Index (MPI)</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--royal-950)' }}>Cross-Branch Drug Inventory Visibility</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>

          <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>
            <RefreshCw size={14} /> Synchronize Branch Schemas
          </button>
        </div>

        {/* Inter-Branch Stock & Patient Records Sharing */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Inter-Branch Stock Transfer Indents
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Automated re-balancing of life-saving medicines and lab reagents
              </p>
            </div>
            <button
              onClick={() => setStockTransferRequested(true)}
              className="btn btn-secondary btn-sm"
            >
              <Send size={14} /> Request Stock Transfer
            </button>
          </div>

          {stockTransferRequested && (
            <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--emerald-800)' }}>
              <Check size={16} color="var(--emerald-600)" />
              Indent dispatched to Central Medical Store. Transport vehicle KA-04-MG-8822 assigned.
            </div>
          )}

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Transfer ID</th>
                  <th>Item & Quantity</th>
                  <th>Route (From &gt; To)</th>
                  <th>Vehicle / Status</th>
                </tr>
              </thead>
              <tbody>
                {stockTransfers.map(st => (
                  <tr key={st.id}>
                    <td><strong>{st.id}</strong></td>
                    <td style={{ fontWeight: 600 }}>{st.item}</td>
                    <td style={{ fontSize: '0.8rem' }}>{st.fromBranch} &rarr; {st.toBranch}</td>
                    <td>
                      <span className={`badge ${st.status === 'In Transit' ? 'badge-warning' : 'badge-success'}`}>
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
