import {
  Patient,
  Appointment,
  Bed,
  DrugItem,
  LabTestOrder,
  RadiologyOrder,
  MARItem,
  OperationTheatreCase,
  BloodUnit,
  BillRecord,
  InsuranceClaim,
  ABDMConsentArtefact,
  ABDMFHIRBundle,
  Ambulance,
  BMWLogEntry,
  TelemedicineCall,
  UserAccount
} from '../types/hms';

export const HOSPITAL_INFO = {
  name: 'MedPulse Apex Super-Specialty Hospital',
  tagline: 'NABH Accredited & ABDM M1, M2, M3 Certified Center of Excellence',
  groupName: 'MedPulse Healthcare Group',
  branches: [
    { id: 'BR-01', name: 'MedPulse Apex Main Hospital (Indiranagar)', hfrId: 'IN2910002931', city: 'Bengaluru', beds: 350 },
    { id: 'BR-02', name: 'MedPulse North Care Center (Hebbal)', hfrId: 'IN2910004512', city: 'Bengaluru', beds: 120 },
    { id: 'BR-03', name: 'MedPulse South Diagnostic & Day Care (Jayanagar)', hfrId: 'IN2910006789', city: 'Bengaluru', beds: 60 }
  ],
  abdmBridge: {
    clientId: 'SBX_MEDPULSE_BRIDGE_908',
    clientSecret: '••••••••••••••••••••••••••••',
    gatewayUrl: 'https://dev.abdm.gov.in/gateway/v0.5',
    sessionTokenExpiry: '48m remaining',
    sandboxMode: true,
    dhisTotalEarned: 24960
  }
};

export const INITIAL_USERS: UserAccount[] = [
  { id: 'USR-01', name: 'Dr. Arvind Swaminathan', role: 'Super Admin', email: 'arvind.s@medpulse.in', phone: '+91 98450 11223', department: 'Executive Management', branch: 'Apex Main Hospital', hasDSC: true, status: 'Active' },
  { id: 'USR-02', name: 'Dr. Shalini Mukhopadhyay', role: 'Doctor', email: 'shalini.m@medpulse.in', phone: '+91 98450 44556', department: 'Cardiology', branch: 'Apex Main Hospital', hprId: '91-DOC-4821-BLR', hasDSC: true, status: 'Active' },
  { id: 'USR-03', name: 'Sister Mary Joseph', role: 'Nurse', email: 'mary.j@medpulse.in', phone: '+91 98450 77889', department: 'ICU / Critical Care', branch: 'Apex Main Hospital', hasDSC: false, status: 'Active' },
  { id: 'USR-04', name: 'Rohan Deshmukh', role: 'Billing Executive', email: 'rohan.d@medpulse.in', phone: '+91 98450 33221', department: 'Revenue Cycle', branch: 'Apex Main Hospital', hasDSC: true, status: 'Active' },
  { id: 'USR-05', name: 'Pooja Nair', role: 'Pharmacist', email: 'pooja.n@medpulse.in', phone: '+91 98450 99001', department: 'Pharmacy', branch: 'Apex Main Hospital', hasDSC: true, status: 'Active' },
  { id: 'USR-06', name: 'Dr. Rajesh Bhargava', role: 'Radiologist', email: 'rajesh.b@medpulse.in', phone: '+91 98450 55667', department: 'Radiology', branch: 'Apex Main Hospital', hprId: '91-DOC-1109-BLR', hasDSC: true, status: 'Active' },
  { id: 'USR-07', name: 'Ananya Roy', role: 'Receptionist', email: 'ananya.r@medpulse.in', phone: '+91 98450 22334', department: 'Front Office', branch: 'Apex Main Hospital', hasDSC: false, status: 'Active' }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    uhid: 'UHID-2026-00481',
    name: 'Rajesh Kumar Verma',
    age: 52,
    gender: 'Male',
    dob: '1974-03-14',
    phone: '+91 98451 23456',
    email: 'rajesh.verma@example.com',
    bloodGroup: 'B+',
    address: '42, 4th Main, 100ft Road, Indiranagar, Bengaluru, 560038',
    abhaNumber: '91-8472-9102-4821',
    abhaAddress: 'rajesh.verma@abdm',
    abhaLinked: true,
    kycVerified: true,
    emergencyContact: { name: 'Sunita Verma', relationship: 'Spouse', phone: '+91 98451 23457' },
    category: 'General',
    registeredAt: '2026-10-20 09:30',
    registeredBranch: 'Apex Main Hospital',
    allergies: ['Penicillin', 'Sulfa Drugs'],
    chronicConditions: ['Type 2 Diabetes', 'Hypertension', 'Dyslipidemia']
  },
  {
    uhid: 'UHID-2026-00482',
    name: 'Priya Sharma',
    age: 29,
    gender: 'Female',
    dob: '1997-08-22',
    phone: '+91 98452 34567',
    email: 'priya.sharma@example.com',
    bloodGroup: 'O+',
    address: '15/B, Lake View Residency, Bellandur, Bengaluru, 560103',
    abhaNumber: '91-2384-5910-3841',
    abhaAddress: 'priya.sharma97@abdm',
    abhaLinked: true,
    kycVerified: true,
    emergencyContact: { name: 'Vikram Sharma', relationship: 'Spouse', phone: '+91 98452 34568' },
    category: 'General',
    registeredAt: '2026-10-22 11:15',
    registeredBranch: 'Apex Main Hospital',
    allergies: ['NSAIDs / Ibuprofen'],
    chronicConditions: ['Hypothyroidism']
  },
  {
    uhid: 'UHID-2026-00483',
    name: 'Master Aarav Deshpande',
    age: 6,
    gender: 'Male',
    dob: '2020-05-11',
    phone: '+91 98453 45678',
    bloodGroup: 'A+',
    address: '78, Palm Meadows, Whitefield, Bengaluru, 560066',
    abhaNumber: '91-1122-3344-5566',
    abhaAddress: 'aarav.deshpande@abdm',
    abhaLinked: true,
    kycVerified: true,
    emergencyContact: { name: 'Gautam Deshpande', relationship: 'Father', phone: '+91 98453 45678' },
    category: 'General',
    registeredAt: '2026-10-23 14:00',
    registeredBranch: 'Apex Main Hospital',
    allergies: ['Peanuts'],
    chronicConditions: ['Mild Childhood Asthma']
  },
  {
    uhid: 'UHID-2026-00484',
    name: 'Unknown Male (Trauma Code Blue)',
    age: 35,
    gender: 'Male',
    dob: '1991-01-01',
    phone: '+91 00000 00000',
    bloodGroup: 'O-',
    address: 'Brought by 108 Ambulance from Outer Ring Road Highway Accident',
    abhaLinked: false,
    kycVerified: false,
    emergencyContact: { name: 'Police Officer On Duty', relationship: 'MLC Officer', phone: '112' },
    category: 'MLC',
    isMLC: true,
    mlcPoliceStation: 'Indiranagar Traffic Police Station (FIR #91/26)',
    registeredAt: '2026-10-24 14:10',
    registeredBranch: 'Apex Main Hospital',
    allergies: ['None Reported'],
    chronicConditions: ['Unknown']
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1001',
    tokenNumber: 1,
    uhid: 'UHID-2026-00481',
    patientName: 'Rajesh Kumar Verma',
    doctorId: 'USR-02',
    doctorName: 'Dr. Shalini Mukhopadhyay',
    department: 'Cardiology',
    specialty: 'Interventional Cardiology',
    timeSlot: '09:00 AM - 09:15 AM',
    date: '2026-10-24',
    type: 'Walk-in',
    status: 'In Consultation',
    vitalsCaptured: true,
    fee: 850,
    paymentStatus: 'Paid'
  },
  {
    id: 'APT-1002',
    tokenNumber: 2,
    uhid: 'UHID-2026-00482',
    patientName: 'Priya Sharma',
    doctorId: 'USR-02',
    doctorName: 'Dr. Shalini Mukhopadhyay',
    department: 'Cardiology',
    specialty: 'Interventional Cardiology',
    timeSlot: '09:30 AM - 09:45 AM',
    date: '2026-10-24',
    type: 'Online',
    status: 'Waiting',
    vitalsCaptured: true,
    fee: 850,
    paymentStatus: 'Paid'
  },
  {
    id: 'APT-1003',
    tokenNumber: 3,
    uhid: 'UHID-2026-00483',
    patientName: 'Master Aarav Deshpande',
    doctorId: 'USR-02',
    doctorName: 'Dr. Shalini Mukhopadhyay',
    department: 'Paediatrics',
    specialty: 'General Paediatrics',
    timeSlot: '10:00 AM - 10:15 AM',
    date: '2026-10-24',
    type: 'Teleconsultation',
    status: 'Waiting',
    vitalsCaptured: false,
    fee: 700,
    paymentStatus: 'Paid'
  }
];

export const INITIAL_BEDS: Bed[] = [
  { id: 'BED-ICU-01', bedNumber: 'ICU-101', wardId: 'W-ICU', wardName: 'Medical ICU', bedClass: 'ICU', status: 'Occupied', currentPatientUhid: 'UHID-2026-00484', currentPatientName: 'Unknown Male (Trauma Code Blue)', dailyTariff: 12500, hasOxygen: true, hasVentilator: true, hasMonitor: true, admittedAt: '2026-10-24 14:15', primaryDoctor: 'Dr. Shalini M.' },
  { id: 'BED-ICU-02', bedNumber: 'ICU-102', wardId: 'W-ICU', wardName: 'Medical ICU', bedClass: 'ICU', status: 'Occupied', currentPatientUhid: 'UHID-2026-00481', currentPatientName: 'Rajesh Kumar Verma', dailyTariff: 12500, hasOxygen: true, hasVentilator: false, hasMonitor: true, admittedAt: '2026-10-23 18:30', primaryDoctor: 'Dr. Shalini M.' },
  { id: 'BED-ICU-03', bedNumber: 'ICU-103', wardId: 'W-ICU', wardName: 'Medical ICU', bedClass: 'ICU', status: 'Cleaning', dailyTariff: 12500, hasOxygen: true, hasVentilator: true, hasMonitor: true },
  { id: 'BED-ICU-04', bedNumber: 'ICU-104', wardId: 'W-ICU', wardName: 'Medical ICU', bedClass: 'ICU', status: 'Vacant', dailyTariff: 12500, hasOxygen: true, hasVentilator: true, hasMonitor: true },
  { id: 'BED-GW-101', bedNumber: 'GW-M-01', wardId: 'W-GWM', wardName: 'General Ward Male', bedClass: 'General Male', status: 'Occupied', dailyTariff: 2200, hasOxygen: true, hasVentilator: false, hasMonitor: false, currentPatientName: 'Suresh Patil' },
  { id: 'BED-GW-102', bedNumber: 'GW-M-02', wardId: 'W-GWM', wardName: 'General Ward Male', bedClass: 'General Male', status: 'Vacant', dailyTariff: 2200, hasOxygen: true, hasVentilator: false, hasMonitor: false },
  { id: 'BED-GW-103', bedNumber: 'GW-M-03', wardId: 'W-GWM', wardName: 'General Ward Male', bedClass: 'General Male', status: 'Reserved', dailyTariff: 2200, hasOxygen: true, hasVentilator: false, hasMonitor: false },
  { id: 'BED-DLX-201', bedNumber: 'DLX-201', wardId: 'W-DLX', wardName: 'Executive Deluxe Suite', bedClass: 'Deluxe', status: 'Occupied', currentPatientUhid: 'UHID-2026-00482', currentPatientName: 'Priya Sharma', dailyTariff: 8500, hasOxygen: true, hasVentilator: false, hasMonitor: true, admittedAt: '2026-10-23 10:00' },
  { id: 'BED-DLX-202', bedNumber: 'DLX-202', wardId: 'W-DLX', wardName: 'Executive Deluxe Suite', bedClass: 'Deluxe', status: 'Vacant', dailyTariff: 8500, hasOxygen: true, hasVentilator: false, hasMonitor: true },
  { id: 'BED-ER-01', bedNumber: 'ER-BAY-01', wardId: 'W-ER', wardName: 'Emergency Resuscitation Bay', bedClass: 'Emergency', status: 'Occupied', dailyTariff: 4500, hasOxygen: true, hasVentilator: true, hasMonitor: true },
  { id: 'BED-ER-02', bedNumber: 'ER-BAY-02', wardId: 'W-ER', wardName: 'Emergency Resuscitation Bay', bedClass: 'Emergency', status: 'Vacant', dailyTariff: 4500, hasOxygen: true, hasVentilator: true, hasMonitor: true },
  { id: 'BED-NICU-01', bedNumber: 'NICU-WARMER-1', wardId: 'W-NICU', wardName: 'Neonatal ICU', bedClass: 'NICU', status: 'Occupied', dailyTariff: 11000, hasOxygen: true, hasVentilator: true, hasMonitor: true }
];

export const INITIAL_DRUGS: DrugItem[] = [
  { id: 'DRG-01', brandName: 'Augmentin 625 Duo', genericName: 'Amoxicillin + Clavulanic Acid 625mg', dosage: '625mg', form: 'Tablet', schedule: 'Schedule H', stockQuantity: 840, pricePerUnit: 22.50, batchNumber: 'AUG-26A09', expiryDate: '2027-08-31' },
  { id: 'DRG-02', brandName: 'Pantocid 40', genericName: 'Pantoprazole 40mg', dosage: '40mg', form: 'Tablet', schedule: 'Schedule H', stockQuantity: 1250, pricePerUnit: 14.80, batchNumber: 'PAN-25K12', expiryDate: '2027-03-31' },
  { id: 'DRG-03', brandName: 'Ecosprin 75', genericName: 'Aspirin Gastro-Resistant 75mg', dosage: '75mg', form: 'Tablet', schedule: 'General', stockQuantity: 2100, pricePerUnit: 4.50, batchNumber: 'ECO-26B01', expiryDate: '2027-11-30' },
  { id: 'DRG-04', brandName: 'Atorva 20', genericName: 'Atorvastatin 20mg', dosage: '20mg', form: 'Tablet', schedule: 'Schedule H', stockQuantity: 960, pricePerUnit: 18.20, batchNumber: 'ATR-25M04', expiryDate: '2027-01-31' },
  { id: 'DRG-05', brandName: 'Fortwin Injection', genericName: 'Pentazocine 30mg/ml', dosage: '30mg/ml', form: 'Injection', schedule: 'Schedule X', stockQuantity: 45, pricePerUnit: 65.00, batchNumber: 'FTW-26C11', expiryDate: '2026-12-31' },
  { id: 'DRG-06', brandName: 'Clexane 40mg PFS', genericName: 'Enoxaparin Sodium 40mg/0.4ml', dosage: '40mg', form: 'Injection', schedule: 'Schedule H', stockQuantity: 120, pricePerUnit: 480.00, batchNumber: 'CLX-26A20', expiryDate: '2027-06-30' }
];

export const INITIAL_LAB_ORDERS: LabTestOrder[] = [
  {
    id: 'LAB-901',
    testCode: 'CBC-01',
    testName: 'Complete Blood Count (CBC) with Automated Differential',
    loincCode: '58410-2',
    category: 'Haematology',
    price: 450,
    status: 'Pathologist Verified',
    orderedBy: 'Dr. Shalini Mukhopadhyay',
    sampleBarcode: 'SMP-26-88190',
    specimenType: 'Whole Blood EDTA',
    criticalFlag: false,
    resultValue: 'Hb: 13.8 g/dL, WBC: 7,800 /mcL, Platelets: 2.4 Lakhs',
    referenceRange: 'Hb: 13-17 g/dL, WBC: 4000-11000 /mcL',
    unit: 'g/dL',
    verifiedBy: 'Dr. K. S. Ramanathan, MD (Pathology)'
  },
  {
    id: 'LAB-902',
    testCode: 'TROP-I',
    testName: 'Troponin I High Sensitive (Cardiac Marker)',
    loincCode: '42757-5',
    category: 'Biochemistry',
    price: 1800,
    status: 'Pathologist Verified',
    orderedBy: 'Dr. Shalini Mukhopadhyay',
    sampleBarcode: 'SMP-26-88191',
    specimenType: 'Serum Clot Activator',
    criticalFlag: true,
    resultValue: '0.94 ng/mL [ELEVATED - CRITICAL PANIC VALUE]',
    referenceRange: '< 0.04 ng/mL',
    unit: 'ng/mL',
    deltaAlert: '+0.72 ng/mL rise compared to 4 hrs ago (Cardiac Injury Triggered)',
    verifiedBy: 'Dr. K. S. Ramanathan, MD (Pathology)'
  },
  {
    id: 'LAB-903',
    testCode: 'LFT-02',
    testName: 'Liver Function Test (LFT Profile)',
    loincCode: '24325-3',
    category: 'Biochemistry',
    price: 950,
    status: 'Accessioned',
    orderedBy: 'Dr. Shalini Mukhopadhyay',
    sampleBarcode: 'SMP-26-88192',
    specimenType: 'Serum',
    criticalFlag: false
  }
];

export const INITIAL_RADIOLOGY_ORDERS: RadiologyOrder[] = [
  {
    id: 'RAD-701',
    modality: 'CT Scan',
    procedureName: 'CT Angiography Coronary with 3D Reconstruction',
    clinicalIndication: 'Chest pain, elevated troponin, r/o LAD stenosis',
    status: 'Verified',
    dicomStudyUid: '1.2.840.113619.2.55.3.2819284.102',
    findings: 'Calcified plaque in proximal LAD producing 65% luminal stenosis. Right coronary artery patent without significant lesion. Normal left ventricular ejection fraction (~58%).',
    criticalFindingAlert: false,
    contrastUsed: true
  },
  {
    id: 'RAD-702',
    modality: 'X-Ray',
    procedureName: 'Chest X-Ray PA View Digital',
    clinicalIndication: 'Pre-operative cardiac clearance',
    status: 'Verified',
    dicomStudyUid: '1.2.840.113619.2.55.3.2819284.103',
    findings: 'No active parenchymal lesion or consolidation. Cardiothoracic ratio is normal (0.48). Costophrenic angles are clear.',
    criticalFindingAlert: false,
    contrastUsed: false
  }
];

export const INITIAL_MAR_ITEMS: MARItem[] = [
  { id: 'MAR-01', patientUhid: 'UHID-2026-00481', bedNumber: 'ICU-102', medicationName: 'Inj. Clexane (Enoxaparin) 40mg', dose: '40mg', route: 'Subcutaneous', scheduledTime: '08:00 AM', administeredTime: '08:05 AM', administeredBy: 'Sister Mary Joseph', status: 'Given', barcodeVerified: true },
  { id: 'MAR-02', patientUhid: 'UHID-2026-00481', bedNumber: 'ICU-102', medicationName: 'Tab. Atorva (Atorvastatin) 40mg', dose: '40mg', route: 'Oral', scheduledTime: '09:00 PM', status: 'Scheduled', barcodeVerified: false },
  { id: 'MAR-03', patientUhid: 'UHID-2026-00484', bedNumber: 'ICU-101', medicationName: 'Inj. Tranexamic Acid 1000mg IV', dose: '1000mg', route: 'IV', scheduledTime: '02:30 PM', administeredTime: '02:32 PM', administeredBy: 'Sister Mary Joseph', status: 'Given', barcodeVerified: true }
];

export const INITIAL_OT_CASES: OperationTheatreCase[] = [
  {
    id: 'OT-501',
    otRoom: 'OT-1 (Cardiac Hybrid Suite)',
    patientUhid: 'UHID-2026-00481',
    patientName: 'Rajesh Kumar Verma',
    procedureName: 'Percutaneous Coronary Intervention (PCI) + Drug Eluting Stent LAD',
    leadSurgeon: 'Dr. Shalini Mukhopadhyay',
    anaesthetist: 'Dr. George Thomas, MD',
    scrubNurse: 'Sister Preethi Mathew',
    scheduledStartTime: '2026-10-24 16:30',
    status: 'In Surgery',
    whoChecklistSigned: true,
    implantsUsed: ['Resolute Onyx DES 3.0 x 18mm (Batch: ST-26910)'],
    anaesthesiaType: 'MAC'
  },
  {
    id: 'OT-502',
    otRoom: 'OT-3 (Ortho & Trauma)',
    patientUhid: 'UHID-2026-00484',
    patientName: 'Unknown Male (Trauma Code Blue)',
    procedureName: 'Emergency Exploratory Laparotomy + Splenic Repair',
    leadSurgeon: 'Dr. Vikramaditya Rao',
    anaesthetist: 'Dr. Geeta Pillai',
    scrubNurse: 'Sister Deepa K.',
    scheduledStartTime: '2026-10-24 15:00',
    status: 'In Surgery',
    whoChecklistSigned: true,
    implantsUsed: ['Surgical Hemostatic Mesh (Ethicon)'],
    anaesthesiaType: 'General'
  }
];

export const INITIAL_BLOOD_UNITS: BloodUnit[] = [
  { id: 'BLD-101', unitNumber: 'PRBC-2026-0912', bloodGroup: 'O-', component: 'PRBC', collectionDate: '2026-10-18', expiryDate: '2026-11-29', status: 'Cross-Matched', donorId: 'DNR-4812', bagBarcode: '89012340912' },
  { id: 'BLD-102', unitNumber: 'PRBC-2026-0915', bloodGroup: 'B+', component: 'PRBC', collectionDate: '2026-10-20', expiryDate: '2026-12-01', status: 'Available', donorId: 'DNR-4820', bagBarcode: '89012340915' },
  { id: 'BLD-103', unitNumber: 'FFP-2026-0419', bloodGroup: 'B+', component: 'FFP', collectionDate: '2026-10-20', expiryDate: '2027-10-20', status: 'Available', donorId: 'DNR-4820', bagBarcode: '89012340419' },
  { id: 'BLD-104', unitNumber: 'PLT-2026-0112', bloodGroup: 'A+', component: 'Platelet Concentrate', collectionDate: '2026-10-22', expiryDate: '2026-10-27', status: 'Available', donorId: 'DNR-4835', bagBarcode: '89012340112' }
];

export const INITIAL_BILLS: BillRecord[] = [
  {
    id: 'BIL-2026-0419',
    billNumber: 'INV-2026-00918',
    uhid: 'UHID-2026-00481',
    patientName: 'Rajesh Kumar Verma',
    billType: 'IPD Running',
    date: '2026-10-24',
    items: [
      { description: 'ICU Bed Charges (2 Days @ 12500)', category: 'Bed Charges', qty: 2, rate: 12500, gstPercent: 0, discountPercent: 0, total: 25000 },
      { description: 'Specialist Doctor Rounds (Dr. Shalini M.)', category: 'Consultation', qty: 2, rate: 1800, gstPercent: 0, discountPercent: 0, total: 3600 },
      { description: 'Cardiac Troponin I Stat & Routine CBC', category: 'Investigations', qty: 2, rate: 2250, gstPercent: 0, discountPercent: 0, total: 4500 },
      { description: 'Coronary CT Angiography 3D', category: 'Investigations', qty: 1, rate: 14500, gstPercent: 0, discountPercent: 0, total: 14500 },
      { description: 'Pharmacy Dispensations (ICU MAR)', category: 'Pharmacy', qty: 1, rate: 6840, gstPercent: 12, discountPercent: 5, total: 6498 }
    ],
    subTotal: 54098,
    discountAmount: 1200,
    gstAmount: 779,
    grossTotal: 53677,
    advanceDeposits: 35000,
    netPayable: 18677,
    paymentMode: 'Insurance/TPA',
    paymentStatus: 'Pre-Auth Approved',
    cashierName: 'Rohan Deshmukh',
    fhirInvoiceGenerated: true
  }
];

export const INITIAL_CLAIMS: InsuranceClaim[] = [
  {
    id: 'CLM-8812',
    claimNumber: 'NHCX-CLM-2026-00982',
    uhid: 'UHID-2026-00481',
    patientName: 'Rajesh Kumar Verma',
    insuranceCompany: 'Star Health & Allied Insurance Co.',
    tpaName: 'In-House Star Health Desk',
    policyNumber: 'P/141128/01/2026/001928',
    approvalType: 'Cashless Pre-Auth',
    estimatedCost: 225000,
    approvedAmount: 195000,
    settledAmount: 0,
    status: 'Approved',
    scheme: 'Private Corporate',
    nhcxClaimId: 'NHCX-IN-2026-99210-482'
  },
  {
    id: 'CLM-8813',
    claimNumber: 'PMJAY-BLR-2026-4410',
    uhid: 'UHID-2026-00484',
    patientName: 'Unknown Male (Trauma Code Blue)',
    insuranceCompany: 'National Health Authority - Ayushman Bharat',
    tpaName: 'Suvarna Arogya Suraksha Trust (SAST)',
    policyNumber: 'PMJAY-KAR-2026-EMERGENCY',
    approvalType: 'Cashless Pre-Auth',
    estimatedCost: 150000,
    approvedAmount: 150000,
    settledAmount: 0,
    status: 'Approved',
    scheme: 'PM-JAY Ayushman Bharat',
    nhcxClaimId: 'PMJAY-TMS-992109'
  }
];

export const INITIAL_ABDM_CONSENTS: ABDMConsentArtefact[] = [
  {
    id: 'CNS-001',
    consentId: 'abdm-cns-8921-9982-10',
    patientAbha: 'rajesh.verma@abdm',
    patientName: 'Rajesh Kumar Verma',
    purpose: 'Care Management',
    hiTypes: ['OPConsultation', 'Prescription', 'DischargeSummary', 'DiagnosticReport'],
    dateFrom: '2023-01-01',
    dateTo: '2026-10-24',
    expiryDate: '2027-10-24',
    status: 'GRANTED',
    requesterEntity: 'MedPulse Apex Super-Specialty Hospital (IN2910002931)',
    grantedAt: '2026-10-20 10:14'
  },
  {
    id: 'CNS-002',
    consentId: 'abdm-cns-3341-7712-44',
    patientAbha: 'priya.sharma97@abdm',
    patientName: 'Priya Sharma',
    purpose: 'Referral Consultation',
    hiTypes: ['DiagnosticReport', 'Prescription'],
    dateFrom: '2025-01-01',
    dateTo: '2026-10-24',
    expiryDate: '2026-11-24',
    status: 'GRANTED',
    requesterEntity: 'MedPulse Apex Super-Specialty Hospital (IN2910002931)',
    grantedAt: '2026-10-22 11:20'
  }
];

export const INITIAL_AMBULANCES: Ambulance[] = [
  {
    id: 'AMB-01',
    vehicleNumber: 'KA-04-MG-8821',
    driverName: 'Manjunath Gowda',
    driverPhone: '+91 98459 11002',
    ambulanceType: 'Advanced Life Support (ALS)',
    status: 'En Route to Hospital',
    currentLocation: 'Old Madras Road Flyover (Near Baiyappanahalli)',
    assignedEmergencyCase: 'Severe RTA / Head Injury Call',
    etaMinutes: 6
  },
  {
    id: 'AMB-02',
    vehicleNumber: 'KA-04-MG-8822',
    driverName: 'Syed Khaleel',
    driverPhone: '+91 98459 11003',
    ambulanceType: 'Basic Life Support (BLS)',
    status: 'Available',
    currentLocation: 'MedPulse Hospital Bay 1',
    etaMinutes: 0
  }
];

export const INITIAL_BMW_LOGS: BMWLogEntry[] = [
  { id: 'BMW-01', date: '2026-10-24', shift: 'Morning', ward: 'ICU & OT Complex', yellowBagsKg: 18.5, redBagsKg: 24.2, whiteTranslucentKg: 3.4, blueCardboardKg: 8.1, collectorName: 'Ramesh K. (Housekeeping Lead)', manifestBarcode: 'BMW-MAN-261024-01', vendorHandoverStatus: 'Handed Over to CBMWTF' },
  { id: 'BMW-02', date: '2026-10-24', shift: 'Morning', ward: 'General Wards & OPD', yellowBagsKg: 9.2, redBagsKg: 14.8, whiteTranslucentKg: 1.1, blueCardboardKg: 4.5, collectorName: 'Ramesh K.', manifestBarcode: 'BMW-MAN-261024-02', vendorHandoverStatus: 'Pending' }
];

export const INITIAL_TELEMED_CALLS: TelemedicineCall[] = [
  {
    id: 'TEL-801',
    appointmentId: 'APT-1003',
    patientUhid: 'UHID-2026-00483',
    patientName: 'Master Aarav Deshpande (Child with Parent)',
    doctorName: 'Dr. Shalini Mukhopadhyay',
    specialty: 'Paediatrics & Cardiology',
    scheduledTime: '2026-10-24 17:00',
    roomUrl: 'https://telemed.medpulse.in/room/c89a-412f-9b01',
    status: 'Scheduled',
    consentCaptured: true,
    durationMinutes: 15
  }
];
