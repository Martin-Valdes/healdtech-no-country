import { useState } from "react";
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
import { Cite, UpdatedCitaDTO } from "../../../../types/citas.type";
import ReprogramarCitaModal from "../ReprogramarCitaModal/ReprogramarCitaModal";

import styles from "./CitaPacienteTarjeta.module.css";

interface TarjetaCitaProps {
  cita: Cite;
  seleccionada: boolean;
  onSeleccionar: () => void;
  onCancelar: (citaId: string) => void;
}

const CitaPacienteTarjeta = ({
  cita,
  seleccionada,
  onSeleccionar,
  onCancelar,
}: TarjetaCitaProps) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const fechaCita = new Date(cita.date);



  return (
    <>
      <div
        className={`${styles.tarjetaCita} ${
          seleccionada ? styles.expandida : ""
        }`}
      >
        <div className={styles.contenidoCita}>
          <div className={styles.cabeceraTarjeta}>
            <span className={`${styles.badge} ${styles[`badge${cita.state}`]}`}>
              {cita.type === "virtual" ? (
                <span className={styles.textoIcono}>
                  <RiVideoLine /> Virtual
                </span>
              ) : (
                <span className={styles.textoIcono}>
                  <RiHospitalLine /> Presencial
                </span>
              )}
            </span>
            <span className={`${styles.badge} ${styles[`badge${cita.type}`]}`}>
              {cita.type === "virtual" ? "precential" : "virtual"}
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
              <span>{cita.description}</span>
            </div>
          </div>
        </div>

        {/* Panel expandible de detalles */}
        {cita.state === "confirmada" && cita.instrucciones && seleccionada && (
          <div className={styles.seccionInstrucciones}>
            <div className={styles.divisor} />
            <div className={styles.instruccionesTexto}>
              <RiFileList3Line /> {cita.instrucciones}
            </div>
          </div>
        )}

        <div className={styles.contenedorAcciones}>
          {cita.state === "confirmada" ? (
            <>
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
              <button
                className={styles.botonCancelar}
                onClick={() => onCancelar(cita.id)}
              >
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
      
      />
    </>
  );
};

export default CitaPacienteTarjeta;
