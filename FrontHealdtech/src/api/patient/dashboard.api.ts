import { PatientDashboardService } from "../../types/patient.types";
import { mockPatientDashboardService } from "../../mock/patient/dashboard.mock";


import api from "../interceptors";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

export const patientDashboardApi: PatientDashboardService = {
  getPatientStats: async (id: string) => {
    if (useMock) {
      return mockPatientDashboardService.getPatientStats(id);
    }
    const response = await api.get(`/healdtech/consultas/consult/${id}`);
  
    return response.data;
  },
  
  getPatientAppointments: async (id: string) => {
    if (useMock) {
      return mockPatientDashboardService.getPatientAppointments(id);
    }
    try {
      const response = await api.get(`/healdtech/consultas/getAllByUser/${id}`);
      return response.data;
      
    } catch (error) {
      console.log(error)
    }
  },

  getPatientMedications: async () => {
    if (useMock) {
      return mockPatientDashboardService.getPatientMedications();
    }
    const response = await api.get("/patient/dashboard/medications");
    
    return response.data;
  },

  getHealthTips: async () => {
    if (useMock) {
      return mockPatientDashboardService.getHealthTips();
    }
    const response = await api.get("/patient/dashboard/health-tips");
    return response.data;
  },

  cancelAppointment: async (appointmentId: string): Promise<void> => {
    if (useMock) {
      return mockPatientDashboardService.cancelAppointment(appointmentId);
    }
    try {
      const response = await api.patch(`/consultas/${appointmentId}`);
      if (!response.data) {
        throw new Error('Error al cancelar la cita');
      }
    } catch (error) {
      console.error('Error en la llamada API:', error);
      throw error;
    }
  },
};
