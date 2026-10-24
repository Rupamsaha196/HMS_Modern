import React, { useState } from 'react';
import {
  Workflow,
  Code,
  Network,
  Share2,
  RefreshCw,
  Zap,
  CheckCircle2,
  Lock,
  Server
} from 'lucide-react';

export const IntegrationsAPIModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rest' | 'hl7' | 'kafka'>('rest');

  const hl7Message = `MSH|^~\\&|MEDPULSE_ADT|IND_MAIN|LAB_SYS|LAB_DEPT|20261024163000||ADT^A01|MSG20261024001|P|2.5
PID|1||UHID-2026-00481^^^MEDPULSE||VERMA^RAJESH^KUMAR||19740314|M|||42 100FT RD INDIRANAGAR^BENGALURU^KA^560038
PV1|1|I|ICU^102^1||||DOC4821^MUKHOPADHYAY^SHALINI||||||||||||IP202600918`;

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Workflow size={24} color="var(--royal-700)" />
            Point 46: Integrations, API Gateway & Healthcare Interoperability
          </h2>
          <p className="card-subtitle">
            REST APIs with OAuth2/JWT & Rate Limiting, HL7 v2.5 ADT/ORU engines, FHIR R4 resources, and Apache Kafka / RabbitMQ event-driven message bus
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'rest' ? 'active' : ''}`} onClick={() => setActiveTab('rest')}>
          <Code size={16} /> REST API Explorer & Swagger
        </button>
        <button className={`tab-btn ${activeTab === 'hl7' ? 'active' : ''}`} onClick={() => setActiveTab('hl7')}>
          <Network size={16} /> HL7 v2 Message Engine (ADT^A01)
        </button>
        <button className={`tab-btn ${activeTab === 'kafka' ? 'active' : ''}`} onClick={() => setActiveTab('kafka')}>
          <Zap size={16} /> Kafka Event Bus & Webhooks
        </button>
      </div>

      {/* Tab 1: REST */}
      {activeTab === 'rest' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Core Hospital REST API Endpoints (v1)
            </h3>
            <span className="badge badge-success">Rate Limit: 500 req/min</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '12px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-royal" style={{ fontWeight: 800 }}>GET</span>
                <code>/api/v1/patients/&#123;uhid&#125;</code>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fetch complete longitudinal MPI profile</span>
              </div>
              <button className="btn btn-outline btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>Test API</button>
            </div>

            <div style={{ padding: '12px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-success" style={{ fontWeight: 800 }}>POST</span>
                <code>/api/v1/appointments/book</code>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Reserve slot and generate live token</span>
              </div>
              <button className="btn btn-outline btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>Test API</button>
            </div>

            <div style={{ padding: '12px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-purple" style={{ fontWeight: 800 }}>POST</span>
                <code>/api/v1/abdm/care-context/link</code>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bind OPD/IPD encounter with ABHA address</span>
              </div>
              <button className="btn btn-outline btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>Test API</button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: HL7 v2 */}
      {activeTab === 'hl7' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              HL7 v2.5 Message Simulator (Inpatient ADT^A01 Admission Notification)
            </h3>
            <span className="badge badge-royal">MLLP Port 2575</span>
          </div>

          <pre style={{
            background: '#090d16',
            color: '#4ade80',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8rem',
            overflowX: 'auto',
            lineHeight: 1.6
          }}>
            {hl7Message}
          </pre>
        </div>
      )}
    </div>
  );
};
