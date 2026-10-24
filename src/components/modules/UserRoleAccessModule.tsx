import React, { useState } from 'react';
import {
  Users,
  Shield,
  Key,
  FileSignature,
  CheckCircle2,
  Lock,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Printer,
  Download,
  AlertTriangle,
  RotateCcw,
  Check,
  ShieldAlert,
  HardDrive,
  Calendar,
  Filter
} from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';
import { UserAccount, GranularPermission, UserRole } from '../../types/hms';

const INITIAL_PERMISSIONS: GranularPermission[] = [
  { module: 'Patient Registration & Master Patient Index (MPI)', view: true, add: true, edit: true, delete: false, print: true, export: true, approve: false },
  { module: 'ABHA Integration & Verification (ABDM M1)', view: true, add: true, edit: true, delete: false, print: true, export: false, approve: true },
  { module: 'OPD Consultation & E-Prescription (Rx)', view: true, add: true, edit: true, delete: false, print: true, export: true, approve: true },
  { module: 'EMR & Longitudinal Clinical Records', view: true, add: true, edit: true, delete: false, print: true, export: true, approve: false },
  { module: 'Inpatient (IPD) Admission & ADT Workflow', view: true, add: true, edit: true, delete: false, print: true, export: false, approve: true },
  { module: 'Bed & Ward Live Occupancy Board', view: true, add: true, edit: true, delete: false, print: true, export: false, approve: false },
  { module: 'Operation Theatre & Anaesthesia Rostering', view: true, add: true, edit: true, delete: false, print: true, export: false, approve: true },
  { module: 'LIS Laboratory Results & Verification', view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false },
  { module: 'Pharmacy Dispensing & Schedule H Registry', view: true, add: false, edit: false, delete: false, print: false, export: false, approve: false },
  { module: 'Billing, Cashier Collections & RCM', view: true, add: false, edit: false, delete: false, print: true, export: false, approve: false },
  { module: 'ABDM Health Records Export (HIP M2)', view: true, add: true, edit: false, delete: false, print: true, export: true, approve: true },
  { module: 'System Master Data & Audit Trail Logs', view: false, add: false, edit: false, delete: false, print: false, export: false, approve: false }
];

export const UserRoleAccessModule: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [selectedRole, setSelectedRole] = useState<string>('Doctor');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [searchUser, setSearchUser] = useState('');
  const [permissions, setPermissions] = useState<GranularPermission[]>(INITIAL_PERMISSIONS);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('Doctor');
  const [newUserDept, setNewUserDept] = useState('Cardiology');
  const [newUserHpr, setNewUserHpr] = useState('');

  const togglePermission = (index: number, field: keyof GranularPermission) => {
    setPermissions(prev => {
      const updated = [...prev];
      const target = { ...updated[index] };
      if (typeof target[field] === 'boolean') {
        (target[field] as boolean) = !(target[field] as boolean);
      }
      updated[index] = target;
      return updated;
    });
  };

  const handleSelectAll = () => {
    setPermissions(prev => prev.map(p => ({
      ...p,
      view: true,
      add: true,
      edit: true,
      delete: false,
      print: true,
      export: true,
      approve: true
    })));
  };

  const handleReadOnly = () => {
    setPermissions(prev => prev.map(p => ({
      ...p,
      view: true,
      add: false,
      edit: false,
      delete: false,
      print: true,
      export: false,
      approve: false
    })));
  };

  const handleResetDefaults = () => {
    setPermissions(INITIAL_PERMISSIONS);
  };

  const handleSaveMatrix = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      phone: '+91 98450 12345',
      role: newUserRole,
      department: newUserDept,
      branch: 'Apex Main Hospital',
      hprId: newUserHpr.trim() || undefined,
      hasDSC: true,
      status: 'Active'
    };

    setUsers(prev => [newUser, ...prev]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserHpr('');
    setShowAddModal(false);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.role.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.department.toLowerCase().includes(searchUser.toLowerCase()) ||
      (u.hprId && u.hprId.toLowerCase().includes(searchUser.toLowerCase()));

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Module Header */}
      <div className="card-header" style={{ marginBottom: 0 }}>
        <div>
          <h2 className="card-title" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={24} color="var(--royal-700)" />
            Point 1: User, Role & Access Management (RBAC & DSC)
          </h2>
          <p className="card-subtitle" style={{ marginTop: '4px', fontSize: '0.85rem' }}>
            Granular permissions (view/add/edit/delete/print/export/approve), Break-glass audit trail, and Class 3 Digital Signature (DSC) certificate management
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={() => {
              const el = document.getElementById('dsc-audit-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn btn-outline btn-sm"
          >
            <FileSignature size={15} color="var(--royal-700)" />
            <span>DSC Token Status</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} />
            <span>Create New Staff User</span>
          </button>
        </div>
      </div>

      {/* Top Stat Pills */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 0 }}>
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
            <div className="stat-value">{users.filter(u => u.hasDSC).length} Verified</div>
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

      {/* SECTION 1: Hospital Staff & Practitioner Directory (Full Width) */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--royal-950)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--royal-600)" />
              Hospital Staff & Practitioner Directory
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Registered practitioners with ABDM HPR IDs, role privileges, DSC token binding, and branch assignments
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Role Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={13} color="var(--text-muted)" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.78rem', padding: '5px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}
              >
                <option value="ALL">All Roles ({users.length})</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Doctor">Doctors</option>
                <option value="Nurse">Nurses</option>
                <option value="Receptionist">Receptionists</option>
                <option value="Billing Executive">Billing Executives</option>
                <option value="Pharmacist">Pharmacists</option>
                <option value="Lab Technician">Lab Technicians</option>
              </select>
            </div>

            {/* Search Box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--surface-bg)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              <Search size={14} color="var(--royal-600)" />
              <input
                type="text"
                placeholder="Search staff, HPR, email..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.8rem',
                  width: '180px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="table-container" style={{ overflowX: 'auto' }}>
          <table className="hms-table" style={{ width: '100%', minWidth: '750px' }}>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Practitioner / User</th>
                <th style={{ width: '20%' }}>Role & Department</th>
                <th style={{ width: '20%' }}>ABDM Healthcare Professional ID (HPR)</th>
                <th style={{ width: '15%' }}>Digital Signature (DSC)</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No staff members match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--royal-950)', fontSize: '0.875rem' }}>{u.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                    </td>
                    <td>
                      <span className="badge badge-royal" style={{ fontSize: '0.72rem', fontWeight: 600 }}>{u.role}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '3px' }}>{u.department}</div>
                    </td>
                    <td>
                      {u.hprId ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--royal-50)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--royal-100)' }}>
                          <CheckCircle2 size={12} color="var(--royal-700)" />
                          <span style={{ fontSize: '0.76rem', fontFamily: 'monospace', color: 'var(--royal-800)', fontWeight: 600 }}>
                            {u.hprId}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontStyle: 'italic' }}>Pending ABDM HPR</span>
                      )}
                    </td>
                    <td>
                      {u.hasDSC ? (
                        <span className="badge badge-success" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} /> Class 3 Bound
                        </span>
                      ) : (
                        <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                          Pending DSC
                        </span>
                      )}
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--emerald-600)', fontWeight: 600 }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--emerald-500)', display: 'inline-block' }} />
                        Active
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                          title="Edit Permissions"
                          onClick={() => setSelectedRole(u.role)}
                        >
                          <Edit size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> active staff members</span>
          <span style={{ color: 'var(--royal-700)', fontWeight: 600 }}>National Healthcare Professionals Registry (HPR) Synced</span>
        </div>
      </div>

      {/* SECTION 2: Granular Role Permission Matrix (Full Width) */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--royal-950)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} color="var(--royal-600)" />
              Granular Role Permission Matrix & Security Policies
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Fine-grained privileges (view, add, edit, delete, print, ABDM export, sign) for role: <strong style={{ color: 'var(--royal-700)' }}>{selectedRole}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Role:</span>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.82rem', padding: '6px 12px', fontWeight: 600, color: 'var(--royal-900)', borderRadius: 'var(--radius-md)' }}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Billing Executive">Billing Executive</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Radiologist">Radiologist</option>
                <option value="Receptionist">Receptionist</option>
                <option value="MRD Officer">MRD Officer</option>
                <option value="Store Keeper">Store Keeper</option>
              </select>
            </div>

            <button onClick={handleSelectAll} className="btn btn-outline btn-sm" style={{ fontSize: '0.74rem' }}>
              Select All
            </button>
            <button onClick={handleReadOnly} className="btn btn-outline btn-sm" style={{ fontSize: '0.74rem' }}>
              Read-Only
            </button>
            <button onClick={handleResetDefaults} className="btn btn-outline btn-sm" style={{ fontSize: '0.74rem' }}>
              <RotateCcw size={12} />
              <span>Defaults</span>
            </button>
            <button
              onClick={handleSaveMatrix}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.76rem', background: savedSuccess ? 'var(--emerald-600)' : undefined }}
            >
              {savedSuccess ? (
                <>
                  <Check size={14} />
                  <span>Matrix Saved!</span>
                </>
              ) : (
                <>
                  <span>Save Role Matrix</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Permission Table */}
        <div className="table-container" style={{ overflowX: 'auto' }}>
          <table className="hms-table" style={{ width: '100%', minWidth: '700px' }}>
            <thead>
              <tr>
                <th style={{ width: '38%' }}>Module / Workflow Area</th>
                <th style={{ textAlign: 'center', width: '9%' }}>View</th>
                <th style={{ textAlign: 'center', width: '9%' }}>Add</th>
                <th style={{ textAlign: 'center', width: '9%' }}>Edit</th>
                <th style={{ textAlign: 'center', width: '9%' }}>Delete</th>
                <th style={{ textAlign: 'center', width: '9%' }}>Print</th>
                <th style={{ textAlign: 'center', width: '9%' }}>Export</th>
                <th style={{ textAlign: 'center', width: '8%' }}>Sign / Appr</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--royal-900)' }}>
                    {p.module}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={p.view}
                      onChange={() => togglePermission(idx, 'view')}
                      style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: 'var(--royal-600)' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={p.add}
                      onChange={() => togglePermission(idx, 'add')}
                      style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: 'var(--royal-600)' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={p.edit}
                      onChange={() => togglePermission(idx, 'edit')}
                      style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: 'var(--royal-600)' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={p.delete}
                      onChange={() => togglePermission(idx, 'delete')}
                      style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: 'var(--rose-600)' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={p.print}
                      onChange={() => togglePermission(idx, 'print')}
                      style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: 'var(--royal-600)' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={p.export}
                      onChange={() => togglePermission(idx, 'export')}
                      style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: 'var(--royal-600)' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={p.approve}
                      onChange={() => togglePermission(idx, 'approve')}
                      style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: 'var(--emerald-600)' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Strict RBAC enforced in accordance with ABDM Sandbox v3.2 & ISO 27001 data protection standards.
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleResetDefaults} className="btn btn-outline btn-sm">Reset to Defaults</button>
            <button onClick={handleSaveMatrix} className="btn btn-primary btn-sm">Save Role Matrix Changes</button>
          </div>
        </div>
      </div>

      {/* SECTION 3: Cryptographic DSC Token Key Store & Break-Glass Audit Trail */}
      <div id="dsc-audit-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Left: DSC Hardware Tokens */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--royal-950)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HardDrive size={16} color="var(--royal-600)" />
                Class 3 Cryptographic DSC Token Status
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                FIPS 140-2 Level 3 hardware cryptotokens for clinical sign-offs
              </p>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
              Service Online
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'var(--surface-bg)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--royal-950)' }}>Dr. Arvind Swaminathan (Super Admin)</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Token: ePass2003 · Cert: eMudhra Class 3 · Exp: 12/2027</div>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>Active</span>
            </div>

            <div style={{ background: 'var(--surface-bg)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--royal-950)' }}>Dr. Shalini Mukhopadhyay (Cardiology)</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Token: mToken CryptoID · Cert: Capricorn Class 3 · Exp: 10/2027</div>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>Active</span>
            </div>

            <div style={{ background: 'var(--surface-bg)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--royal-950)' }}>Sister Mary Kutty (Nursing Supervisor)</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Token: Watchdata PRO · Cert: eMudhra Class 2 · Exp: 05/2026</div>
              </div>
              <span className="badge badge-warning" style={{ fontSize: '0.68rem' }}>Renewal Due</span>
            </div>
          </div>
        </div>

        {/* Right: Break-Glass Audit Trail */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--royal-950)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} color="var(--rose-600)" />
                Active Break-Glass Emergency Audit Log
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Emergency overrides bypassing standard RBAC privileges
              </p>
            </div>
            <span className="badge badge-danger" style={{ fontSize: '0.68rem' }}>
              1 Active Override
            </span>
          </div>

          <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#9f1239' }}>
                  Emergency Polytrauma Resuscitation · UHID-2026-00481
                </div>
                <div style={{ fontSize: '0.74rem', color: '#be123c', marginTop: '2px' }}>
                  Invoked by: <strong>Dr. Arvind Swaminathan</strong> · Time remaining: <strong>1h 14m</strong>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Justification: Mass casualty trauma code blue admission override without immediate ABDM OTP consent.
                </div>
              </div>
              <button className="btn btn-outline btn-sm" style={{ fontSize: '0.7rem', padding: '3px 8px', borderColor: '#f43f5e', color: '#e11d48' }}>
                Revoke Override
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>All break-glass overrides are immutable and cryptographically logged.</span>
            <span style={{ color: 'var(--royal-700)', fontWeight: 600, cursor: 'pointer' }}>View All Audit Logs &rarr;</span>
          </div>
        </div>
      </div>

      {/* Modal: Create New Staff User */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{ width: '520px', maxWidth: '90vw', boxShadow: 'var(--shadow-xl)', padding: '24px' }}>
            <div className="card-header" style={{ marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                  Create New Staff User
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Add a practitioner or administrative staff account with RBAC privileges
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="form-label">Full Name & Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Kulkarni"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh.k@medpulse.in"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label className="form-label">System Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                    className="form-select"
                    style={{ width: '100%' }}
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Billing Executive">Billing Executive</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Lab Technician">Lab Technician</option>
                    <option value="Radiologist">Radiologist</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="MRD Officer">MRD Officer</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neurology / ICU"
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value)}
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label className="form-label">ABDM HPR ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 91-DOC-5512-BLR"
                    value={newUserHpr}
                    onChange={(e) => setNewUserHpr(e.target.value)}
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
