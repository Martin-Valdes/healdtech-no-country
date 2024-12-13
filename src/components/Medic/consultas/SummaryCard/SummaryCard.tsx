import styles from './SummaryCard.module.css';

interface SummaryItem {
  label: string;
  value: number;
}

interface SummaryCardProps {
  items: SummaryItem[];
  title: string;
}

const SummaryCard = ({ items, title }: SummaryCardProps) => {
  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>{title}</h3>
      <div className={styles.summaryGrid}>
        {items.map((item, index) => (
          <div key={index} className={styles.summaryItem}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;