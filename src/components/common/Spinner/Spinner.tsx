import styles from './Spinner.module.css'

interface SpinnerProps {
  text?: string
}

const Spinner = ({ text = 'Cargando...' }: SpinnerProps) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.loadingText}>{text}</p>
    </div>
  )
}

export default Spinner
