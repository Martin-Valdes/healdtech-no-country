import { useEffect, useState } from "react";
import {
  RiVideoLine,
  RiHospitalLine,
  RiCalendarLine,
  RiTimeLine,
  RiStethoscopeLine,
  RiInformationLine,
  RiFileList3Line,
  RiCalendarEventLine,
} from "react-icons/ri";
import { Appointment } from "../../../../types/patient.types";
import { useAuthStore } from "../../../../store/useAuth";
import { patientDashboardApi } from "../../../../api/patient/dashboard.api";
import { Cita, CitaActualizada } from "../../../../types/citas.type";
import ReprogramarCitaModal from "../ReprogramarCitaModal/ReprogramarCitaModal";

import styles from "./CitaPacienteTarjeta.module.css";

interface TarjetaCitaProps {
  cita: Appointment;
  seleccionada: boolean;
  onSeleccionar: () => void;
  onReprogramar: (citaActualizada: CitaActualizada) => void;
  onCancelar: (citaId: number) => void;
}

const CitaPacienteTarjeta = ({
  cita,
  seleccionada,
  onSeleccionar,
  onReprogramar,
  onCancelar,
}: TarjetaCitaProps) => {
  // variables
  const [modalAbierto, setModalAbierto] = useState(false);
  const [puedeUnirse, setPuedeUnirse] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { id } = useAuthStore();

  const fechaCita = new Date(cita.fecha);
  // Función para verificar el tiempo
  const verificarTiempoCita = () => {
    const ahora = new Date();
    // Obtener tiempo en minutos para ambas fechas
    const tiempoActual = ahora.getHours() * 60 + ahora.getMinutes();
    const tiempoCita = fechaCita.getHours() * 60 + fechaCita.getMinutes();

    // Verificar si es el mismo día
    const esMismoDia =
      ahora.getDate() === fechaCita.getDate() &&
      ahora.getMonth() === fechaCita.getMonth() &&
      ahora.getFullYear() === fechaCita.getFullYear();

    // Diferencia en minutos
    const diferenciaMinutos = Math.abs(tiempoCita - tiempoActual);

    // Permitir unirse 5 minutos antes y hasta 20 minutos después
    return esMismoDia && diferenciaMinutos <= 20;
  };
  // Función para cancelar cita
  const handleCancelar = (id) => {
    onCancelar(cita.id);
  };

  // reprogramar cita
  const handleReprogramar = (citaActualizada: CitaActualizada) => {
    if (onReprogramar) {
      onReprogramar(citaActualizada);
    }
  };
  useEffect(() => {
    // Verificación inicial

    const dataCites = patientDashboardApi.getPatientAppointments(id);

    console.log(dataCites);
    setAppointments(dataCites);

    setPuedeUnirse(verificarTiempoCita());

    // Actualizar cada minuto
    const interval = setInterval(() => {
      setPuedeUnirse(verificarTiempoCita());
    }, 60000);

    // Limpiar intervalo
    return () => clearInterval(interval);
    //
  }, [cita.date]);

  console.log(cita);
  return (
    <>
      <div
        className={`${styles.tarjetaCita} ${
          seleccionada ? styles.expandida : ""
        }`}
      >
        <div className={styles.contenidoCita}>
          <div className={styles.cabeceraTarjeta}>
            <span className={`${styles.badge} ${styles[`badge${cita.tipo}`]}`}>
              {cita.tipo === "virtual" ? (
                <span className={styles.textoIcono}>
                  <RiVideoLine /> Virtual
                </span>
              ) : (
                <span className={styles.textoIcono}>
                  <RiHospitalLine /> Presencial
                </span>
              )}
            </span>
            <span
              className={`${styles.badge} ${styles[`badge${cita.estado}`]}`}
            >
              {cita.estado === "confirmada" ? "confirmada" : "pendiente"}
            </span>
          </div>

          <div className={styles.infoDoctor}>
            <img
              src={cita.doctor.imagen}
              alt={cita.doctor.name}
              className={styles.imagenDoctor}
            />
            <div className={styles.datosDoctor}>
              <h3 className={styles.nombreDoctor}>{cita.doctor.name}</h3>
              <p className={styles.especialidadDoctor}>
                {cita.doctor.specialty}
              </p>
            </div>
            {(cita.notificaciones || 0) > 0 && (
              <span className={styles.notificacion}>{cita.notificaciones}</span>
            )}
          </div>

          <div className={styles.detallesCita}>
            <div className={styles.itemDetalle}>
              <RiCalendarLine />
              <span>{fechaCita.toLocaleDateString()}</span>
            </div>
            <div className={styles.itemDetalle}>
              <RiTimeLine />
              <span>
                {fechaCita.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className={styles.itemDetalle}>
              <RiStethoscopeLine />
              <span>{cita.ubicacion}</span>
            </div>
            <div className={styles.itemDetalle}>
              <RiInformationLine />
              <span>{cita.descripcion}</span>
            </div>
          </div>
        </div>

        {/* Panel expandible de detalles */}
        {cita.estado === "confirmada" && cita.instrucciones && seleccionada && (
          <div className={styles.seccionInstrucciones}>
            <div className={styles.divisor} />
            <div className={styles.instruccionesTexto}>
              <RiFileList3Line /> {cita.instrucciones}
            </div>
          </div>
        )}

        <div className={styles.contenedorAcciones}>
          {cita.estado === "confirmada" ? (
            <>
              {puedeUnirse ? (
                <button className={styles.botonUnirse}>
                  <RiVideoLine /> Unirse ahora
                </button>
              ) : (
                <button
                  className={styles.botonReprogramar}
                  onClick={() => setModalAbierto(true)}
                >
                  <RiCalendarEventLine /> Reprogramar
                </button>
              )}
              {/* detalles */}
              <button
                className={`${styles.botonDetalle} ${
                  seleccionada ? styles.activo : ""
                }`}
                onClick={onSeleccionar}
              >
                {seleccionada ? "Ocultar detalles" : "Ver detalles"}
              </button>
            </>
          ) : (
            <>
              <button className={styles.botonCancelar} onClick={handleCancelar}>
                Cancelar
              </button>
              <button
                className={styles.botonReprogramar}
                onClick={() => setModalAbierto(true)}
              >
                <RiCalendarEventLine /> Reprogramar
              </button>
            </>
          )}
        </div>
      </div>
      <ReprogramarCitaModal
        cita={cita}
        modalAbierto={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleReprogramar}
      />
    </>
  );
};

export default CitaPacienteTarjeta;
