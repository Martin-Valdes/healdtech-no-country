import { useState } from 'react';
import styles from './DisponibilidadPanel.module.css';
import ConsultaModal from './ConsultaModal';
interface DisponibilidadItemProps {
  dia: string;
  fecha: string;
  espacios: number;
  porcentajeOcupado: number;
}

const DisponibilidadPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  
  // Test semanas
  const semanas = [
    [
      { dia: 'Lun', fecha: '25 Nov', espacios: 2, porcentajeOcupado: 90 },
      { dia: 'Mar', fecha: '26 Nov', espacios: 5, porcentajeOcupado: 70 },
      { dia: 'Mie', fecha: '27 Nov', espacios: 8, porcentajeOcupado: 50 },
      { dia: 'Jue', fecha: '28 Nov', espacios: 4, porcentajeOcupado: 60 },
      { dia: 'Vie', fecha: '29 Nov', espacios: 6, porcentajeOcupado: 30 }
    ]
  ];
  return (
    <div className={styles.disponibilidad}>
      <h3 className={styles.disponibilidadTitle}>
        Calendario semanal de Disponibilidad
      </h3>
      {semanas.map((semana, index) => (
        <div key={index} className={styles.semanaGrid}>
          {semana.map((dia) => (
            <div
              key={dia.fecha}
              className={styles.diaItem}
              onClick={() => {
                setSelectedDate(dia.fecha)
                setShowModal(true)
              }}
            >
              <div className={styles.diaHeader}>
                <span className={styles.nombreDia}>{dia.dia}</span>
                <span className={styles.fecha}>{dia.fecha}</span>
              </div>
              <div className={styles.espaciosInfo}>{dia.espacios} espacios</div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${dia.porcentajeOcupado}%`,
                    backgroundColor: `${
                      dia.porcentajeOcupado > 80
                        ? '#ef4444'
                        : dia.porcentajeOcupado > 50
                        ? '#f59e0b'
                        : '#22c55e'
                    }`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      <ConsultaModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        fecha={selectedDate}
      />
    </div>
  );
};
export default DisponibilidadPanel;