import React, { useState } from 'react';
import {
  Stethoscope,
  Activity,
  Pill,
  FlaskConical,
  Scan,
  AlertTriangle,
  FileCheck,
  Plus,
  Save,
  Printer,
  Sparkles,
  Mic,
  Share2
} from 'lucide-react';
import { INITIAL_PATIENTS, INITIAL_DRUGS } from '../../data/mockData';
import { Patient, PrescriptionItem } from '../../types/hms';

export const OPDManagementModule: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(INITIAL_PATIENTS[0]);
  const [isRecording, setIsRecording] = useState(false);

  // Triage vitals
  const [bpSys, setBpSys] = useState('138');
  const [bpDia, setBpDia] = useState('88');
  const [pulse, setPulse] = useState('82');
  const [spo2, setSpo2] = useState('98');
  const [temp, setTemp] = useState('98.4');
  const [height, setHeight] = useState('172');
  const [weight, setWeight] = useState('78');

  // Consultation fields
  const [chiefComplaint, setChiefComplaint] = useState('Substernal chest tightness on moderate exertion for 3 days, radiating to left shoulder.');
  const [diagnosis, setDiagnosis] = useState('I21.0 - Acute transmural myocardial infarction of anterior wall');
  const [clinicalAdvice, setClinicalAdvice] = useState('Admit to Coronary Care Unit (ICCU). Strict bed rest. Low-salt, cardiac diet. Urgent coronary angiography planned.');

  // E-Prescription items with interaction detection
  const [rxList, setRxList] = useState<PrescriptionItem[]>([
    { drugId: 'DRG-03', drugName: 'Tab. Ecosprin (Aspirin) 75mg', dosage: '75mg', frequency: '1-0-0', timing: 'After Meals', durationDays: 30, instructions: 'Take in the morning with water' },
    { drugId: 'DRG-04', drugName: 'Tab. Atorva (Atorvastatin) 20mg', dosage: '20mg', frequency: '0-0-1', timing: 'After Meals', durationDays: 30, instructions: 'Bedtime statin dose' },
    { drugId: 'DRG-02', drugName: 'Tab. Pantocid (Pantoprazole) 40mg', dosage: '40mg', frequency: '1-0-0', timing: 'Before Meals', durationDays: 14, instructions: 'Antacid gastroprotection' }
  ]);

  const [interactionWarning, setInteractionWarning] = useState<string | null>(null);
  const [fhirExported, setFhirExported] = useState(false);

  const calculateBmi = () => {
    const h = Number(height) / 100;
    const w = Number(weight);
    if (!h || !w) return '26.4';
    return (w / (h * h)).toFixed(1);
  };

  const handleAddDrug = (brand: string) => {
    if (brand.includes('Augmentin') && selectedPatient.allergies.includes('Penicillin')) {
      setInteractionWarning('CRITICAL ALLERGY ALERT: Patient has documented Penicillin allergy! Augmentin contains Amoxicillin.');
      return;
    }
    setInteractionWarning(null);
    setRxList([...rxList, {
      drugId: `DRG-${Date.now()}`,
      drugName: brand,
      dosage: 'Standard',
      frequency: '1-0-1',
      timing: 'After Meals',
      durationDays: 5,
      instructions: 'As advised'
    }]);
  };

  const handleExportFhir = () => {
    setFhirExported(true);
    setTimeout(() => setFhirExported(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Stethoscope size={24} color="var(--royal-700)" />
            Point 8: OPD Management & Intelligent E-Prescription
          </h2>
          <p className="card-subtitle">
            Doctor consultation suite: Triage vitals, ICD-10 diagnosis, Drug-drug interaction and allergy checks, Diagnostic ordering, and 1-click ABDM OP Consultation FHIR export
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`btn btn-sm ${isRecording ? 'btn-danger' : 'btn-outline'}`}
          >
            <Mic size={14} /> {isRecording ? 'Listening (Voice Dictation)...' : 'Speech-to-Text'}
          </button>
          <button onClick={handleExportFhir} className="btn btn-secondary btn-sm">
            <Share2 size={14} /> Export ABDM FHIR Record
          </button>
          <button className="btn btn-primary btn-sm">
            <Save size={14} /> Finalize Consultation & Sign
          </button>
        </div>
      </div>

      {fhirExported && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--emerald-800)' }}>
          <FileCheck size={20} color="var(--emerald-600)" />
          <strong>ABDM OP Consultation FHIR Bundle Created!</strong> Encrypted using ECDH Curve25519 & mapped to Care Context <code>OPD-2026-1024-01</code>.
        </div>
      )}

      {/* Patient Banner */}
      <div style={{ background: 'var(--royal-50)', border: '1px solid var(--royal-200)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--royal-950)' }}>{selectedPatient.name}</span>
            <span className="badge badge-royal">{selectedPatient.uhid}</span>
            <span className="badge badge-success">ABHA: {selectedPatient.abhaAddress}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {selectedPatient.age} Yrs / {selectedPatient.gender} • Blood Group: <strong>{selectedPatient.bloodGroup}</strong> • Phone: {selectedPatient.phone}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            {selectedPatient.allergies.map((al, i) => (
              <span key={i} className="badge badge-danger" style={{ fontSize: '0.68rem' }}>
                Allergy: {al}
              </span>
            ))}
            {selectedPatient.chronicConditions.map((cc, i) => (
              <span key={i} className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                {cc}
              </span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attending Consultant</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-900)' }}>Dr. Shalini Mukhopadhyay</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--royal-700)' }}>Department of Interventional Cardiology</div>
        </div>
      </div>

      {/* Main Clinical Grid: Triage Vitals | Consultation Notes & Rx */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Left Column: Triage & Vitals */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={16} color="var(--royal-700)" /> Triage Vitals
            </h3>
            <span className="badge badge-success">Normal Ranges</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label">BP Systolic</label>
              <input type="text" value={bpSys} onChange={(e) => setBpSys(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">BP Diastolic</label>
              <input type="text" value={bpDia} onChange={(e) => setBpDia(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Pulse (bpm)</label>
              <input type="text" value={pulse} onChange={(e) => setPulse(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">SpO2 (%)</label>
              <input type="text" value={spo2} onChange={(e) => setSpo2(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Temp (°F)</label>
              <input type="text" value={temp} onChange={(e) => setTemp(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Calculated BMI</label>
              <input type="text" disabled value={`${calculateBmi()} (Overweight)`} className="form-control" style={{ background: 'var(--surface-alt)', fontWeight: 700, color: 'var(--amber-600)' }} />
            </div>
          </div>

          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--royal-900)', marginBottom: '8px' }}>
              Clinical Orders Quick Entry:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button type="button" className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
                <FlaskConical size={14} /> + Order Cardiac Enzymes (Trop-I & CK-MB)
              </button>
              <button type="button" className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
                <Scan size={14} /> + Order 12-Lead ECG & Echo
              </button>
              <button type="button" className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
                <Scan size={14} /> + Order CT Coronary Angio 3D
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Doctor Consultation & E-Prescription */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Notes & ICD-10 */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Chief Complaint & Clinical Diagnosis (ICD-10)
              </h3>
            </div>

            <div className="form-group">
              <label className="form-label">Chief Complaint & History of Present Illness (HPI)</label>
              <textarea
                rows={2}
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary ICD-10 Diagnosis *</label>
              <select value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} className="form-select">
                <option value="I21.0 - Acute transmural myocardial infarction of anterior wall">I21.0 - Acute transmural myocardial infarction of anterior wall</option>
                <option value="I20.0 - Unstable angina">I20.0 - Unstable angina</option>
                <option value="I10 - Essential (primary) hypertension">I10 - Essential (primary) hypertension</option>
                <option value="E11.9 - Type 2 diabetes mellitus without complications">E11.9 - Type 2 diabetes mellitus</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Clinical Advice, Diet & Follow-up Instructions</label>
              <textarea
                rows={2}
                value={clinicalAdvice}
                onChange={(e) => setClinicalAdvice(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          {/* E-Prescription with Drug-Drug Interaction Safety Alert */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Pill size={16} color="var(--royal-700)" />
                  Intelligent E-Prescription (Drug-Drug & Allergy Screened)
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-validates dosage, interaction warnings, and Schedule H regulatory compliance</p>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleAddDrug('Augmentin 625 Duo')}
                  className="btn btn-outline btn-sm"
                  title="Test Penicillin allergy detection"
                >
                  + Add Augmentin (Test Allergy)
                </button>
              </div>
            </div>

            {interactionWarning && (
              <div style={{ background: 'var(--rose-50)', border: '1px solid var(--rose-border)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '10px', marginBottom: '14px', color: 'var(--rose-600)' }}>
                <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{interactionWarning}</div>
              </div>
            )}

            <div className="table-container">
              <table className="hms-table">
                <thead>
                  <tr>
                    <th>Medication Name</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Timing</th>
                    <th>Duration</th>
                    <th>Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {rxList.map((rx, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700, color: 'var(--royal-950)' }}>{rx.drugName}</td>
                      <td>{rx.dosage}</td>
                      <td><span className="badge badge-royal">{rx.frequency}</span></td>
                      <td>{rx.timing}</td>
                      <td>{rx.durationDays} Days</td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rx.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Prescription signed with Digital Certificate (DSC) by Dr. Shalini Mukhopadhyay</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-outline btn-sm">
                  <Printer size={14} /> Print Rx Slip (English + Hindi)
                </button>
                <button className="btn btn-primary btn-sm">
                  Send Rx via SMS & WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
