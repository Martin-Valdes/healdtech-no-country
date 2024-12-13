import { Appointment } from '../types/patient.types';
import styles from './AppointmentDetailsModal.module.css';
import { RiCloseLine, RiTimeLine, RiMapPinLine, RiUserLine, RiStethoscopeLine } from 'react-icons/ri';
import Modal from 'react-modal';
import { useState } from 'react';

Modal.setAppElement('#root');

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onJoinMeeting?: (appointmentId: number) => void;
  onReschedule?: (appointmentId: number) => void;
  onCancel?: (appointmentId: number) => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    padding: '24px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: 'white',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
};

export const AppointmentDetailsModal = ({ 
  isOpen, 
  onClose, 
  appointment,
  onJoinMeeting,
  onReschedule,
  onCancel
}: AppointmentDetailsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!appointment) return null;

  const handleJoinMeeting = async () => {
    try {
      setIsLoading(true);
      if (onJoinMeeting) {
        await onJoinMeeting(appointment.id);
      } else {
        // Comportamiento por defecto
        window.open('https://meet.google.com', '_blank');
      }
    } catch (error) {
      console.error('Error al unirse a la consulta:', error);
      alert('No se pudo iniciar la consulta virtual. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReschedule = async () => {
    try {
      setIsLoading(true);
      if (onReschedule) {
        await onReschedule(appointment.id);
      } else {
        // Comportamiento por defecto
        alert('Funcionalidad de reprogramación en desarrollo');
      }
    } catch (error) {
      console.error('Error al reprogramar la cita:', error);
      alert('No se pudo reprogramar la cita. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (window.confirm('¿Está seguro que desea cancelar esta cita?')) {
      try {
        setIsLoading(true);
        if (onCancel) {
          await onCancel(appointment.id);
          onClose();
        } else {
          // Comportamiento por defecto
          alert('Funcionalidad de cancelación en desarrollo');
        }
      } catch (error) {
        console.error('Error al cancelar la cita:', error);
        alert('No se pudo cancelar la cita. Por favor, intente nuevamente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Detalles de la Cita"
    >
      <button className={styles.closeButton} onClick={onClose}>
        <RiCloseLine />
      </button>

      <div className={styles.modalHeader}>
        <h2>Detalles de la Cita</h2>
        <span className={`${styles.appointmentType} ${styles[appointment.type]}`}>
          {appointment.type === 'virtual' ? '🖥 Virtual' : '🏥 Presencial'}
        </span>
      </div>

      <div className={styles.modalBody}>
        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <RiUserLine />
            <div>
              <h3>Doctor</h3>
              <p>{appointment.doctor.name}</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <RiStethoscopeLine />
            <div>
              <h3>Especialidad</h3>
              <p>{appointment.doctor.specialty}</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <RiTimeLine />
            <div>
              <h3>Fecha y Hora</h3>
              <p>
                {new Date(appointment.datetime).toLocaleDateString()} - {" "}
                {new Date(appointment.datetime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </div>

          {appointment.type === 'presencial' && (
            <div className={styles.infoItem}>
              <RiMapPinLine />
              <div>
                <h3>Ubicación</h3>
                <p>Consultorio 304, Edificio Principal</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.appointmentNotes}>
          <h3>Notas Importantes</h3>
          <ul>
            <li>Por favor, llegue 10 minutos antes de su cita</li>
            {appointment.type === 'virtual' ? (
              <>
                <li>Asegúrese de tener una conexión estable a internet</li>
                <li>Tenga su cámara y micrófono listos</li>
              </>
            ) : (
              <>
                <li>Traiga su documento de identidad</li>
                <li>Use mascarilla durante toda su visita</li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className={styles.modalFooter}>
        {appointment.type === 'virtual' && (
          <button 
            className={styles.joinButton}
            onClick={handleJoinMeeting}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando...' : 'Unirse a la Consulta Virtual'}
          </button>
        )}
        <button 
          className={styles.rescheduleButton}
          onClick={handleReschedule}
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Reprogramar Cita'}
        </button>
        <button 
          className={styles.cancelButton}
          onClick={handleCancel}
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Cancelar Cita'}
        </button>
      </div>
    </Modal>
  );
};
