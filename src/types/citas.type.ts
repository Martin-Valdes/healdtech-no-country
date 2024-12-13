// Tipos base
export interface Doctor {
  id: number
  nombre: string
  especialidad: string
  imagen: string
}

export interface Cita {
  id: number
  fecha: Date
  doctor: Doctor
  tipo: 'virtual' | 'presencial'
  estado: 'confirmada' | 'pendiente'
  descripcion: string
  ubicacion: string
  notificaciones?: number
  sintomas?: string
  instrucciones?: string
  archivosAdjuntos?: boolean
}

// DTOs para operaciones
export interface CreateCitaDTO {
  fecha: Date
  doctor: Doctor
  tipo: 'virtual' | 'presencial'
  descripcion: string
  ubicacion: string
}

export interface CitaActualizada {
  id: number
  fecha: Date
  doctor: Doctor
  tipo: 'virtual' | 'presencial'
  estado: 'pendiente'
  descripcion: string
  ubicacion: string
}

export interface UpdateCitaDTO {
  id: number
  fecha?: Date
  estado?: 'confirmada' | 'pendiente'
  descripcion?: string
}

// Tipos para formularios
export interface FormData {
  tipo: 'virtual' | 'presencial'
  especialidad: string
  doctor: Doctor | undefined
  fecha: string
  hora: string
  motivo: string
  ubicacion: string
}

export interface NuevaCita extends Omit<Cita, 'id' | 'notificaciones' | 'sintomas' | 'instrucciones' | 'archivosAdjuntos'> {
  estado: 'pendiente'
}

// Tipos para estadísticas
export interface EstadisticasCitas {
  total: number
  virtuales: number
  presenciales: number
  confirmadas: number
  pendientes: number
}