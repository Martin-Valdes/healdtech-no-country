import { useMemo, useState } from 'react'
import { FiClock, FiCalendar, FiUser } from 'react-icons/fi'
import styles from './consultasMedic.module.css'
import DisponibilidadPanel from '../../components/Medic/consultas/DisponibilidadPanel/DisponibilidadPanel'
import StatCard from '../../components/Medic/consultas/StatCard/StatCard'
import ConsultaItem from '../../components/Medic/consultas/ConsultaItem/ConsultaItem'
import SummaryCard from '../../components/Medic/consultas/SummaryCard/SummaryCard'
import ConsultasHeader from '../../components/Medic/consultas/ConsultasHeader/ConsultasHeader'
import ConsultasFilter, {
  FilterType,
} from '../../components/Medic/consultas/ConsultasFilter/ConsultasFilter'
import ProximasAcciones from '../../components/Medic/consultas/ProximasAcciones/ProximasAcciones'

// simulación consultas
const consultasPendientes = [
  {
    id: 1,
    paciente: 'Roberto Méndez',
    telefono: '+34 612 345 678',
    email: 'roberto.mendez@email.com',
    tipo: 'Primera Consulta',
    fechaSolicitud: '22 Mar 2024',
    especialidad: 'Cardiología',
    prioridad: 'alta',
    motivo: 'Dolor en el pecho, fatiga',
    horarioPreferido: 'Mañana',
    tiempoEspera: '2 días',
  },
  {
    id: 2,
    paciente: 'Laura Torres',
    telefono: '+34 623 456 789',
    email: 'laura.torres@email.com',
    tipo: 'Seguimiento',
    fechaSolicitud: '23 Mar 2024',
    especialidad: 'Medicina General',
    prioridad: 'media',
    motivo: 'Control rutinario',
    horarioPreferido: 'Tarde',
    tiempoEspera: '1 día',
  },
  {
    id: 3,
    paciente: 'Miguel Ángel Ruiz',
    telefono: '+34 634 567 890',
    email: 'miguel.ruiz@email.com',
    tipo: 'Seguimiento',
    fechaSolicitud: '24 Mar 2024',
    especialidad: 'Endocrinología',
    prioridad: 'baja',
    motivo: 'Niveles altos de aburrimiento',
    horarioPreferido: 'Cualquiera',
    tiempoEspera: '5 horas',
  },
]

// Filtrado
const consultasMedic = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('todo')

  const filteredConsultas = useMemo(() => {
    return consultasPendientes.filter((consulta) => {
      const matchesSearch = consulta.paciente
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesFilter =
        selectedFilter === 'todo' || consulta.tipo === selectedFilter
      return matchesSearch && matchesFilter
    })
  }, [searchTerm, selectedFilter])
  
  // estadísticas
  const stats = [
    {
      icon: <FiClock />,
      label: 'Total Pendientes',
      value: 15,
      trend: '5 > 48h',
    },
    {
      icon: <FiCalendar />,
      label: 'Solicitudes Hoy',
      value: 8,
      trend: `+${1} Solicitudes Hoy`,
    },
    {
      icon: <FiUser />,
      label: 'Primera Consulta',
      value: 6,
      trend: '40% del total',
    },
    {
      icon: <FiUser />,
      label: 'Primera Consulta',
      value: 6,
      trend: '40% del total',
    },
  ]

  return (
    <div className={styles.consultasContainer}>
      {/* Header  */}
      <header>
        <ConsultasHeader totalHoy={15} />
      </header>

      {/* Stats / estadísticas */}
      <div className={styles.statsWrapper}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className={styles.contentGrid}>
        {/* búsqueda y filtro*/}
        <div className={styles.listSection}>
          <div className={styles.listHeader}>
            <h2>Lista de Espera</h2>
          </div>
          <ConsultasFilter
            searchTerm={searchTerm}
            selectedFilter={selectedFilter}
            onSearchChange={setSearchTerm}
            onFilterChange={setSelectedFilter}
          />
          {/* Lista de consultas */}
          {filteredConsultas.map((consulta) => (
            <ConsultaItem key={consulta.id} consulta={consulta} />
          ))}
          
        </div>

        <aside className={styles.summaryPanel}>
          {/* Panel Resumen de Pendientes */}
          <SummaryCard
            title="Resumen de Pendientes"
            items={[
              { label: 'Urgentes', value: 3 },
              { label: 'Primera Vez', value: 6 },
              { label: 'Seguimiento', value: 4 },
              { label: 'Más de 48h', value: 5 },
            ]}
          />
          {/* Panel Disponibilidad Esta Semana */}
          <ProximasAcciones />
          <DisponibilidadPanel />
        </aside>
      </div>
    </div>
  )
}

export default consultasMedic
