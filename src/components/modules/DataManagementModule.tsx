import React, { useState } from 'react';
import {
  HardDrive,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Database,
  ShieldCheck,
  Archive
} from 'lucide-react';

export const DataManagementModule: React.FC = () => {
  const [backupTriggered, setBackupTriggered] = useState(false);

  const handleBackup = () => {
    setBackupTriggered(true);
    setTimeout(() => setBackupTriggered(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <HardDrive size={24} color="var(--royal-700)" />
            Point 45: Data Management, Backup & Disaster Recovery (DR)
          </h2>
          <p className="card-subtitle">
            PostgreSQL automated point-in-time recovery (PITR), Secondary DR data replication, Legacy CSV/JSON migration tools & Cold storage archiving
          </p>
        </div>

        <button onClick={handleBackup} className="btn btn-primary btn-sm">
          <Database size={14} /> Trigger Manual Snapshot Backup
        </button>
      </div>

      {backupTriggered && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          Snapshot backup created! <code>pg_dump_medpulse_20261024_1635.sql.gz</code> archived to AWS S3 Mumbai + MinIO On-Premise secondary node.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>Daily Automated Backup</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Full snapshot taken every night at 02:00 AM IST with 30-day retention and WAL continuous replication.
          </p>
          <div style={{ marginTop: '12px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--emerald-600)' }}>
            ✓ Last Successful: Today, 02:00 AM
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>Disaster Recovery (DR)</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Secondary hot-standby database in Hyderabad datacenter. RPO: &lt; 5 minutes, RTO: &lt; 15 minutes.
          </p>
          <div style={{ marginTop: '12px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--royal-700)' }}>
            ✓ Replication Lag: 180 ms
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>Legacy Migration Tool</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Batch import legacy patients and lab historical records from CSV, JSON, or Excel with visual column mapper.
          </p>
          <div style={{ marginTop: '12px' }}>
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>Launch Import Wizard</button>
          </div>
        </div>
      </div>
    </div>
  );
};
