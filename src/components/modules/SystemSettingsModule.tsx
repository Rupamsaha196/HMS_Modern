import React, { useState } from 'react';
import {
  Settings,
  Building,
  Globe,
  Printer,
  Bell,
  CheckCircle2,
  Save,
  Palette
} from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/mockData';

export const SystemSettingsModule: React.FC = () => {
  const [hospitalName, setHospitalName] = useState(HOSPITAL_INFO.name);
  const [tagline, setTagline] = useState(HOSPITAL_INFO.tagline);
  const [themeMode, setThemeMode] = useState('Royal Blue & Crisp White');
  const [langDefault, setLangDefault] = useState('English');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Settings size={24} color="var(--royal-700)" />
            Point 47: Hospital System Settings, Multilingual & Print Customizer
          </h2>
          <p className="card-subtitle">
            Branding, Logo & Letterheads, Multilingual configuration (English, Hindi, Bengali), SMS/WhatsApp credentials, and Responsive device profiles
          </p>
        </div>

        <button onClick={handleSave} className="btn btn-primary btn-sm">
          <Save size={14} /> Save Configuration
        </button>
      </div>

      {saved && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          Settings successfully persisted to system configuration store!
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Hospital Identity & Print Letterhead Branding
            </h3>
            <span className="badge badge-royal">NABH Accredited</span>
          </div>

          <div className="form-group">
            <label className="form-label">Hospital Registered Name</label>
            <input
              type="text"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Accreditation Tagline & Header</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="form-control"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Theme Palette</label>
              <select value={themeMode} onChange={(e) => setThemeMode(e.target.value)} className="form-select">
                <option value="Royal Blue & Crisp White">Royal Blue & Pure White (Active)</option>
                <option value="Midnight Navy Glass">Midnight Navy Glass</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Default Hospital Language</label>
              <select value={langDefault} onChange={(e) => setLangDefault(e.target.value)} className="form-select">
                <option value="English">English (Primary)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Bengali">Bengali (বাংলা)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Gateway & Hardware Peripherals Setup
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ padding: '12px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Thermal Barcode Printer (Zebra / TSC)</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wristband & Sample Vial labels (203 DPI)</div>
              </div>
              <span className="badge badge-success">Connected</span>
            </div>

            <div style={{ padding: '12px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>WhatsApp Cloud API (Meta BSP)</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Official Verified Green Tick Business Sender</div>
              </div>
              <span className="badge badge-success">Connected</span>
            </div>

            <div style={{ padding: '12px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Biometric Attendance Terminal (eSSL)</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TCP/IP Port 4370 Live Sync</div>
              </div>
              <span className="badge badge-success">Connected</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
