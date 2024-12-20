import { useState } from 'react'
import { Cita } from '../../../../types/citas.type'
import styles from './CitasPacientesFilter.module.css'
import NuevaCitaModal from '../NuevaCitaModal/NuevaCitaModal'

interface FiltrosCitasProps {
  onFiltrosChange: (citasFiltradas: Cita[]) => void
  citasOriginales: Cita[]
  onNuevaCita: (dataCita: any) => void

}

const CitasPacientesFilter = ({
  onFiltrosChange,
  citasOriginales,
  onNuevaCita,
}: FiltrosCitasProps) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('')
  const [filtroFecha, setFiltroFecha] = useState<
    'proximas' | 'hoy' | 'semana' | 'mes'
  >('proximas')
  const [filtroEstado, setFiltroEstado] = useState<
    'todas' | 'confirmada' | 'pendiente'
  >('todas')
  const [filtroTipo, setFiltroTipo] = useState<
    'todos' | 'virtual' | 'presencial'
  >('todos')

  const handleNuevaCita = () => {
    setModalAbierto(true)
  }
  // handleGuardarCita es para guardar la nueva cita 
  const handleGuardarCita = (formData: FormData) => {
    onNuevaCita(formData)
    setModalAbierto(false)
}
  const aplicarFiltros = (
    textoBusqueda: string,
    fecha: typeof filtroFecha,
    estado: typeof filtroEstado,
    tipo: typeof filtroTipo
  ) => {
    const citasFiltradas = citasOriginales.filter((cita) => {
      const coincideBusqueda =
        cita.doctor.nombre
          .toLowerCase()
          .includes(textoBusqueda.toLowerCase()) ||
        cita.doctor.especialidad
          .toLowerCase()
          .includes(textoBusqueda.toLowerCase()) ||
        cita.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())

      // Filtro de estado
      const coincideEstado = estado === 'todas' || cita.estado === estado
      // Filtro de tipo
      const coincideTipo = tipo === 'todos' || cita.tipo === tipo

      // Solo aplicar filtro de fecha si no está en 'proximas'
      if (fecha === 'proximas') {
        return coincideBusqueda && coincideEstado && coincideTipo
      }

      const fechaCita = new Date(cita.fecha)
      const hoy = new Date()
      const unaSemana = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000)
      const unMes = new Date(hoy.getTime() + 30 * 24 * 60 * 60 * 1000)

      let coincideFecha = true
      switch (fecha) {
        case 'hoy':
          coincideFecha = fechaCita.toDateString() === hoy.toDateString()
          break
        case 'semana':
          coincideFecha = fechaCita <= unaSemana
          break
        case 'mes':
          coincideFecha = fechaCita <= unMes
          break
      }

      return coincideBusqueda && coincideEstado && coincideTipo && coincideFecha
    })

    onFiltrosChange(citasFiltradas)
  }

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
    setBusqueda(valor)
    aplicarFiltros(valor, filtroFecha, filtroEstado, filtroTipo)
  }

  const handleFechaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value as typeof filtroFecha
    setFiltroFecha(valor)
    aplicarFiltros(busqueda, valor, filtroEstado, filtroTipo)
  }

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value as typeof filtroEstado
    setFiltroEstado(valor)
    aplicarFiltros(busqueda, filtroFecha, valor, filtroTipo)
  }

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value as typeof filtroTipo
    setFiltroTipo(valor)
    aplicarFiltros(busqueda, filtroFecha, filtroEstado, valor)
  }
  return (
    <div className={styles.panelControl}>
      <div className={styles.contenedorControles}>
        <div className={styles.contenedorBusqueda}>
          <input
            type="text"
            placeholder="Buscar por doctor, especialidad o descripción..."
            className={styles.inputBusqueda}
            value={busqueda}
            onChange={handleBusquedaChange}
          />
        </div>

        <select
          className={styles.selectFiltro}
          value={filtroFecha}
          onChange={handleFechaChange}
        >
          <option value="proximas">Próximas citas</option>
          <option value="hoy">Hoy</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mes</option>
        </select>

        <select
          className={styles.selectFiltro}
          value={filtroEstado}
          onChange={handleEstadoChange}
        >
          <option value="todas">Todas las citas</option>
          <option value="confirmada">Confirmadas</option>
          <option value="pendiente">Pendientes</option>
        </select>

        <select
          className={styles.selectFiltro}
          value={filtroTipo}
          onChange={handleTipoChange}
        >
          <option value="todos">Todos los tipos</option>
          <option value="virtual">Virtuales</option>
          <option value="presencial">Presenciales</option>
        </select>

          <button className={styles.botonAgendar} onClick={handleNuevaCita} >Nueva Cita</button>
          <NuevaCitaModal
            modalAbierto={modalAbierto}
            onClose={() => setModalAbierto(false)}
            onSubmit={handleGuardarCita}
          />
      </div>
    </div>
  )
}

export default CitasPacientesFilter
