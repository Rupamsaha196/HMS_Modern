import React, { useState } from 'react';
import {
  Milestone,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const BuildRoadmapModule: React.FC = () => {
  const phases = [
    {
      phase: 'Phase 1 (MVP)',
      badge: 'Completed',
      badgeColor: 'success',
      scope: 'Auth / RBAC, master data, registration + ABHA (M1), appointments, OPD, billing, basic pharmacy and lab',
      modules: 'Points 1, 2, 3, 5, 6, 7, 8, 18, 20, 24',
      progress: 100
    },
    {
      phase: 'Phase 2',
      badge: 'Completed',
      badgeColor: 'success',
      scope: 'IPD / ADT, nursing, OT, full LIS, pharmacy + inventory, insurance / TPA, ABDM HIP (M2)',
      modules: 'Points 4, 10, 11, 13, 14, 21, 26, 29, 31',
      progress: 100
    },
    {
      phase: 'Phase 3',
      badge: 'Completed',
      badgeColor: 'success',
      scope: 'Radiology / PACS, ICU, blood bank, HR / payroll, ABDM HIU (M3), NHCX claims, patient portal',
      modules: 'Points 12, 15, 19, 22, 25, 27, 28, 30, 32, 34, 40',
      progress: 100
    },
    {
      phase: 'Phase 4',
      badge: 'Completed',
      badgeColor: 'success',
      scope: 'Analytics, AI features, telemedicine, NABH / quality modules, advanced integrations, DHIS reporting',
      modules: 'Points 16, 17, 23, 33, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50',
      progress: 100
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Milestone size={24} color="var(--royal-700)" />
            Point 49: Suggested Enterprise Build Roadmap (Phases 1 to 4)
          </h2>
          <p className="card-subtitle">
            Systematic delivery progression from Core MVP, Inpatient & HIP M2, ICU/PACS/HIU M3, through Analytics, AI & DHIS Reporting
          </p>
        </div>
        <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          All 4 Phases Fully Delivered
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {phases.map((p, idx) => (
          <div key={idx} className="card" style={{ borderLeft: '6px solid var(--royal-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge badge-royal" style={{ fontSize: '0.75rem', fontWeight: 800 }}>{p.phase}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>
                  {p.scope}
                </h3>
              </div>
              <span className={`badge badge-${p.badgeColor}`} style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                ✓ {p.badge}
              </span>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Covered Blueprint Modules: <strong>{p.modules}</strong></span>
              <span style={{ fontWeight: 700, color: 'var(--emerald-600)' }}>100% Delivery Completed</span>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'var(--surface-alt)', borderRadius: '999px', marginTop: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${p.progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--royal-600), var(--emerald-500))', borderRadius: '999px' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
