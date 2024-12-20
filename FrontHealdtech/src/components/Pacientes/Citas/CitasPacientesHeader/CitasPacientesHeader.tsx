import styles from "./CitasPacientesHeader.module.css"

const CitasPacientesHeader = () => {
  return (
    <div className={styles.cabeceraCitas}>
      <h1 className={styles.titulo}>Mis Citas Médicas</h1>
      <p className={styles.subtitulo}>
        Gestiona tus citas médicas y mantén un seguimiento de tu atención médica.
      </p>
    </div>
  )
}

export default CitasPacientesHeader