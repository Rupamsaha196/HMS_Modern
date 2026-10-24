import React from 'react';
import {
  HelpCircle,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  Headphones
} from 'lucide-react';

export const TechnicalSupportModule: React.FC = () => {
  const team = [
    { name: 'Siddharth Rao', role: 'Chief Enterprise Architect & Lead Engineer', email: 'siddharth.rao@medpulse.in', phone: '+91 98450 99881', specialization: 'Spring Boot, FHIR R4 & High Availability' },
    { name: 'Dr. Neha Kulkarni', role: 'ABDM & Interoperability Compliance Officer', email: 'neha.kulkarni@medpulse.in', phone: '+91 98450 99882', specialization: 'NHA Gateway, HFR/HPR, ECDH Encryption' },
    { name: 'Abhishek Chatterjee', role: 'DevOps & Cloud Infrastructure Lead', email: 'abhishek.c@medpulse.in', phone: '+91 98450 99883', specialization: 'Kubernetes, Redis, PostgreSQL PITR, DR' },
    { name: 'Pooja Iyer', role: 'Hospital Integration & DICOM/PACS Engineer', email: 'pooja.iyer@medpulse.in', phone: '+91 98450 99884', specialization: 'Orthanc PACS, HL7 v2, Analyzer Interfaces' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <HelpCircle size={24} color="var(--royal-700)" />
            Point 50: Technical Support Directory & Escalation Matrix
          </h2>
          <p className="card-subtitle">
            Dedicated 24x7 hospital engineering support team, ABDM integration officers, and Helpdesk SLA escalation tiers
          </p>
        </div>
        <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          24x7 On-Call Support: Active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {team.map((m, idx) => (
          <div key={idx} className="card" style={{ borderLeft: '4px solid var(--royal-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--royal-950)' }}>{m.name}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--royal-700)', fontWeight: 600 }}>{m.role}</div>
              </div>
              <Headphones size={20} color="var(--royal-600)" />
            </div>

            <div style={{ marginTop: '12px', fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div><strong>Email:</strong> {m.email}</div>
              <div><strong>Hotline Phone:</strong> {m.phone}</div>
              <div><strong>Domain:</strong> {m.specialization}</div>
            </div>

            <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '8px', fontSize: '0.75rem', color: 'var(--emerald-600)', fontWeight: 600 }}>
              ✓ SLA Tier-1 Response Guarantee: &lt; 15 Minutes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
