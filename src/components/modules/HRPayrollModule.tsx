import React, { useState } from 'react';
import {
  Contact2,
  Calendar,
  DollarSign,
  Award,
  CheckCircle2,
  Clock,
  Printer,
  FileText
} from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';

export const HRPayrollModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'employees' | 'roster' | 'payroll'>('employees');

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Contact2 size={24} color="var(--royal-700)" />
            Point 34: Human Resources (HR) & Automated Payroll Suite
          </h2>
          <p className="card-subtitle">
            Practitioner medical credentials & state council license renewal tracking, Biometric attendance sync, Shift duty rosters, and Statutory payroll (PF, ESI, TDS) with payslip generation
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <DollarSign size={14} /> Run Monthly Payroll Engine
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => setActiveTab('employees')}>
          <Contact2 size={16} /> Employee Directory & Council Licences
        </button>
        <button className={`tab-btn ${activeTab === 'roster' ? 'active' : ''}`} onClick={() => setActiveTab('roster')}>
          <Calendar size={16} /> Biometrics & Shift Duty Rosters
        </button>
        <button className={`tab-btn ${activeTab === 'payroll' ? 'active' : ''}`} onClick={() => setActiveTab('payroll')}>
          <DollarSign size={16} /> Payroll & Payslips (PF/ESI/TDS)
        </button>
      </div>

      {/* Tab 1: Employee Directory */}
      {activeTab === 'employees' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Hospital Employee Master & Regulatory Credentials
            </h3>
            <span className="badge badge-royal">{INITIAL_USERS.length} Registered Staff</span>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Designation & Dept</th>
                  <th>Medical Council Licence</th>
                  <th>Biometric ID</th>
                  <th>Licence Expiry</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_USERS.map(u => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.role} ({u.department})</td>
                    <td><code>{u.hprId || 'ADM-OFFICER-2026'}</code></td>
                    <td>BIO-4812</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--emerald-700)', fontWeight: 600 }}>2029-12-31 (Valid)</td>
                    <td><span className="badge badge-success">{u.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Payroll */}
      {activeTab === 'payroll' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Monthly Salary Disbursal & Payslip Generator
            </h3>
            <button className="btn btn-outline btn-sm" onClick={() => window.print()}>
              <Printer size={14} /> Print Payslips
            </button>
          </div>

          <div style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '8px' }}>
              <strong>Staff: Dr. Shalini Mukhopadhyay (Consultant Interventional Cardiologist)</strong>
              <span className="badge badge-success">Processed (Oct 2026)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <strong>Earnings:</strong><br />
                Basic: ₹1,50,000<br />
                HRA: ₹60,000<br />
                Special Allowance: ₹40,000<br />
                OPD Footfall Incentive: ₹25,000<br />
                <strong>Gross Earnings: ₹2,75,000</strong>
              </div>
              <div>
                <strong>Deductions:</strong><br />
                PF (Provident Fund): ₹1,800<br />
                Professional Tax: ₹200<br />
                TDS Income Tax (Sec 192): ₹42,000<br />
                <strong>Total Deductions: ₹44,000</strong><br />
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--emerald-600)', marginTop: '6px' }}>
                  Net Disbursed: ₹2,31,000
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
