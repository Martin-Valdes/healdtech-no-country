import styles from './ProximasAcciones.module.css';

interface AccionPendiente {
  id: number;
  paciente: string;
  tipo: 'llamada' | 'seguimiento' | 'urgente';
  fecha: string;
  hora: string;
  descripcion: string;
  meetLink?: string;
  completada?: boolean;
}

const ProximasAcciones = () => {
  const acciones: AccionPendiente[] = [
    {
      id: 1,
      paciente: "Roberto Méndez",
      tipo: "urgente",
      fecha: "Hoy",
      hora: "15:00",
      descripcion: "Confirmación de resultados",
      meetLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      paciente: "Laura Torres",
      tipo: "seguimiento",
      fecha: "Mañana",
      hora: "10:30",
      descripcion: "Revisión de tratamiento",
      meetLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 3,
      paciente: "Miguel Ruiz",
      tipo: "seguimiento",
      fecha: "Hoy",
      hora: "16:15",
      descripcion: "Resultados críticos",
      meetLink: "https://meet.google.com/abc-defg-hij",
    },
  ]
  const iniciarConsulta = (meetLink: string, id: number) => {
    window.open(meetLink, '_blank');
  }
  return (
    <div className={styles.panel}>
      <h3 className={styles.titulo}>Próximas Consultas Online</h3>
      <div className={styles.lista}>
        {acciones.map((accion) => (
          <div key={accion.id} className={styles.accionItem}>
            <div className={styles.tiempo}>
              <span className={styles.fecha}>{accion.fecha}</span>
              <span className={styles.hora}>{accion.hora}</span>
            </div>
            <div className={styles.contenido}>
              <div className={styles.headerAccion}>
                <h4 className={styles.paciente}>{accion.paciente}</h4>
                <span className={`${styles.badge} ${styles[`badge${accion.tipo}`]}`}>
                  {accion.tipo}
                </span>
              </div>
              <p className={styles.descripcion}>{accion.descripcion}</p>
            </div>
            {accion.meetLink && (
              <button 
                className={styles.completarBtn}
                onClick={() => iniciarConsulta(accion.meetLink!, accion.id)}
              >
                Iniciar consulta
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProximasAcciones;