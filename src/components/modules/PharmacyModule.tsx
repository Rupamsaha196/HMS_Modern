import React, { useState } from 'react';
import {
  Pill,
  AlertTriangle,
  Receipt,
  FileCheck,
  Search,
  Plus,
  RefreshCw,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { INITIAL_DRUGS } from '../../data/mockData';
import { DrugItem } from '../../types/hms';

export const PharmacyModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dispense' | 'narcotics' | 'stockalerts' | 'ipindents'>('dispense');
  const [drugs, setDrugs] = useState<DrugItem[]>(INITIAL_DRUGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [dispenseSuccess, setDispenseSuccess] = useState(false);

  const narcoticsLogs = [
    { id: 'NAR-101', drug: 'Inj. Fortwin (Pentazocine 30mg)', patient: 'Unknown Male (Trauma Bay 1)', doctor: 'Dr. George Thomas (KMC-4128)', qty: 1, date: '2026-10-24 14:20', dualSign: 'Sister Mary Joseph (RN) & Sister Preethi (RN)' },
    { id: 'NAR-100', drug: 'Inj. Fentanyl 100mcg', patient: 'Rajesh Kumar Verma', doctor: 'Dr. George Thomas (KMC-4128)', qty: 2, date: '2026-10-24 16:35', dualSign: 'Sister Preethi (RN) & Dr. George Thomas' }
  ];

  const handleDispense = () => {
    setDispenseSuccess(true);
    setTimeout(() => setDispenseSuccess(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Pill size={24} color="var(--royal-700)" />
            Point 20: Pharmacy (OP / IP) & Controlled Narcotics Register
          </h2>
          <p className="card-subtitle">
            Prescription dispensing with batch/expiry FEFO tracking, Schedule H1/X narcotics register with dual clinical sign-off, Reorder alerts, and GST tax invoice generation
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">
            <Receipt size={14} /> GST Tax Invoices
          </button>
          <button className="btn btn-primary btn-sm">
            <Plus size={14} /> New Drug Dispensation (POS)
          </button>
        </div>
      </div>

      {dispenseSuccess && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          Prescription dispensed! Stock deducted via FEFO, GST invoice generated and linked to patient billing.
        </div>
      )}

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'dispense' ? 'active' : ''}`} onClick={() => setActiveTab('dispense')}>
          <Receipt size={16} /> OP/IP Prescription Dispensing Desk
        </button>
        <button className={`tab-btn ${activeTab === 'narcotics' ? 'active' : ''}`} onClick={() => setActiveTab('narcotics')}>
          <Lock size={16} /> Schedule H1 & X Narcotics Register
        </button>
        <button className={`tab-btn ${activeTab === 'stockalerts' ? 'active' : ''}`} onClick={() => setActiveTab('stockalerts')}>
          <AlertTriangle size={16} /> Near-Expiry & Reorder Stock Alerts
        </button>
        <button className={`tab-btn ${activeTab === 'ipindents' ? 'active' : ''}`} onClick={() => setActiveTab('ipindents')}>
          <FileCheck size={16} /> Inpatient (IPD) Ward Indents
        </button>
      </div>

      {/* Tab 1: Dispense Desk */}
      {activeTab === 'dispense' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          {/* Drug Selection Table */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Drug Formulary & Batch Inventory (FEFO)
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-bg)', padding: '4px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <Search size={14} color="var(--royal-600)" />
                <input
                  type="text"
                  placeholder="Filter drug..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.78rem', width: '120px' }}
                />
              </div>
            </div>

            <div className="table-container">
              <table className="hms-table">
                <thead>
                  <tr>
                    <th>Brand & Molecule</th>
                    <th>Schedule</th>
                    <th>Batch & Expiry</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {drugs.filter(d => d.brandName.toLowerCase().includes(searchTerm.toLowerCase())).map(d => (
                    <tr key={d.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--royal-950)' }}>{d.brandName}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.genericName}</div>
                      </td>
                      <td>
                        <span className={`badge ${d.schedule === 'Schedule X' ? 'badge-danger' : d.schedule === 'Schedule H' ? 'badge-warning' : 'badge-royal'}`} style={{ fontSize: '0.68rem' }}>
                          {d.schedule}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.78rem', fontFamily: 'monospace' }}>{d.batchNumber}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Exp: {d.expiryDate}</div>
                      </td>
                      <td style={{ fontWeight: 700 }}>{d.stockQuantity}</td>
                      <td style={{ fontWeight: 600, color: 'var(--emerald-600)' }}>₹{d.pricePerUnit.toFixed(2)}</td>
                      <td>
                        <button className="btn btn-outline btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
                          + Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* POS Dispensing Slip & Patient Prescription Link */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                  Dispensing Counter & GST Calculation
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Patient: Rajesh Kumar Verma (UHID-2026-00481)</p>
              </div>
              <span className="badge badge-royal">Prescription Verified</span>
            </div>

            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '14px', fontSize: '0.8rem', lineHeight: 1.6 }}>
              <strong>Prescribed Items for Dispense:</strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span>Tab. Ecosprin 75mg (30 Tablets @ ₹4.50)</span>
                <strong>₹135.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span>Tab. Atorva 20mg (30 Tablets @ ₹18.20)</span>
                <strong>₹546.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span>Tab. Pantocid 40mg (14 Tablets @ ₹14.80)</span>
                <strong>₹207.20</strong>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '10px', paddingTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span>₹888.20</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GST (12%):</span>
                  <span>₹106.58</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1rem', color: 'var(--royal-950)', marginTop: '4px' }}>
                  <span>Gross Total:</span>
                  <span>₹994.78</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleDispense} className="btn btn-primary" style={{ flex: 1 }}>
                Confirm Dispensing & Deduct Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Narcotics Register */}
      {activeTab === 'narcotics' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Statutory Schedule H1 & Schedule X Controlled Drugs Register
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Mandatory legal register under Drugs & Cosmetics Act 1940 with dual clinical witness sign-offs
              </p>
            </div>
            <span className="badge badge-danger">Strict Audit Compliance</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Log ID & Date</th>
                  <th>Controlled Drug & Dose</th>
                  <th>Patient Details</th>
                  <th>Prescribing Doctor</th>
                  <th>Dispensed Qty</th>
                  <th>Dual Witness Clinical Signature</th>
                </tr>
              </thead>
              <tbody>
                {narcoticsLogs.map(n => (
                  <tr key={n.id}>
                    <td>
                      <strong>{n.id}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{n.date}</div>
                    </td>
                    <td><strong style={{ color: 'var(--rose-600)' }}>{n.drug}</strong></td>
                    <td>{n.patient}</td>
                    <td>{n.doctor}</td>
                    <td><strong>{n.qty} Ampoule</strong></td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--emerald-700)', fontWeight: 600 }}>✓ {n.dualSign}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Stock Alerts */}
      {activeTab === 'stockalerts' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="card" style={{ borderLeft: '4px solid var(--amber-500)' }}>
            <div className="card-header">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--amber-700)' }}>
                Near-Expiry Alert (Within 90 Days)
              </h3>
              <span className="badge badge-warning">1 Item</span>
            </div>
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Fortwin Injection 30mg/ml</strong> (Batch: FTW-26C11) expires on <strong>2026-12-31</strong> (45 Units remaining). Prioritize FEFO usage or initiate vendor return.
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--rose-500)' }}>
            <div className="card-header">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--rose-700)' }}>
                Reorder Level Threshold Alerts
              </h3>
              <span className="badge badge-danger">2 Items</span>
            </div>
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Inj. Clexane 40mg</strong>: 120 units left (Reorder threshold: 150). Automated Purchase Requisition PR-2026-088 generated for Central Medical Store.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
