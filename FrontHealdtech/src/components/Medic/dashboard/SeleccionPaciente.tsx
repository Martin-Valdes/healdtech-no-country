import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './NuevaRecetaModal.module.css';

interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  edad: number;
  historialMedico?: string[];
}

interface SeleccionPacienteProps {
  onSelectPaciente: (paciente: Paciente | null) => void;
  pacienteSeleccionado: Paciente | null;
}

const SeleccionPaciente: React.FC<SeleccionPacienteProps> = ({
  onSelectPaciente,
  pacienteSeleccionado,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const mockPacientes: Paciente[] = [
      {
        id: '1',
        nombre: 'Juan',
        apellido: 'Pérez',
        edad: 35,
        historialMedico: ['Hipertensión', 'Diabetes tipo 2'],
      },
      {
        id: '2',
        nombre: 'María',
        apellido: 'González',
        edad: 28,
        historialMedico: ['Asma'],
      },
      // Add more mock patients as needed
    ];

    setTimeout(() => {
      setPacientes(mockPacientes);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPacientes = pacientes.filter(
    (paciente) =>
      paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (pacienteSeleccionado) {
    return (
      <div className={styles.pacienteInfo}>
        <div className={styles.pacienteHeader}>
          <h3>
            {pacienteSeleccionado.nombre} {pacienteSeleccionado.apellido}
          </h3>
          <button
            className={styles.changePaciente}
            onClick={() => onSelectPaciente(null)}
          >
            Cambiar paciente
          </button>
        </div>
        <p>Edad: {pacienteSeleccionado.edad} años</p>
        {pacienteSeleccionado.historialMedico && (
          <div className={styles.historialBox}>
            <strong>Historial Médico:</strong>
            <p>{pacienteSeleccionado.historialMedico.join(', ')}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.seleccionPaciente}>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar paciente por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>Cargando pacientes...</div>
      ) : filteredPacientes.length === 0 ? (
        <div className={styles.noPacientes}>
          No se encontraron pacientes con ese nombre
        </div>
      ) : (
        <div className={styles.pacientesList}>
          {filteredPacientes.map((paciente) => (
            <div
              key={paciente.id}
              className={styles.pacienteCard}
              onClick={() => onSelectPaciente(paciente)}
            >
              <h3>
                {paciente.nombre} {paciente.apellido}
              </h3>
              <p>Edad: {paciente.edad} años</p>
              {paciente.historialMedico && (
                <p className={styles.historial}>
                  Historial: {paciente.historialMedico.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeleccionPaciente;
