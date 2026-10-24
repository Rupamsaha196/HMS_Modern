// TypeScript definitions for Enterprise Hospital Management System (HMS) with ABDM/ABHA Integration

export type UserRole =
  | 'Super Admin'
  | 'Hospital Admin'
  | 'Branch Admin'
  | 'Doctor'
  | 'Nurse'
  | 'Receptionist'
  | 'Pharmacist'
  | 'Lab Technician'
  | 'Radiologist'
  | 'Billing Executive'
  | 'Insurance/TPA Executive'
  | 'Store Keeper'
  | 'HR Manager'
  | 'MRD Officer';

export interface GranularPermission {
  module: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
  print: boolean;
  export: boolean;
  approve: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  department: string;
  branch: string;
  hprId?: string; // Healthcare Professional Registry ID for ABDM
  hasDSC: boolean; // Digital Signature Certificate mapped
  status: 'Active' | 'Inactive';
}

export interface BreakGlassLog {
  id: string;
  userId: string;
  userName: string;
  patientUhid: string;
  patientName: string;
  reason: string;
  timestamp: string;
  approvedBy?: string;
  status: 'Active Override' | 'Audit Reviewed' | 'Expired';
}

export interface Patient {
  uhid: string; // e.g. UHID-2026-00481
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  phone: string;
  email?: string;
  bloodGroup: string;
  address: string;
  abhaNumber?: string; // 14-digit ABHA: 12-3456-7890-1234
  abhaAddress?: string; // PHR: user@abdm
  abhaLinked: boolean;
  kycVerified: boolean;
  photoUrl?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  category: 'General' | 'Newborn' | 'Unknown' | 'MLC';
  isMLC?: boolean;
  mlcPoliceStation?: string;
  registeredAt: string;
  registeredBranch: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface Appointment {
  id: string;
  tokenNumber: number;
  uhid: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  specialty: string;
  timeSlot: string;
  date: string;
  type: 'Walk-in' | 'Online' | 'Phone' | 'ABDM PHR App' | 'Teleconsultation';
  status: 'Waiting' | 'In Consultation' | 'Completed' | 'Rescheduled' | 'No-Show';
  vitalsCaptured: boolean;
  fee: number;
  paymentStatus: 'Paid' | 'Pending';
}

export interface Vitals {
  bpSystolic: number;
  bpDiastolic: number;
  pulse: number;
  spo2: number;
  temperature: number;
  heightCm: number;
  weightKg: number;
  bmi: number;
  respiratoryRate: number;
  bloodSugar?: number;
  capturedAt: string;
  capturedBy: string;
}

export interface DrugItem {
  id: string;
  brandName: string;
  genericName: string;
  dosage: string;
  form: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Inhaler';
  schedule: 'Schedule H' | 'Schedule H1' | 'Schedule X' | 'General';
  stockQuantity: number;
  pricePerUnit: number;
  batchNumber: string;
  expiryDate: string;
}

export interface PrescriptionItem {
  drugId: string;
  drugName: string;
  dosage: string;
  frequency: string; // '1-0-1'
  timing: 'Before Meals' | 'After Meals';
  durationDays: number;
  instructions: string;
}

export interface LabTestOrder {
  id: string;
  testCode: string;
  testName: string;
  loincCode: string;
  category: 'Biochemistry' | 'Haematology' | 'Microbiology' | 'Serology' | 'Histopathology';
  price: number;
  status: 'Ordered' | 'Sample Collected' | 'Accessioned' | 'Result Entered' | 'Pathologist Verified' | 'Dispatched';
  orderedBy: string;
  sampleBarcode: string;
  specimenType: string;
  criticalFlag?: boolean;
  resultValue?: string;
  referenceRange?: string;
  unit?: string;
  deltaAlert?: string;
  verifiedBy?: string;
}

export interface RadiologyOrder {
  id: string;
  modality: 'X-Ray' | 'CT Scan' | 'MRI' | 'Ultrasound' | 'Mammography';
  procedureName: string;
  clinicalIndication: string;
  status: 'Scheduled' | 'In Progress' | 'Image Acquired' | 'Reported' | 'Verified';
  dicomStudyUid?: string;
  radiologistNotes?: string;
  findings?: string;
  criticalFindingAlert?: boolean;
  contrastUsed: boolean;
}

export interface Bed {
  id: string;
  bedNumber: string;
  wardId: string;
  wardName: string;
  bedClass: 'General Male' | 'General Female' | 'Semi-Private' | 'Deluxe' | 'ICU' | 'CCU' | 'NICU' | 'Isolation' | 'Emergency';
  status: 'Occupied' | 'Vacant' | 'Reserved' | 'Cleaning' | 'Blocked';
  currentPatientUhid?: string;
  currentPatientName?: string;
  admittedAt?: string;
  primaryDoctor?: string;
  dailyTariff: number;
  hasOxygen: boolean;
  hasVentilator: boolean;
  hasMonitor: boolean;
}

export interface MARItem {
  id: string;
  patientUhid: string;
  bedNumber: string;
  medicationName: string;
  dose: string;
  route: 'Oral' | 'IV' | 'IM' | 'Subcutaneous' | 'Inhalation';
  scheduledTime: string;
  administeredTime?: string;
  administeredBy?: string;
  status: 'Scheduled' | 'Given' | 'Held' | 'Refused' | 'Overdue';
  barcodeVerified: boolean;
}

export interface OperationTheatreCase {
  id: string;
  otRoom: string;
  patientUhid: string;
  patientName: string;
  procedureName: string;
  leadSurgeon: string;
  anaesthetist: string;
  scrubNurse: string;
  scheduledStartTime: string;
  status: 'Pre-Op' | 'In Surgery' | 'PACU Recovery' | 'Completed' | 'Cancelled';
  whoChecklistSigned: boolean;
  implantsUsed: string[];
  anaesthesiaType: 'General' | 'Spinal' | 'Epidural' | 'Local' | 'MAC';
}

export interface BloodUnit {
  id: string;
  unitNumber: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  component: 'PRBC' | 'FFP' | 'Platelet Concentrate' | 'Cryoprecipitate';
  collectionDate: string;
  expiryDate: string;
  status: 'Available' | 'Cross-Matched' | 'Issued' | 'Expired';
  donorId: string;
  bagBarcode: string;
}

export interface InvoiceItem {
  description: string;
  category: 'Consultation' | 'Bed Charges' | 'Investigations' | 'Pharmacy' | 'OT Charges' | 'Procedures' | 'Nursing';
  qty: number;
  rate: number;
  gstPercent: number;
  discountPercent: number;
  total: number;
}

export interface BillRecord {
  id: string;
  billNumber: string;
  uhid: string;
  patientName: string;
  billType: 'OPD' | 'IPD Running' | 'Final Discharge' | 'Emergency' | 'Pharmacy';
  date: string;
  items: InvoiceItem[];
  subTotal: number;
  discountAmount: number;
  gstAmount: number;
  grossTotal: number;
  advanceDeposits: number;
  netPayable: number;
  paymentMode: 'Cash' | 'Card' | 'UPI' | 'Insurance/TPA' | 'Corporate' | 'Online Gateway';
  paymentStatus: 'Paid' | 'Partial' | 'Pending' | 'Pre-Auth Approved';
  cashierName: string;
  fhirInvoiceGenerated: boolean;
}

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  uhid: string;
  patientName: string;
  insuranceCompany: string;
  tpaName: string;
  policyNumber: string;
  approvalType: 'Cashless Pre-Auth' | 'Enhancement' | 'Final Claim' | 'Reimbursement';
  estimatedCost: number;
  approvedAmount: number;
  settledAmount: number;
  status: 'Pre-Auth Submitted' | 'Approved' | 'Query Raised' | 'Final Bill Sent' | 'Settled' | 'Rejected';
  scheme: 'Private Corporate' | 'PM-JAY Ayushman Bharat' | 'CGHS' | 'ECHS' | 'ESI';
  nhcxClaimId?: string;
  rejectionReason?: string;
}

export interface ABDMConsentArtefact {
  id: string;
  consentId: string;
  patientAbha: string;
  patientName: string;
  purpose: 'Care Management' | 'Public Health' | 'Referral Consultation' | 'Personal Health Record';
  hiTypes: ('OPConsultation' | 'Prescription' | 'DischargeSummary' | 'DiagnosticReport' | 'Immunisation')[];
  dateFrom: string;
  dateTo: string;
  expiryDate: string;
  status: 'GRANTED' | 'REQUESTED' | 'REVOKED' | 'EXPIRED';
  requesterEntity: string;
  grantedAt?: string;
}

export interface ABDMFHIRBundle {
  id: string;
  bundleId: string;
  resourceType: 'Bundle';
  type: 'document';
  recordType: 'OP Consultation' | 'Prescription' | 'Discharge Summary' | 'Diagnostic Report' | 'Immunisation';
  patientUhid: string;
  patientAbha: string;
  doctorHpr: string;
  facilityHfr: string;
  timestamp: string;
  fhirJson: string;
  encrypted: boolean;
  pushedToHIU: boolean;
}

export interface Ambulance {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  ambulanceType: 'Advanced Life Support (ALS)' | 'Basic Life Support (BLS)' | 'Neonatal Transport';
  status: 'Available' | 'Dispatched' | 'En Route to Hospital' | 'Maintenance';
  currentLocation: string;
  assignedEmergencyCase?: string;
  etaMinutes?: number;
}

export interface BMWLogEntry {
  id: string;
  date: string;
  shift: 'Morning' | 'Evening' | 'Night';
  ward: string;
  yellowBagsKg: number; // Anatomical, infectious
  redBagsKg: number; // Contaminated plastics, tubing
  whiteTranslucentKg: number; // Sharps, needles
  blueCardboardKg: number; // Glassware, ampoules
  collectorName: string;
  manifestBarcode: string;
  vendorHandoverStatus: 'Pending' | 'Handed Over to CBMWTF';
}

export interface TelemedicineCall {
  id: string;
  appointmentId: string;
  patientUhid: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  scheduledTime: string;
  roomUrl: string;
  status: 'Scheduled' | 'Calling' | 'Connected' | 'Completed';
  consentCaptured: boolean;
  durationMinutes: number;
}
