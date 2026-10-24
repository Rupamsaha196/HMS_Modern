import React, { useState } from 'react';
import { Users, Shield, Key, FileSignature, CheckCircle2, Lock, Plus, Search, Eye, Edit, Trash2, Printer, Download } from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';
import { UserAccount, GranularPermission } from '../../types/hms';

export const UserRoleAccessModule: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [selectedRole, setSelectedRole] = useState<string>('Doctor');
  const [searchUser, setSearchUser] = useState('');

  const permissions: GranularPermission[] = [
    { module: 'Patient Registration & MPI', view: true, add: true, edit: true, delete: false, print: true, export: true, approve: false },
    { module: 'ABHA Integration (M1)', view: true, add: true, edit: true, delete: false, print: true, export: false, approve: true },
    { module: 'OPD Consultation & E-Prescription', view: true, add: true, edit: true, delete: false, print: true, export: true, approve: true },
    { module: 'EMR & Longitudinal Records', view: true, add: true, edit: true, delete: false, print: true, export: true, approve: false },
    { module: 'Inpatient (IPD) & ADT Workflow', view: true, add: true, edit: true, delete: false, print: true, export: false, approve: true },
    { module: 'Operation Theatre & Anaesthesia', view: true, add: true, edit: true, delete: false, print: true, export: false, approve: true },
    { module: 'LIS Lab Results Verification', view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false },
    { module: 'Pharmacy Dispensing & Schedule H', view: true, add: false, edit: false, delete: false, print: false, export: false, approve: false },
    { module: 'Billing & Cashier Collections', view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false },
    { module: 'ABDM Health Records Export (HIP M2)', view: true, add: true, edit: false, delete: false, print: true, export: true, approve: true }
  ];

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.role.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.department.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {/* Module Header */}
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Users size={24} color="var(--royal-700)" />
            Point 1: User, Role & Access Management (RBAC & DSC)
          </h2>
          <p className="card-subtitle">
            Granular permissions (view/add/edit/delete/print/export/approve), Break-glass logs, and Digital Signature (DSC) certificate management
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline btn-sm">
            <FileSignature size={15} />
            <span>DSC Token Status</span>
          </button>
          <button className="btn btn-primary btn-sm">
            <Plus size={15} />
            <span>Create New Staff User</span>
          </button>
        </div>
      </div>

      {/* Top Stat Pills */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-icon"><Users /></div>
          <div className="stat-info">
            <div className="stat-value">{users.length} Active</div>
            <div className="stat-label">System Users Across 14 Roles</div>
          </div>
        </div>
        <div className="stat-card stat-emerald">
          <div className="stat-icon" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-600)' }}><FileSignature /></div>
          <div className="stat-info">
            <div className="stat-value">5 Verified</div>
            <div className="stat-label">Digital Signatures (e-Sign/DSC)</div>
          </div>
        </div>
        <div className="stat-card stat-purple">
          <div className="stat-icon" style={{ background: 'var(--purple-50)', color: 'var(--purple-600)' }}><Key /></div>
          <div className="stat-info">
            <div className="stat-value">14 Roles</div>
            <div className="stat-label">Role Matrices Configured</div>
          </div>
        </div>
        <div className="stat-card stat-rose">
          <div className="stat-icon" style={{ background: 'var(--rose-50)', color: 'var(--rose-600)' }}><Lock /></div>
          <div className="stat-info">
            <div className="stat-value">1 Active</div>
            <div className="stat-label">Break-Glass Emergency Overrides</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: User Directory & Granular Permission Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '24px' }}>
        {/* User Directory */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Hospital Staff & Practitioner Directory
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Doctors with HPR ID, nurses, billing, pharmacists & admin officers
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-bg)', padding: '4px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <Search size={14} color="var(--royal-600)" />
              <input
                type="text"
                placeholder="Filter users..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.78rem', width: '110px' }}
              />
            </div>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>User / Name</th>
                  <th>Role & Dept</th>
                  <th>ABDM HPR ID</th>
                  <th>DSC Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{u.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{u.email}</div>
                    </td>
                    <td>
                      <span className="badge badge-royal" style={{ fontSize: '0.7rem' }}>{u.role}</span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{u.department}</div>
                    </td>
                    <td>
                      {u.hprId ? (
                        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--royal-700)', fontWeight: 600 }}>
                          {u.hprId}
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>N/A</span>
                      )}
                    </td>
                    <td>
                      {u.hasDSC ? (
                        <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                          <CheckCircle2 size={11} /> DSC Bound
                        </span>
                      ) : (
                        <span className="badge badge-warning" style={{ fontSize: '0.68rem' }}>
                          Pending DSC
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-outline btn-sm" style={{ padding: '4px 8px' }} title="Edit Permissions">
                          <Edit size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Granular Role Permission Matrix */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Granular Permission Matrix
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Configure access for role: <strong>{selectedRole}</strong>
              </p>
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="form-select"
              style={{ width: 'auto', fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Billing Executive">Billing Executive</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Lab Technician">Lab Technician</option>
              <option value="MRD Officer">MRD Officer</option>
            </select>
          </div>

          <div className="table-container">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th style={{ textAlign: 'center' }}>View</th>
                  <th style={{ textAlign: 'center' }}>Add</th>
                  <th style={{ textAlign: 'center' }}>Edit</th>
                  <th style={{ textAlign: 'center' }}>Del</th>
                  <th style={{ textAlign: 'center' }}>Print</th>
                  <th style={{ textAlign: 'center' }}>Appr</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((p, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--royal-900)' }}>{p.module}</td>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked={p.view} /></td>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked={p.add} /></td>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked={p.edit} /></td>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked={p.delete} /></td>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked={p.print} /></td>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked={p.approve} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button className="btn btn-outline btn-sm">Reset to Defaults</button>
            <button className="btn btn-primary btn-sm">Save Role Matrix Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
