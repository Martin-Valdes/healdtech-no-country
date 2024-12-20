import React from 'react';
import { Medication } from '../types/patient.types';
import styles from './Modal.module.css';
import { RiMedicineBottleLine, RiTimeLine, RiNotification3Line, RiCloseLine } from 'react-icons/ri';

interface MedicationDetailsModalProps {
  medication: Medication;
  isOpen: boolean;
  onClose: () => void;
  onSetReminder: (medication: Medication, time: string) => void;
}

export const MedicationDetailsModal: React.FC<MedicationDetailsModalProps> = ({
  medication,
  isOpen,
  onClose,
  onSetReminder,
}) => {
  const [reminderTime, setReminderTime] = React.useState('');

  if (!isOpen) return null;

  const handleSetReminder = (e: React.FormEvent) => {
    e.preventDefault();
    onSetReminder(medication, reminderTime);
    setReminderTime('');
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <RiCloseLine />
        </button>

        <div className={styles.modalHeader}>
          <RiMedicineBottleLine className={styles.modalIcon} />
          <h2>{medication.name}</h2>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.medicationDetails}>
            <div className={styles.detailItem}>
              <strong>Dosis:</strong>
              <span>{medication.dosage}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Frecuencia:</strong>
              <span>{medication.frequency}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Próxima dosis:</strong>
              <span>{medication.nextDose}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Dosis restantes:</strong>
              <span>{medication.remainingDoses}</span>
            </div>
          </div>

          <div className={styles.reminderSection}>
            <h3>
              <RiNotification3Line /> Configurar Recordatorio
            </h3>
            <form onSubmit={handleSetReminder}>
              <div className={styles.formGroup}>
                <label htmlFor="reminderTime">Hora del recordatorio:</label>
                <input
                  type="time"
                  id="reminderTime"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.primaryButton}>
                Establecer Recordatorio
              </button>
            </form>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryButton} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
