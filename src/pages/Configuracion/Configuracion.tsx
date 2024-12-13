import { useState } from 'react'

import styles from './Configuracion.module.css'
import ConfiguracionHeader from '../../components/Medic/configuracion/ConfiguracionHeader/ConfiguracionHeader'
import ConfiguracionPerfil from '../../components/Medic/configuracion/ConfiguracionPerfil/ConfiguracionPerfil'
import ConfiguracionCuenta from '../../components/Medic/configuracion/ConfiguracionCuenta/ConfiguracionCuenta'
import ConfiguracionPreferencias from '../../components/Medic/configuracion/ConfiguracionPreferencias/ConfiguracionPreferencias'
import ConfiguracionNotificaciones from '../../components/Medic/configuracion/ConfiguracionNotificaciones/ConfiguracionNotificaciones'

// 

// 

const Configuracion = () => {
  // esto sirve para que el usuario pueda cambiar el tema de la aplicación
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={styles.ConfiguracionContainer}>
      <ConfiguracionHeader />

      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>
          <ConfiguracionPerfil />

          <ConfiguracionCuenta />

          <ConfiguracionPreferencias
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <ConfiguracionNotificaciones />
        </div>
      </div>
    </div>
  )
}

export default Configuracion
