import { FiBell,} from 'react-icons/fi'
import styles from './ReportesHeader.module.css'

const ReportesHeader = () => {
  return (
    <header className={styles.header}>
        <div className="align-items-start">
          <h1 className={styles.title}>Reportes</h1>
          <div className={styles.welcomeText}>
            <FiBell /> 
            Centro de notificaciones y reportes del sistema
          </div>
        </div>
      </header>
  )
}

export default ReportesHeader
