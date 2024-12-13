import { PatientDashboardService } from "../../types/patient.types";
import { mockPatientDashboardService } from "../../mock/patient/dashboard.mock";
import api from "../interceptors";

const useMock = import.meta.env.VITE_USE_MOCK === "false";

const API_URL = 'https://your-api-url.com'; // You should replace this with your actual API URL
const getToken = () => 'your-token'; // You should replace this with your actual token getter

export const patientDashboardApi: PatientDashboardService = {
  getPatientStats: async () => {
    if (useMock) {
      return mockPatientDashboardService.getPatientStats();
    }
    const response = await api.get("/patient/dashboard/stats");
    return response.data;
  },

  getPatientAppointments: async () => {
    if (useMock) {
      return mockPatientDashboardService.getPatientAppointments();
    }
    const response = await api.get("/patient/dashboard/appointments");
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

  cancelAppointment: async (appointmentId: number): Promise<void> => {
    if (useMock) {
      return mockPatientDashboardService.cancelAppointment(appointmentId);
    }
    
    try {
      const response = await api.post(`/appointments/${appointmentId}/cancel`);
      if (!response.data) {
        throw new Error('Error al cancelar la cita');
      }
    } catch (error) {
      console.error('Error en la llamada API:', error);
      throw error;
    }
  },
};
