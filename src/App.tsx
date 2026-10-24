import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar, ALL_MODULES } from './components/layout/Sidebar';
import { BreakGlassModal } from './components/modals/BreakGlassModal';
import { CommandPaletteModal } from './components/modals/CommandPaletteModal';
import { HOSPITAL_INFO } from './data/mockData';
import { UserRole, BreakGlassLog } from './types/hms';

const ROLE_DEFAULT_MODULE: Record<UserRole, number> = {
  'Super Admin': 2,            // Executive Dashboard
  'Hospital Admin': 2,         // Executive Dashboard
  'Branch Admin': 4,           // Multi-Branch Management
  'Doctor': 8,                 // OPD & E-Prescription
  'Nurse': 13,                 // Nursing Station & e-MAR
  'Receptionist': 5,           // Patient Registration
  'Billing Executive': 24,     // Billing & RCM
  'Pharmacist': 20,            // Pharmacy & Dispensing
  'Lab Technician': 18,        // LIS Laboratory
  'Radiologist': 19,           // Radiology PACS
  'Insurance/TPA Executive': 26, // Insurance & TPA Claims
  'Store Keeper': 21,          // Inventory & Central Stores
  'HR Manager': 34,            // HR & Payroll
  'MRD Officer': 37,           // MRD & ICD-10 Coding
};

// Module Components (Points 1 to 50)
import { UserRoleAccessModule } from './components/modules/UserRoleAccessModule';
import { AdminDashboardModule } from './components/modules/AdminDashboardModule';
import { MasterDataModule } from './components/modules/MasterDataModule';
import { MultiBranchModule } from './components/modules/MultiBranchModule';
import { PatientRegistrationModule } from './components/modules/PatientRegistrationModule';
import { ABHAIntegrationModule } from './components/modules/ABHAIntegrationModule';
import { AppointmentQueueModule } from './components/modules/AppointmentQueueModule';
import { OPDManagementModule } from './components/modules/OPDManagementModule';
import { EMRModule } from './components/modules/EMRModule';
import { IPDAdmissionModule } from './components/modules/IPDAdmissionModule';
import { BedManagementModule } from './components/modules/BedManagementModule';
import { EmergencyCasualtyModule } from './components/modules/EmergencyCasualtyModule';
import { NursingStationModule } from './components/modules/NursingStationModule';
import { OperationTheatreModule } from './components/modules/OperationTheatreModule';
import { ICUCriticalCareModule } from './components/modules/ICUCriticalCareModule';
import { MaternityPaediatricsModule } from './components/modules/MaternityPaediatricsModule';
import { TelemedicineModule } from './components/modules/TelemedicineModule';
import { LISModule } from './components/modules/LISModule';
import { RadiologyPACSModule } from './components/modules/RadiologyPACSModule';
import { PharmacyModule } from './components/modules/PharmacyModule';
import { InventoryStoreModule } from './components/modules/InventoryStoreModule';
import { BloodBankModule } from './components/modules/BloodBankModule';
import { CSSDHousekeepingModule } from './components/modules/CSSDHousekeepingModule';
import { BillingRCMModule } from './components/modules/BillingRCMModule';
import { PaymentGatewayModule } from './components/modules/PaymentGatewayModule';
import { InsuranceTPAModule } from './components/modules/InsuranceTPAModule';
import { AccountsFinanceModule } from './components/modules/AccountsFinanceModule';
import { ABDMRegistryModule } from './components/modules/ABDMRegistryModule';
import { ABDMCareContextModule } from './components/modules/ABDMCareContextModule';
import { ABDMConsentModule } from './components/modules/ABDMConsentModule';
import { ABDMHIPModule } from './components/modules/ABDMHIPModule';
import { ABDMHIUModule } from './components/modules/ABDMHIUModule';
import { ABDMComplianceModule } from './components/modules/ABDMComplianceModule';
import { HRPayrollModule } from './components/modules/HRPayrollModule';
import { BiomedicalAssetsModule } from './components/modules/BiomedicalAssetsModule';
import { AmbulanceMortuaryModule } from './components/modules/AmbulanceMortuaryModule';
import { MRDModule } from './components/modules/MRDModule';
import { InfectionControlModule } from './components/modules/InfectionControlModule';
import { QualityAccreditationModule } from './components/modules/QualityAccreditationModule';
import { PatientPortalModule } from './components/modules/PatientPortalModule';
import { NotificationCentreModule } from './components/modules/NotificationCentreModule';
import { ReportsAnalyticsModule } from './components/modules/ReportsAnalyticsModule';
import { DocumentManagementModule } from './components/modules/DocumentManagementModule';
import { SecurityAuthModule } from './components/modules/SecurityAuthModule';
import { DataManagementModule } from './components/modules/DataManagementModule';
import { IntegrationsAPIModule } from './components/modules/IntegrationsAPIModule';
import { SystemSettingsModule } from './components/modules/SystemSettingsModule';
import { TechStackModule } from './components/modules/TechStackModule';
import { BuildRoadmapModule } from './components/modules/BuildRoadmapModule';
import { TechnicalSupportModule } from './components/modules/TechnicalSupportModule';

export function App() {
  const [activeModuleId, setActiveModuleId] = useState<number>(2); // Default to Admin Dashboard
  const [currentRole, setCurrentRole] = useState<UserRole>('Super Admin');
  const [currentBranch, setCurrentBranch] = useState<string>(HOSPITAL_INFO.branches[0].name);
  const [currentLang, setCurrentLang] = useState<'en' | 'hi' | 'bn'>('en');
  const [isBreakGlassOpen, setIsBreakGlassOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isPatientPortal, setIsPatientPortal] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  const handleLogEmergencyAccess = (log: BreakGlassLog) => {
    console.log('Break-glass emergency logged:', log);
  };

  const handleSelectPatient = (uhid: string) => {
    setActiveModuleId(8); // Open OPD/EMR for that patient
  };

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    // If current module is not allowed for the new role, automatically navigate to default module
    const targetMod = ALL_MODULES.find(m => m.id === activeModuleId);
    if (!targetMod || !targetMod.roles.includes(newRole)) {
      const defaultModId = ROLE_DEFAULT_MODULE[newRole] || 2;
      setActiveModuleId(defaultModId);
      setIsPatientPortal(defaultModId === 40);
    }
  };

  const handleTogglePatientPortal = () => {
    if (!isPatientPortal) {
      setIsPatientPortal(true);
      setActiveModuleId(40);
    } else {
      setIsPatientPortal(false);
      setActiveModuleId(ROLE_DEFAULT_MODULE[currentRole] || 2);
    }
  };

  const renderActiveModule = () => {
    switch (activeModuleId) {
      case 1: return <UserRoleAccessModule />;
      case 2: return <AdminDashboardModule onNavigate={(id) => setActiveModuleId(id)} />;
      case 3: return <MasterDataModule />;
      case 4: return <MultiBranchModule />;
      case 5: return <PatientRegistrationModule />;
      case 6: return <ABHAIntegrationModule />;
      case 7: return <AppointmentQueueModule />;
      case 8: return <OPDManagementModule />;
      case 9: return <EMRModule />;
      case 10: return <IPDAdmissionModule />;
      case 11: return <BedManagementModule />;
      case 12: return <EmergencyCasualtyModule />;
      case 13: return <NursingStationModule />;
      case 14: return <OperationTheatreModule />;
      case 15: return <ICUCriticalCareModule />;
      case 16: return <MaternityPaediatricsModule />;
      case 17: return <TelemedicineModule />;
      case 18: return <LISModule />;
      case 19: return <RadiologyPACSModule />;
      case 20: return <PharmacyModule />;
      case 21: return <InventoryStoreModule />;
      case 22: return <BloodBankModule />;
      case 23: return <CSSDHousekeepingModule />;
      case 24: return <BillingRCMModule />;
      case 25: return <PaymentGatewayModule />;
      case 26: return <InsuranceTPAModule />;
      case 27: return <AccountsFinanceModule />;
      case 28: return <ABDMRegistryModule />;
      case 29: return <ABDMCareContextModule />;
      case 30: return <ABDMConsentModule />;
      case 31: return <ABDMHIPModule />;
      case 32: return <ABDMHIUModule />;
      case 33: return <ABDMComplianceModule />;
      case 34: return <HRPayrollModule />;
      case 35: return <BiomedicalAssetsModule />;
      case 36: return <AmbulanceMortuaryModule />;
      case 37: return <MRDModule />;
      case 38: return <InfectionControlModule />;
      case 39: return <QualityAccreditationModule />;
      case 40: return <PatientPortalModule />;
      case 41: return <NotificationCentreModule />;
      case 42: return <ReportsAnalyticsModule />;
      case 43: return <DocumentManagementModule />;
      case 44: return <SecurityAuthModule />;
      case 45: return <DataManagementModule />;
      case 46: return <IntegrationsAPIModule />;
      case 47: return <SystemSettingsModule />;
      case 48: return <TechStackModule />;
      case 49: return <BuildRoadmapModule />;
      case 50: return <TechnicalSupportModule />;
      default: return <AdminDashboardModule onNavigate={(id) => setActiveModuleId(id)} />;
    }
  };

  return (
    <div className="app-container">
      {/* Royal Blue Sidebar */}
      <Sidebar
        activeModuleId={activeModuleId}
        currentRole={currentRole}
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
        onSelectModule={(id) => {
          setActiveModuleId(id);
          setIsPatientPortal(id === 40);
        }}
      />

      {/* Backdrop overlay for mobile drawer */}
      {isMobileNavOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          currentBranch={currentBranch}
          onBranchChange={setCurrentBranch}
          currentLang={currentLang}
          onLangChange={setCurrentLang}
          onOpenBreakGlass={() => setIsBreakGlassOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onTogglePatientPortal={handleTogglePatientPortal}
          isPatientPortal={isPatientPortal}
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          onSelectModule={(id) => {
            setActiveModuleId(id);
            setIsPatientPortal(id === 40);
          }}
          activeModuleId={activeModuleId}
        />

        <main className="content-area">
          {renderActiveModule()}
        </main>
      </div>

      {/* Global Modals */}
      <BreakGlassModal
        isOpen={isBreakGlassOpen}
        onClose={() => setIsBreakGlassOpen(false)}
        onLogEmergencyAccess={handleLogEmergencyAccess}
        currentUserName={currentRole}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectModule={(id) => {
          setActiveModuleId(id);
          setIsPatientPortal(id === 40);
        }}
        onSelectPatient={handleSelectPatient}
        onTriggerEmergency={() => setIsBreakGlassOpen(true)}
      />
    </div>
  );
}

export default App;
