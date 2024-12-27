// Tipos base
export interface Doctor {
  id: string
  age: number
  email: string  
  password: string   
  dateBirth: Date
  address: string
  phone: string
  name: string
  specialty: string
  imagen?: string
}

export interface Cite {
  id: string
  date: Date
  doctor: Doctor
  type: 'virtual' | 'presencial'
  state: any
  description: string
  ubicacion?: string
  notificaciones?: number
  sintomas?: string
  instrucciones?: string
  archivosAdjuntos?: boolean
}

// DTOs para operaciones
export interface CreateCitaDTO {
  date?: Date
  patientId: string 
  doctorId: string 
  type: 'virtual' | 'presencial'
  description: string
  ubicacion: string
  state: string
}

export interface UpdatedCitaDTO {
  id: string
  fecha: Date
  doctor: Doctor
  tipo: 'virtual' | 'presencial'
  estado: 'pendiente' | 'cancelada'
  descripcion: string
  ubicacion: string
}

// Tipos para formularios
export interface FormData {
  tipo: 'virtual' | 'presencial'
  specialty: string
  doctor: string
  date: string
  hora: string
  motivo: string
  ubicacion: string
}

export interface ConsejosSauld {
  especialidad: string
  doctor?: Doctor | undefined
  fecha: Date
  hora: string
  consejos: string
}

export interface NuevaCita extends Omit<Cite, 'id' | 'notificaciones' | 'sintomas' | 'instrucciones' | 'archivosAdjuntos'> {
  id: string
  state: string

}

export interface EstadisticasDetalle {
  total: number
  virtuales: number
  presenciales: number
}

export interface EstadisticasCitas extends EstadisticasDetalle {
  confirmadas: number
  pendientes: number
}

export interface PatientCitesService {
  getPatientCite: (id: string) => Promise<Cite[]>;
  getPatientAllCites: (id: string) => Promise<Cite[]>;
  getPatientMedications: () => Promise<FormData>;
  getNewCite: (data: any) => Promise<NuevaCita>;
  getHealthTips: () => Promise<ConsejosSauld>;
  updateCite: (id: string, data: any) => Promise<Cite[]>;
  cancelCite: (appointmentId: string, data: any) => Promise<void>;
}