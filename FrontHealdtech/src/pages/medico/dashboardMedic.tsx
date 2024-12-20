import { useEffect, useState } from "react";
import {
  FiClock,
  FiCalendar,
  FiUser,
  FiVideo,
  FiActivity,
  FiHeart,
  FiThermometer,
  FiClipboard,
  FiTrendingUp,
  FiUsers,
  FiAlertCircle,
  FiPieChart,
  FiFileText,
  FiMessageSquare,
} from "react-icons/fi";
import { RiStethoscopeLine, RiVirusLine, RiHospitalLine } from "react-icons/ri";
import styles from "./dashboardMedic.module.css";
import { doctorDashboardApi } from "../../api/doctor/dashboard.api";
import {
  DoctorStats,
  NextPatientDetails,
} from "../../mock/doctor/dashboard.mock";
import { Appointment } from "../../mock/doctor/dashboard.mock";
import { useAuthStore } from "../../store/useAuth";
import Loading from "../../components/common/loaders/loding";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import NuevaConsultaModal from "../../components/Medic/dashboard/NuevaConsultaModal";
const DashboardMedic = () => {
  const { user } = useAuthStore();
  const {isOpen,closeModal,openModal} = useModal()
  const [stats, setStats] = useState<DoctorStats | null>(null);
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [nextPatient, setNextPatient] = useState<NextPatientDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [activeFilter, setActiveFilter] = useState("todas");

  const navigate = useNavigate();
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [stats, appointments, nextPatient] = await Promise.all([
          doctorDashboardApi.getDoctorStats(),
          doctorDashboardApi.getDayliAppointments(),
          doctorDashboardApi.getNextPatientDetails(),
        ]);
        setStats(stats);
        setAppointments(appointments);
        setNextPatient(nextPatient);
      } catch (error) {
        console.error('--->',error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);
  if (error) {
    return <div className="text-center text-danger d-flex justify-content-center align-items-center h-100">Error al cargar los datos por favor recargue la pagina</div>;
  }
  if (loading)
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <Loading />
      </div>
    );
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>¡Buen día, {user?.username}!</h1>
          <p className={styles.welcomeText}>
            <FiCalendar className={styles.icon} />
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            • {appointments?.length} citas programadas
          </p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.miniStat}>
            <FiUsers />
            <span>{stats?.monthly.totalPatients} Pacientes este mes</span>
          </div>
          <div className={`${styles.tag} ${styles.online}`}>
            <span className={styles.onlineDot}></span>
            En línea
          </div>
        </div>
      </header>

      <div className={styles.quickActions}>
        <button className={styles.actionButton} onClick={openModal}>
          <RiStethoscopeLine />
          Nueva Consulta
        </button>
        <button className={styles.actionButton} onClick={()=>{
          navigate("/app-medico/historial");
        }}>
          <FiClipboard />
          Historial Médico
        </button>
        <button className={styles.actionButton} onClick={()=>{
          navigate("/app-medico/recetas");
        }}>
          <FiHeart />
          Recetas
        </button>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiUser />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Pacientes Hoy</span>
            <h3 className={styles.statValue}>
              {stats?.daily.totalAppointments}
            </h3>
            <p className={styles.statTrend}>
              <FiTrendingUp />
              <span>+12% vs ayer</span>
            </p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiVideo />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Consultas Virtuales</span>
            <h3 className={styles.statValue}>
              {stats?.daily.virtualAppointments}
            </h3>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: `35%` }}></div>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiPieChart />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Eficiencia</span>
            <h3 className={styles.statValue}>{stats?.monthly.satisfaction}%</h3>
            <p className={styles.statDetail}>+5% este mes</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiMessageSquare />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Consultas Pendientes</span>
            <h3 className={styles.statValue}>3</h3>
            <p className={styles.statDetail}>2 urgentes</p>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.appointmentsList}>
          <div className={styles.sectionHeader}>
            <h2>Próximas Consultas</h2>
            <div className={styles.filterTags}>
              {["todas", "virtuales", "presenciales", "urgentes"].map(
                (filter) => (
                  <button
                    key={filter}
                    className={`${styles.filterTag} ${
                      activeFilter === filter ? styles.active : ""
                    }`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {appointments?.map((appointment) => (
            <div key={appointment.id} className={styles.appointment}>
              <div className={styles.appointmentTime}>
                <FiClock /> A las{" "}
                {new Date(appointment.datetime).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                hrs
              </div>
              <div className={styles.patientAvatar}>
                {appointment.patient.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </div>
              <div className={styles.appointmentInfo}>
                <h3>{appointment.patient.name}</h3>
                <p>{appointment.type}</p>
                <p className={styles.symptoms}>
                  <FiAlertCircle />
                  {appointment.patient.symptoms}
                </p>
              </div>
              <div className={`${styles.tag} ${styles[appointment.status]}`}>
                {appointment.type === "virtual" && <FiVideo />}
                {appointment.status}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.patientInfo}>
            <h2>Próximo Paciente</h2>
            <div className={styles.currentPatient}>
              <div className={styles.patientHeader}>
                <div className={styles.patientAvatar}>
                  {nextPatient?.basicInfo.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3>{nextPatient?.basicInfo.name}</h3>
                  <p>
                    <FiVideo />
                    {nextPatient?.appointment.reason} .{" "}
                    {nextPatient?.appointment.time}
                  </p>
                </div>
              </div>

              <div className={styles.patientDetails}>
                <div className={styles.detailItem}>
                  <span>Última visita</span>
                  <strong>{nextPatient?.lastVisit.date}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Alergias</span>
                  <strong>{nextPatient?.basicInfo.allergies.join(", ")}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Grupo Sanguíneo</span>
                  <strong>{nextPatient?.basicInfo.bloodType}</strong>
                </div>
              </div>

              <div className={styles.vitalSigns}>
                <div className={styles.vitalSign}>
                  <FiThermometer />
                  <span>Temperatura</span>
                  <strong>{nextPatient?.vitalSigns.temperature}°C</strong>
                </div>
                <div className={styles.vitalSign}>
                  <FiActivity />
                  <span>Presión</span>
                  <strong>{nextPatient?.vitalSigns.bloodPressure}</strong>
                </div>
                <div className={styles.vitalSign}>
                  <RiVirusLine />
                  <span>PCR</span>
                  <strong>{nextPatient?.vitalSigns.pcr}</strong>
                </div>
              </div>

              <div className={styles.notes}>
                <h4>Historial Reciente</h4>
                <ul>
                  {nextPatient?.recentHistory.map((history, i) => (
                    <li key={i}>{history}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.medications}>
                <h4>Medicamentos Actuales</h4>
                <div className={styles.medicationList}>
                  {nextPatient?.medications.map((medication, i) => (
                    <div className={styles.medication} key={i}>
                      <FiFileText />
                      <div>
                        <h5>{medication.name}</h5>
                        <p>{medication.dosage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NuevaConsultaModal isOpen={isOpen} onRequestClose={closeModal}/>
    </div>
  );
};

export default DashboardMedic;
