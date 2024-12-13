import { FiAlertCircle, FiClock, FiSettings, FiUser } from 'react-icons/fi'
import styles from './ConfiguracionHeader.module.css'
import { RiTimeLine } from 'react-icons/ri'

const ConfiguracionHeader = () => {
  return (
    <div className={styles.header}>
      <div className="align-items-start">
        <h1 className={styles.title}>Configuración</h1>
        <div className={styles.welcomeText}>
          <FiSettings />
          Gestiona tu perfil y preferencias
        </div>
      </div>
    </div>
  )
}

export default ConfiguracionHeader
