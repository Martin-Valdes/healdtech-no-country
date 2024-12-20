import { useState, useEffect } from "react";
import { useAuthStore } from "../../../../store/useAuth";
import { RiCalendarLine, RiVideoLine, RiHospitalLine } from "react-icons/ri";
import styles from "./CitasPacientesStats.module.css";
import { PatientStats } from "../../../../types/patient.types";
import { patientDashboardApi } from "../../../../api/patient/dashboard.api";

const CitasPacientesStats = () => {
  // Calcular estadísticas actuales

  const { id } = useAuthStore();
  let virtual;
  let presencial;
  let total;

  const [stats, setStats] = useState<PatientStats>({
    id: "",
    totalConsult: 0,
    activePrescriptions: 0,
    newResults: 0,
    healthScore: 0,
  });

  useEffect(() => {
    if (!id) return; // Evita llamadas innecesarias si no hay ID
    const loadPatientStats = async () => {
      try {
        const statsData = await patientDashboardApi.getPatientAppointments(id);

        setStats(statsData);
      } catch (error) {
        console.error("Error loading patient stats:", error);
      }
    };

    loadPatientStats();
  }, [id]);

  if (Array.isArray(stats)) {
    virtual = stats.filter((item) => item.type === "virtual").length;
  }
  if (Array.isArray(stats)) {
    presencial = stats.filter((item) => item.type === "presencial").length;
  }
  if (Array.isArray(stats)) {
    total = stats.length;
  }
  return (
    <div className={styles.contenedorEstadisticas}>
      <div className={`${styles.cardEstadistica} ${styles.cardAzul}`}>
        <div className={styles.iconoContainer}>
          <RiCalendarLine className={styles.icono} />
        </div>
        <div className={styles.estadisticaInfo}>
          <h3>{total}</h3>
          <p className={styles.label}>Total Citas</p>
        </div>
      </div>

      <div className={`${styles.cardEstadistica} ${styles.cardVioleta}`}>
        <div className={styles.iconoContainer}>
          <RiVideoLine className={styles.icono} />
        </div>
        <div className={styles.estadisticaInfo}>
          <h3>{virtual}</h3>
          <p className={styles.label}>Citas Virtuales</p>
        </div>
      </div>

      <div className={`${styles.cardEstadistica} ${styles.cardVerde}`}>
        <div className={styles.iconoContainer}>
          <RiHospitalLine className={styles.icono} />
        </div>
        <div className={styles.estadisticaInfo}>
          <h3>{presencial}</h3>
          <p className={styles.label}>Citas Presenciales</p>
        </div>
      </div>
    </div>
  );
};

export default CitasPacientesStats;
