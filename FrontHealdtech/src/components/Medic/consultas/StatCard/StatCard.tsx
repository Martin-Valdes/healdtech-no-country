import { ReactNode } from 'react';
import styles from './StarCard.module.css';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  progressValue?: number;
}

const StatCard = ({ icon, label, value, trend, progressValue }: StatCardProps) => {
  return (
    <div className={styles.statBox}>
      <div className={styles.statBoxIcon}>
        {icon}
      </div>
      <div className={styles.statBoxContent}>
        <span className={styles.statBoxLabel}>{label}</span>
        <h3 className={styles.statBoxNumber}>{value}</h3>
        {trend && (
          <p className={styles.statBoxTrend}>{trend}</p>
        )}
        {progressValue !== undefined && (
          <div className={styles.progressIndicator}>
            <div 
              className={styles.progressValue} 
              style={{ width: `${progressValue}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;