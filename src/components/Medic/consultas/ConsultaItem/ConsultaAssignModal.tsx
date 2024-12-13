import React, { useState } from 'react'
import {
  FiX,
  FiCalendar,
  FiVideo,
  FiClock,
  FiLoader,
  FiMapPin,
} from 'react-icons/fi'
import styles from './consultaAssignModal.module.css'

// Interfaces para tipado
interface MeetingDetails {
  id: string;
  meetUrl: string;
}

interface ConsultaAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  consulta: {
    id: number;
    paciente: string;
    especialidad: string
  }
  establecimiento: string
}

const ConsultaAssignModal = ({
  isOpen,
  onClose,
  consulta,
  establecimiento,
}: ConsultaAssignModalProps) => {
  // Estados del formulario
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails | null>(
    null
  );
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [duration, setDuration] = useState('30');
  const [error, setError] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState('online');;

  // Genera las opciones de horarios disponibles de 9:00 a 18:30
  const generateTimeSlots = () => {
    const slots = []
    for (let i = 9; i <= 18; i++) {
      slots.push(`${i}:00`)
      slots.push(`${i}:30`)
    }
    return slots
  };

  // Crea el link de Google Meet
  const handleCreateMeeting = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Por favor seleccione fecha y hora');
      return;
    }

    setIsCreatingMeeting(true);
    setError(null);

    try {
      // Genera un link nuevo de Meet
      const meetUrl = 'https://meet.google.com/new';
      setMeetingDetails({
        id: 'new-meeting',
        meetUrl: meetUrl,
      })
    } catch (error) {
      console.error('Error al crear reunión:', error);
      setError('No se pudo crear la reunión. Intente nuevamente.');
    } finally {
      setIsCreatingMeeting(false);
    }
  }

  // Guarda la asignación de la consulta
  const handleAssign = async () => {
    if (
      !selectedDate ||
      !selectedTime ||
      (consultationType === 'online' && !meetingDetails)
    ) {
      setError(
        'Por favor complete todos los campos y genere el link de la reunión'
      )
      return;
    }

    setIsCreatingMeeting(true)
    setError(null)

    try {
      // Datos de la asignación
      const assignmentData = {
        consultaId: consulta.id,
        fechaConsulta: selectedDate,
        horaConsulta: selectedTime,
        duracion: duration,
        tipo: consultationType,
        ...(consultationType === 'online'
          ? { meetingDetails }
          : { location: establecimiento }),
        paciente: consulta.paciente,
        especialidad: consulta.especialidad,
      };

      console.log('Consulta asignada:', assignmentData);
      onClose()
    } catch (error) {
      setError('No se pudo asignar la consulta. Intente nuevamente.');
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  // Limpia el formulario al cerrar
  const handleCloseModal = () => {
    setSelectedDate('');
    setSelectedTime('');
    setMeetingDetails(null);
    setError(null);
    setDuration('30');
    setConsultationType('online');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Header del modal */}
        <div className={styles.modalHeader}>
          <h2>Asignar Consulta</h2>
          <button onClick={handleCloseModal} className={styles.closeButton}>
            <FiX size={24} />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Info del paciente */}
          <div className={styles.patientInfo}>
            <p className={styles.patientName}>{consulta.paciente}</p>
            <p className={styles.specialty}>{consulta.especialidad}</p>
          </div>

          {/* Selector de fecha */}
          <div className={styles.formGroup}>
            <label>
              <FiCalendar className={styles.icon} />
              Fecha de consulta
            </label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setMeetingDetails(null);
              }}
            />
          </div>

          {/* Selector de hora */}
          <div className={styles.formGroup}>
            <label>
              <FiClock className={styles.icon} />
              Hora de consulta
            </label>
            <select
              value={selectedTime}
              onChange={(e) => {
                setSelectedTime(e.target.value);
                setMeetingDetails(null);
              }}
            >
              <option value="">Seleccione una hora</option>
              {generateTimeSlots().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de duración */}
          <div className={styles.formGroup}>
            <label>
              <FiClock className={styles.icon} />
              Duración
            </label>
            <select
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                setMeetingDetails(null);
              }}
            >
              <option value="30">30 minutos</option>
              <option value="45">45 minutos</option>
              <option value="60">1 hora</option>
            </select>
          </div>
          {/* Tipo de consulta */}
          <div className={styles.formGroup}>
            <label>Tipo de consulta</label>
            <select
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
            >
              <option value="online">Online</option>
              <option value="presencial">Presencial</option>
            </select>
          </div>
          {/* Sección de Google Meet */}
          {consultationType === 'online' ? (
            <div className={styles.meetSection}>
              <div className={styles.meetHeader}>
                <div className={styles.meetTitle}>
                  <FiVideo className={styles.icon} />
                  <span>Google Meet</span>
                </div>
                {!meetingDetails && (
                  <button
                    onClick={handleCreateMeeting}
                    disabled={
                      isCreatingMeeting || !selectedDate || !selectedTime
                    }
                    className={styles.generateButton}
                  >
                    {isCreatingMeeting ? (
                      <FiLoader className={styles.spinner} />
                    ) : (
                      'Generar link'
                    )}
                  </button>
                )}
              </div>

              {/* Muestra el link o mensaje de placeholder */}
              {meetingDetails ? (
                <div className={styles.meetDetails}>
                  <p>
                    Link de la reunión: <br/>
                    <a
                      href={meetingDetails.meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.meetLink}
                    >
                      {meetingDetails.meetUrl}
                    </a>
                  </p>
                </div>
              ) : (
                <p className={styles.meetPlaceholder}>
                  Genere un link de Google Meet para la fecha y hora
                  seleccionada
                </p>
              )}
            </div>
          ) : (
            <div className={styles.locationSection}>
              <div className={styles.locationTitle}>
                <FiMapPin className={styles.icon} />
                <span>Ubicación de la consulta</span>
              </div>
              <select className="form-control " disabled>
                <option>{establecimiento}</option>
              </select>
              <p className="form-text text-muted"></p>
            </div>
          )}

          {/* Mensaje de error si existe */}
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>

        {/* Footer con botones */}
        <div className={styles.modalFooter}>
          <button onClick={handleCloseModal} className={styles.cancelButton}>
            Cancelar
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDate || !selectedTime || isCreatingMeeting}
            className={styles.confirmButton}
          >
            {isCreatingMeeting ? (
              <FiLoader className={styles.spinner} />
            ) : (
              'Confirmar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultaAssignModal;