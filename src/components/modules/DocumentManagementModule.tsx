import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Search,
  Lock,
  Share2,
  Clock,
  Eye,
  Download,
  CheckCircle2,
  Scan
} from 'lucide-react';

export const DocumentManagementModule: React.FC = () => {
  const documents = [
    { name: 'Patient Aadhaar & Insurance Card KYC.pdf', category: 'Identification & KYC', date: '2026-10-20', size: '1.4 MB', ocrStatus: 'OCR Text Extracted', uploadedBy: 'Ananya Roy (Reception)' },
    { name: 'External Angiography Report (Apollo 2024).pdf', category: 'External Historical Scans', date: '2026-10-23', size: '4.8 MB', ocrStatus: 'OCR Indexed', uploadedBy: 'Dr. Shalini M.' },
    { name: 'Signed Informed Consent Form (PCI LAD).pdf', category: 'Legal Clinical Consents', date: '2026-10-24', size: '820 KB', ocrStatus: 'Signed & Archived', uploadedBy: 'Sister Mary Joseph' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <FileText size={24} color="var(--royal-700)" />
            Point 43: Patient Document Management System (DMS & OCR)
          </h2>
          <p className="card-subtitle">
            Upload & categorize clinical documents per patient visit, Optical Character Recognition (OCR) text indexing, Time-limited encrypted sharing links, and RBAC security
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <Upload size={14} /> Upload New Patient Document
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
            Patient Documents Repository: Rajesh Kumar Verma (UHID-2026-00481)
          </h3>
          <span className="badge badge-royal">Stored on MinIO S3 Object Storage</span>
        </div>

        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Category</th>
                <th>Date Uploaded</th>
                <th>Size</th>
                <th>OCR Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d, i) => (
                <tr key={i}>
                  <td><strong>{d.name}</strong></td>
                  <td><span className="badge badge-royal" style={{ fontSize: '0.7rem' }}>{d.category}</span></td>
                  <td style={{ fontSize: '0.8rem' }}>{d.date}</td>
                  <td style={{ fontSize: '0.8rem' }}>{d.size}</td>
                  <td>
                    <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                      <CheckCircle2 size={11} /> {d.ocrStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn btn-outline btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
                        <Eye size={12} /> View
                      </button>
                      <button className="btn btn-outline btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
                        <Share2 size={12} /> Share Link
                      </button>
                    </div>
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
