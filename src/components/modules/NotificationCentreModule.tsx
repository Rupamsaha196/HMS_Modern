import React, { useState } from 'react';
import {
  Send,
  MessageSquare,
  Mail,
  Bell,
  CheckCircle2,
  Clock,
  Plus,
  RefreshCw
} from 'lucide-react';

export const NotificationCentreModule: React.FC = () => {
  const templates = [
    { title: 'OPD Appointment Reminder (SMS + WhatsApp)', text: 'Dear {PatientName}, your consultation with {DoctorName} is scheduled today at {TimeSlot} at MedPulse Apex Hospital. Token #{Token}.' },
    { title: 'Diagnostic Report Ready Alert', text: 'Dear {PatientName}, your laboratory test report for {TestName} is now ready and verified. Download your signed report: {Link}.' },
    { title: 'Payment Receipt & Bill Link', text: 'Dear {PatientName}, thank you for your payment of {Amount}. View and download your official GST invoice: {Link}.' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Send size={24} color="var(--royal-700)" />
            Point 41: Omnichannel Notifications & Communication Centre
          </h2>
          <p className="card-subtitle">
            Multi-channel automated dispatch (WhatsApp API, SMS Gateway, Email & In-App Alerts), Clinical message templates, Delivery retry logic & Hospital-wide internal broadcast board
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Send Broadcast Announcement
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Standard Clinical Notification Templates
            </h3>
            <span className="badge badge-success">WhatsApp Business API Active</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {templates.map((t, idx) => (
              <div key={idx} style={{ background: 'var(--surface-bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--royal-900)' }}>{t.title}</strong>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Hospital Emergency Notice Board (Staff Intranet)
            </h3>
            <span className="badge badge-royal">Broadcasting</span>
          </div>

          <div style={{ background: 'var(--royal-50)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)', marginBottom: '12px' }}>
            <strong style={{ color: 'var(--royal-900)', fontSize: '0.9rem' }}>📢 NABH Surveillance Audit Scheduled for 28th October</strong>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              All ward incharges, nursing supervisors and HODs must ensure clinical indicator logs, MAR charts, and CPR resuscitation trolleys are updated.
            </p>
          </div>

          <div style={{ background: 'var(--rose-50)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--rose-border)' }}>
            <strong style={{ color: 'var(--rose-800)', fontSize: '0.9rem' }}>🚨 Blood Bank Urgent Requirement: O Negative PRBC</strong>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              O Negative inventory currently at 1 unit due to trauma surgery. Voluntary donor call initiated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
