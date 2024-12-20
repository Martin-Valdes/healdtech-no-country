import { useEffect, useState } from 'react'
import styles from './CitasPanel.module.css'
import Spinner from './../../../components/common/Spinner/Spinner'
// type
import {
  Cita,
  FormData,
  CitaActualizada,
  CreateCitaDTO
} from '../../../types/citas.type'
// Imports de mocks
import {
  citasPacientesMock,
  actualizarCitaMock,
  cancelarCitaMock,
  agregarCitaMock,
} from '../../../mock/patient/citas.mock'

// Imports de componentes
import CitasPacientesHeader from '../../../components/Pacientes/Citas/CitasPacientesHeader/CitasPacientesHeader'
import CitasPacientesStats from '../../../components/Pacientes/Citas/CitasPacientesStats/CitasPacientesStats'
import CitasPacientesFilter from '../../../components/Pacientes/Citas/CitasPacientesFilter/CitasPacientesFilter'
import CitaPacienteTarjeta from '../../../components/Pacientes/Citas/CitaPacienteTarjeta/CitaPacienteTarjeta'

const CitasPanel = () => {
  const [loading, setLoading] = useState(true)
  const [citas, setCitas] = useState<Cita[]>([])
  const [citaSeleccionada, setCitaSeleccionada] = useState<number | null>(null)

  useEffect(() => {
    const cargarCitas = () => {
      setTimeout(() => {
        setCitas(citasPacientesMock)
        setLoading(false)
      }, 1000)
    }
    cargarCitas()
  }, [])

//  Reprogramar la cita
  const handleReprogramarCita = (citaActualizada: CitaActualizada) => {
    const citasActualizadas = actualizarCitaMock({
        id: citaActualizada.id,
        fecha: citaActualizada.fecha,
        estado: citaActualizada.estado,
        descripcion: citaActualizada.descripcion
    })
    setCitas([...citasActualizadas])
    if (citaSeleccionada === citaActualizada.id) {
        setCitaSeleccionada(null)
    }
}
//  cancelar cita
  const handleCancelarCita = (citaId: number) => {
    const citasActualizadas = cancelarCitaMock(citaId)
    setCitas([...citasActualizadas]) // Forzamos re-render con nuevo array
    
    if (citaSeleccionada === citaId) {
        setCitaSeleccionada(null)
    }
}
// nuevaCita
  const handleNuevaCita = (formData: FormData) => {
    const fecha = new Date(`${formData.fecha}T${formData.hora}:00`) 
    
    const nuevaCita: CreateCitaDTO = { 
        fecha,
        doctor: formData.doctor!,
        tipo: formData.tipo,
        descripcion: formData.motivo,
        ubicacion: formData.ubicacion
    }
    
    const citasActualizadas = agregarCitaMock(nuevaCita)
    setCitas([...citasActualizadas]) // Forzamos re-render con nuevo array
}
  if (loading) {
    return <Spinner text="Cargando citas... " />
  }
  return (
    <div className={styles.contenedor}>
      <CitasPacientesHeader />
      <CitasPacientesStats />
      <CitasPacientesFilter
        onFiltrosChange={(citas) => setCitas(citas)}
        citasOriginales={citasPacientesMock}
        onNuevaCita={handleNuevaCita}
      />
      <div className={styles.gridCitas}>
        {citas.map((cita) => (
          <CitaPacienteTarjeta
            key={cita.id}
            cita={cita}
            seleccionada={citaSeleccionada === cita.id}
            onSeleccionar={() =>
              setCitaSeleccionada(citaSeleccionada === cita.id ? null : cita.id)
            }
            onReprogramar={handleReprogramarCita}
            onCancelar={handleCancelarCita}
          />
        ))}
      </div>
    </div>
  )
}

export default CitasPanel
