import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboardPaciente.module.css";
import {
  RiCalendarLine,
  RiMedicineBottleLine,
  RiTimeLine,
  RiUserHeartLine,
  RiRunLine,
  RiMoonLine,
  RiHeartLine,
  RiCalendarCheckLine,
  RiBellLine,
  RiHeartPulseLine,
} from "react-icons/ri";
import { useAuthStore } from "../../store/useAuth";
import { Appointment, HealthTip, Medication, PatientStats } from "../../types/patient.types";
import { patientDashboardApi } from "../../api/patient/dashboard.api";
import { AppointmentDetailsModal } from '../../components/AppointmentDetailsModal';
import { MedicationDetailsModal } from '../../components/MedicationDetailsModal';
import useModal from '../../hooks/useModal';


const DashboardPaciente = () => {
  const navigate = useNavigate();
  const { email, id, name } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PatientStats>({
    id: "",
    totalConsult: 0,
    canceledConsult: 0,
    activePrescriptions: 0,
    newResults: 0,
    healthScore: 0,
  });
console.log(name)
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [healthTips, setHealthTips] = useState<HealthTip[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeNotifications] = useState([
    { id: 1, message: "Recordatorio: Cita médica mañana a las 14:30" },
    { id: 2, message: "Nueva receta médica disponible" }
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isMedicationModalOpen, openModal: openMedicationModal, closeModal: closeMedicationModal } = useModal();

  const handleAppointmentAction = (appointment: Appointment, action: 'view' | 'join') => {
    if (action === 'join') {
      // Simular unirse a consulta virtual
      alert('Iniciando consulta virtual...');
    } else {
      // Mostrar modal con detalles de la cita
      setSelectedAppointment(appointment);
      openModal();
    }
  };

  const handleMedicationClick = (medication: Medication) => {
    setSelectedMedication(medication);
    openMedicationModal();
  };

  const handleSetMedicationReminder = async (medication: Medication, time: string) => {
    try {
      // Aquí iría la llamada a la API para guardar el recordatorio
      // Por ahora solo mostraremos un mensaje de éxito
      alert(`Recordatorio configurado para ${medication.name} a las ${time}`);
      closeMedicationModal();
    } catch (error) {
      console.error('Error al configurar el recordatorio:', error);
    }
  };

  const closeMedicationDetailsModal = () => {
    setSelectedMedication(null);
    closeMedicationModal();
  };

  const handleHealthTipAction = (tip: HealthTip) => {
    alert(`Más información sobre: ${tip.title}`);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleJoinMeeting = async (appointmentId: number) => {
    try {
      const meetingUrl = 'https://meet.google.com/abc-defg-hij';
      window.open(meetingUrl, '_blank');
    } catch (error) {
      console.error('Error al unirse a la consulta:', error);
      throw error;
    }
  };

  const handleRescheduleAppointment = async (appointmentId: number) => {
    try {
      alert('Funcionalidad de reprogramación en desarrollo');
    } catch (error) {
      console.error('Error al reprogramar la cita:', error);
      throw error;
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {

    try {
      await patientDashboardApi.cancelAppointment(appointmentId);
    
      const updatedAppointments = appointments.filter(app => app.id !== appointmentId);
      setAppointments(updatedAppointments);
      
      setStats(prev => ({
        ...prev,
        totalAppointments: prev.totalConsult - 1
      }));
    } catch (error) {
      console.error('Error al cancelar la cita:', error);
      throw error;
    }
  };

useEffect(() => {
  if (!id) return;
  const loadPatientStats = async () => {
    try {
      setLoading(true);
      const statsData = await patientDashboardApi.getPatientStats(id);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading patient stats:", error);
    } finally {
      setLoading(false);
    }
  };
  loadPatientStats();
}, [id]);


  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando tu información médica...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>¡Bienvenido, {name}! 👋</h1>
          <p className={styles.subtitle}>
            Mantén el control de tu salud y bienestar. Estamos aquí para ayudarte.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button 
            className={`${styles.actionButton} ${showNotifications ? styles.active : ''}`}
            onClick={toggleNotifications}
          >
            <RiBellLine /> Notificaciones
            {activeNotifications.length > 0 && (
              <span className={styles.notificationBadge}>{activeNotifications.length}</span>
            )}
          </button>
          {showNotifications && (
            <div className={styles.notificationsDropdown}>
              {activeNotifications.map(notification => (
                <div key={notification.id} className={styles.notificationItem}>
                  {notification.message}
                </div>
              ))}
            </div>
          )}
          <button className={styles.actionButton} onClick={() => navigate('/perfil')}>
            <RiUserHeartLine /> Mi Perfil
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statBlue}`}>
          <div className={styles.statIcon}>
            <RiCalendarCheckLine />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{stats.totalConsult - stats.canceledConsult}</div>
            <div className={styles.statLabel}>Citas Programadas</div>
            <div className={styles.statTrend}>+2 esta semana</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statPurple}`}>
          <div className={styles.statIcon}>
            <RiMedicineBottleLine />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{stats.activePrescriptions}</div>
            <div className={styles.statLabel}>Medicamentos Activos</div>
            <div className={styles.statTrend}>Actualizado hoy</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statIcon}>
            <RiHeartPulseLine />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{stats.healthScore}</div>
            <div className={styles.statLabel}>Índice de Salud</div>
            <div className={styles.statTrend}>↑ 5% este mes</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainGrid}>
        {/* Próximas Citas */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <RiCalendarLine /> Próximas Citas
            </h2>
            <button className={styles.sectionAction}>Ver todas</button>
          </div>
          <div className={styles.appointmentsList}>
            {appointments.map((appointment, index) => (
              <div key={index} className={styles.appointmentCard}>
                <div className={styles.appointmentHeader}>
                  <span className={`${styles.appointmentType} ${styles[appointment.tipo]}`}>
                    {appointment.tipo === 'presencial' ? '🖥 virtual' : '🏥 presencial'}
                  </span>
                  <span className={`${styles.appointmentStatus} ${styles[appointment.estado]}`}>
                    {appointment.estado === 'pendiente' ? 'confirmada' : 'pendiente'}
                  </span>
                </div>
                <div className={styles.appointmentInfo}>
                  <div className={styles.appointmentDoctor}>
                    {appointment.doctor.name}
                  </div>
                  <div className={styles.appointmentSpecialty}>
                    {appointment.doctor.specialty}
                  </div>
                  <div className={styles.appointmentDateTime}>
                    <RiTimeLine />
                    {appointment.fecha.toLocaleDateString()} - {" "}
                    {appointment.fecha.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className={styles.appointmentActions}>
                  <button 
                    className={styles.appointmentButton}
                    onClick={() => handleAppointmentAction(appointment, 'view')}
                  >
                    Ver detalles
                  </button>
                  {appointment.tipo === 'virtual' && (
                    <button 
                      className={`${styles.appointmentButton} ${styles.primaryButton}`}
                      onClick={() => handleAppointmentAction(appointment, 'join')}
                    >
                      Unirse a consulta
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Medicamentos */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <RiMedicineBottleLine /> Medicamentos Activos
            </h2>
            <button className={styles.sectionAction}>Ver todos</button>
          </div>
          <div className={styles.medicationsList}>
            {medications.map((medication, index) => (
              <div 
                key={index} 
                className={styles.medicationCard}
                onClick={() => handleMedicationClick(medication)}
              >
                <div className={styles.medicationMain}>
                  <div className={styles.medicationIcon}>
                    <RiMedicineBottleLine />
                  </div>
                  <div className={styles.medicationInfo}>
                    <h3 className={styles.medicationName}>{medication.name}</h3>
                    <p className={styles.medicationDosage}>{medication.dosage} - {medication.frequency}</p>
                  </div>
                </div>
                <div className={styles.medicationDetails}>
                  <div className={styles.medicationNextDose}>
                    <RiTimeLine />
                    Próxima dosis: {medication.nextDose}
                  </div>
                  <div className={styles.medicationRemaining}>
                    Dosis restantes: {medication.remainingDoses}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consejos de Salud */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <RiHeartLine /> Consejos de Salud
            </h2>
            <button className={styles.sectionAction}>Más consejos</button>
          </div>
          <div className={styles.healthTipsList}>
            {healthTips.map((tip) => {

              const iconMap = {
                RiHeartLine,
                RiMoonLine,
                RiRunLine
              } as const;
              type IconKey = keyof typeof iconMap;
              const IconComponent = iconMap[tip.icon as IconKey] ?? iconMap.RiHeartLine;

              return (
                <div 
                  key={tip.id} 
                  className={styles.healthTipCard}
                  onClick={() => handleHealthTipAction(tip)}
                >
                  <div className={styles.healthTipIcon}>
                    {IconComponent && <IconComponent />}
                  </div>
                  <div className={styles.healthTipContent}>
                    <h3 className={styles.healthTipTitle}>{tip.title}</h3>
                    <p className={styles.healthTipDescription}>{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          isOpen={isOpen}
          onClose={closeAppointmentModal}
          onJoinMeeting={handleJoinMeeting}
          onReschedule={handleRescheduleAppointment}
          onCancel={handleCancelAppointment}
        />
      )}
      
      {selectedMedication && (
        <MedicationDetailsModal
          medication={selectedMedication}
          isOpen={isMedicationModalOpen}
          onClose={closeMedicationDetailsModal}
          onSetReminder={handleSetMedicationReminder}
        />
      )}
    </div>
  );
};

export default DashboardPaciente;