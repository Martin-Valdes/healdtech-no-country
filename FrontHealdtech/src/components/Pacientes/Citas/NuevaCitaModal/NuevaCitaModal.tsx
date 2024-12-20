import { useState } from 'react'
import styles from './NuevaCitaModal.module.css'
import {
  RiCloseLine,
} from 'react-icons/ri'
// 
import {
  Doctor,
  FormData,
} from "../../../../types/citas.type"
import {
  doctoresMock,
} from "../../../../mock/patient/citas.mock"

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
    especialidad: '',
    doctor: undefined,
    fecha: '',
    hora: '',
    motivo: '',
    ubicacion: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }
  const doctoresFiltrados = doctoresMock.filter(
    (doctor) =>
      !formData.especialidad || doctor.especialidad === formData.especialidad
  )

  if (!modalAbierto) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <RiCloseLine />
        </button>

        <h2 className={styles.modalTitle}>Agendar Nueva Cita</h2>

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
            {/* doctor */}
            <label>Doctor</label>
            <select
              value={formData.doctor?.id?.toString() || ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedDoctor = doctoresMock.find(
                  (d) => d.id === Number(e.target.value)
                )

                setFormData({
                  ...formData,
                  doctor: selectedDoctor,
                  especialidad: selectedDoctor?.especialidad || '',
                  ubicacion: selectedDoctor
                    ? `Consultorio del ${selectedDoctor.nombre}`
                    : '',
                })
              }}
              required
            >
              <option value="">Seleccione un doctor</option>
              {doctoresFiltrados.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.nombre} - {doctor.especialidad}
                </option>
              ))}
            </select>
            <label>Especialidad</label>
            <select
              value={formData.especialidad}
              onChange={(e) =>
                setFormData({ ...formData, especialidad: e.target.value })
              }
              required
            >
              <option value="">Seleccione una especialidad</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Cardiología">Cardiología</option>
              <option value="Traumatología">Traumatología</option>
              <option value="Oftalmología">Oftalmología</option>
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Fecha</label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
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
      </div>
    </div>
  )
}

export default NuevaCitaModal
