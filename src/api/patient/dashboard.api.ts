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
    
    const response = await api.get(`/healdtech/consultas/getAllByUser/${id}`);
    console.log(response)

    return response.data;
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

  cancelAppointment: async (appointmentId: string, data: any): Promise<void> => {
    if (useMock) {
      return mockPatientDashboardService.cancelAppointment(appointmentId);
    }
      console.log(data)
    try {
      const response = await api.patch(`/consultas/${appointmentId}`, ...data);
      if (!response.data) {
        throw new Error('Error al cancelar la cita');
      }
    } catch (error) {
      console.error('Error en la llamada API:', error);
      throw error;
    }
  },
};
