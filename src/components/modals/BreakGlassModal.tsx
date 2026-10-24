import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, X, CheckCircle2, Lock } from 'lucide-react';
import { BreakGlassLog } from '../../types/hms';

interface BreakGlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogEmergencyAccess: (log: BreakGlassLog) => void;
  currentUserName: string;
}

export const BreakGlassModal: React.FC<BreakGlassModalProps> = ({
  isOpen,
  onClose,
  onLogEmergencyAccess,
  currentUserName
}) => {
  const [patientUhid, setPatientUhid] = useState('UHID-2026-00484');
  const [patientName, setPatientName] = useState('Unknown Male (Trauma Code Blue)');
  const [reason, setReason] = useState('Immediate life-threatening polytrauma, unresponsive patient, urgent access needed for cross-match and ICU orders.');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !reason.trim()) return;

    const log: BreakGlassLog = {
      id: `BG-${Date.now()}`,
      userId: 'USR-CURRENT',
      userName: currentUserName,
      patientUhid,
      patientName,
      reason,
      timestamp: new Date().toLocaleString(),
      status: 'Active Override'
    };

    onLogEmergencyAccess(log);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '580px', border: '2px solid var(--rose-500)' }}>
        <div className="modal-header" style={{ background: 'linear-gradient(to right, #fee2e2, #ffffff)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'var(--rose-600)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--rose-600)' }}>
                Break-Glass Emergency Protocol
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Stat Emergency Access with Mandatory Clinical Reason Logging
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: '36px', textAlign: 'center' }}>
            <CheckCircle2 size={48} color="var(--emerald-500)" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--royal-900)' }}>
              Emergency Override Granted
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Access logged in the immutable audit trail and broadcasted to Medical Superintendent.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div style={{
                background: 'var(--rose-50)',
                border: '1px solid var(--rose-border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                gap: '12px',
                marginBottom: '18px'
              }}>
                <AlertTriangle size={22} color="var(--rose-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.8rem', color: '#991b1b' }}>
                  <strong>Legal & Audit Notice:</strong> This action overrides consent restrictions under the <strong>DPDP Act & Clinical Establishments Act</strong>. All actions, clicks, and notes will be permanently archived and audited.
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Logged In Clinician</label>
                <input
                  type="text"
                  disabled
                  value={`${currentUserName} (Session Token Verified)`}
                  className="form-control"
                  style={{ background: 'var(--surface-alt)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Patient UHID</label>
                  <input
                    type="text"
                    required
                    value={patientUhid}
                    onChange={(e) => setPatientUhid(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Patient Identifier / Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mandatory Clinical Justification *</label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="form-control"
                  placeholder="State the life-threatening emergency justification..."
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '14px' }}>
                <input
                  type="checkbox"
                  id="agree-break-glass"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ marginTop: '3px' }}
                />
                <label htmlFor="agree-break-glass" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  I solemnly declare that this access is medically imperative for patient survival and consent cannot be obtained due to emergency incapacity.
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={!agreed || !reason.trim()}
                className="btn btn-danger"
                style={{ opacity: !agreed ? 0.6 : 1 }}
              >
                <Lock size={15} />
                <span>Authorize Break-Glass Override</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
