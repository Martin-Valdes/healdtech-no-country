import styles from './ReportesStats.module.css'

interface StatsData {
    sinLeer: number;
    importantes: number;
    cambiosRecientes: number;
  }
  
  interface ReportesStatsProps {
    stats?: StatsData;
  }
  const defaultStats: StatsData = {
    sinLeer: 3,
    importantes: 1,
    cambiosRecientes: 5
  };
const ReportesStats = ({ stats = defaultStats }: ReportesStatsProps) => {
  return (
    <div className={styles.reportCard}>
      <h2>Resumen</h2>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span>Sin leer</span>
          <strong>{stats.sinLeer}</strong>
        </div>
        <div className={styles.statItem}>
          <span>Importantes</span>
          <strong>{stats.importantes}</strong>
        </div>
        <div className={styles.statItem}>
          <span>Cambios recientes</span>
          <strong>{stats.cambiosRecientes}</strong>
        </div>
      </div>
    </div>
  )
}

export default ReportesStats