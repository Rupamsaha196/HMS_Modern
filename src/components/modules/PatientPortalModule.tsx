import React, { useState } from 'react';
import {
  Smartphone,
  QrCode,
  CalendarCheck,
  FileText,
  Download,
  Users,
  KeyRound,
  CheckCircle2,
  Lock,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { INITIAL_PATIENTS } from '../../data/mockData';

export const PatientPortalModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kiosk' | 'records' | 'family' | 'consent'>('kiosk');
  const patient = INITIAL_PATIENTS[0]; // Rajesh Kumar Verma

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Smartphone size={24} color="var(--royal-700)" />
            Point 40: Patient Portal & Digital Front Door (Kiosk Mode)
          </h2>
          <p className="card-subtitle">
            Self check-in kiosk with ABHA QR Scan & Share, Download verified diagnostic reports, E-Prescriptions & Bills, Family profile switcher, and Patient-side ABDM consent management
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            📱 Patient Digital Front Door
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'kiosk' ? 'active' : ''}`} onClick={() => setActiveTab('kiosk')}>
          <QrCode size={16} /> Self Check-In Kiosk Screen
        </button>
        <button className={`tab-btn ${activeTab === 'records' ? 'active' : ''}`} onClick={() => setActiveTab('records')}>
          <FileText size={16} /> My Clinical Records & Downloads
        </button>
        <button className={`tab-btn ${activeTab === 'family' ? 'active' : ''}`} onClick={() => setActiveTab('family')}>
          <Users size={16} /> Family Members Profiles
        </button>
        <button className={`tab-btn ${activeTab === 'consent' ? 'active' : ''}`} onClick={() => setActiveTab('consent')}>
          <KeyRound size={16} /> My ABDM Consents & Data Sharing
        </button>
      </div>

      {/* Tab 1: Kiosk Mode */}
      {activeTab === 'kiosk' && (
        <div style={{
          background: 'linear-gradient(135deg, #0a1945 0%, #0f2a7a 50%, #1e3a8a 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '40px',
          color: 'white',
          textAlign: 'center',
          boxShadow: 'var(--shadow-royal-lg)'
        }}>
          <span className="badge badge-success" style={{ marginBottom: '12px' }}>
            Touchscreen Check-In Terminal
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
            Welcome to MedPulse Apex Hospital
          </h2>
          <p style={{ opacity: 0.85, fontSize: '1rem', maxWidth: '600px', margin: '8px auto 28px' }}>
            Scan your ABHA QR code or tap your mobile number to check in for your appointment without waiting in line.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255, 255, 255, 0.2)', cursor: 'pointer' }}>
              <QrCode size={48} color="#93c5fd" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>ABHA Scan & Share</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '4px' }}>Scan hospital counter QR with ABHA app</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255, 255, 255, 0.2)', cursor: 'pointer' }}>
              <Smartphone size={48} color="#93c5fd" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Mobile OTP Login</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '4px' }}>Enter registered 10-digit mobile number</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255, 255, 255, 0.2)', cursor: 'pointer' }}>
              <CalendarCheck size={48} color="#93c5fd" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Book New Slot</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '4px' }}>Instant doctor token for walk-in OPD</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Records Downloads */}
      {activeTab === 'records' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Medical Records Vault for Rajesh Kumar Verma
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ABHA: rajesh.verma@abdm • 100% Tamper-evident Digital Copies</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div>
                <strong>Coronary Angiography (CT 3D) Study & Report</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Radiology • Dr. Rajesh Bhargava • 24 Oct 2026</div>
              </div>
              <button className="btn btn-primary btn-sm"><Download size={13} /> Download PDF</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div>
                <strong>Cardiac Troponin I High-Sensitive Lab Report</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Biochemistry • Dr. K. S. Ramanathan • 24 Oct 2026</div>
              </div>
              <button className="btn btn-primary btn-sm"><Download size={13} /> Download PDF</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div>
                <strong>E-Prescription & Medication Schedule</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cardiology OPD • Dr. Shalini Mukhopadhyay • 24 Oct 2026</div>
              </div>
              <button className="btn btn-primary btn-sm"><Download size={13} /> Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
