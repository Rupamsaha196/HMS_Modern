import React, { useState } from 'react';
import {
  UploadCloud,
  FileCode,
  Lock,
  CheckCircle2,
  Share2,
  RefreshCw,
  KeyRound,
  ShieldCheck,
  Send,
  Code
} from 'lucide-react';

export const ABDMHIPModule: React.FC = () => {
  const [selectedRecordType, setSelectedRecordType] = useState('Discharge Summary');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [dataPushed, setDataPushed] = useState(false);

  const sampleFhir = `{
  "resourceType": "Bundle",
  "id": "medpulse-discharge-bundle-001",
  "meta": {
    "profile": ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"]
  },
  "type": "document",
  "timestamp": "2026-10-24T16:30:00+05:30",
  "entry": [
    {
      "resource": {
        "resourceType": "Composition",
        "status": "final",
        "type": {
          "coding": [{
            "system": "http://snomed.info/sct",
            "code": "373942005",
            "display": "Discharge summary"
          }]
        },
        "subject": { "reference": "Patient/UHID-2026-00481", "display": "Rajesh Kumar Verma" },
        "author": [{ "reference": "Practitioner/91-DOC-4821-BLR", "display": "Dr. Shalini Mukhopadhyay" }]
      }
    }
  ]
}`;

  const handlePushData = () => {
    setDataPushed(true);
    setTimeout(() => setDataPushed(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <UploadCloud size={24} color="var(--royal-700)" />
            Point 31: ABDM Health Information Provider (HIP - Milestone 2 Certified)
          </h2>
          <p className="card-subtitle">
            Automated FHIR R4 Bundle generation for all 8 standard record types, NRCeS validation, ECDH Curve25519 Encryption key exchange & Push to HIU data endpoints
          </p>
        </div>

        <button onClick={handlePushData} className="btn btn-primary btn-sm">
          <Send size={14} /> Push Encrypted Bundle to HIU
        </button>
      </div>

      {dataPushed && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          Encrypted FHIR payload successfully pushed to HIU Data Receiver URL! Transaction ID: <code>x-tx-891024-99</code>.
        </div>
      )}

      {/* 8 Standard ABDM Health Record Types */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {['OP Consultation', 'Prescription', 'Discharge Summary', 'Diagnostic Report', 'Immunisation', 'Health Document', 'Wellness Record', 'Invoice Record'].map(type => (
          <button
            key={type}
            onClick={() => setSelectedRecordType(type)}
            className={`btn btn-sm ${selectedRecordType === type ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.78rem', justifyContent: 'flex-start' }}
          >
            <FileCode size={13} /> {type}
          </button>
        ))}
      </div>

      {/* Main Grid: Cryptographic Key Exchange & Live FHIR JSON Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px' }}>
        {/* Encryption Details */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              ECDH Curve25519 Cryptographic Envelope
            </h3>
            <span className="badge badge-success">ABDM Spec v0.5</span>
          </div>

          <div style={{ fontSize: '0.825rem', lineHeight: 1.8 }}>
            <div><strong>Key Exchange Algorithm:</strong> ECDH (Elliptic-Curve Diffie-Hellman)</div>
            <div><strong>Curve:</strong> Curve25519 (256-bit)</div>
            <div><strong>Encryption:</strong> AES-GCM (Galois/Counter Mode) with 128-bit authentication tag</div>
            <div style={{ marginTop: '10px', padding: '10px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', fontSize: '0.75rem', wordBreak: 'break-all' }}>
              <strong>Sender Nonce:</strong> 4f89a2b1c0e3d5f7...<br />
              <strong>HIP Key ID:</strong> medpulse-hip-key-2026-oct
            </div>
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" id="encrypt-toggle" checked={isEncrypted} onChange={(e) => setIsEncrypted(e.target.checked)} />
              <label htmlFor="encrypt-toggle" style={{ fontWeight: 600 }}>Enable End-to-End Encryption before data push</label>
            </div>
          </div>
        </div>

        {/* FHIR JSON Inspector */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code size={18} color="var(--royal-700)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                FHIR R4 Bundle Viewer ({selectedRecordType})
              </h3>
            </div>
            <span className="badge badge-royal">NRCeS Validated</span>
          </div>

          <pre style={{
            background: '#090d16',
            color: '#38bdf8',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.78rem',
            overflowX: 'auto',
            maxHeight: '320px',
            lineHeight: 1.5
          }}>
            {sampleFhir}
          </pre>
        </div>
      </div>
    </div>
  );
};
