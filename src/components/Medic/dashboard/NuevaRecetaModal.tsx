import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaPlus } from 'react-icons/fa';
import styles from './NuevaRecetaModal.module.css';
import SeleccionPaciente from './SeleccionPaciente';
interface Medicamento {
  id: string;
  nombre: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
  indicaciones: string;
}

interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  edad: number;
  historialMedico?: string[];
}

interface NuevaRecetaModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (receta: {
    paciente: string;
    medicamentos: {
      nombre: string;
      dosis: string;
      frecuencia: string;
      duracion: string;
      indicaciones?: string;
    }[];
  }) => void;
  recetaEditar?: {
    id: string;
    paciente: string;
    fecha: string;
    medicamentos: {
      nombre: string;
      dosis: string;
      frecuencia: string;
      duracion: string;
      indicaciones?: string;
    }[];
    estado: string;
  } | null;
}

const NuevaRecetaModal: React.FC<NuevaRecetaModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  recetaEditar = null,
}) => {
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Paciente | null>(null);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (recetaEditar) {
      try {
        const [nombre, ...apellidoParts] = recetaEditar.paciente.split(' ');
        setPacienteSeleccionado({
          id: recetaEditar.id,
          nombre,
          apellido: apellidoParts.join(' '),
          edad: 0,
          historialMedico: []
        });

        setMedicamentos(
          recetaEditar.medicamentos.map(med => ({
            id: crypto.randomUUID(),
            ...med,
            indicaciones: med.indicaciones || ''
          }))
        );
        setError('');
      } catch (err) {
        console.error('Error al cargar la receta para editar:', err);
        setError('Error al cargar la receta para editar');
      }
    } else {
      setPacienteSeleccionado(null);
      setMedicamentos([]);
      setError('');
    }
  }, [recetaEditar]);

  const agregarMedicamento = () => {
    const nuevoMedicamento: Medicamento = {
      id: crypto.randomUUID(),
      nombre: '',
      dosis: '',
      frecuencia: '',
      duracion: '',
      indicaciones: '',
    };
    setMedicamentos(prevMedicamentos => [...prevMedicamentos, nuevoMedicamento]);
  };

  const eliminarMedicamento = (id: string) => {
    setMedicamentos(prevMedicamentos => 
      prevMedicamentos.filter(med => med.id !== id)
    );
  };

  const actualizarMedicamento = (
    id: string,
    campo: keyof Medicamento,
    valor: string
  ) => {
    setMedicamentos(prevMedicamentos =>
      prevMedicamentos.map(med =>
        med.id === id ? { ...med, [campo]: valor } : med
      )
    );
  };

  const validarFormulario = (): boolean => {
    if (!pacienteSeleccionado) {
      setError('Por favor seleccione un paciente');
      return false;
    }
    
    if (medicamentos.length === 0) {
      setError('Debe agregar al menos un medicamento');
      return false;
    }

    const medicamentoInvalido = medicamentos.find(
      med => !med.nombre || !med.dosis || !med.frecuencia || !med.duracion
    );

    if (medicamentoInvalido) {
      setError('Todos los campos de medicamentos son obligatorios');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validarFormulario()) {
      return;
    }

    try {
      onSave({
        paciente: `${pacienteSeleccionado?.nombre} ${pacienteSeleccionado?.apellido}`.trim(),
        medicamentos: medicamentos.map(med => ({
          nombre: med.nombre.trim(),
          dosis: med.dosis.trim(),
          frecuencia: med.frecuencia.trim(),
          duracion: med.duracion.trim(),
          indicaciones: med.indicaciones.trim()
        }))
      });
      
      setPacienteSeleccionado(null);
      setMedicamentos([]);
      onRequestClose();
    } catch (err) {
      console.error('Error al guardar la receta:', err);
      setError('Error al guardar la receta');
    }
  };

  const puedeGuardar = pacienteSeleccionado && 
    medicamentos.length > 0 && 
    medicamentos.every(med => 
      med.nombre.trim() && 
      med.dosis.trim() && 
      med.frecuencia.trim() && 
      med.duracion.trim()
    );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <h2>{recetaEditar ? 'Editar Receta Médica' : 'Nueva Receta Médica'}</h2>
        <button 
          onClick={onRequestClose} 
          className={styles.closeButton}
          type="button"
          aria-label="Cerrar"
        >
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        
        <SeleccionPaciente
          onSelectPaciente={setPacienteSeleccionado}
          pacienteSeleccionado={pacienteSeleccionado}
        />

        <div className={styles.medicamentosSection}>
          <div className={styles.sectionHeader}>
            <h3>Medicamentos</h3>
            <button
              type="button"
              onClick={agregarMedicamento}
              className={styles.addButton}
              aria-label="Agregar medicamento"
            >
              <FaPlus /> Agregar medicamento
            </button>
          </div>

          {medicamentos.map((medicamento) => (
            <div key={medicamento.id} className={styles.medicamentoCard}>
              <div className={styles.medicamentoHeader}>
                <h4>Medicamento</h4>
                <button
                  type="button"
                  onClick={() => eliminarMedicamento(medicamento.id)}
                  className={styles.removeButton}
                  aria-label="Eliminar medicamento"
                >
                  <FaTimes />
                </button>
              </div>

              <div className={styles.medicamentoGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor={`nombre-${medicamento.id}`}>Nombre</label>
                  <input
                    type="text"
                    id={`nombre-${medicamento.id}`}
                    value={medicamento.nombre}
                    onChange={(e) =>
                      actualizarMedicamento(medicamento.id, 'nombre', e.target.value)
                    }
                    required
                    placeholder="Nombre del medicamento"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`dosis-${medicamento.id}`}>Dosis</label>
                  <input
                    type="text"
                    id={`dosis-${medicamento.id}`}
                    value={medicamento.dosis}
                    onChange={(e) =>
                      actualizarMedicamento(medicamento.id, 'dosis', e.target.value)
                    }
                    required
                    placeholder="Ej: 500mg"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`frecuencia-${medicamento.id}`}>Frecuencia</label>
                  <input
                    type="text"
                    id={`frecuencia-${medicamento.id}`}
                    value={medicamento.frecuencia}
                    onChange={(e) =>
                      actualizarMedicamento(medicamento.id, 'frecuencia', e.target.value)
                    }
                    required
                    placeholder="Ej: Cada 8 horas"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`duracion-${medicamento.id}`}>Duración</label>
                  <input
                    type="text"
                    id={`duracion-${medicamento.id}`}
                    value={medicamento.duracion}
                    onChange={(e) =>
                      actualizarMedicamento(medicamento.id, 'duracion', e.target.value)
                    }
                    required
                    placeholder="Ej: 7 días"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`indicaciones-${medicamento.id}`}>Indicaciones</label>
                  <textarea
                    id={`indicaciones-${medicamento.id}`}
                    value={medicamento.indicaciones}
                    onChange={(e) =>
                      actualizarMedicamento(medicamento.id, 'indicaciones', e.target.value)
                    }
                    placeholder="Instrucciones adicionales"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={onRequestClose}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={!puedeGuardar}
          >
            {recetaEditar ? 'Guardar Cambios' : 'Crear Receta'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NuevaRecetaModal;
