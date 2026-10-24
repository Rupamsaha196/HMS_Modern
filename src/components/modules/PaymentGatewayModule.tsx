import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Mail,
  DollarSign
} from 'lucide-react';

export const PaymentGatewayModule: React.FC = () => {
  const [activeGateway, setActiveGateway] = useState<'Razorpay' | 'PayU'>('Razorpay');
  const [linkSent, setLinkSent] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paidStatus, setPaidStatus] = useState(false);

  const transactions = [
    { txnId: 'pay_Nz819028192', uhid: 'UHID-2026-00481', patient: 'Rajesh Kumar Verma', amount: '₹850.00', purpose: 'OPD Super-Specialist Fee', mode: 'UPI (Google Pay)', status: 'Captured', date: '2026-10-24 09:15' },
    { txnId: 'pay_Nz819028193', uhid: 'UHID-2026-00482', patient: 'Priya Sharma', amount: '₹850.00', purpose: 'OPD Cardiology Fee', mode: 'Credit Card (HDFC Visa)', status: 'Captured', date: '2026-10-24 09:35' },
    { txnId: 'pay_Nz819028194', uhid: 'UHID-2026-00483', patient: 'Master Aarav Deshpande', amount: '₹700.00', purpose: 'Teleconsultation Fee', mode: 'UPI (Paytm)', status: 'Captured', date: '2026-10-24 10:02' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <CreditCard size={24} color="var(--royal-700)" />
            Point 25: Online Payment Gateway Integration (Razorpay / PayU)
          </h2>
          <p className="card-subtitle">
            Seamless checkout for OPD, IPD advance deposits, and Patient Portal payments; Smart payment links via WhatsApp/SMS, Webhook listeners, and Refund management
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowCheckout(true)}
            className="btn btn-primary btn-sm"
          >
            <CreditCard size={14} /> Open Live Checkout Modal
          </button>
        </div>
      </div>

      {linkSent && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          Payment link dispatched via WhatsApp (+91 98451 23456) and Email!
        </div>
      )}

      {/* Gateway Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ borderTop: '4px solid var(--royal-600)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Razorpay Enterprise Gateway</strong>
            <span className="badge badge-success">Webhook Active</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Key ID: <code>rzp_live_medpulse99</code></div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '8px' }}>₹6,42,800 Collected</div>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--purple-600)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>PayU Money Gateway</strong>
            <span className="badge badge-purple">Backup Active</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Merchant ID: <code>payu_medpulse_corp</code></div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--purple-900)', marginTop: '8px' }}>₹2,84,100 Collected</div>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--emerald-600)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Instant Dynamic UPI QR</strong>
            <span className="badge badge-success">Zero MDR</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>VPA: <code>medpulse.hospital@icici</code></div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--emerald-900)', marginTop: '8px' }}>₹5,55,600 Collected</div>
        </div>
      </div>

      {/* Send Payment Link Box & Webhook Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '24px' }}>
        {/* Send Payment Link Form */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Dispatch Payment Link to Patient
            </h3>
          </div>

          <div className="form-group">
            <label className="form-label">Patient UHID / Mobile</label>
            <input type="text" defaultValue="UHID-2026-00481 (+91 98451 23456)" className="form-control" />
          </div>

          <div className="form-group">
            <label className="form-label">Amount Payable (INR)</label>
            <input type="text" defaultValue="₹ 18,677.00" className="form-control" style={{ fontWeight: 800, color: 'var(--royal-900)' }} />
          </div>

          <div className="form-group">
            <label className="form-label">Billing Purpose</label>
            <input type="text" defaultValue="IPD Final Running Balance Settlement" className="form-control" />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button
              onClick={() => { setLinkSent(true); setTimeout(() => setLinkSent(false), 3000); }}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <MessageSquare size={14} /> Send WhatsApp & SMS Link
            </button>
          </div>
        </div>

        {/* Webhook Stream */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Live Gateway Webhook Transactions
            </h3>
            <span className="badge badge-royal">Auto-Reconciled</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Patient</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.txnId}>
                    <td><code>{t.txnId}</code></td>
                    <td><strong>{t.patient}</strong></td>
                    <td style={{ fontWeight: 700, color: 'var(--emerald-600)' }}>{t.amount}</td>
                    <td><span className="badge badge-royal" style={{ fontSize: '0.68rem' }}>{t.mode}</span></td>
                    <td><span className="badge badge-success">{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {showCheckout && (
        <div className="modal-backdrop" onClick={() => setShowCheckout(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', padding: 0, overflow: 'hidden' }}>
            <div style={{ background: '#0c2340', color: 'white', padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Razorpay Secure Checkout</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>256-Bit SSL</span>
              </div>
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Paying to MedPulse Hospital</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>₹850.00</div>
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              {!paidStatus ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button
                    onClick={() => setPaidStatus(true)}
                    className="btn btn-outline"
                    style={{ justifyContent: 'space-between', padding: '12px 16px' }}
                  >
                    <span>UPI (Google Pay / PhonePe / Paytm)</span>
                    <QrCode size={18} color="var(--royal-700)" />
                  </button>
                  <button
                    onClick={() => setPaidStatus(true)}
                    className="btn btn-outline"
                    style={{ justifyContent: 'space-between', padding: '12px 16px' }}
                  >
                    <span>Credit / Debit Card (Visa, MC, RuPay)</span>
                    <CreditCard size={18} color="var(--royal-700)" />
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <CheckCircle2 size={48} color="var(--emerald-500)" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--royal-950)' }}>
                    Payment Successful!
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Txn ID: pay_simulated_99182 • Receipt sent to WhatsApp.
                  </p>
                  <button
                    onClick={() => { setPaidStatus(false); setShowCheckout(false); }}
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: '16px' }}
                  >
                    Close & Print Receipt
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
