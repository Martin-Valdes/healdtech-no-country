import {
  FiCheck,
  FiAlertCircle,
  FiPhoneCall,
  FiMail,
  FiCalendar,
} from 'react-icons/fi'
import styles from './consultaItem.module.css'
import ConsultaAssignModal from './ConsultaAssignModal'
import { useState } from 'react'

interface ConsultaItemProps {
  consulta: {
    id: number;
    paciente: string;
    telefono: string;
    email: string;
    tipo: string;
    fechaSolicitud: string;
    especialidad: string;
    prioridad: string;
    motivo: string;
    horarioPreferido: string;
    tiempoEspera: string;
  }
}

const ConsultaItem = ({ consulta }: ConsultaItemProps) => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const initials = consulta.paciente
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <>
      <div className={styles.consultaItem}>
        <div className={styles.pacienteHeader}>
          <div className={styles.pacienteIcon}>{initials}</div>
          <div className={styles.pacienteInfo}>
            <div className={styles.pacienteNombre}>
              <span className={styles.nombreTexto}>{consulta.paciente}</span>
              <span
                className={`${styles.statusBadge} ${
                  styles[consulta.prioridad]
                }`}
              >
                {consulta.prioridad}
              </span>
            </div>
            <div className={styles.especialidadTexto}>
              {consulta.especialidad} - {consulta.tipo}
            </div>
            <div className={styles.symptoms}>
              <FiAlertCircle />
              {consulta.motivo}
            </div>
            <div className={styles.consultaMetadata}>
              <div className={styles.metadataRow}>
                <FiCalendar />
                <span>Solicitado: {consulta.fechaSolicitud}</span>
                <span className={styles.preferencia}>
                  Preferencia: {consulta.horarioPreferido}
                </span>
              </div>
              <div className={styles.metadataRow}>
                <FiPhoneCall />
                <span>{consulta.telefono}</span>
              </div>
              <div className={styles.metadataRow}>
                <FiMail />
                <span>{consulta.email}</span>
              </div>
            </div>
          </div>
          <div className={styles.consultaActions}>
            <button
              className={`${styles.btnGeneral} ${styles.btnAsignar}`}
              onClick={() => setIsAssignModalOpen(true)}
            >
              <FiCheck /> Asignar
            </button>
          </div>
        </div>
      </div>

      <ConsultaAssignModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        consulta={consulta}
        establecimiento="Hospital General San Martín Av. Rivadavia 1250, Buenos Aires"
      />
    </>
  );
};

export default ConsultaItem;