import React, { useState } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  Share2,
  FileText,
  ShieldCheck,
  Send,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { INITIAL_PATIENTS } from '../../data/mockData';

export const TelemedicineModule: React.FC = () => {
  const patient = INITIAL_PATIENTS[2]; // Master Aarav Deshpande
  const [inCall, setInCall] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Shalini Mukhopadhyay', text: 'Hello Mr. Deshpande, how is Aarav feeling today? Any wheezing noticed after running?', time: '17:02' },
    { sender: 'Gautam Deshpande (Father)', text: 'Doctor, his cough has reduced significantly with the inhaler. Only mild nocturnal dry cough.', time: '17:03' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages([...chatMessages, {
      sender: 'Dr. Shalini Mukhopadhyay',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputMsg('');
  };

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Video size={24} color="var(--royal-700)" />
            Point 17: Telemedicine & Virtual Consultation Suite
          </h2>
          <p className="card-subtitle">
            WebRTC Encrypted Video Consultations, In-call live chat, Simultaneous E-Prescription drafting, Recording consent, and Telemedicine Practice Guidelines compliance
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Lock size={12} /> End-to-End Encrypted (WebRTC DTLS/SRTP)
          </span>
        </div>
      </div>

      {/* Main Video Call Suite Layout: Video Window + Right Panel (Chat & Live Rx) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        {/* Left: Video Canvas & Controls */}
        <div style={{
          background: '#0a1945',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '480px',
          boxShadow: 'var(--shadow-royal-lg)'
        }}>
          {/* Main Video Frame (Patient) */}
          <div style={{
            flex: 1,
            background: '#111827',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {inCall && videoOn ? (
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--royal-600), var(--royal-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 800, margin: '0 auto 16px', boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)' }}>
                  AD
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>Master Aarav Deshpande (Child with Father)</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '4px' }}>Connected via High-Definition WebRTC • Latency: 18ms</div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)' }}>
                <VideoOff size={48} style={{ margin: '0 auto 8px', display: 'block' }} />
                <span>Video stream paused</span>
              </div>
            )}

            {/* Picture-in-Picture: Doctor Self Tile */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '140px',
              height: '95px',
              background: '#1e3a8a',
              borderRadius: 'var(--radius-md)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '4px' }}>
                Dr
              </div>
              <span>You (Dr. Shalini)</span>
            </div>
          </div>

          {/* Call Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', marginTop: '16px' }}>
            <button
              onClick={() => setMicOn(!micOn)}
              className="btn btn-sm"
              style={{ background: micOn ? 'rgba(255, 255, 255, 0.2)' : 'var(--rose-600)', color: 'white', borderRadius: '50%', width: '42px', height: '42px', padding: 0 }}
              title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {micOn ? <Mic size={18} /> : <MicOff size={18} />}
            </button>

            <button
              onClick={() => setVideoOn(!videoOn)}
              className="btn btn-sm"
              style={{ background: videoOn ? 'rgba(255, 255, 255, 0.2)' : 'var(--rose-600)', color: 'white', borderRadius: '50%', width: '42px', height: '42px', padding: 0 }}
              title={videoOn ? 'Turn Video Off' : 'Turn Video On'}
            >
              {videoOn ? <Video size={18} /> : <VideoOff size={18} />}
            </button>

            <button
              onClick={() => setInCall(!inCall)}
              className="btn btn-sm"
              style={{ background: 'var(--rose-600)', color: 'white', borderRadius: 'var(--radius-full)', padding: '8px 20px', fontWeight: 700 }}
            >
              <PhoneOff size={18} /> {inCall ? 'End Consultation' : 'Reconnect Call'}
            </button>
          </div>
        </div>

        {/* Right: In-Call Chat & Live Tele-Prescription */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Chat Window */}
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="card-header" style={{ marginBottom: '12px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={16} color="var(--royal-700)" /> In-Call Clinical Chat & Notes
              </h3>
              <span className="badge badge-success">Live</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', maxHeight: '200px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', background: 'var(--surface-bg)', borderRadius: 'var(--radius-md)' }}>
              {chatMessages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.sender.includes('Dr.') ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{m.sender} • {m.time}</div>
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: m.sender.includes('Dr.') ? 'var(--royal-600)' : 'white',
                    color: m.sender.includes('Dr.') ? 'white' : 'var(--text-primary)',
                    fontSize: '0.8rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <input
                type="text"
                placeholder="Type clinical advice or note..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="form-control"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* Quick Tele-Prescription & Compliance Check */}
          <div className="card">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--royal-950)', marginBottom: '8px' }}>
              Telemedicine Practice Guidelines Compliance (NMC / BoG)
            </h3>
            <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: 1.5, marginBottom: '12px' }}>
              <li>✓ Patient identity & explicit consent captured</li>
              <li>✓ Registered Medical Practitioner (RMP) verified</li>
              <li>✓ Prescriptions restricted to List O & List A medications</li>
            </ul>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              Issue & Send Signed Digital Tele-Rx via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
