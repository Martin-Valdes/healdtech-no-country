import { ReactNode } from 'react'

import styles from './reportes.module.css'
import { FiAlertCircle, FiBell, FiCheckCircle, FiFile, FiFileText } from 'react-icons/fi'
import ReportesHeader from '../../components/Medic/reportes/ReportesHeader/ReportesHeader';
import ReportesNotificacion from '../../components/Medic/reportes/ReportesNotificacion/ReportesNotificacion';
import ReportesStats from '../../components/Medic/reportes/ReportesStats/ReportesStats';
import ReportesDocumentos from '../../components/Medic/reportes/ReportesDocumentos/ReportesDocumentos';

// Interfaces 
interface Notificacion {
  id: number;
  icon: ReactNode;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning';
}

interface Documento {
  id: number;
  title: string;  
  filename: string;
  type?: 'pdf' | 'doc' | 'xls';
  size?: string;
  date?: string;
}

const reportes = () => {
  // test data de notificaciones y docu
  const notificaciones: Notificacion[] = [
    {
      id: 1,
      icon: <FiCheckCircle className={styles.successIcon} />,
      title: 'Actualización del Sistema',
      message: 'Nueva versión 2.1.0 instalada correctamente',
      time: 'Hace 2 horas',
      type: 'success'
    },
    {
      id: 2,
      icon: <FiAlertCircle className={styles.warningIcon} />,
      title: 'Mantenimiento Programado',
      message: 'Habrá mantenimiento el día 28/03 a las 02:00',
      time: 'Hace 1 día',
      type: 'warning'
    },
    {
      id: 3,
      icon: <FiAlertCircle className={styles.warningIcon} />,
      title: 'Mantenimiento Programado',
      message: 'Habrá mantenimiento el día 29/03 a las 13:00',
      time: 'Hace 1 segundo',
      type: 'warning'
    },
  ];
  const documentos: Documento[] = [
    {
      id: 1,
      title: 'Reporte Mensual - Marzo 2024',
      filename: 'reporte-mensual-marzo-2024.pdf',
      type: 'pdf',
      size: '2.5MB',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Cambios del Sistema v2.1.0',
      filename: 'cambios-sistema-v2.1.0.pdf',
      type: 'pdf',
      size: '1.2MB',
      date: '2024-03-10'
    }
  ];
  return (
    <div className={styles.reporteContainer}>
      <ReportesHeader />
      
      <div className={styles.contentGrid}>
        <div className="row">
          <div className="col-lg-8">
            <ReportesNotificacion notificaciones={notificaciones} />
          </div>
          <div className="col-lg-4">
            <ReportesStats/>
            <ReportesDocumentos documentos={documentos} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default reportes