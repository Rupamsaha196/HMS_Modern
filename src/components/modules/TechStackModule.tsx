import React from 'react';
import {
  Layers,
  Server,
  Database,
  Cpu,
  Lock,
  Globe,
  HardDrive,
  FileText,
  Activity,
  CheckCircle2,
  Workflow
} from 'lucide-react';

export const TechStackModule: React.FC = () => {
  const stack = [
    { component: 'Backend framework', technology: 'Spring Boot 3.x (modular monolith, microservices-ready)', icon: <Server size={18} /> },
    { component: 'Backend language', technology: 'Java 17 / 21', icon: <Cpu size={18} /> },
    { component: 'Frontend', technology: 'React with TypeScript, Vite, React Query / Redux Toolkit, Royal Blue Design System, PWA', icon: <Globe size={18} /> },
    { component: 'Primary database', technology: 'PostgreSQL with connection pooling (HikariCP)', icon: <Database size={18} /> },
    { component: 'Cache / session', technology: 'Redis Cluster for high-throughput session caching', icon: <Cpu size={18} /> },
    { component: 'Search Engine', technology: 'Elasticsearch / OpenSearch for fast patient MPI and drug formulary lookup', icon: <Workflow size={18} /> },
    { component: 'Messaging & Event Bus', technology: 'Apache Kafka / RabbitMQ event-driven asynchronous microservices', icon: <Activity size={18} /> },
    { component: 'Authentication & Security', technology: 'Keycloak / Spring Security 6 with JWT, Granular RBAC, MFA', icon: <Lock size={18} /> },
    { component: 'FHIR & ABDM Adapters', technology: 'HAPI FHIR R4, ABDM Gateway Adapter service, ECDH Curve25519 crypto utilities', icon: <ShieldCheckIcon /> },
    { component: 'File / DICOM storage', technology: 'MinIO / Amazon S3 Object Storage, Orthanc / dcm4chee PACS', icon: <HardDrive size={18} /> },
    { component: 'Reporting & Analytics', technology: 'JasperReports, Apache POI, Metabase / Apache Superset BI', icon: <FileText size={18} /> },
    { component: 'DevOps & Observability', technology: 'Docker, Kubernetes (K8s), CI/CD, Prometheus, Grafana, ELK / Loki', icon: <Layers size={18} /> },
    { component: 'Browser Compatibility', technology: 'Chrome, Microsoft Edge, Firefox, Safari, Opera (Desktop, Tablet, Mobile)', icon: <Globe size={18} /> }
  ];

  function ShieldCheckIcon() {
    return <CheckCircle2 size={18} color="var(--emerald-600)" />;
  }

  return (
    <div className="animate-fade-in">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Layers size={24} color="var(--royal-700)" />
            Point 48: Technology Stack & Enterprise Architecture
          </h2>
          <p className="card-subtitle">
            Complete technical specification matching Point 48 of the official architectural blueprint
          </p>
        </div>
        <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          Production Grade Architecture
        </span>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="hms-table">
            <thead>
              <tr>
                <th style={{ width: '260px' }}>Architecture Component</th>
                <th>Prescribed Enterprise Technology Stack</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stack.map((s, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 800, color: 'var(--royal-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--royal-600)' }}>{s.icon}</span>
                    {s.component}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.technology}</td>
                  <td><span className="badge badge-success">✓ Implemented</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
