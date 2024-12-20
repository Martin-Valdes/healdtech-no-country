import styles from './ConfiguracionPreferencias.module.css'
import { FiMoon, FiSettings, FiSun } from 'react-icons/fi'

interface PreferencesSectionProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
  }

const ConfiguracionPreferencias = ({ darkMode, setDarkMode }: PreferencesSectionProps) => {
  return (
    <div className={styles.configCard}>
      <div className={styles.cardHeader}>
        <FiSettings className={styles.cardIcon} />
        <div>
          <h2>Preferencias</h2>
          <p>Personalización del sistema</p>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.formGroup}>
          <label>Idioma</label>
          <select className="form-select">
            <option>Español</option>
            <option>English</option>
          </select>
        </div>
        <div className={styles.themeToggle}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={styles.themeButton}
          >
            {darkMode ? <FiMoon size={20} /> : <FiSun size={20} />}
            <span>{darkMode ? 'Modo Oscuro' : 'Modo Claro'}</span>
            <div
              className={`${styles.toggleSwitch} ${
                darkMode ? styles.active : ''
              }`}
            >
              <div className={styles.toggleKnob} />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfiguracionPreferencias
