import React, { useState } from 'react';
import { UserPlus, QrCode, Search, AlertCircle, Camera, CheckCircle2, ShieldCheck, Printer, Users, UserX, FileCheck } from 'lucide-react';
import { INITIAL_PATIENTS } from '../../data/mockData';
import { Patient } from '../../types/hms';

export const PatientRegistrationModule: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [regMode, setRegMode] = useState<'standard' | 'quick' | 'newborn' | 'mlc'>('standard');
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [showIdCard, setShowIdCard] = useState<Patient | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [address, setAddress] = useState('');
  const [abhaNumber, setAbhaNumber] = useState('');
  const [consentDpdp, setConsentDpdp] = useState(true);

  const checkDuplicate = (ph: string) => {
    setPhone(ph);
    if (ph.length === 10 || ph.length === 13) {
      const match = patients.find(p => p.phone.includes(ph));
      setShowDuplicateAlert(!!match);
    } else {
      setShowDuplicateAlert(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUhid = `UHID-2026-${String(patients.length + 481).padStart(5, '0')}`;
    const newPatient: Patient = {
      uhid: newUhid,
      name,
      age: Number(age) || 30,
      gender,
      dob: '1995-01-01',
      phone,
      bloodGroup,
      address: address || 'Indiranagar, Bengaluru',
      abhaNumber: abhaNumber || undefined,
      abhaAddress: abhaNumber ? `${name.toLowerCase().replace(/\s+/g, '')}@abdm` : undefined,
      abhaLinked: !!abhaNumber,
      kycVerified: true,
      category: regMode === 'mlc' ? 'MLC' : regMode === 'newborn' ? 'Newborn' : 'General',
      isMLC: regMode === 'mlc',
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      registeredBranch: 'MedPulse Apex Main Hospital',
      allergies: [],
      chronicConditions: [],
      emergencyContact: { name: 'Emergency Contact', relationship: 'Relative', phone }
    };

    setPatients([newPatient, ...patients]);
    setShowIdCard(newPatient);
    // Reset
    setName('');
    setAge('');
    setPhone('');
    setAddress('');
    setAbhaNumber('');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <UserPlus size={24} color="var(--royal-700)" />
            Point 5: Patient Registration & Master Patient Index (MPI)
          </h2>
          <p className="card-subtitle">
            Universal Health ID (UHID) generation, Photo/KYC capture, Duplicate detection & merge, MLC intimation, DPDP-compliant consents, and Barcode/QR smart card
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className={`btn btn-sm ${regMode === 'standard' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setRegMode('standard')}>
            Standard Registration
          </button>
          <button className={`btn btn-sm ${regMode === 'quick' ? 'btn-secondary' : 'btn-outline'}`} onClick={() => setRegMode('quick')}>
            Quick Reg
          </button>
          <button className={`btn btn-sm ${regMode === 'newborn' ? 'btn-outline' : 'btn-outline'}`} onClick={() => setRegMode('newborn')}>
            👶 Newborn
          </button>
          <button className={`btn btn-sm ${regMode === 'mlc' ? 'btn-danger' : 'btn-outline'}`} onClick={() => setRegMode('mlc')}>
            ⚖️ MLC / Police Case
          </button>
        </div>
      </div>

      {/* Main Grid: Registration Form & Master Patient Index (MPI) List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Form */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                {regMode === 'mlc' ? 'Emergency / MLC Unknown Patient Intake' : regMode === 'newborn' ? 'Newborn Child Registration (Tag to Mother)' : 'New Patient UHID Registration'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Fields validated with real-time Aadhaar/ABHA & duplicate detection algorithms
              </p>
            </div>
          </div>

          {showDuplicateAlert && (
            <div style={{ background: 'var(--amber-50)', border: '1px solid var(--amber-border)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '10px', marginBottom: '16px', color: 'var(--amber-900)' }}>
              <AlertCircle size={20} color="var(--amber-600)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.8rem' }}>
                <strong>Duplicate Patient Detected!</strong> A record with this phone number already exists in Master Patient Index (Rajesh Kumar Verma - UHID-2026-00481). Click to review & merge.
              </div>
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input
                    type="number"
                    required
                    placeholder="Yrs"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="form-select">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Mobile Number (Primary) *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 9845X XXXXX"
                  value={phone}
                  onChange={(e) => checkDuplicate(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="form-select">
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Residential Address & City</label>
              <input
                type="text"
                placeholder="Door No, Street, Landmark, Pin Code"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
              />
            </div>

            {/* ABHA Linking directly at registration desk */}
            <div style={{ background: 'var(--royal-50)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <QrCode size={18} color="var(--royal-700)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--royal-900)' }}>
                  ABHA Number / Address Link (Milestone 1)
                </span>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>+ ₹20 DHIS</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="e.g. 91-8472-9102-4821 or user@abdm"
                  value={abhaNumber}
                  onChange={(e) => setAbhaNumber(e.target.value)}
                  className="form-control"
                  style={{ background: 'white' }}
                />
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setAbhaNumber('91-9988-7766-5544')}>
                  Verify KYC
                </button>
              </div>
            </div>

            {/* DPDP Act 2023 Consent Check */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px' }}>
              <input
                type="checkbox"
                id="dpdp-consent"
                checked={consentDpdp}
                onChange={(e) => setConsentDpdp(e.target.checked)}
                style={{ marginTop: '3px' }}
              />
              <label htmlFor="dpdp-consent" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <strong>DPDP Act 2023 & Clinical Consent:</strong> Patient agrees to registration of demographics, storage of treatment records, and digital communication via SMS/WhatsApp.
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn btn-outline" onClick={() => { setName(''); setPhone(''); }}>
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                <CheckCircle2 size={16} /> Generate UHID & Print Smart Card
              </button>
            </div>
          </form>
        </div>

        {/* Master Patient Index (MPI) Recent List */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Master Patient Index (MPI)
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Searchable centralized patient registry across all branches
              </p>
            </div>
            <span className="badge badge-royal">{patients.length} Registered</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {patients.map(p => (
              <div
                key={p.uhid}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--surface-bg)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--royal-950)', fontSize: '0.9rem' }}>{p.name}</span>
                    <span className={`badge ${p.isMLC ? 'badge-danger' : 'badge-royal'}`} style={{ fontSize: '0.65rem' }}>
                      {p.uhid}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {p.age} Yrs / {p.gender} • Blood: <strong>{p.bloodGroup}</strong> • {p.phone}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: p.abhaLinked ? 'var(--emerald-600)' : 'var(--text-light)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <QrCode size={12} />
                    {p.abhaLinked ? `ABHA: ${p.abhaAddress || p.abhaNumber}` : 'ABHA Pending Link'}
                  </div>
                </div>

                <button
                  onClick={() => setShowIdCard(p)}
                  className="btn btn-outline btn-sm"
                  style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                >
                  <Printer size={13} /> UHID Card
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Printable UHID Smart Card Preview Modal */}
      {showIdCard && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '460px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--royal-900)' }}>
                Official UHID Health Identity Card
              </h3>
              <button onClick={() => setShowIdCard(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0f2a7a 0%, #1d4ed8 100%)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                color: 'white',
                boxShadow: 'var(--shadow-royal)',
                textAlign: 'left',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '12px', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800 }}>MedPulse Healthcare Group</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.85 }}>NABH & ABDM Accredited Health Facility</div>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>ABDM Enabled</span>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <QrCode size={48} color="#0f2a7a" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{showIdCard.name}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#93c5fd', fontFamily: 'monospace' }}>{showIdCard.uhid}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{showIdCard.age}y / {showIdCard.gender} • Blood Group: {showIdCard.bloodGroup}</div>
                    <div style={{ fontSize: '0.72rem', color: '#6ee7b7' }}>ABHA: {showIdCard.abhaAddress || '91-8472-9102-4821'}</div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.68rem', display: 'flex', justifyContent: 'space-between', opacity: 0.85 }}>
                  <span>Emergency: 108 / +91 80 4000 8000</span>
                  <span>Scan for ABDM PHR Record</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowIdCard(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => window.print()}>
                <Printer size={15} /> Print Physical Smart Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
