import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BedDouble,
  Activity,
  AlertTriangle,
  IndianRupee,
  CalendarCheck,
  FlaskConical,
  LogOut,
  TrendingUp,
  Award,
  QrCode,
  Link,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Filter,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/mockData';

export const AdminDashboardModule: React.FC<{ onNavigate: (moduleId: number) => void }> = ({ onNavigate }) => {
  const [dateFilter, setDateFilter] = useState('Today (24 Oct 2026)');

  const leaderboards = [
    { doctor: 'Dr. Shalini Mukhopadhyay', dept: 'Cardiology', opd: 38, ipd: 14, revenue: '₹4,12,000', rating: 4.9 },
    { doctor: 'Dr. Vikramaditya Rao', dept: 'Orthopaedics', opd: 29, ipd: 9, revenue: '₹3,45,000', rating: 4.8 },
    { doctor: 'Dr. George Thomas', dept: 'Anaesthesia & ICU', opd: 12, ipd: 18, revenue: '₹2,90,000', rating: 4.9 },
    { doctor: 'Dr. Sunita Deshmukh', dept: 'Obstetrics & Gynaec', opd: 34, ipd: 8, revenue: '₹2,65,000', rating: 4.7 }
  ];

  return (
    <div className="animate-fade-in">
      {/* Top Banner: ABDM Milestone 1, 2, 3 Certified Centre Banner */}
      <div className="abdm-banner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-success" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', border: '1px solid #10b981' }}>
                ABDM Level 3 Ready (HIP & HIU)
              </span>
              <span className="badge badge-royal" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}>
                DHIS Incentive Eligible
              </span>
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Executive Hospital Command & Operations Center
            </h1>
            <p style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '4px', maxWidth: '750px' }}>
              Real-time synchronization across OPD footfalls, Inpatient censuses, Emergency alerts, Billing revenue cycles, and National ABDM Health Exchanges.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '10px 18px', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(8px)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>₹24,960</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>DHIS Accumulated Reward</div>
            </div>
            <button
              onClick={() => onNavigate(6)}
              className="btn"
              style={{ background: '#ffffff', color: 'var(--royal-900)', fontWeight: 700 }}
            >
              <QrCode size={16} /> Scan & Share Counter
            </button>
          </div>
        </div>
      </div>

      {/* Date & Quick Filters Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--royal-950)' }}>
            Real-Time Hospital KPI Snapshot
          </h2>
          <span className="badge badge-royal" style={{ fontSize: '0.75rem' }}>Auto-refreshing (5s)</span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--pure-white)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <Filter size={15} color="var(--royal-600)" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', outline: 'none' }}
            >
              <option value="Today (24 Oct 2026)">Today (24 Oct 2026)</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month (October 2026)</option>
            </select>
          </div>

          <button onClick={() => onNavigate(42)} className="btn btn-outline btn-sm">
            <TrendingUp size={15} /> Full Analytics
          </button>
        </div>
      </div>

      {/* Point 2 KPI 1: Real-time footfall, census, bed occupancy, ER load */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card" onClick={() => onNavigate(7)} style={{ cursor: 'pointer' }}>
          <div className="stat-icon"><Users /></div>
          <div className="stat-info">
            <div className="stat-value">482</div>
            <div className="stat-label">OPD Footfall Today</div>
            <div className="stat-trend" style={{ color: 'var(--emerald-600)' }}>
              <ArrowUpRight size={13} /> +12.4% vs last week
            </div>
          </div>
        </div>

        <div className="stat-card stat-purple" onClick={() => onNavigate(10)} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: 'var(--purple-50)', color: 'var(--purple-600)' }}><BedDouble /></div>
          <div className="stat-info">
            <div className="stat-value">194 / 220</div>
            <div className="stat-label">IPD Census (Active Inpatients)</div>
            <div className="stat-trend" style={{ color: 'var(--purple-600)' }}>
              88.2% Total Occupancy
            </div>
          </div>
        </div>

        <div className="stat-card stat-rose" onClick={() => onNavigate(12)} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: 'var(--rose-50)', color: 'var(--rose-600)' }}><AlertTriangle /></div>
          <div className="stat-info">
            <div className="stat-value">14 Cases</div>
            <div className="stat-label">Emergency / ER Active Load</div>
            <div className="stat-trend" style={{ color: 'var(--rose-600)' }}>
              1 Code Blue, 3 ESI Level 1
            </div>
          </div>
        </div>

        <div className="stat-card stat-emerald" onClick={() => onNavigate(24)} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-600)' }}><IndianRupee /></div>
          <div className="stat-info">
            <div className="stat-value">₹14.82 L</div>
            <div className="stat-label">Gross Collections Today</div>
            <div className="stat-trend" style={{ color: 'var(--emerald-600)' }}>
              ₹9.2L Cash/UPI, ₹5.6L TPA
            </div>
          </div>
        </div>
      </div>

      {/* Point 2 KPI 3: ABDM Ecosystem & National Health Stack Metrics */}
      <div className="card" style={{ marginBottom: '24px', border: '1px solid var(--royal-200)' }}>
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--royal-950)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--royal-700)" />
              ABDM National Health Stack & DHIS Performance Metrics
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              National Health Authority (NHA) Milestones 1, 2, 3 Certified • Live Gateway Bridge • Digital Health Incentive Scheme (DHIS)
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>✓ M1: ABHA Ready</span>
            <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>✓ M2: HIP Certified</span>
            <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>✓ M3: HIU Certified</span>
            <span className="badge badge-royal" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              Gateway Online (42ms)
            </span>
            <button onClick={() => onNavigate(6)} className="btn btn-outline btn-sm">
              <QrCode size={13} /> Scan & Share
            </button>
            <button onClick={() => onNavigate(33)} className="btn btn-primary btn-sm">
              <FileCheck size={13} /> Compliance Suite
            </button>
          </div>
        </div>

        {/* 4-Card Equal Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px', marginBottom: '16px' }}>
          {/* Tile 1 */}
          <div
            onClick={() => onNavigate(6)}
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, var(--royal-50) 0%, #ffffff 100%)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--royal-200)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--royal-800)' }}>ABHAs Generated</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--royal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QrCode size={16} color="var(--royal-700)" />
              </div>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--royal-950)', lineHeight: 1.1 }}>1,248</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--royal-700)', fontWeight: 600, marginTop: '4px' }}>Aadhaar & Mobile OTP Flow</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>+84 Today • 98.4% KYC Verified</div>
          </div>

          {/* Tile 2 */}
          <div
            onClick={() => onNavigate(29)}
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, var(--emerald-50) 0%, #ffffff 100%)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--emerald-border)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--emerald-800)' }}>Records Linked</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link size={16} color="var(--emerald-600)" />
              </div>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--emerald-950)', lineHeight: 1.1 }}>942 Contexts</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--emerald-700)', fontWeight: 600, marginTop: '4px' }}>Care Contexts Bound</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>OPD (612) • IPD (210) • Lab (120)</div>
          </div>

          {/* Tile 3 */}
          <div
            onClick={() => onNavigate(30)}
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, var(--purple-50) 0%, #ffffff 100%)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--purple-border)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--purple-800)' }}>Consents Received</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--purple-50)', border: '1px solid var(--purple-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={16} color="var(--purple-600)" />
              </div>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--purple-950)', lineHeight: 1.1 }}>318 Active</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--purple-700)', fontWeight: 600, marginTop: '4px' }}>HIU/HIP Access Granted</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>100% DPDP Act Compliant</div>
          </div>

          {/* Tile 4 */}
          <div
            onClick={() => onNavigate(33)}
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, var(--amber-50) 0%, #ffffff 100%)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--amber-border)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--amber-800)' }}>DHIS Earned</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--amber-50)', border: '1px solid var(--amber-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IndianRupee size={16} color="var(--amber-600)" />
              </div>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--amber-950)', lineHeight: 1.1 }}>₹24,960</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--amber-700)', fontWeight: 600, marginTop: '4px' }}>Digital Incentive Scheme</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>₹20/Txn under NHA Scheme</div>
          </div>
        </div>

        {/* Live ABDM Infrastructure & Protocol Footer Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '10px 14px',
          background: 'var(--surface-bg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)'
        }}>
          <div><strong>Facility HFR ID:</strong> <code style={{ color: 'var(--royal-700)' }}>IN2910002931</code> (MedPulse Apex)</div>
          <div><strong>Gateway Endpoint:</strong> <code>https://dev.abdm.gov.in/gateway/v0.5</code></div>
          <div><strong>Crypto Protocol:</strong> <span>ECDH Curve25519 · AES-GCM-128</span></div>
          <div><strong>Session Token:</strong> <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>Valid (Redis TTL: 3,240s)</span></div>
        </div>
      </div>

      {/* Point 2 KPI 2: Revenue Snapshot & Pending Workflow Queues */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '24px', marginBottom: '24px' }}>
        {/* Revenue Snapshot Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Financial Revenue Snapshot
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Cash desk collections, outstanding receivables, pending claims & advance deposits
              </p>
            </div>
            <button onClick={() => onNavigate(24)} className="btn btn-outline btn-sm">
              Billing Desk
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px' }}>
            <div style={{ padding: '16px', background: 'var(--royal-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--royal-800)', fontWeight: 600 }}>Total Collections (Today)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--royal-950)', marginTop: '4px' }}>₹14,82,500</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--royal-700)', marginTop: '4px' }}>OPD: ₹3.9L | IPD: ₹10.9L</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--purple-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--purple-border)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--purple-800)', fontWeight: 600 }}>Insurance & TPA Claims Pending</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--purple-900)', marginTop: '4px' }}>₹48,20,000</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--purple-700)', marginTop: '4px' }}>32 NHCX Claims in processing</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--amber-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--amber-border)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--amber-800)', fontWeight: 600 }}>Outstanding Patient Balances</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--amber-900)', marginTop: '4px' }}>₹6,45,200</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--amber-700)', marginTop: '4px' }}>18 IPD running bills pending discharge</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--emerald-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--emerald-border)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--emerald-800)', fontWeight: 600 }}>IPD Advance Deposits Held</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--emerald-900)', marginTop: '4px' }}>₹19,30,000</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--emerald-700)', marginTop: '4px' }}>Security advances against beds</div>
            </div>
          </div>
        </div>

        {/* Operational Queues: Appointments, Pending Lab/Rad, Discharges Due */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Today's Operational Task Queues
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Real-time pending diagnostic reports, discharge advices, and appointments
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              onClick={() => onNavigate(7)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--royal-100)', color: 'var(--royal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CalendarCheck size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Today's OPD Appointments</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>286 Checked In • 48 In Consult • 148 Waiting</div>
                </div>
              </div>
              <span className="badge badge-royal">334 Total</span>
            </div>

            <div
              onClick={() => onNavigate(18)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--amber-50)', color: 'var(--amber-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FlaskConical size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Pending Lab & Radiology Results</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>22 Accessioned • 8 Verification Pending • 1 Panic Flag</div>
                </div>
              </div>
              <span className="badge badge-warning">30 Pending</span>
            </div>

            <div
              onClick={() => onNavigate(10)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LogOut size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>IPD Discharges Due Today</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>14 Summaries Approved • 8 Final Bills Settled</div>
                </div>
              </div>
              <span className="badge badge-success">22 Discharges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Point 2 KPI 4: Doctor Performance Leaderboard - Full Width */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--royal-950)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="var(--royal-700)" />
              Doctor & Department Performance Leaderboard
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              OPD footfalls, IPD bed admissions, clinical revenue contribution, and patient satisfaction ratings
            </p>
          </div>
          <span className="badge badge-royal" style={{ fontSize: '0.75rem' }}>Top Clinical Performers · October 2026</span>
        </div>

        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Doctor / Clinician</th>
                <th>Department</th>
                <th>OPD Seen</th>
                <th>IPD Cases</th>
                <th>Total Revenue</th>
                <th>Rating</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {leaderboards.map((l, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--royal-100)', color: 'var(--royal-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                        {l.doctor.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--royal-950)' }}>{l.doctor}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Senior Consultant</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-royal" style={{ fontSize: '0.75rem' }}>{l.dept}</span></td>
                  <td style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{l.opd} Patients</td>
                  <td style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{l.ipd} Cases</td>
                  <td style={{ fontWeight: 800, color: 'var(--emerald-600)' }}>{l.revenue}</td>
                  <td style={{ fontWeight: 700, color: 'var(--amber-600)' }}>⭐ {l.rating} / 5.0</td>
                  <td>
                    <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                      {i === 0 ? 'In OPD Clinic' : i === 1 ? 'In OT (Procedure)' : i === 2 ? 'In ICU Rounds' : 'Consulting'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
