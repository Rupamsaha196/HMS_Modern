import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Wind,
  Droplet,
  Radio,
  AlertTriangle,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const ICUCriticalCareModule: React.FC = () => {
  const [apacheScore, setApacheScore] = useState(16); // ~25% mortality risk
  const [sofaScore, setSofaScore] = useState(4);
  const [gcsScore, setGcsScore] = useState(15); // Eye: 4, Verbal: 5, Motor: 6

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Activity size={24} color="var(--royal-700)" />
            Point 15: Intensive Care Unit (ICU / Critical Care)
          </h2>
          <p className="card-subtitle">
            Hourly charting, HL7 / IoT bedside monitor waveform streaming, Clinical scores (APACHE II, SOFA, GCS), and Ventilator / Central Line / Foley catheter tracking
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '6px 12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--emerald-800)', fontWeight: 600 }}>
            <Radio size={14} color="var(--emerald-600)" /> HL7 Gateway: 12 Bedside Monitors Streaming
          </div>
        </div>
      </div>

      {/* Bedside Live Monitor Telemetry View (Bed ICU-101 / ICU-102) */}
      <div style={{
        background: '#0a1945',
        color: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: 'var(--shadow-royal-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', paddingBottom: '12px', marginBottom: '20px' }}>
          <div>
            <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>HIGH ACUITY TELEMETRY</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>Bed ICU-101: Unknown Male (Polytrauma Code Blue)</h3>
            <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Ventilator: Hamilton-C6 (SIMV-PC) • Invasive Art Line: Right Radial</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>Live IoT Stream</div>
            <div style={{ fontSize: '0.72rem', color: '#4ade80' }}>Sampling Rate: 250 Hz (HL7 v2.5.1)</div>
          </div>
        </div>

        {/* Vital Waveform / Parameter Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {/* Heart Rate / ECG */}
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '16px', borderLeft: '4px solid #4ade80' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80', fontSize: '0.75rem', fontWeight: 700 }}>
              <span>ECG LEAD II (HR)</span>
              <span>BPM</span>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#4ade80' }}>118</div>
            <div style={{ height: '24px', display: 'flex', alignItems: 'center', color: '#4ade80', fontSize: '0.9rem', letterSpacing: '2px' }}>
              /\/\_/\_/\/\_/\_
            </div>
          </div>

          {/* Invasive Arterial BP */}
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '16px', borderLeft: '4px solid #f87171' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171', fontSize: '0.75rem', fontWeight: 700 }}>
              <span>ART BP (INVASIVE)</span>
              <span>mmHg</span>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#f87171' }}>88/54</div>
            <div style={{ fontSize: '0.75rem', color: '#fca5a5' }}>MAP: 65 mmHg (Target achieved)</div>
          </div>

          {/* SpO2 Pleth */}
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '16px', borderLeft: '4px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 700 }}>
              <span>SpO2 PLETH</span>
              <span>%</span>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#38bdf8' }}>96</div>
            <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>FiO2: 50% on Mechanical Vent</div>
          </div>

          {/* EtCO2 & Resp Rate */}
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '16px', borderLeft: '4px solid #fbbf24' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', fontSize: '0.75rem', fontWeight: 700 }}>
              <span>EtCO2 / RR</span>
              <span>mmHg / min</span>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fbbf24' }}>36 / 16</div>
            <div style={{ fontSize: '0.75rem', color: '#fde68a' }}>PEEP: 8 cmH2O • Vt: 450 mL</div>
          </div>
        </div>
      </div>

      {/* Clinical ICU Scoring Calculators & Lines/Tubes Tracker */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Clinical ICU Scores */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Prognostic ICU Scoring Systems
            </h3>
            <span className="badge badge-purple">Automated Calculation</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, color: 'var(--royal-950)' }}>APACHE II Score</span>
                <span className="badge badge-danger">Score: {apacheScore}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Estimated hospital mortality risk: <strong>24.8%</strong> based on acute physiological parameters.
              </div>
            </div>

            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, color: 'var(--royal-950)' }}>Sequential Organ Failure (SOFA)</span>
                <span className="badge badge-warning">Score: {sofaScore}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Respiratory (PaO2/FiO2): 2 | Cardiovascular (MAP &gt; 65 on Norepinephrine 0.05): 2.
              </div>
            </div>

            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, color: 'var(--royal-950)' }}>Glasgow Coma Scale (GCS)</span>
                <span className="badge badge-royal">Score: {gcsScore}/15 (E4 V5 M6)</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Intact neurological responses, spontaneous eye opening.
              </div>
            </div>
          </div>
        </div>

        {/* Invasive Lines, Tubes, Drains & Infusions */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Lines, Tubes, Drains & Syringe Pump Infusions
            </h3>
            <span className="badge badge-royal">Infection Prevention Bundle</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Device / Line</th>
                  <th>Insertion Site & Date</th>
                  <th>Days In Situ</th>
                  <th>CLABSI / CAUTI Bundle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Right Internal Jugular CVC (Triple Lumen)</strong></td>
                  <td>23 Oct 2026 (ICU Day 2)</td>
                  <td>Day 2</td>
                  <td><span className="badge badge-success">✓ Clean & Dry Dressing</span></td>
                </tr>
                <tr>
                  <td><strong>Arterial Line (Right Radial)</strong></td>
                  <td>24 Oct 2026</td>
                  <td>Day 1</td>
                  <td><span className="badge badge-success">✓ Normal Waveform</span></td>
                </tr>
                <tr>
                  <td><strong>Foley Catheter with Urometer</strong></td>
                  <td>23 Oct 2026</td>
                  <td>Day 2</td>
                  <td><span className="badge badge-success">✓ Below Bladder Level</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
