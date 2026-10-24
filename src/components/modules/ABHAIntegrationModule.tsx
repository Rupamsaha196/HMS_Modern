import React, { useState } from 'react';
import {
  QrCode,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Download,
  Printer,
  Sparkles,
  IndianRupee,
  KeyRound,
  RefreshCw,
  Search,
  Check,
  CreditCard,
  Lock
} from 'lucide-react';

export const ABHAIntegrationModule: React.FC = () => {
  const [method, setMethod] = useState<'aadhaar' | 'mobile' | 'dl' | 'verify' | 'scanshare'>('scanshare');

  // Interactive OTP simulation
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [abhaGenerated, setAbhaGenerated] = useState(false);
  const [scanToken, setScanToken] = useState<string | null>(null);

  // Scan & share simulation
  const handleSimulateScanShare = () => {
    const token = `TK-${Math.floor(100 + Math.random() * 900)}`;
    setScanToken(token);
  };

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <QrCode size={24} color="var(--royal-700)" />
            Point 6: ABHA Integration (ABDM Milestone 1 Certified)
          </h2>
          <p className="card-subtitle">
            Aadhaar OTP, Mobile OTP & Driving Licence creation flows, KYC profile fetch, PHR address suggestion, Card download, Scan & Share counter, and DHIS incentive tracking
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '6px 12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianRupee size={16} color="var(--emerald-600)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--emerald-800)' }}>DHIS Earned: ₹24,960 (1,248 ABHAs)</span>
          </div>
        </div>
      </div>

      {/* Compliance Box: Aadhaar Masking Notice */}
      <div style={{ background: 'var(--royal-50)', border: '1px solid var(--royal-200)', borderRadius: 'var(--radius-md)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <Lock size={20} color="var(--royal-700)" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.8rem', color: 'var(--royal-900)' }}>
          <strong>Statutory ABDM Security Standard:</strong> Aadhaar numbers are never permanently stored in the HMS database. Only masked identifiers (`XXXX-XXXX-1234`) and certified 14-digit ABHA numbers are retained.
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${method === 'scanshare' ? 'active' : ''}`} onClick={() => setMethod('scanshare')}>
          <QrCode size={16} /> Scan & Share (OPD Token Generator)
        </button>
        <button className={`tab-btn ${method === 'aadhaar' ? 'active' : ''}`} onClick={() => setMethod('aadhaar')}>
          <Smartphone size={16} /> Create via Aadhaar OTP
        </button>
        <button className={`tab-btn ${method === 'mobile' ? 'active' : ''}`} onClick={() => setMethod('mobile')}>
          <KeyRound size={16} /> Mobile OTP Flow
        </button>
        <button className={`tab-btn ${method === 'dl' ? 'active' : ''}`} onClick={() => setMethod('dl')}>
          <CreditCard size={16} /> Driving Licence Flow
        </button>
        <button className={`tab-btn ${method === 'verify' ? 'active' : ''}`} onClick={() => setMethod('verify')}>
          <Search size={16} /> Verify Existing ABHA / PHR
        </button>
      </div>

      {/* Tab 1: Scan & Share */}
      {method === 'scanshare' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--royal-950)', marginBottom: '4px' }}>
              Hospital OPD Scan & Share Counter
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Patients scan this official ABDM QR code from ABHA, Aarogya Setu, or Paytm Health App to instantly share demographics
            </p>

            <div style={{
              width: '220px',
              height: '220px',
              margin: '0 auto 20px',
              border: '2px dashed var(--royal-400)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-royal)'
            }}>
              <QrCode size={160} color="#1e3a8a" />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--royal-800)', marginTop: '8px' }}>
                HFR: IN2910002931
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button onClick={handleSimulateScanShare} className="btn btn-primary btn-sm">
                <Sparkles size={15} /> Simulate Patient Mobile Scan
              </button>
              <button className="btn btn-outline btn-sm">
                <Printer size={15} /> Print Standee QR
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                  Live Scan & Share OPD Token Queue
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Demographic profiles pushed asynchronously from ABDM Gateway
                </p>
              </div>
              <span className="badge badge-success">Gateway Listening</span>
            </div>

            {scanToken ? (
              <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                    OPD Token: {scanToken}
                  </div>
                  <span className="badge badge-success">Profile Fetched</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '8px' }}>
                  <strong>Patient:</strong> Vikram Aditya Sen (34y / Male)<br />
                  <strong>ABHA:</strong> 91-8472-9102-1109 (vikram.sen@abdm)<br />
                  <strong>Phone:</strong> +91 98459 28190
                </div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <button className="btn btn-success btn-sm">Generate UHID & OPD Slip</button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <QrCode size={36} color="var(--royal-300)" style={{ margin: '0 auto 10px' }} />
                <p style={{ fontSize: '0.85rem' }}>Waiting for incoming Scan & Share events...</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px' }}>Click "Simulate Patient Mobile Scan" above to test the webhook</p>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--royal-900)', marginBottom: '8px' }}>
                Recent Scan & Share Tokens Generated Today:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', padding: '6px 8px', background: 'var(--surface-bg)', borderRadius: '4px' }}>
                  <span><strong>TK-108:</strong> Rajesh Kumar Verma (rajesh.verma@abdm)</span>
                  <span style={{ color: 'var(--emerald-600)', fontWeight: 600 }}>Checked In (09:12 AM)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', padding: '6px 8px', background: 'var(--surface-bg)', borderRadius: '4px' }}>
                  <span><strong>TK-109:</strong> Priya Sharma (priya.sharma97@abdm)</span>
                  <span style={{ color: 'var(--emerald-600)', fontWeight: 600 }}>Checked In (09:28 AM)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Aadhaar OTP Flow */}
      {method === 'aadhaar' && (
        <div className="card" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Create ABHA via Aadhaar OTP (UIDAI Integration)
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Direct integration with UIDAI e-KYC pipeline via NHA Gateway
              </p>
            </div>
            <span className="badge badge-royal">e-KYC Instant</span>
          </div>

          {!otpSent ? (
            <div>
              <div className="form-group">
                <label className="form-label">Aadhaar Number (12 Digits) *</label>
                <input
                  type="text"
                  placeholder="e.g. 5482 9102 4819"
                  value={aadhaarInput}
                  onChange={(e) => setAadhaarInput(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '1rem', letterSpacing: '0.1em' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '18px' }}>
                <input type="checkbox" id="aadhaar-consent" defaultChecked style={{ marginTop: '3px' }} />
                <label htmlFor="aadhaar-consent" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  I give consent to MedPulse Hospital & National Health Authority (NHA) to verify my identity via UIDAI authentication solely for ABHA generation.
                </label>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => setOtpSent(true)}
              >
                Send Aadhaar OTP
              </button>
            </div>
          ) : !abhaGenerated ? (
            <div>
              <div style={{ background: 'var(--emerald-50)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--emerald-800)' }}>
                OTP sent successfully to registered Aadhaar mobile number ending with <strong>••• 456</strong>.
              </div>

              <div className="form-group">
                <label className="form-label">Enter 6-Digit OTP</label>
                <input
                  type="text"
                  placeholder="123456"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '1.2rem', textAlign: 'center', letterSpacing: '0.3em' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Suggested PHR / ABHA Address</label>
                <input
                  type="text"
                  defaultValue="sunil.sharma26@abdm"
                  className="form-control"
                />
              </div>

              <button
                type="button"
                className="btn btn-success"
                style={{ width: '100%' }}
                onClick={() => setAbhaGenerated(true)}
              >
                Verify OTP & Create ABHA Number
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle2 size={48} color="var(--emerald-500)" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--royal-950)' }}>
                ABHA Generated & KYC Verified!
              </h4>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--royal-700)', margin: '8px 0', fontFamily: 'monospace' }}>
                ABHA: 91-8472-9102-9981
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                PHR Address: <strong>sunil.sharma26@abdm</strong> • DHIS ₹20 incentive registered.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '18px' }}>
                <button className="btn btn-outline btn-sm" onClick={() => { setOtpSent(false); setAbhaGenerated(false); }}>
                  Create Another
                </button>
                <button className="btn btn-primary btn-sm">
                  <Download size={14} /> Download ABHA Card PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3, 4, 5 quick views */}
      {method === 'verify' && (
        <div className="card" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="card-header">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Verify Existing ABHA Number or PHR Address
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Enter 14-digit ABHA or user@abdm"
              defaultValue="rajesh.verma@abdm"
              className="form-control"
            />
            <button className="btn btn-primary">Fetch KYC Profile</button>
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--royal-950)' }}>Rajesh Kumar Verma</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Male • 52 Yrs • DOB: 14/03/1974</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--royal-700)', fontWeight: 600 }}>ABHA: 91-8472-9102-4821</div>
              </div>
              <span className="badge badge-success">ABDM KYC Verified</span>
            </div>
            <div style={{ marginTop: '12px' }}>
              <button className="btn btn-secondary btn-sm">Link with Existing UHID (UHID-2026-00481)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
