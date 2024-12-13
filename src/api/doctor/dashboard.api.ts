import { DoctorDashboardService, mockDoctorDashboardService } from "../../mock/doctor/dashboard.mock";
import api from "../interceptors";

const useMock = import.meta.env.VITE_USE_MOCK === "false";
export const doctorDashboardApi: DoctorDashboardService = {
    getDoctorStats: async ()=>{
    if (useMock) {
      return mockDoctorDashboardService.getDoctorStats();
    }
    const response = await api.get("/doctor/dashboard/stats");
    return response.data;
  },
  getDayliAppointments: async () => {
    if (useMock) {
      return mockDoctorDashboardService.getDayliAppointments();
    }
    const response = await api.get("/doctor/dashboard/appointments");
    return response.data;
  },
  getNextPatientDetails: async () => {
    if (useMock) {
      return mockDoctorDashboardService.getNextPatientDetails();
    }
    const response = await api.get("/doctor/dashboard/next-patient");
    return response.data;
  },
};
