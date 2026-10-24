import React, { useState } from 'react';
import { CalendarCheck, Clock, Users, Tv, Plus, CheckCircle, Bell, ArrowRight, Video, Phone, Globe, MessageSquare } from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '../../data/mockData';
import { Appointment } from '../../types/hms';

export const AppointmentQueueModule: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [isTvMode, setIsTvMode] = useState(false);
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const handleNextPatient = (id: string) => {
    setAppointments(appointments.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === 'Waiting' ? 'In Consultation' : 'Completed' };
      }
      return a;
    }));
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <CalendarCheck size={24} color="var(--royal-700)" />
            Point 7: Appointment, Token & OPD Queue Management
          </h2>
          <p className="card-subtitle">
            Doctor slot grids, multi-channel booking (Walk-in, Online, Phone, ABDM PHR App), Token display boards, and WhatsApp queue alerts
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsTvMode(!isTvMode)}
            className={`btn btn-sm ${isTvMode ? 'btn-primary' : 'btn-outline'}`}
          >
            <Tv size={15} /> {isTvMode ? 'Exit TV Waiting Display' : 'Launch TV Waiting Board'}
          </button>
          <button className="btn btn-primary btn-sm">
            <Plus size={15} /> Book New Appointment
          </button>
        </div>
      </div>

      {/* TV Display Board Mode */}
      {isTvMode ? (
        <div style={{
          background: 'linear-gradient(135deg, #0a1945 0%, #0f2a7a 50%, #1e3a8a 100%)',
          color: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          boxShadow: 'var(--shadow-royal-lg)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '16px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>MedPulse OPD Live Token Calling Display</h2>
              <p style={{ opacity: 0.85, fontSize: '0.9rem' }}>Please proceed to the designated consultation room when your token is called</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>10:45 AM</div>
              <div style={{ fontSize: '0.8rem', color: '#6ee7b7' }}>Chime & Display Active</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {appointments.map(a => (
              <div
                key={a.id}
                style={{
                  background: a.status === 'In Consultation' ? 'rgba(37, 99, 235, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                  border: a.status === 'In Consultation' ? '2px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  {a.department} • Room 102
                </div>
                <div style={{ fontSize: '3.2rem', fontWeight: 900, color: '#ffffff', margin: '8px 0' }}>
                  #{a.tokenNumber}
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>{a.patientName}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '4px' }}>{a.doctorName}</div>
                <div style={{ marginTop: '14px' }}>
                  <span className={`badge ${a.status === 'In Consultation' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Top Quick Stats */}
          <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="stat-card">
              <div className="stat-icon"><Users /></div>
              <div className="stat-info">
                <div className="stat-value">{appointments.length} Total</div>
                <div className="stat-label">Scheduled Slots Today</div>
              </div>
            </div>
            <div className="stat-card stat-emerald">
              <div className="stat-icon" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-600)' }}><CheckCircle /></div>
              <div className="stat-info">
                <div className="stat-value">1 Active</div>
                <div className="stat-label">In Doctor Consultation</div>
              </div>
            </div>
            <div className="stat-card stat-amber">
              <div className="stat-icon" style={{ background: 'var(--amber-50)', color: 'var(--amber-600)' }}><Clock /></div>
              <div className="stat-info">
                <div className="stat-value">2 Waiting</div>
                <div className="stat-label">Triage Completed & Waiting</div>
              </div>
            </div>
            <div className="stat-card stat-purple">
              <div className="stat-icon" style={{ background: 'var(--purple-50)', color: 'var(--purple-600)' }}><Video /></div>
              <div className="stat-info">
                <div className="stat-value">1 Teleconsult</div>
                <div className="stat-label">Virtual Video Slot</div>
              </div>
            </div>
          </div>

          {/* Appointment Table */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--royal-950)' }}>
                  Today's Live Queue & Doctor Consultation Roster
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Auto-notifications dispatched to patient phones on token advance
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-outline btn-sm">
                  <MessageSquare size={14} /> Send WhatsApp Queue Ping
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="hms-table">
                <thead>
                  <tr>
                    <th>Token #</th>
                    <th>Patient UHID / Name</th>
                    <th>Doctor & Specialty</th>
                    <th>Time Slot</th>
                    <th>Channel Type</th>
                    <th>Triage Vitals</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(a => (
                    <tr key={a.id}>
                      <td>
                        <span style={{
                          display: 'inline-flex',
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'var(--royal-100)',
                          color: 'var(--royal-800)',
                          fontWeight: 800,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {a.tokenNumber}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--royal-900)' }}>{a.patientName}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{a.uhid}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{a.doctorName}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{a.department}</div>
                      </td>
                      <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>{a.timeSlot}</td>
                      <td>
                        <span className={`badge ${a.type === 'Teleconsultation' ? 'badge-purple' : a.type === 'Online' ? 'badge-cyan' : 'badge-royal'}`} style={{ fontSize: '0.7rem' }}>
                          {a.type}
                        </span>
                      </td>
                      <td>
                        {a.vitalsCaptured ? (
                          <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                            ✓ Vitals Captured
                          </span>
                        ) : (
                          <span className="badge badge-warning" style={{ fontSize: '0.68rem' }}>
                            Pending Triage
                          </span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${a.status === 'In Consultation' ? 'badge-royal' : a.status === 'Completed' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.72rem' }}>
                          {a.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleNextPatient(a.id)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          {a.status === 'Waiting' ? 'Call Patient' : a.status === 'In Consultation' ? 'Complete Visit' : 'View Rx'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
