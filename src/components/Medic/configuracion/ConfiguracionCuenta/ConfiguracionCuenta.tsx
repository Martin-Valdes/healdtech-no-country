import { useAuthStore } from '../../../../store/useAuth';
import styles from './ConfiguracionCuenta.module.css'
import { FiLock, FiMail } from 'react-icons/fi'

const ConfiguracionCuenta = () => {
  const { user } = useAuthStore();

  // 
  return (
    <div className={styles.configCard}>
      <div className={styles.cardHeader}>
        <FiMail className={styles.cardIcon} />
        <div>
          <h2>Cuenta</h2>
          <p>Email y seguridad</p>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.formGroup}>
          <label>Email Principal</label>
          <input
            type="email"
            className="form-control"
            defaultValue={user?.email}
            readOnly
            disabled
          />
          <span className={styles.badge}>Institucional</span>
        </div>
        <div className={styles.formGroup}>
          <label>Email Secundario</label>
          <input
            type="email"
            className="form-control"
            defaultValue="juan.rodriguez@email.com"
          />
        </div>
        <button className={styles.actionButton}>
          <FiLock /> Cambiar Contraseña
        </button>
      </div>
    </div>
  )
}

export default ConfiguracionCuenta
