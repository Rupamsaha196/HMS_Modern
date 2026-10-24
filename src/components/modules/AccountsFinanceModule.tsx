import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  Download,
  Building,
  CheckCircle2,
  PieChart
} from 'lucide-react';

export const AccountsFinanceModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pnl' | 'ledger' | 'tally'>('pnl');

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Calculator size={24} color="var(--royal-700)" />
            Point 27: Hospital Accounts & Finance (Tally / SAP Integration)
          </h2>
          <p className="card-subtitle">
            Hospital General Ledger, Accounts Payable (AP) & Receivable (AR), Bank reconciliation, Departmental P&L statements, and Tally Prime XML / JSON automated exports
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">
            <Download size={14} /> Export to Tally Prime XML
          </button>
          <button className="btn btn-primary btn-sm">
            <FileSpreadsheet size={14} /> Download P&L Balance Sheet
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'pnl' ? 'active' : ''}`} onClick={() => setActiveTab('pnl')}>
          <TrendingUp size={16} /> Departmental Profit & Loss (P&L)
        </button>
        <button className={`tab-btn ${activeTab === 'ledger' ? 'active' : ''}`} onClick={() => setActiveTab('ledger')}>
          <Calculator size={16} /> General Ledger & AR/AP Aging
        </button>
        <button className={`tab-btn ${activeTab === 'tally' ? 'active' : ''}`} onClick={() => setActiveTab('tally')}>
          <Download size={16} /> ERP Sync (Tally / SAP S/4HANA)
        </button>
      </div>

      {/* Tab 1: P&L Summary */}
      {activeTab === 'pnl' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Hospital Financial Statement (Month of October 2026)
            </h3>
            <span className="badge badge-success">EBITDA Margin: 28.4%</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--royal-50)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--royal-800)', fontWeight: 600 }}>Total Operating Revenue</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>₹3.84 Cr</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--royal-700)', marginTop: '2px' }}>OPD, IPD, Cath Lab, Pharmacy</div>
            </div>

            <div style={{ background: 'var(--rose-50)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--rose-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--rose-800)', fontWeight: 600 }}>Total Operating Expenses</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--rose-950)', marginTop: '4px' }}>₹2.75 Cr</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--rose-700)', marginTop: '2px' }}>Salaries, Consumables, Utilities</div>
            </div>

            <div style={{ background: 'var(--emerald-50)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--emerald-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--emerald-800)', fontWeight: 600 }}>Net Operating Profit</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--emerald-950)', marginTop: '4px' }}>₹1.09 Cr</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--emerald-700)', marginTop: '2px' }}>Healthy 28.4% EBITDA</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tally / SAP Sync */}
      {activeTab === 'tally' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Automated Financial Data Bridge to Tally Prime & SAP
            </h3>
            <span className="badge badge-success">Bridge Connected</span>
          </div>
          <div style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            Daily closing sales vouchers, supplier purchases, and bank receipts auto-sync to Tally Prime every midnight via ODBC / XML API connector.
          </div>
        </div>
      )}
    </div>
  );
};
