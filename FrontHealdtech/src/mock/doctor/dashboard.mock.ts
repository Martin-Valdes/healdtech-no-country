export interface DoctorStats {
  daily: {
    totalAppointments: number;
    virtualAppointments: number;
    efficiency: number;
    pendingConsults: number;
  };
  monthly: {
    totalPatients: number;
    satisfaction: number;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  datetime: string;
  type: "virtual" | "presencial";
  status: "confirmada" | "pendiente" | "urgente";
  patient: {
    name: string;
    symptoms: string;
  };
}

export interface NextPatientDetails {
  id: string;
  appointment: {
    time: string;
    type: "virtual" | "presencial";
    reason: string;
    status: "confirmada" | "pendiente" | "urgente";
  };
  basicInfo: {
    name: string;
    initials: string;
    birthdate: string;
    bloodType: string;
    allergies: string[];
  };
  lastVisit: {
    date: string;
    diagnosis: string;
    treatment: string;
  };
  vitalSigns: {
    temperature: number;
    bloodPressure: string;
    pcr: string;
    lastUpdate: string;
  };
  recentHistory: string[];
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
    frequency: string;
  }>;
}

export interface DoctorDashboardService {
  getDoctorStats: () => Promise<DoctorStats>;
  getDayliAppointments: () => Promise<Appointment[]>;
  getNextPatientDetails: () => Promise<NextPatientDetails>;
}

const mockDoctorStats: DoctorStats = {
  daily: {
    totalAppointments: 8,
    virtualAppointments: 5,
    efficiency: 94,
    pendingConsults: 3,
  },
  monthly: {
    totalPatients: 125,
    satisfaction: 97,
  },
};

const mockDayliAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    datetime: "2024-05-01T10:00:00",
    type: "virtual",
    status: "confirmada",
    patient: {
      name: "Juan Perez",
      symptoms: "Dolor de cabeza",
    },
  },
  {
    id: "2",
    patientId: "2",
    datetime: "2024-05-02T11:00:00",
    type: "presencial",
    status: "confirmada",
    patient: {
      name: "Maria Gomez",
      symptoms: "Dolor de cabeza, fiebre",
    },
  },
  {
    id: "3",
    patientId: "3",
    datetime: "2024-05-03T12:00:00",
    type: "virtual",
    status: "urgente",
    patient: {
      name: "Pedro Gomez",
      symptoms: "Dolor de cabeza",
    },
  },
  {
    id: "4",
    patientId: "4",
    datetime: "2024-05-04T13:00:00",
    type: "presencial",
    status: "pendiente",
    patient: {
      name: "Ana Gomez",
      symptoms: "Dolor de cabeza, fiebre",
    },
  },
];

const mockNextPatientDetails: NextPatientDetails = {
  id: "1",
  appointment: {
    time: "09:00 AM",
    type: "virtual",
    reason: "Consulta General",
    status: "confirmada",
  },
  basicInfo: {
    name: "Maria Gonzales",
    initials: "MG",
    birthdate: "1985-06-15",
    bloodType: "O+",
    allergies: ["Penicilina"],
  },
  lastVisit: {
    date: "15 Febrero 2024",
    diagnosis: "Hipertension controlada",
    treatment: "Ajuste de medicacion",
  },
  vitalSigns: {
    temperature: 36.5,
    bloodPressure: "120/80",
    pcr: "Negativo",
    lastUpdate: "15 Febrero 2024",
  },
  recentHistory: ["Dolor de cabeza", "Fiebre", "Dolor de estomago"],
  medications: [
    {
      id: "1",
      name: "Paracetamol",
      dosage: "500mg",
      frequency: "Cada 6 horas",
    },
    {
      id: "2",
      name: "Ibuprofeno",
      dosage: "500mg",
      frequency: "Cada 6 horas",
    },
  ],
};

export const mockDoctorDashboardService: DoctorDashboardService = {
  getDoctorStats: (): Promise<DoctorStats> => {
    return Promise.resolve(mockDoctorStats);
  },

  getDayliAppointments: (): Promise<Appointment[]> => {
    return Promise.resolve(mockDayliAppointments);
  },

  getNextPatientDetails: (): Promise<NextPatientDetails> => {
    return Promise.resolve(mockNextPatientDetails);
  },
};
