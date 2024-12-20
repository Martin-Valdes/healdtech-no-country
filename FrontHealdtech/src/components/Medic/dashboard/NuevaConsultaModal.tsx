import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { 
  AiOutlineFileText, 
  AiOutlineUser, 
  AiOutlineCalendar,
  AiOutlineMedicineBox,
  AiOutlineFile,
  AiOutlineSave,
  AiOutlineClockCircle
} from 'react-icons/ai';
import { BsGenderAmbiguous, BsClipboardPulse } from 'react-icons/bs';
import { FaNotesMedical } from 'react-icons/fa';

Modal.setAppElement('#root');

interface Appointment {
  id: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  date: string;
  time: string;
  status: string;
}

interface NuevaConsultaModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const NuevaConsultaModal: React.FC<NuevaConsultaModalProps> = ({ 
  isOpen, 
  onRequestClose,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [symptoms, setSymptoms] = useState('');
  const [history, setHistory] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí cargarías las citas del día desde tu API
    const fetchAppointments = async () => {
      try {
        // Simulo datos de ejemplo - Reemplazar con llamada real a tu API
        const mockAppointments: Appointment[] = [
          {
            id: '1',
            patientName: 'Juan Pérez',
            patientAge: '35 años',
            patientGender: 'Masculino',
            date: '2024-01-20',
            time: '09:00',
            status: 'scheduled'
          },
          {
            id: '2',
            patientName: 'María García',
            patientAge: '28 años',
            patientGender: 'Femenino',
            date: '2024-01-20',
            time: '10:00',
            status: 'scheduled'
          }
        ];
        setAppointments(mockAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar las citas:', error);
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchAppointments();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAppointment) {
      alert('Por favor, seleccione una cita primero');
      return;
    }
    // Aquí puedes agregar la lógica para guardar la consulta
    console.log({ 
      appointmentId: selectedAppointment.id,
      patientName: selectedAppointment.patientName,
      symptoms, 
      history, 
      diagnosis, 
      prescription 
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Nueva Consulta Modal"
      className="mi-modal"
      overlayClassName="mi-modal-overlay"    
    >
      <div className="modal-content border-0 shadow-lg overflow-hidden bg-white rounded-3">
        <div className="modal-header text-white p-4 d-flex justify-content-between align-items-center" 
             style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)' }}>
          <div className="d-flex align-items-center">
            <FaNotesMedical className="fs-2 me-2" />
            <h2 className="mb-0 fs-4 fw-bold">Nueva Consulta Médica</h2>
          </div>
          <button 
            className="btn-close btn-close-white close-button" 
            onClick={onRequestClose} 
            aria-label="Cerrar"
            style={{ 
              padding: '1rem',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: 'none'
            }}
          />
        </div>

        <style>
          {`
            .close-button:hover {
              background-color: rgba(255, 255, 255, 0.2) !important;
            }
          `}
        </style>
        
        <div className="modal-body p-4">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2 text-muted">Cargando citas...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Selector de Citas */}
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header py-3" style={{ background: '#f8fafc' }}>
                  <h5 className="mb-0 text-primary d-flex align-items-center">
                    <AiOutlineClockCircle className="me-2" />
                    Seleccionar Cita
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-12">
                      <select 
                        className="form-select form-select-lg mb-3" 
                        value={selectedAppointment?.id || ''}
                        onChange={(e) => {
                          const appointment = appointments.find(a => a.id === e.target.value);
                          setSelectedAppointment(appointment || null);
                        }}
                        required
                      >
                        <option value="">Seleccione una cita programada</option>
                        {appointments.map(appointment => (
                          <option key={appointment.id} value={appointment.id}>
                            {appointment.time} - {appointment.patientName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAppointment && (
                <>
                  {/* Información del Paciente */}
                  <div className="card mb-4 border-0 shadow-sm">
                    <div className="card-header py-3" style={{ background: '#f8fafc' }}>
                      <h5 className="mb-0 text-primary d-flex align-items-center">
                        <AiOutlineUser className="me-2 text-primary" />
                        Información del Paciente
                      </h5>
                    </div>
                    <div className="card-body p-4">
                      <div className="row g-4">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input 
                              type="text" 
                              className="form-control bg-light" 
                              id="nombre" 
                              value={selectedAppointment.patientName} 
                              readOnly 
                            />
                            <label htmlFor="nombre" className="text-muted">
                              <AiOutlineUser className="me-1" />
                              Nombre del Paciente
                            </label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-floating">
                            <input 
                              type="text" 
                              className="form-control bg-light" 
                              id="edad" 
                              value={selectedAppointment.patientAge} 
                              readOnly 
                            />
                            <label htmlFor="edad" className="text-muted">
                              <AiOutlineCalendar className="me-1" />
                              Edad
                            </label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-floating">
                            <input 
                              type="text" 
                              className="form-control bg-light" 
                              id="sexo" 
                              value={selectedAppointment.patientGender} 
                              readOnly 
                            />
                            <label htmlFor="sexo" className="text-muted">
                              <BsGenderAmbiguous className="me-1" />
                              Sexo
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Síntomas y Signos */}
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating shadow-sm">
                        <textarea
                          id="symptoms"
                          className="form-control border-0"
                          style={{ height: '150px', resize: 'none', backgroundColor: '#f8fafc' }}
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          placeholder="Describa los síntomas del paciente..."
                          required
                        ></textarea>
                        <label htmlFor="symptoms" className="text-muted">
                          <BsClipboardPulse className="me-2" />
                          Síntomas y Signos
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating shadow-sm">
                        <textarea
                          id="history"
                          className="form-control border-0"
                          style={{ height: '150px', resize: 'none', backgroundColor: '#f8fafc' }}
                          value={history}
                          onChange={(e) => setHistory(e.target.value)}
                          placeholder="Registre cualquier antecedente relevante..."
                        ></textarea>
                        <label htmlFor="history" className="text-muted">
                          <AiOutlineFile className="me-2" />
                          Historial Médico Relevante
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating shadow-sm">
                        <textarea
                          id="diagnosis"
                          className="form-control border-0"
                          style={{ height: '150px', resize: 'none', backgroundColor: '#f8fafc' }}
                          value={diagnosis}
                          onChange={(e) => setDiagnosis(e.target.value)}
                          placeholder="Describa el diagnóstico..."
                          required
                        ></textarea>
                        <label htmlFor="diagnosis" className="text-muted">
                          <AiOutlineFileText className="me-2" />
                          Diagnóstico Clínico
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating shadow-sm">
                        <textarea
                          id="prescription"
                          className="form-control border-0"
                          style={{ height: '150px', resize: 'none', backgroundColor: '#f8fafc' }}
                          value={prescription}
                          onChange={(e) => setPrescription(e.target.value)}
                          placeholder="Ingrese la prescripción médica..."
                          required
                        ></textarea>
                        <label htmlFor="prescription" className="text-muted">
                          <AiOutlineMedicineBox className="me-2" />
                          Prescripción y Tratamiento
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="d-flex justify-content-end gap-3 mt-4">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary px-4 py-2 rounded-3 d-flex align-items-center" 
                  onClick={onRequestClose}
                >
                  Cancelar Consulta
                </button>
                <button 
                  type="submit" 
                  className="btn px-4 py-2 rounded-3 d-flex align-items-center text-white"
                  style={{ 
                    background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
                    border: 'none'
                  }}
                  disabled={!selectedAppointment}
                >
                  <AiOutlineSave className="me-2" />
                  Guardar Consulta Médica
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NuevaConsultaModal;
