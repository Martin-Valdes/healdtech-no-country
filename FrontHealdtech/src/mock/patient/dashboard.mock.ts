import { Appointment, HealthTip, Medication, PatientDashboardService, PatientStats } from "../../types/patient.types";

const mockStats: PatientStats = {
  id: "2",
  totalConsult: 8,
  activePrescriptions: 3,
  newResults: 2,
  healthScore: 85,
};

const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctor: {
      id: "1",
      imagen: "",
      nombre: "Dr. Juan Pérez",
      especialidad: "Medicina General",
    },
    tipo: "virtual",
    estado: "pendiente",
    fecha: new Date,
    descripcion: "sdfsdfs",
    ubicacion: "sdfsdfsd"
  },
  {
    id: "1",
    doctor: {
      id: "1",
      imagen: "",
      nombre: "Dr. Juan Pérez",
      especialidad: "Medicina General",
    },
    tipo: "virtual",
    estado: "pendiente",
    fecha: new Date,
    descripcion: "sdfsdfs",
    ubicacion: "sdfsdfsd"
  },
];

const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Paracetamol",
    dosage: "500mg",
    frequency: "Cada 8 horas",
    nextDose: "Hoy 14:00",
    remainingDoses: 6,
  },
  {
    id: "2",
    name: "Omeprazol",
    dosage: "20mg",
    frequency: "Una vez al día",
    nextDose: "Mañana 08:00",
    remainingDoses: 15,
  },
  {
    id: "3",
    name: "Vitamina D",
    dosage: "2000 UI",
    frequency: "Una vez al día",
    nextDose: "Hoy 20:00",
    remainingDoses: 28,
  },
];

const mockHealthTips: HealthTip[] = [
  {
    id: "1",
    icon: "RiHeartLine",
    title: "Ejercicio Diario",
    description: "30 minutos de actividad física moderada mejoran tu salud cardiovascular.",
  },
  {
    id: "2",
    icon: "RiMoonLine",
    title: "Descanso Adecuado",
    description: "Dormir 7-8 horas fortalece tu sistema inmunológico y mejora tu bienestar.",
  },
  {
    id: "3",
    icon: "RiRunLine",
    title: "Mantente Activo",
    description: "Realiza pausas activas durante tu jornada para mantener una buena circulación.",
  },
];

export const mockPatientDashboardService: PatientDashboardService = {
  getPatientStats: async () => mockStats,
  getPatientAppointments: async () => mockAppointments,
  getPatientMedications: async () => mockMedications,
  getHealthTips: async () => mockHealthTips,
  cancelAppointment: async (appointmentId: string) => {
    // Mock implementation to cancel an appointment
    const appointmentIndex = mockAppointments.findIndex(app => app.id === appointmentId);
    if (appointmentIndex !== -1) {
      mockAppointments[appointmentIndex].estado = 'pendiente';
    }
  },
};
