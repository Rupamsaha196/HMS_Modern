import React, { useState } from 'react';
import {
  Receipt,
  IndianRupee,
  CreditCard,
  QrCode,
  Printer,
  Share2,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { INITIAL_BILLS } from '../../data/mockData';
import { BillRecord } from '../../types/hms';

export const BillingRCMModule: React.FC = () => {
  const [bills, setBills] = useState<BillRecord[]>(INITIAL_BILLS);
  const [selectedBill, setSelectedBill] = useState<BillRecord>(INITIAL_BILLS[0]);
  const [showShiftClosing, setShowShiftClosing] = useState(false);
  const [fhirInvoicePushed, setFhirInvoicePushed] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Receipt size={24} color="var(--royal-700)" />
            Point 24: Billing & Revenue Cycle Management (RCM)
          </h2>
          <p className="card-subtitle">
            OPD billing, IPD running bill linked to orders, Advance deposits, GST e-Invoicing, Multi-mode payment desk (Cash/Card/UPI), Cashier shift closing & ABDM Invoice FHIR export
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFhirInvoicePushed(true)}
            className="btn btn-secondary btn-sm"
          >
            <Share2 size={14} /> Export ABDM Invoice FHIR
          </button>
          <button
            onClick={() => setShowShiftClosing(true)}
            className="btn btn-outline btn-sm"
          >
            <Clock size={14} /> Cashier Shift Closing
          </button>
        </div>
      </div>

      {fhirInvoicePushed && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          Invoice FHIR Resource generated and linked to Patient ABHA account on ABDM Gateway!
        </div>
      )}

      {/* Summary KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily Gross Collections</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>₹14,82,500</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--emerald-600)', marginTop: '2px' }}>Cashier: Rohan Deshmukh</div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Inpatient Running Bills</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--purple-900)', marginTop: '4px' }}>₹68,40,000</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--purple-700)', marginTop: '2px' }}>194 Admitted Inpatients</div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Advance Deposits Held</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--emerald-900)', marginTop: '4px' }}>₹19,30,000</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--emerald-700)', marginTop: '2px' }}>Adjustable at discharge</div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GST Collected Today</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--royal-700)', marginTop: '4px' }}>₹84,210</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>Medicines & Consumables</div>
        </div>
      </div>

      {/* Selected Invoice Details & Itemized Service Ledger */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px' }}>
        {/* Itemized Running Bill Table */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Itemized IPD Running Bill: {selectedBill.billNumber}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Patient: <strong>{selectedBill.patientName}</strong> ({selectedBill.uhid})
              </p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => window.print()}>
              <Printer size={14} /> Print Tax Invoice
            </button>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Service Description</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedBill.items.map((it, idx) => (
                  <tr key={idx}>
                    <td><strong>{it.description}</strong></td>
                    <td><span className="badge badge-royal" style={{ fontSize: '0.68rem' }}>{it.category}</span></td>
                    <td>{it.qty}</td>
                    <td>₹{it.rate}</td>
                    <td style={{ fontWeight: 700 }}>₹{it.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Calculation & Payment Settlement Box */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Bill Breakdown & Settlement
            </h3>
            <span className="badge badge-purple">{selectedBill.paymentStatus}</span>
          </div>

          <div style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Sub-Total Gross:</span>
              <span>₹{selectedBill.subTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--emerald-600)' }}>
              <span>Institutional Discount (Approved):</span>
              <span>- ₹{selectedBill.discountAmount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GST (Medicines 12%):</span>
              <span>+ ₹{selectedBill.gstAmount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px solid var(--border-light)', paddingTop: '6px' }}>
              <span>Bill Gross Total:</span>
              <span>₹{selectedBill.grossTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--royal-700)', fontWeight: 600 }}>
              <span>Advance Deposit Received:</span>
              <span>- ₹{selectedBill.advanceDeposits.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.2rem', color: 'var(--royal-950)', borderTop: '2px solid var(--royal-600)', paddingTop: '8px', marginTop: '4px' }}>
              <span>Net Balance Payable:</span>
              <span>₹{selectedBill.netPayable.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--royal-900)', marginBottom: '8px' }}>
              Covered Under Cashless Insurance (TPA):
            </div>
            <div style={{ background: 'var(--royal-50)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)', fontSize: '0.8rem' }}>
              <strong>Star Health Pre-Auth:</strong> ₹1,95,000 Approved (Net patient liability is ₹0 upon TPA settlement).
            </div>
          </div>
        </div>
      </div>

      {/* Cashier Shift Closing Modal */}
      {showShiftClosing && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--royal-950)' }}>
                Cashier Shift Closing & Reconciliation
              </h3>
              <button onClick={() => setShowShiftClosing(null as any)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div className="modal-body" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              <div>Cashier: <strong>Rohan Deshmukh</strong> (Counter #02 - Main Lobby)</div>
              <div>Shift: Morning (08:00 AM - 04:00 PM)</div>
              <div style={{ marginTop: '12px', background: 'var(--surface-bg)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div>Total Cash Collected: <strong>₹2,45,000</strong></div>
                <div>Credit/Debit Card (POS): <strong>₹4,12,000</strong></div>
                <div>UPI QR (Razorpay/PayU): <strong>₹2,63,000</strong></div>
                <div>Total Reconciled: <strong>₹9,20,000</strong></div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowShiftClosing(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { alert('Shift Closed & Handover Log Dispatched to Finance Manager'); setShowShiftClosing(false); }}>
                Confirm Shift Handover & Lock Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
