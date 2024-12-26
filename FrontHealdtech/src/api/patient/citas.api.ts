import { PatientCitesService } from "../../types/citas.type";
import { handleApiError } from "../err/errorhandler";
import api from "../interceptors";

export const patientCitasApi: PatientCitesService = {
  getNewCite: async (id) => {
    try {
      const response = await api.get(`/healdtech/consultas/consult/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    } 
  },

  getPatientCite: async (id: string) => {
    try {
      const response = await api.get(`/healdtech/consultas/consult/${id}`);
      return response.data;
    }
    catch (error) {
      return handleApiError(error);
    } 
  },

  getPatientAllCites: async (id: string) => {
    try {
      const response = await api.get(`/healdtech/consultas/getAllByUser/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateCite: async (id, data: any) => {
    try {
      const response = await api.patch(
        `/healdtech/consultas/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getPatientMedications: async () => {
    try {
      const response = await api.get("/patient/dashboard/medications");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getHealthTips: async () => {
    const response = await api.get("/patient/dashboard/health-tips");
    return response.data;
  },

  cancelCite: async (appointmentId: string, data: any): Promise<void> => {
    try {
      console.log(data)
      const response = await api.patch(`/consultas/${appointmentId}`, ...data);
      if (!response.data) {
        throw new Error("Error al cancelar la cita");
      }
      return response.data;
    } catch (error) {
      console.error("Error en la llamada API:", error);
      throw error;
    }
  },
};
