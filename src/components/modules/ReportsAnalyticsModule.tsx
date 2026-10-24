import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  FileSpreadsheet,
  Calendar,
  Sparkles,
  PieChart,
  BrainCircuit,
  CheckCircle2
} from 'lucide-react';

export const ReportsAnalyticsModule: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'clinical' | 'operational' | 'financial' | 'ai'>('ai');

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <BarChart3 size={24} color="var(--royal-700)" />
            Point 42: Hospital Reports, BI Analytics & Predictive AI Models
          </h2>
          <p className="card-subtitle">
            Executive clinical, operational & financial BI dashboards, Multi-format automated exports (PDF, Excel, CSV), Metabase / Apache Superset sync & Predictive AI models
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">
            <FileSpreadsheet size={14} /> Export All to Excel (XLSX)
          </button>
          <button className="btn btn-primary btn-sm">
            <Download size={14} /> Export Executive PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeCategory === 'ai' ? 'active' : ''}`} onClick={() => setActiveCategory('ai')}>
          <BrainCircuit size={16} /> Optional AI: No-Show Prediction & ICD Auto-Coder
        </button>
        <button className={`tab-btn ${activeCategory === 'clinical' ? 'active' : ''}`} onClick={() => setActiveCategory('clinical')}>
          <TrendingUp size={16} /> Clinical Infection & Mortality Trends
        </button>
        <button className={`tab-btn ${activeCategory === 'operational' ? 'active' : ''}`} onClick={() => setActiveCategory('operational')}>
          <BarChart3 size={16} /> Operational Turnaround & Bed ALOS
        </button>
        <button className={`tab-btn ${activeCategory === 'financial' ? 'active' : ''}`} onClick={() => setActiveCategory('financial')}>
          <PieChart size={16} /> Financial Aging & Claims Realization
        </button>
      </div>

      {/* AI Models Tab */}
      {activeCategory === 'ai' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div className="card" style={{ borderTop: '4px solid var(--royal-600)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <BrainCircuit size={20} color="var(--royal-700)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--royal-950)' }}>
                Predictive No-Show Risk Engine
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Trained on 45,000 historical OPD appointments. Predicts patient cancellation likelihood based on distance, specialty, day of week, and historical attendance.
            </p>
            <div style={{ marginTop: '14px', padding: '10px', background: 'var(--royal-50)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem' }}>
              <strong>Today's No-Show Forecast:</strong> 8.2% (Lower than national average 15.4%). High risk slots auto-allocated standby tokens.
            </div>
          </div>

          <div className="card" style={{ borderTop: '4px solid var(--purple-600)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={20} color="var(--purple-600)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--royal-950)' }}>
                ICD-10 NLP Auto-Coding Assistant
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Automatically suggests exact WHO ICD-10 and SNOMED CT clinical codes from doctor dictation and discharge notes with 98.4% F1-score accuracy.
            </p>
            <div style={{ marginTop: '14px', padding: '10px', background: 'var(--purple-50)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem' }}>
              <strong>Recent Suggestion:</strong> "Acute anterior wall myocardial infarction" &rarr; <code>I21.0</code> mapped in 0.2s.
            </div>
          </div>

          <div className="card" style={{ borderTop: '4px solid var(--emerald-600)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <CheckCircle2 size={20} color="var(--emerald-600)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--royal-950)' }}>
                Ambient Clinical Scribe Simulator
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Transcribes doctor-patient conversations into structured SOAP clinical progress notes, reducing clinician documentation burden by 40 minutes/day.
            </p>
            <div style={{ marginTop: '14px', padding: '10px', background: 'var(--emerald-50)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem' }}>
              <strong>Status:</strong> Active in OPD Cardiology & Paediatrics.
            </div>
          </div>
        </div>
      )}

      {/* Operational Stats Tab */}
      {activeCategory === 'operational' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Hospital Operational Efficiency & Diagnostic Turnaround Times (TAT)
            </h3>
            <span className="badge badge-royal">Real-time Metabase Pipeline</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <strong>Routine Lab TAT:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>42 Mins</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--emerald-600)' }}>Target &lt; 60 mins</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <strong>Stat Troponin TAT:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>24 Mins</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--emerald-600)' }}>Emergency cardiac window</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <strong>CT Scan Reporting TAT:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>65 Mins</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target &lt; 90 mins</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <strong>Bed Discharge Turnover:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>32 Mins</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Discharge to sanitized ready</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
