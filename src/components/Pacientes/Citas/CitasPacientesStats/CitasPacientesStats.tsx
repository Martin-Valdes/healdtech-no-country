import { RiCalendarLine, RiVideoLine, RiHospitalLine } from 'react-icons/ri'
import { citasPacientesMock } from '../../../../mock/patient/citas.mock'
import styles from './CitasPacientesStats.module.css'

const CitasPacientesStats = () => {
  // Calcular estadísticas actuales 
  const stats = {
    total: citasPacientesMock.length,
    virtuales: citasPacientesMock.filter(cita => cita.tipo === 'virtual').length,
    presenciales: citasPacientesMock.filter(cita => cita.tipo === 'presencial').length
  };
  return (
    <div className={styles.contenedorEstadisticas}>
      <div className={`${styles.cardEstadistica} ${styles.cardAzul}`}>
        <div className={styles.iconoContainer}>
          <RiCalendarLine className={styles.icono} />
        </div>
        <div className={styles.estadisticaInfo}>
          <h3>{stats.total}</h3>
          <p className={styles.label}>Total Citas</p>
        </div>
      </div>

      <div className={`${styles.cardEstadistica} ${styles.cardVioleta}`}>
        <div className={styles.iconoContainer}>
          <RiVideoLine className={styles.icono} />
        </div>
        <div className={styles.estadisticaInfo}>
          <h3>{stats.virtuales}</h3>
          <p className={styles.label}>Citas Virtuales</p>
        </div>
      </div>

      <div className={`${styles.cardEstadistica} ${styles.cardVerde}`}>
        <div className={styles.iconoContainer}>
          <RiHospitalLine className={styles.icono} />
        </div>
        <div className={styles.estadisticaInfo}>
          <h3>{stats.presenciales}</h3>
          <p className={styles.label}>Citas Presenciales</p>
        </div>
      </div>
    </div>
  )
}

export default CitasPacientesStats