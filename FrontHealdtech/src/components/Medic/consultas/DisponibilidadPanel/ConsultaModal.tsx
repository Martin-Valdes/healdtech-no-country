import styles from './ConsultaModal.module.css'

interface ConsultaModalProps {
  isOpen: boolean
  onClose: () => void
  fecha: string
}

const ConsultaModal = ({ isOpen, onClose, fecha }: ConsultaModalProps) => {
  const horarios = [
    {
      hora: '09:00',
      tipo: 'online',
      ocupado: false,
    },
    {
      hora: '10:00',
      tipo: 'presencial',
      ocupado: true,
      paciente: 'Laura Torres',
      motivo: 'Control rutinario',
      prioridad: 'media',
    },
    {
      hora: '11:00',
      tipo: 'online',
      ocupado: true,
      paciente: 'Miguel Ruiz',
      motivo: 'Niveles altos de aburrimiento',
      prioridad: 'baja',
    },
    {
      hora: '12:00',
      tipo: 'presencial',
      ocupado: false,
    },
    {
      hora: '16:00',
      tipo: 'online',
      ocupado: false,
    },
    {
      hora: '17:00',
      tipo: 'presencial',
      ocupado: true,
      paciente: 'Roberto Méndez',
      motivo: 'Dolor en el pecho, fatiga',
      prioridad: 'alta',
    },
  ]

  if (!isOpen) return null

  return (
    <>
      <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <h2>Horarios {fecha}</h2>
            <span className={styles.disponibilidad}>
              {horarios.filter(h => !h.ocupado).length} espacios disponibles
            </span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.timeGrid}>
            {horarios.map((horario) => (
              <div 
                key={horario.hora} 
                className={`${styles.timeSlot} ${horario.ocupado ? styles.ocupado : styles.disponible}`}
              >
                <div className={styles.timeHeader}>
                  <span className={styles.time}>{horario.hora}</span>
                  <span className={`${styles.tipoBadge} ${styles[horario.tipo]}`}>
                    {horario.tipo}
                  </span>
                </div>
                <div className={styles.consultaInfo}>
                  {horario.ocupado ? (
                    <>
                      <span className={`${styles.prioridad} ${horario.prioridad ? styles[horario.prioridad] : ''}`}>
                        {horario.prioridad}
                      </span>
                      <span className={styles.paciente}>{horario.paciente}</span>
                      <span className={styles.motivo}>{horario.motivo}</span>
                    </>
                  ) : (
                    <span className={styles.disponibleText}>Espacio Disponible</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default ConsultaModal
