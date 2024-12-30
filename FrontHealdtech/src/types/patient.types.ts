export interface Doctor {
  id: string
  name: string
  specialty: string
  imagen?: string
}

export interface Appointment {
  id: string;
  fecha: Date;
  doctor: Doctor;
  tipo: "virtual" | "presencial";
  estado: "confirmada" | "pendiente";
  descripcion: string;
  ubicacion: string;
  notificaciones?: number;
  sintomas?: string;
  instrucciones?: string;
  archivosAdjuntos?: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  remainingDoses: number;
}

export interface HealthTip {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PatientStats {
  id: string;
  totalConsult: number;
  canceledConsult: number;
  activePrescriptions: number;
  newResults: number;
  healthScore: number;
}

export interface PatientDashboardService {
  getPatientStats: (id: string) => Promise<PatientStats>;
  getPatientAppointments: (id: string) => Promise<PatientStats>;
  getPatientMedications: () => Promise<Medication[]>;
  getHealthTips: () => Promise<HealthTip[]>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
}
