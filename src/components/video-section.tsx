import { type FunctionComponent } from "react";
import YouTubeFacade from "./youtube-facade";
import styles from "./video-section.module.css";

/** Short de YouTube (youtube.com/shorts/<id>). */
const VIDEO_ID = "LoV-CpmVp20";

const POINTS = [
  "De la requisición al pago, sin hojas sueltas.",
  "Proveedores evaluados, contratos y pagos en un solo panel.",
  "Visibilidad en tiempo real para decidir con datos.",
];

export type VideoSectionProps = {
  className?: string;
};

const VideoSection: FunctionComponent<VideoSectionProps> = ({
  className = "",
}) => {
  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      aria-labelledby="video-heading"
    >
      <div className={styles.container}>
        {/* Columna izquierda: copy */}
        <div className={styles.textColumn}>
          <div className={styles.kicker}>INXORA en acción</div>
          <h2 className={styles.title} id="video-heading">
            Mira cómo INXORA{" "}
            <span className={styles.highlight}>ordena tus compras</span> en menos
            de un minuto
          </h2>
          <p className={styles.description}>
            Un recorrido rápido por la plataforma: del caos en Excel al control
            total de proveedores, contratos y pagos en un solo lugar.
          </p>
          <ul className={styles.pointsList}>
            {POINTS.map((point) => (
              <li key={point} className={styles.point}>
                <span
                  className={`material-symbols-rounded ${styles.pointIcon}`}
                  aria-hidden
                >
                  check_circle
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <a className={styles.cta} href="#demo">
            Solicitar demo
            <span
              className="material-symbols-rounded"
              style={{ fontSize: 20 }}
              aria-hidden
            >
              arrow_forward
            </span>
          </a>
        </div>

        {/* Columna derecha: Short vertical (facade lazy) */}
        <div className={styles.videoColumn}>
          <YouTubeFacade videoId={VIDEO_ID} title="INXORA en 1 minuto" />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
