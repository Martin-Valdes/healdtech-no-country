import { Cita, Doctor, EstadisticasCitas, CreateCitaDTO, UpdateCitaDTO } from '../../types/citas.type'

// Mock de doctores
export const doctoresMock: Doctor[] = [
  {
    id: 1,
    nombre: 'Dr. Juan Pérez',
    especialidad: 'Medicina General',
    imagen: 'https://www.sopitas.com/wp-content/uploads/2020/10/meme-el-pepe-ete-sech-origen.png',
  },
  {
    id: 2,
    nombre: 'Dr. Carlos Ruiz',
    especialidad: 'Traumatología',
    imagen: 'https://www.sopitas.com/wp-content/uploads/2020/10/meme-el-pepe-ete-sech-origen.png',
  },
  {
    id: 3,
    nombre: 'Dr. Roberto Sánchez',
    especialidad: 'Oftalmología',
    imagen: 'https://www.sopitas.com/wp-content/uploads/2020/10/meme-el-pepe-ete-sech-origen.png',
  },
]

// Mock de citas
export const citasPacientesMock: Cita[] = [
  {
    id: 1,
    fecha: new Date(new Date().setHours(9, 30)),
    doctor: doctoresMock[0],
    tipo: 'virtual',
    estado: 'confirmada',
    descripcion: 'Control mensual',
    ubicacion: 'Consulta Virtual',
    notificaciones: 1,
    instrucciones: 'Tener los últimos exámenes a mano',
  },
  {
    id: 2,
    fecha: new Date(2024, 11, 13, 10, 30),
    doctor: doctoresMock[1],
    tipo: 'presencial',
    estado: 'confirmada',
    descripcion: 'Revisión de rodilla',
    ubicacion: 'Consultorio 205',
    notificaciones: 1,
    instrucciones: 'Traer radiografías previas',
  },
  {
    id: 3,
    fecha: new Date(2024, 0, 18, 11, 15),
    doctor: doctoresMock[2],
    tipo: 'presencial',
    estado: 'pendiente',
    descripcion: 'Control anual de vista',
    ubicacion: 'Consultorio 102',
  },
]

// Mock de estadísticas
export const estadisticasCitasMock: EstadisticasCitas = {
  total: 5,
  virtuales: 2,
  presenciales: 3,
  confirmadas: 3,
  pendientes: 2,
}

// FUNCIONES

// Funciones auxiliares
const generarNuevoId = (): number => {
  return Math.max(...citasPacientesMock.map(cita => cita.id)) + 1
}

const actualizarEstadisticas = () => {
  const stats = {
    total: citasPacientesMock.length,
    virtuales: citasPacientesMock.filter(cita => cita.tipo === 'virtual').length,
    presenciales: citasPacientesMock.filter(cita => cita.tipo === 'presencial').length,
    confirmadas: citasPacientesMock.filter(cita => cita.estado === 'confirmada').length,
    pendientes: citasPacientesMock.filter(cita => cita.estado === 'pendiente').length
  }
  return stats
}

// Funciones CRUD 
export const agregarCitaMock = (citaData: CreateCitaDTO): Cita[] => {
  const nuevaCita: Cita = {
    id: generarNuevoId(),
    ...citaData,
    estado: 'pendiente',
  }
  
  citasPacientesMock.push(nuevaCita)
  return citasPacientesMock
}

export const actualizarCitaMock = (citaData: UpdateCitaDTO): Cita[] => {
  const index = citasPacientesMock.findIndex(c => c.id === citaData.id)
  if (index === -1) throw new Error('Cita no encontrada')

  citasPacientesMock[index] = {
    ...citasPacientesMock[index],
    ...citaData,
    notificaciones: 0
  }

  actualizarEstadisticas()
  return citasPacientesMock
}

export const cancelarCitaMock = (citaId: number): Cita[] => {
  const index = citasPacientesMock.findIndex(c => c.id === citaId)
  if (index === -1) throw new Error('Cita no encontrada')

  citasPacientesMock.splice(index, 1)
  actualizarEstadisticas()
  return citasPacientesMock
}