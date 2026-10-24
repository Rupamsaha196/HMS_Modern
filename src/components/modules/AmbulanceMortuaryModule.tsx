import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  PhoneCall,
  DollarSign,
  AlertTriangle,
  Archive,
  FileText
} from 'lucide-react';
import { INITIAL_AMBULANCES } from '../../data/mockData';

export const AmbulanceMortuaryModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ambulance' | 'mortuary'>('ambulance');

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Truck size={24} color="var(--royal-700)" />
            Point 36: Ambulance Fleet GPS Dispatch & Mortuary Services
          </h2>
          <p className="card-subtitle">
            ALS/BLS fleet console with live telemetry, Route optimization, Trip charge automated billing, and Mortuary cold chamber chain-of-custody documentation
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'ambulance' ? 'active' : ''}`} onClick={() => setActiveTab('ambulance')}>
          <Truck size={16} /> Ambulance Fleet Dispatch & GPS Tracker
        </button>
        <button className={`tab-btn ${activeTab === 'mortuary' ? 'active' : ''}`} onClick={() => setActiveTab('mortuary')}>
          <Archive size={16} /> Mortuary Cold Chambers & Handover
        </button>
      </div>

      {/* Tab 1: Ambulance */}
      {activeTab === 'ambulance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                Active Ambulance Fleet Roster
              </h3>
              <span className="badge badge-royal">2 Ambulances</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {INITIAL_AMBULANCES.map(a => (
                <div key={a.id} style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--royal-950)' }}>{a.vehicleNumber}</strong>
                    <span className={`badge ${a.status === 'En Route to Hospital' ? 'badge-danger' : 'badge-success'}`}>
                      {a.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--royal-700)', fontWeight: 600, marginTop: '2px' }}>{a.ambulanceType}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Driver: <strong>{a.driverName}</strong> ({a.driverPhone})
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                    GPS: {a.currentLocation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: '#0a1945', color: 'white', textAlign: 'center', padding: '32px 20px' }}>
            <MapPin size={48} color="#60a5fa" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Simulated GPS Satellite Telemetry</h4>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '4px' }}>
              Live coordinate tracking connected via 4G OBD-II GPS dongle. Automated trip billing posts ₹1,800 + ₹25/km directly to patient invoice.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Mortuary */}
      {activeTab === 'mortuary' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--royal-950)' }}>
              Mortuary Cold Chamber Register & Chain of Custody
            </h3>
            <span className="badge badge-royal">6 Chambers (0 Occupied)</span>
          </div>
          <div style={{ background: 'var(--surface-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
            All 6 cold preservation chambers currently vacant. Integrated with Form 4/4A Medical Certificate of Cause of Death (MCCD) and Police NOC for Medico-Legal post-mortem handover.
          </div>
        </div>
      )}
    </div>
  );
};
