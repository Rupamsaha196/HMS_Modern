import React, { useState } from 'react';
import {
  Cpu,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Plus,
  RefreshCw,
  Wrench,
  FileCheck
} from 'lucide-react';

export const BiomedicalAssetsModule: React.FC = () => {
  const assets = [
    { id: 'BIO-101', name: 'Hamilton C6 Mechanical Ventilator', serial: 'HAM-88192', location: 'Medical ICU (Bed ICU-101)', contract: 'Comprehensive CMC', vendor: 'Hamilton Medical', nextCalibration: '2027-01-15', status: 'Operational & Calibrated' },
    { id: 'BIO-102', name: 'GE Revolution 128-Slice CT Scanner', serial: 'GE-CT-00912', location: 'Radiology Bay 1', contract: 'OEM AMC Warranty', vendor: 'GE Healthcare India', nextCalibration: '2026-12-10', status: 'Operational & Calibrated' },
    { id: 'BIO-103', name: 'Mindray BeneVision N17 Patient Monitors (x12)', serial: 'MN-MON-PACK', location: 'ICU / CCU Complex', contract: 'CMC Active', vendor: 'Mindray Biomedical', nextCalibration: '2026-11-20', status: 'Operational & Calibrated' },
    { id: 'BIO-104', name: 'Zoll R Series Defibrillator & Pacer', serial: 'ZOL-9102', location: 'Emergency Bay 1', contract: 'AMC Active', vendor: 'Zoll Medical', nextCalibration: '2026-11-05', status: 'Preventive Due Soon' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Cpu size={24} color="var(--royal-700)" />
            Point 35: Asset & Biomedical Equipment Management (AMC/CMC)
          </h2>
          <p className="card-subtitle">
            Hospital Biomedical asset register, AMC/CMC contract expiration warnings, Preventive calibration calendar, and Breakdown ticket desk
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Log Breakdown Ticket
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
            Biomedical Equipment Master & Calibration Status
          </h3>
          <span className="badge badge-royal">4 Critical Assets Listed</span>
        </div>

        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Asset Tag & Serial #</th>
                <th>Equipment Name</th>
                <th>Ward Location</th>
                <th>Contract Type</th>
                <th>Next Calibration</th>
                <th>Operating Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(a => (
                <tr key={a.id}>
                  <td>
                    <strong>{a.id}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{a.serial}</div>
                  </td>
                  <td><strong style={{ color: 'var(--royal-950)' }}>{a.name}</strong></td>
                  <td>{a.location}</td>
                  <td><span className="badge badge-royal">{a.contract}</span></td>
                  <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>{a.nextCalibration}</td>
                  <td>
                    <span className={`badge ${a.status.includes('Due') ? 'badge-warning' : 'badge-success'}`}>
                      {a.status}
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
