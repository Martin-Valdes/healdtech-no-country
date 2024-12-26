import { useState, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { FormData } from "../../../../types/citas.type";
import { Doctor } from '../../../../types/patient.types';
import styles from './NuevaCitaModal.module.css';
import { doctorApi } from '../../../../api/doctor/doctors.api';
import { all } from 'axios';

interface NuevaCitaModalProps {
  modalAbierto: boolean
  onClose: () => void
  onSubmit: (dataCita: any) => void
  
}

const NuevaCitaModal = ({
  modalAbierto,
  onClose,
  onSubmit,
}: NuevaCitaModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    tipo: 'presencial' as const,
    doctor: "",
    specialty: '',
    date: "",
    hora: '',
    motivo: '',
    ubicacion: '',
  })
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchDoctors = async () => {
      try {
        const allDoctors = await doctorApi.getAllDoctors();
        setDoctors(allDoctors);
      } catch (error) {
        console.error('Error al cargar doctores:', error);
      } finally {
        setLoading(false);
      }
    };
    searchDoctors();
  }, [formData.specialty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
    };

    const doctoresFiltrados = doctors.filter(
      (doctor) =>
        !formData.specialty || doctor.specialty === formData.specialty
    );

    if (!modalAbierto) return null
   
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <RiCloseLine />
        </button>

        <h2 className={styles.modalTitle}>Agendar Nueva Cita</h2>
        {loading ? (
          <p>Cargando doctores...</p>
        ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Tipo de Consulta</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="tipo"
                  value="presencial"
                  checked={formData.tipo === 'presencial'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tipo: e.target.value as 'virtual' | 'presencial',
                    })
                  }
                />
                Presencial
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="tipo"
                  value="virtual"
                  checked={formData.tipo === 'virtual'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tipo: e.target.value as 'virtual' | 'presencial',
                    })
                  }
                />
                Virtual
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Especialidad</label>
            <select
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              required
            >
              <option value="">Seleccione una especialidad</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Cardiology">Cardiología</option>
              <option value="Traumatologo">Traumatología</option>
              <option value="Oftalmología">Oftalmología</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Doctor</label>
            <select name="doctor" value={formData.doctor} onChange={handleChange}>
              <option value="">Seleccione un doctor</option>
              {doctoresFiltrados.map((doctor) => (
                <option key={doctor.name} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Fecha</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Hora</label>
              <select
                value={formData.hora}
                onChange={(e) =>
                  setFormData({ ...formData, hora: e.target.value })
                }
                required
              >
                <option value="">Seleccione un Horario</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Motivo de la consulta</label>
            <textarea
              value={formData.motivo}
              onChange={(e) =>
                setFormData({ ...formData, motivo: e.target.value })
              }
              required
              rows={3}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" 
            className={styles.submitButton}>
              Solicitar Turno
            </button>
          </div>
        </form>
        )}|
      </div>
    </div>
  )
}

export default NuevaCitaModal
