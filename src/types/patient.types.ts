export interface Doctor {
  name: string;
  specialty: string;
}

export interface Appointment {
  id: number;
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
  id: string;
  totalConsult: number;
  activePrescriptions: number;
  newResults: number;
  healthScore: number;
}

export interface PatientDashboardService {
  getPatientStats: (id: string) => Promise<PatientStats>;
  getPatientAppointments: (id: string) => Promise<Appointment[]>;
  getPatientMedications: () => Promise<Medication[]>;
  getHealthTips: () => Promise<HealthTip[]>;
  cancelAppointment: (appointmentId: string, data: any) => Promise<void>;
}
