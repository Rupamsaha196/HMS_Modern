import React, { useState } from 'react';
import {
  FlaskConical,
  Barcode,
  Share2,
  Printer,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  QrCode,
  FileCheck
} from 'lucide-react';
import { INITIAL_LAB_ORDERS } from '../../data/mockData';
import { LabTestOrder } from '../../types/hms';

export const LISModule: React.FC = () => {
  const [labOrders, setLabOrders] = useState<LabTestOrder[]>(INITIAL_LAB_ORDERS);
  const [showPrintModal, setShowPrintModal] = useState<LabTestOrder | null>(null);
  const [fhirExported, setFhirExported] = useState(false);

  const handleVerify = (id: string) => {
    setLabOrders(labOrders.map(l => {
      if (l.id === id) {
        return {
          ...l,
          status: 'Pathologist Verified',
          resultValue: l.resultValue || 'Normal Parameter Findings (Clinically Verified)',
          verifiedBy: 'Dr. K. S. Ramanathan, MD (Pathology)'
        };
      }
      return l;
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <FlaskConical size={24} color="var(--royal-700)" />
            Point 18: Laboratory Information System (LIS)
          </h2>
          <p className="card-subtitle">
            Bi-directional analyzer interfacing (ASTM / HL7), Barcode accessioning, Delta checks, Pathologist e-Sign verification, Printable QR PDF reports, and ABDM DiagnosticReport FHIR bundle
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFhirExported(true)}
            className="btn btn-secondary btn-sm"
          >
            <Share2 size={14} /> Export ABDM Diagnostic FHIR
          </button>
          <button className="btn btn-outline btn-sm">
            <RefreshCw size={14} /> Sync ASTM Analyzers (Sysmex / Beckman)
          </button>
        </div>
      </div>

      {fhirExported && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-border)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--emerald-800)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} color="var(--emerald-600)" />
          DiagnosticReport FHIR Bundle with LOINC mapping pushed to ABDM Gateway!
        </div>
      )}

      {/* Critical Delta Check / Panic Value Alert Banner */}
      <div style={{ background: 'var(--rose-50)', border: '1px solid var(--rose-border)', borderRadius: 'var(--radius-md)', padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <AlertTriangle size={24} color="var(--rose-600)" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 800, color: 'var(--rose-700)', fontSize: '0.95rem' }}>
            CRITICAL PANIC VALUE & DELTA CHECK ALERT: Lab Order LAB-902
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '2px' }}>
            Patient: <strong>Rajesh Kumar Verma (UHID-2026-00481)</strong> • Troponin-I: <strong>0.94 ng/mL</strong> (Normal &lt; 0.04). Delta rise of +0.72 ng/mL in 4 hours. Automated SMS alert dispatched to Dr. Shalini M.
          </div>
        </div>
      </div>

      {/* Order Queue & Results Table */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
            Live Diagnostic Orders & Analyzer Result Verification Queue
          </h3>
          <span className="badge badge-royal">{labOrders.length} Tests</span>
        </div>

        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Order ID & Barcode</th>
                <th>Test Name & LOINC</th>
                <th>Specimen</th>
                <th>Result Value</th>
                <th>Reference Range</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {labOrders.map(lo => (
                <tr key={lo.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{lo.id}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{lo.sampleBarcode}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--royal-950)' }}>{lo.testName}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--royal-700)', fontFamily: 'monospace' }}>LOINC: {lo.loincCode}</div>
                  </td>
                  <td><span className="badge badge-royal" style={{ fontSize: '0.7rem' }}>{lo.specimenType}</span></td>
                  <td>
                    {lo.resultValue ? (
                      <span style={{ fontWeight: 700, color: lo.criticalFlag ? 'var(--rose-600)' : 'var(--text-primary)', fontSize: '0.82rem' }}>
                        {lo.resultValue}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Pending Analyzer Run</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lo.referenceRange || 'N/A'}</td>
                  <td>
                    <span className={`badge ${lo.status === 'Pathologist Verified' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.72rem' }}>
                      {lo.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {lo.status !== 'Pathologist Verified' ? (
                        <button
                          onClick={() => handleVerify(lo.id)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                        >
                          Verify & Sign
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowPrintModal(lo)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                        >
                          <Printer size={12} /> Report PDF
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Report Modal Preview */}
      {showPrintModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--royal-950)' }}>
                Official Laboratory Diagnostic Report
              </h3>
              <button onClick={() => setShowPrintModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div className="modal-body" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              <div style={{ borderBottom: '2px solid var(--royal-700)', paddingBottom: '10px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--royal-950)' }}>MedPulse Apex Clinical Diagnostics</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NABL Accredited • ABDM Diagnostic Health Provider</div>
                </div>
                <QrCode size={48} color="var(--royal-800)" />
              </div>

              <div style={{ background: 'var(--surface-bg)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px' }}>
                <strong>Patient:</strong> Rajesh Kumar Verma (UHID-2026-00481) • 52y/M<br />
                <strong>Referring Doctor:</strong> Dr. Shalini Mukhopadhyay • Sample ID: {showPrintModal.sampleBarcode}
              </div>

              <div style={{ padding: '14px', background: 'var(--royal-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--royal-200)', marginBottom: '16px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--royal-950)' }}>{showPrintModal.testName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--royal-700)' }}>LOINC Standard Code: {showPrintModal.loincCode}</div>
                <div style={{ marginTop: '8px', fontSize: '1.1rem', fontWeight: 800, color: showPrintModal.criticalFlag ? 'var(--rose-600)' : 'var(--text-primary)' }}>
                  Result: {showPrintModal.resultValue}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Biological Reference Interval: {showPrintModal.referenceRange}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Verified via Digital Signature Certificate (DSC)<br />
                  Scan QR code above to verify authenticity on ABDM Network
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: 'var(--royal-950)' }}>Dr. K. S. Ramanathan</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>MD (Pathology) • Chief Pathologist</div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowPrintModal(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => window.print()}>
                <Printer size={15} /> Print Verified Diagnostic Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
