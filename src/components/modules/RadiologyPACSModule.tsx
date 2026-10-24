import React, { useState } from 'react';
import {
  Scan,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sliders,
  Ruler,
  Mic,
  Share2,
  Printer,
  FileCheck,
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import { INITIAL_RADIOLOGY_ORDERS } from '../../data/mockData';
import { RadiologyOrder } from '../../types/hms';

export const RadiologyPACSModule: React.FC = () => {
  const [orders, setOrders] = useState<RadiologyOrder[]>(INITIAL_RADIOLOGY_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<RadiologyOrder>(INITIAL_RADIOLOGY_ORDERS[0]);
  const [windowLevel, setWindowLevel] = useState(50); // Simulated WW/WL
  const [zoomLevel, setZoomLevel] = useState(100);
  const [invert, setInvert] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [radiologistFindings, setRadiologistFindings] = useState(
    'Calcified plaque in proximal LAD producing 65% luminal stenosis. Right coronary artery patent without significant lesion. Normal left ventricular ejection fraction (~58%).'
  );

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Scan size={24} color="var(--royal-700)" />
            Point 19: Radiology Information System (RIS) & PACS Web Viewer
          </h2>
          <p className="card-subtitle">
            DICOM Modality Worklist (CT, MRI, X-Ray), Cloud PACS Viewer (Orthanc/OHIF), Window Leveling, Voice Dictation Reporting, and ABDM Diagnostic Report bundle
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm">
            <Share2 size={14} /> Share Study via ABDM
          </button>
        </div>
      </div>

      {/* Main PACS Layout: Worklist on Left | Interactive DICOM Viewer & Reporting on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '20px' }}>
        {/* Modality Worklist */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              DICOM Modality Worklist
            </h3>
            <span className="badge badge-royal">{orders.length} Studies</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {orders.map(o => (
              <div
                key={o.id}
                onClick={() => { setSelectedOrder(o); setRadiologistFindings(o.findings || ''); }}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedOrder.id === o.id ? '2px solid var(--royal-600)' : '1px solid var(--border-light)',
                  background: selectedOrder.id === o.id ? 'var(--royal-50)' : 'var(--surface-bg)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-royal" style={{ fontSize: '0.7rem' }}>{o.modality}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--emerald-600)', fontWeight: 600 }}>{o.status}</span>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--royal-950)', fontSize: '0.85rem', marginTop: '6px' }}>
                  {o.procedureName}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Indication: {o.clinicalIndication}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PACS Interactive DICOM Canvas & Radiologist Desk */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* DICOM Web Viewer Canvas */}
          <div style={{
            background: '#090d16',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'var(--shadow-royal-lg)'
          }}>
            {/* Viewer Toolbar */}
            <div style={{
              background: '#111827',
              padding: '10px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'white',
              fontSize: '0.8rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 800, color: '#60a5fa' }}>{selectedOrder.modality} VIEWER</span>
                <span style={{ opacity: 0.6 }}>|</span>
                <span style={{ opacity: 0.85 }}>{selectedOrder.procedureName}</span>
              </div>

              {/* Toolbar Action Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => setZoomLevel(prev => Math.min(prev + 20, 200))} className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '4px 8px' }} title="Zoom In">
                  <ZoomIn size={14} />
                </button>
                <button onClick={() => setZoomLevel(prev => Math.max(prev - 20, 60))} className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '4px 8px' }} title="Zoom Out">
                  <ZoomOut size={14} />
                </button>
                <button onClick={() => setInvert(!invert)} className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '4px 8px' }} title="Invert Grayscale">
                  <RotateCw size={14} /> Invert
                </button>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Zoom: {zoomLevel}%</span>
              </div>
            </div>

            {/* Simulated Medical Image Display */}
            <div style={{
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: 'radial-gradient(circle, #1e293b 0%, #090d16 80%)'
            }}>
              <div style={{
                width: `${240 * (zoomLevel / 100)}px`,
                height: `${240 * (zoomLevel / 100)}px`,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: invert ? '#e2e8f0' : '#1e293b',
                color: invert ? '#0f172a' : '#ffffff',
                transition: 'all 0.2s ease',
                boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
                position: 'relative',
                padding: '16px'
              }}>
                <Scan size={72} color={invert ? '#1e3a8a' : '#60a5fa'} style={{ opacity: 0.85 }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '8px' }}>
                  {selectedOrder.modality === 'CT Scan' ? '3D Coronary Angiogram Slice 42/128' : 'Chest PA Digital Radiograph'}
                </div>
                <div style={{ fontSize: '0.68rem', opacity: 0.7 }}>
                  WW: 400 | WL: 40 • Matrix: 512x512 • 16-bit
                </div>

                {/* Caliper Measurement Marker Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: '#4ade80',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.68rem',
                  fontFamily: 'monospace'
                }}>
                  LAD Stenosis: 65.2% (Caliper: 3.2 mm)
                </div>
              </div>

              {/* Patient Corner Overlay Info */}
              <div style={{ position: 'absolute', top: '12px', left: '16px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.72rem', fontFamily: 'monospace' }}>
                Rajesh Kumar Verma (52y/M)<br />
                UHID: UHID-2026-00481<br />
                Date: 24-OCT-2026 11:20:14
              </div>

              <div style={{ position: 'absolute', bottom: '12px', right: '16px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.72rem', fontFamily: 'monospace', textAlign: 'right' }}>
                Orthanc PACS Server 1.12<br />
                Lossless Transfer Syntax<br />
                UID: {selectedOrder.dicomStudyUid}
              </div>
            </div>
          </div>

          {/* Radiologist Structured Reporting Desk */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                  Radiologist Structured Impression & Voice Dictation
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Reporting Consultant: <strong>Dr. Rajesh Bhargava, MD (Radiology)</strong>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`btn btn-sm ${isRecording ? 'btn-danger' : 'btn-outline'}`}
                >
                  <Mic size={14} /> {isRecording ? 'Dictating...' : 'Voice Dictate'}
                </button>
                <button className="btn btn-primary btn-sm">
                  Sign & Disagree/Approve Report
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Radiological Findings & Conclusion</label>
              <textarea
                rows={3}
                value={radiologistFindings}
                onChange={(e) => setRadiologistFindings(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
