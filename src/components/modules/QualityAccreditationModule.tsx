import React, { useState } from 'react';
import {
  Award,
  AlertTriangle,
  Smile,
  FileCheck,
  CheckCircle2,
  TrendingUp,
  Plus
} from 'lucide-react';

export const QualityAccreditationModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kpi' | 'incidents' | 'grievance'>('kpi');

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Award size={24} color="var(--royal-700)" />
            Point 39: Clinical Quality, Accreditation & NABH 5th Edition / JCI
          </h2>
          <p className="card-subtitle">
            NABH Core clinical indicators, Incident and near-miss reporting with root-cause CAPA workflows, Patient satisfaction Net Promoter Score (NPS), and Clinical SOP governance
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Report Incident / Near-Miss
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'kpi' ? 'active' : ''}`} onClick={() => setActiveTab('kpi')}>
          <Award size={16} /> NABH 5th Edition Key Performance Indicators
        </button>
        <button className={`tab-btn ${activeTab === 'incidents' ? 'active' : ''}`} onClick={() => setActiveTab('incidents')}>
          <AlertTriangle size={16} /> Incident & Near-Miss CAPA Registry
        </button>
        <button className={`tab-btn ${activeTab === 'grievance' ? 'active' : ''}`} onClick={() => setActiveTab('grievance')}>
          <Smile size={16} /> Patient Feedback & Grievance Redressal
        </button>
      </div>

      {/* Tab 1: KPI */}
      {activeTab === 'kpi' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Mandatory NABH Quality Metrics Dashboard (October 2026)
            </h3>
            <span className="badge badge-success">Full Compliance</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>Average Length of Stay (ALOS):</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>3.4 Days</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--emerald-600)' }}>Benchmark &lt; 4.0 Days</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>30-Day Readmission Rate:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>1.8%</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target &lt; 3.0%</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>Gross Hospital Mortality:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>0.9%</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Within expected case-mix</div>
            </div>
            <div style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <strong>Patient Satisfaction NPS:</strong>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '4px' }}>+84.2</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>World-class rating</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
