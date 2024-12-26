import { DoctorService } from "../../types/doctors.type";
import { handleApiError } from "../err/errorhandler";

import api from "../interceptors";

export const doctorApi: DoctorService = {
  getDoctor: async (id) => {
    try {
      const response = await api.get(`/healdtech/admin/doctors/${id}`);

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  getAllDoctors: async () => {
    try {
      const response = await api.get("/healdtech/admin/doctors/");

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  postDoctor: async (data) => {
    try {
      const response = await api.post("/healdtech/admin/doctors/", ...data);

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  updateDoctor: async (id, data) => {
    try {
      const response = await api.patch(
        `/healdtech/admin/doctors/${id}`,
        ...data
      );

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  deleteDoctor: async (id) => {
    try {
      const response = await api.delete(`/healdtech/admin/doctors/${id}`);

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
