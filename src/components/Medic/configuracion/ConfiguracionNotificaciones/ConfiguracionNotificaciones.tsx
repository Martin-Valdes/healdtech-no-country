import { FiBell } from 'react-icons/fi'
import styles from './ConfiguracionNotificaciones.module.css'

const ConfiguracionNotificaciones = () => {
  return (
    <div className={styles.configCard}>
      <div className={styles.cardHeader}>
        <FiBell className={styles.cardIcon} />
        <div>
          <h2>Notificaciones</h2>
          <p>Preferencias de alertas</p>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.formGroup}>
          <div className={styles.checkOption}>
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked
              />
              <label>Notificaciones por email</label>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.checkOption}>
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked
              />
              <label>Notificaciones push</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfiguracionNotificaciones