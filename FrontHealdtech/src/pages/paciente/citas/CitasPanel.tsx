import { useEffect, useState } from 'react';
import styles from './CitasPanel.module.css';
import Spinner from './../../../components/common/Spinner/Spinner';
import { patientCitasApi } from '../../../api/patient/citas.api';
import { Cite, CreateCitaDTO, UpdatedCitaDTO, FormData, ConsejosSauld, NuevaCita } from '../../../types/citas.type'
import { useAuthStore } from "../../../store/useAuth";

import {
  citasPacientesMock,
  agregarCitaMock,
} from '../../../mock/patient/citas.mock'

// Imports de componentes
import CitasPacientesHeader from '../../../components/Pacientes/Citas/CitasPacientesHeader/CitasPacientesHeader'
import CitasPacientesStats from '../../../components/Pacientes/Citas/CitasPacientesStats/CitasPacientesStats'
import CitasPacientesFilter from '../../../components/Pacientes/Citas/CitasPacientesFilter/CitasPacientesFilter'
import CitaPacienteTarjeta from '../../../components/Pacientes/Citas/CitaPacienteTarjeta/CitaPacienteTarjeta'

const CitasPanel = () => {
  const [loading, setLoading] = useState(true)
  const [citas, setCitas] = useState<NuevaCita[]>([])
  const [canceledCita, setCanceledCita] = useState<Cite[]>([]) 
  const [activeCitas, setActiveCitas] = useState<Cite[]>([])
  const [citaSeleccionada, setCitaSeleccionada] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(false);
  const { id } = useAuthStore();

  useEffect(() => {
    const cargarCitas = async (id: string) => {
      try {
        const dataCites = await patientCitasApi.getPatientAllCites(id);
        setCitas(dataCites);
    
        const citesCanceled = dataCites.filter((cita) => cita.state === 'cancelada');
        setCanceledCita(citesCanceled);

        const citesActive = dataCites.filter((cita) => cita.state !== 'cancelada');
        setActiveCitas(citesActive);
        
      } catch (error) {
        console.error('Error al cargar citas:', error);
      } finally {
        setLoading(false); 
      }
    };
    cargarCitas(id);
  }, [ refresh ]);
  
//  Reprogramar la cita
//   const handleReprogramarCita = (citaActualized: UpdatedCitaDTO) => {
//     const citasActualizadas = patientCitasApi.updateCite(citaActualizada){
//         id: citaActualizes.id,
//         fecha: citaActualizada.fecha,
//         estado: citaActualizada.estado,
//         descripcion: citaActualizada.descripcion
//     })
//     setCitas([...citasActualizadas])
//     if (citaSeleccionada === citaActualizada.id) {
//         setCitaSeleccionada(null)
//     }
// }
//  cancelar cita
const handleCancelarCita = async (citaId: string) => {
  try {
    const response = await patientCitasApi.updateCite(citaId, { state: 'cancelada' });
    if (!response) {
      setCitas((prevCitas) => prevCitas.filter((cita) => cita.id !== citaId));
    } else {
      console.error('Error al cancelar la cita:', response);
    }
  } catch (error) {
    console.error('Error al cancelar la cita:', error);
  }
};
// nuevaCita
  const handleNuevaCita = async (formData: FormData) => {
    const fecha = new Date(`${formData.date}T${formData.hora}:00`) 
    
    const nuevaCita: CreateCitaDTO = {
        date: fecha,
        patientId: id, 
        doctorId: formData.doctor,
        type: formData.tipo,
        description: formData.motivo,
        ubicacion: formData.ubicacion,
        state: 'activa'
    }
   try {
    const response = await patientCitasApi.getNewCite(nuevaCita)
    setRefresh((prev) => !prev);
    setCitas([...citas, response]) 
   } catch (error) {
    
   }
}
  if (loading) {
    return <Spinner text="Cargando citas... " />
  }

  return (
    <div className={styles.gridCitas}>
      <CitasPacientesHeader />
      <CitasPacientesStats />
      <CitasPacientesFilter
        onFiltrosChange={(citas) => setCitas(citas)}
        citasOriginales={citasPacientesMock}
        onNuevaCita={handleNuevaCita}
      />
  {Array.isArray(citas) && citas.length > 0 ? (
    activeCitas.map((citas) => (
      <CitaPacienteTarjeta
        key={citas.id}
        cita={citas}
        seleccionada={citaSeleccionada === citas.id}
        onSeleccionar={() =>
          setCitaSeleccionada(citaSeleccionada === citas.id ? null : citas.id)
        }
        onCancelar={handleCancelarCita}
      />
    ))
  ) : (
    <p>No hay citas disponibles.</p>
  )}
</div>

  )
}

export default CitasPanel
