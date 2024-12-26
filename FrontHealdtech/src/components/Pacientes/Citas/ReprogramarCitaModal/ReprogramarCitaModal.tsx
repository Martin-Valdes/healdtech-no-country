import { RiCloseFill } from "react-icons/ri";
import  styles  from "./ReprogramarCitaModal.module.css";
import { useState } from "react";
import { Cite, UpdatedCitaDTO } from "../../../../types/citas.type";

interface ModalReprogramarProps {
    cita: Cite
    modalAbierto: boolean
    onClose: () => void
  }

const ReprogramarCitaModal = ({ 
    cita, 
    modalAbierto, 
    onClose, 
  }: ModalReprogramarProps) => {
    const fechaCita = new Date(cita.date)
    
  
    const handleSubmit = (e: React.FormEvent) => {
      
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
               
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
  
              <div className={styles.formGroup}>
                <label>Nueva Hora</label>
                <input
                  type="time"
              
                  required
                />
              </div>
            </div>
  
            <div className={styles.formGroup}>
              <label>Motivo del cambio</label>
              <textarea
              
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