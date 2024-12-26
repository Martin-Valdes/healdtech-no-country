import { DoctorDashboardService, mockDoctorDashboardService } from "../../mock/doctor/dashboard.mock";
import { handleApiError } from "../err/errorhandler";
import api from "../interceptors";

const useMock = import.meta.env.VITE_USE_MOCK === "false";

export const doctorDashboardApi: DoctorDashboardService = {
    getDoctorStats: async ()=>{
    if (useMock) {
      return mockDoctorDashboardService.getDoctorStats();
    }
    try {
      const response = await api.get("/doctor/dashboard/stats");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  getDayliAppointments: async () => {
    if (useMock) {
      return mockDoctorDashboardService.getDayliAppointments();
    }
    try {
      const response = await api.get("/doctor/dashboard/appointments");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  getNextPatientDetails: async () => {
    if (useMock) {
      return mockDoctorDashboardService.getNextPatientDetails();
    }
    try {
      const response = await api.get("/doctor/dashboard/next-patient");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
