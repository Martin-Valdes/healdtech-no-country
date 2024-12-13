export interface Doctor {
  name: string;
  specialty: string;
}

export interface Appointment {
  id: number;
  datetime: Date;
  doctor: Doctor;
  type: 'virtual' | 'presencial';
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  remainingDoses: number;
}

export interface HealthTip {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface PatientStats {
  totalAppointments: number;
  activePrescriptions: number;
  newResults: number;
  healthScore: number;
}

export interface PatientDashboardService {
  getPatientStats: () => Promise<PatientStats>;
  getPatientAppointments: () => Promise<Appointment[]>;
  getPatientMedications: () => Promise<Medication[]>;
  getHealthTips: () => Promise<HealthTip[]>;
  cancelAppointment: (appointmentId: number) => Promise<void>;
}
