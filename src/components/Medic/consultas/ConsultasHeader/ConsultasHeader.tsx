import { FiAlertCircle, FiClock } from 'react-icons/fi'
import styles from './consultasHeader.module.css'
import { RiTimeLine } from 'react-icons/ri'

interface ConsultasHeaderProps {
  totalHoy?: number
}

const ConsultasHeader = ({ totalHoy }: ConsultasHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className='align-items-start'>
        <h1 className={styles.title}>Panel de Citas</h1>
        <div className={styles.welcomeText}>
          Bienvenido a tu panel de consultas pendientes
          <div className='gap-1 d-inline-flex align-items-center'>
            <FiClock />
            {totalHoy} consultas requieren atención
          </div>
        </div>
      </div>
      <div className={styles.headerStats}>
        <div className={styles.miniStat}>
            <RiTimeLine />
            <span>Tiempo promedio: 1.5 días</span>
          </div>
        <div className={`text-danger ${styles.miniStat}`}>
          <FiAlertCircle />
          <span className='text-danger'>3 casos urgentes</span>
        </div>
      </div>
    </div>
  )
}

export default ConsultasHeader
