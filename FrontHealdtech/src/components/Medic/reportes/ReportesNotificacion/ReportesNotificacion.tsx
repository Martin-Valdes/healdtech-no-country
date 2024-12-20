import { ReactNode } from 'react';
import styles from './ReportesNotificacion.module.css'

interface Notificacion {
    id: number;
    icon: ReactNode;
    title: string;
    message: string;
    time: string;
    type: 'success' | 'warning';
  }
  
  interface ReportesNotificacionProps {
    notificaciones: Notificacion[];
  }

const ReportesNotificacion = ({ notificaciones }: ReportesNotificacionProps) => {
  return (
    <div className={styles.reportCard}>
      <h2>Notificaciones Recientes</h2>
      {notificaciones.map(notif => (
        <div key={notif.id} className={styles.notification}>
          {notif.icon}
          <div className={styles.notificationContent}>
            <h3>{notif.title}</h3>
            <p>{notif.message}</p>
            <span className={styles.time}>{notif.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReportesNotificacion