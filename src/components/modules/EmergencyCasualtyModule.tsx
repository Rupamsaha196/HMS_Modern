import React, { useState } from 'react';
import {
  AlertOctagon,
  Siren,
  Activity,
  ShieldAlert,
  Send,
  BedDouble,
  Heart,
  Flame,
  Zap,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { INITIAL_AMBULANCES } from '../../data/mockData';

export const EmergencyCasualtyModule: React.FC = () => {
  const [activeCode, setActiveCode] = useState<string | null>('Code Blue (Trauma Resuscitation Bay 1)');
  const [esiScore, setEsiScore] = useState<number>(1);
  const [mewsScore, setMewsScore] = useState<number>(7);

  const emergencyCases = [
    { id: 'ER-2026-901', patient: 'Unknown Male (Trauma Code Blue)', ageGender: '35y / M', triage: 'ESI Level 1 (Resuscitation)', vitals: 'BP: 78/42, HR: 132, SpO2: 86%', doctor: 'Dr. George Thomas', status: 'Direct OT Shift Initiated', mlc: true },
    { id: 'ER-2026-902', patient: 'Sunita Rao', ageGender: '62y / F', triage: 'ESI Level 2 (Emergent)', vitals: 'BP: 190/110, HR: 94, SpO2: 95%', doctor: 'Dr. Arvind S.', status: 'CT Brain Stat Ordered', mlc: false },
    { id: 'ER-2026-903', patient: 'Kiran Deep', ageGender: '28y / M', triage: 'ESI Level 3 (Urgent)', vitals: 'BP: 124/80, HR: 88, SpO2: 99%', doctor: 'Dr. Arvind S.', status: 'IV Fluids Running', mlc: false }
  ];

  const handleBroadcastCode = (codeName: string) => {
    setActiveCode(codeName);
    setTimeout(() => {
      alert(`EMERGENCY BROADCAST ACTIVATED: ${codeName} sent via Hospital PA System, Doctor Beepers & Emergency Team WhatsApp.`);
    }, 100);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <AlertOctagon size={24} color="var(--rose-600)" />
            Point 12: Emergency / Casualty & Trauma Center
          </h2>
          <p className="card-subtitle">
            Emergency Severity Index (ESI 1-5), Modified Early Warning Score (MEWS), Ambulance dispatch arrival alerts, Trauma code broadcasts, and Medico-Legal Case (MLC) police records
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-danger btn-sm" onClick={() => handleBroadcastCode('Code Blue (Cardiac Arrest / Trauma)')}>
            <Siren size={15} /> Trigger Code Blue
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => handleBroadcastCode('Code Red (Fire / Disaster)')}>
            <Flame size={15} /> Trigger Code Red
          </button>
        </div>
      </div>

      {/* Active Code Alert Banner */}
      {activeCode && (
        <div style={{
          background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          boxShadow: '0 8px 20px rgba(220, 38, 38, 0.35)',
          animation: 'pulseRed 2s infinite'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Siren size={28} />
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900 }}>ACTIVE EMERGENCY: {activeCode}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Trauma Team, Anesthetist & Blood Bank alerted. Emergency Bay 1 Prepped.</div>
            </div>
          </div>
          <button
            onClick={() => setActiveCode(null)}
            className="btn btn-sm"
            style={{ background: 'white', color: '#b91c1c', fontWeight: 800 }}
          >
            Acknowledge & Stand Down
          </button>
        </div>
      )}

      {/* Inbound Ambulance Radar & Live ER Load */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Active Emergency Beds & Cases */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Active Casualty & Resuscitation Bay Census
            </h3>
            <span className="badge badge-danger">3 Active Emergency Cases</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {emergencyCases.map(ec => (
              <div
                key={ec.id}
                style={{
                  background: 'var(--surface-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--royal-950)', fontSize: '0.95rem' }}>{ec.patient}</span>
                    <span className="badge badge-royal">{ec.id}</span>
                    {ec.mlc && <span className="badge badge-danger">MLC Police Intimated</span>}
                  </div>
                  <span className={`badge ${ec.triage.includes('Level 1') ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.72rem' }}>
                    {ec.triage}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  {ec.ageGender} • Vitals: <code style={{ color: 'var(--rose-600)', fontWeight: 700 }}>{ec.vitals}</code>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status: <strong>{ec.status}</strong></span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: '0.72rem' }}>
                      <BedDouble size={12} /> Direct Admit to OT/ICU
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inbound Ambulances & Triage Scoring Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Inbound Ambulance Radar */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Live Inbound Ambulance GPS Radar
              </h3>
              <span className="badge badge-royal">Fleet Live</span>
            </div>

            {INITIAL_AMBULANCES.map(amb => (
              <div key={amb.id} style={{ background: 'var(--royal-50)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, color: 'var(--royal-950)' }}>{amb.vehicleNumber} ({amb.ambulanceType})</div>
                  <span className={`badge ${amb.status === 'En Route to Hospital' ? 'badge-danger' : 'badge-success'}`}>
                    {amb.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--royal-800)', marginTop: '4px' }}>
                  Driver: {amb.driverName} • Location: {amb.currentLocation}
                </div>
                {amb.etaMinutes !== undefined && amb.etaMinutes > 0 && (
                  <div style={{ marginTop: '6px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--rose-600)' }}>
                    ⏱️ Hospital Arrival in ~{amb.etaMinutes} Minutes!
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MEWS Calculator Card */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Modified Early Warning Score (MEWS) Engine
              </h3>
              <span className="badge badge-danger">MEWS: {mewsScore} (High Risk)</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Score &ge; 5 requires immediate Medical ICU / Trauma resuscitation call.
            </p>
            <div style={{ marginTop: '10px' }}>
              <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                Recalculate Vitals MEWS Score
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
