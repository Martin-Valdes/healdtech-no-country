import { RiCloseFill } from "react-icons/ri";
import  styles  from "./ReprogramarCitaModal.module.css";
import { useState } from "react";
import { Cita, CitaActualizada } from "../../../../types/citas.type";

interface ModalReprogramarProps {
    cita: Cita
    modalAbierto: boolean
    onClose: () => void
    onSubmit: (citaActualizada: CitaActualizada) => void
  }

const ReprogramarCitaModal = ({ 
    cita, 
    modalAbierto, 
    onClose, 
    onSubmit 
  }: ModalReprogramarProps) => {
    const fechaCita = new Date(cita.fecha)
    const [formData, setFormData] = useState({
      tipo: cita.tipo,
      fecha: fechaCita.toISOString().split('T')[0],
      hora: fechaCita.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      motivo: cita.descripcion
    })
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const citaActualizada: CitaActualizada = {
          ...cita,
          fecha: new Date(`${formData.fecha}T${formData.hora}`),
          estado: 'pendiente',
          descripcion: formData.motivo  // Asegurarnos de usar el motivo actualizado
      }
      onSubmit(citaActualizada)
      onClose()
  }
  
    if (!modalAbierto) return null
  
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            <RiCloseFill />
          </button>
  
          <h2 className={styles.modalTitle}>Reprogramar Cita</h2>
  
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Nueva Fecha</label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
  
              <div className={styles.formGroup}>
                <label>Nueva Hora</label>
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  required
                />
              </div>
            </div>
  
            <div className={styles.formGroup}>
              <label>Motivo del cambio</label>
              <textarea
                value={formData.motivo}
                onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                required
                rows={3}
              />
            </div>
  
            <div className={styles.buttonGroup}>
              <button type="button" className={styles.cancelButton} onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className={styles.submitButton}>
                Confirmar cambio
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  export default ReprogramarCitaModal