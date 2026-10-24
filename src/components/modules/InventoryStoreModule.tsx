import React, { useState } from 'react';
import {
  Boxes,
  FileText,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Plus,
  RefreshCw,
  Search,
  ArrowRightLeft,
  DollarSign
} from 'lucide-react';

export const InventoryStoreModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'po' | 'grn' | 'substores' | 'audit'>('po');

  const purchaseOrders = [
    { poNumber: 'PO-2026-0819', vendor: 'Sun Pharma Laboratories Ltd', items: 'Augmentin 625 Duo, Pantocid 40', value: '₹2,45,000', date: '2026-10-22', status: 'Approved & Dispatched' },
    { poNumber: 'PO-2026-0820', vendor: 'Medtronic India Pvt Ltd', items: 'Resolute Onyx DES Stents (10 Units)', value: '₹2,85,000', date: '2026-10-23', status: 'GRN Pending' },
    { poNumber: 'PO-2026-0821', vendor: 'Beckman Coulter Diagnostics', items: 'Troponin-I Reagent Packs (5)', value: '₹1,20,000', date: '2026-10-24', status: 'Awaiting MD Approval' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Boxes size={24} color="var(--royal-700)" />
            Point 21: Inventory & Store Management (Central & Sub-Stores)
          </h2>
          <p className="card-subtitle">
            Purchase Requisitions (PR), Purchase Orders (PO), Goods Received Notes (GRN), Multi-Store Indents, FEFO/FIFO stock valuation, and Physical stock audits
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">
            <DollarSign size={14} /> Total Store Valuation: ₹1.42 Cr
          </button>
          <button className="btn btn-primary btn-sm">
            <Plus size={14} /> Create Purchase Requisition
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'po' ? 'active' : ''}`} onClick={() => setActiveTab('po')}>
          <FileText size={16} /> Purchase Orders & Vendors
        </button>
        <button className={`tab-btn ${activeTab === 'grn' ? 'active' : ''}`} onClick={() => setActiveTab('grn')}>
          <Truck size={16} /> Goods Received Notes (GRN Entry)
        </button>
        <button className={`tab-btn ${activeTab === 'substores' ? 'active' : ''}`} onClick={() => setActiveTab('substores')}>
          <ArrowRightLeft size={16} /> Sub-Stores & Department Indents
        </button>
        <button className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveTab('audit')}>
          <CheckCircle2 size={16} /> Physical Stock Audit & Variance
        </button>
      </div>

      {/* Tab 1: Purchase Orders */}
      {activeTab === 'po' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Purchase Order Lifecycle Tracker
            </h3>
            <span className="badge badge-royal">3 Active POs</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>PO Number</th>
                  <th>Vendor Partner</th>
                  <th>Supplies Ordered</th>
                  <th>Order Value</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map(p => (
                  <tr key={p.poNumber}>
                    <td><strong>{p.poNumber}</strong></td>
                    <td style={{ fontWeight: 600, color: 'var(--royal-950)' }}>{p.vendor}</td>
                    <td style={{ fontSize: '0.8rem' }}>{p.items}</td>
                    <td style={{ fontWeight: 700, color: 'var(--emerald-600)' }}>{p.value}</td>
                    <td style={{ fontSize: '0.78rem' }}>{p.date}</td>
                    <td>
                      <span className={`badge ${p.status.includes('Approved') ? 'badge-success' : 'badge-warning'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: GRN Entry */}
      {activeTab === 'grn' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Goods Received Note (GRN) & QC Inspection
            </h3>
            <button className="btn btn-primary btn-sm">+ New GRN Inward</button>
          </div>
          <div style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>GRN-2026-00412: Inward from Sun Pharma</strong>
              <span className="badge badge-success">3-Way Matched (PO vs DC vs Invoice)</span>
            </div>
            <div>Augmentin 625 Duo: Received 1000 Tablets • Batch: AUG-26A09 • Expiry: 2027-08-31 • Quality Passed. Stock auto-posted to Central Pharmacy Store.</div>
          </div>
        </div>
      )}

      {/* Tab 3: Sub-Stores */}
      {activeTab === 'substores' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Department Sub-Stores Matrix
            </h3>
            <span className="badge badge-royal">6 Sub-Stores</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>OT Complex Sub-Store</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Implants, Sutures, Drapes</div>
              <div style={{ marginTop: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--royal-700)' }}>428 Line Items</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>ICU Emergency Sub-Store</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Emergency Stat Injections, Lines</div>
              <div style={{ marginTop: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--royal-700)' }}>184 Line Items</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>Cath Lab Sub-Store</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stents, Guide Wires, Sheaths</div>
              <div style={{ marginTop: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--royal-700)' }}>92 Line Items</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
