import { FunctionComponent } from "react";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./process-flow-section.module.css";

export type ProcessFlowSectionProps = {
  className?: string;
};

/** Icono Material Symbols por etapa (mismo orden que t.processFlow.steps). */
const STEP_ICONS = [
  "description",     // 1. Solicitud
  "forum",           // 2. Cotización
  "handshake",       // 3. Proveedor
  "task_alt",        // 4. Aprobación
  "receipt_long",    // 5. Venta / Factura
  "local_shipping",  // 6. Seguimiento
  "package_2",       // 7. Entrega
  "analytics",       // 8. Reportes
] as const;

/** Posición del centro de cada card en % del .circleStage (top, left).
 *  Cards más esparcidas alrededor del anillo r≈44 con suficiente gap entre
 *  consecutivas para que no se toquen. Las "alas" (4 y 8) sobresalen a r≈48. */
/** Distribución uniforme alrededor del círculo: 8 cards × 45° en r≈44.
 *  Cada card en su "punto cardinal" — el flujo 1→8 recorre toda la órbita
 *  en sentido horario, no solo la mitad derecha. */
const STEP_POSITIONS = [
  { top: "6%",  left: "50%" }, // 1. Solicitud      — 12h
  { top: "19%", left: "81%" }, // 2. Cotización     — 1:30h (NE)
  { top: "50%", left: "94%" }, // 3. Proveedor      — 3h (E)
  { top: "81%", left: "81%" }, // 4. Aprobación     — 4:30h (SE)
  { top: "94%", left: "50%" }, // 5. Venta/Factura  — 6h (S)
  { top: "81%", left: "19%" }, // 6. Seguimiento    — 7:30h (SW)
  { top: "50%", left: "6%"  }, // 7. Entrega        — 9h (W)
  { top: "19%", left: "19%" }, // 8. Reportes       — 10:30h (NW)
] as const;

const ProcessFlowSection: FunctionComponent<ProcessFlowSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const f = t.processFlow;

  return (
    <section
      className={[styles.section, className].join(" ")}
      aria-labelledby="process-flow-heading"
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div className={styles.kickerWrapper}>
            <span className={styles.kicker}>{f.kicker}</span>
          </div>
          <h2 id="process-flow-heading" className={styles.title}>
            {f.headlineLine1}{" "}
            <span className={styles.highlight}>{f.headlineLine2}</span>
          </h2>
          <p className={styles.description}>
            {f.ledeLine1} {f.ledeLine2}{" "}
            <span className={styles.ledeAccent}>{f.ledeAccent}</span>
          </p>

          <div className={styles.badges}>
            <div className={styles.badge}>
              <span
                className={`material-symbols-rounded ${styles.badgeIcon}`}
                aria-hidden
              >
                hub
              </span>
              <div>
                <strong className={styles.badgeTitle}>{f.flowBadge.title}</strong>
                <p className={styles.badgeBody}>{f.flowBadge.body}</p>
              </div>
            </div>
            <div className={styles.badge}>
              <span
                className={`material-symbols-rounded ${styles.badgeIcon}`}
                aria-hidden
              >
                share
              </span>
              <div>
                <strong className={styles.badgeTitle}>
                  {f.controlBadge.title}
                </strong>
                <p className={styles.badgeBody}>{f.controlBadge.body}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout 1: círculo (desktop ≥1024px) */}
        <div className={styles.circleStage} aria-hidden="false">
          <svg
            className={styles.rings}
            viewBox="-5 -5 110 110"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="pf-ring-outer" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#88d4e4" />
                <stop offset="100%" stopColor="#d90e8c" />
              </linearGradient>
              <linearGradient id="pf-ring-inner" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#88d4e4" />
                <stop offset="100%" stopColor="#d90e8c" />
              </linearGradient>
              <linearGradient id="pf-flow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#88d4e4" />
                <stop offset="100%" stopColor="#d90e8c" />
              </linearGradient>
            </defs>

            {/* Sistema de 5 anillos concéntricos (afuera → adentro) */}
            {/* Guía exterior sólida, muy tenue */}
            <circle
              cx="50"
              cy="50"
              r="49.5"
              fill="none"
              stroke="url(#pf-ring-outer)"
              strokeWidth="0.25"
              opacity="0.22"
            />
            {/* Órbita principal de las cards (anillo punteado destacado) */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="url(#pf-ring-inner)"
              strokeWidth="0.4"
              strokeDasharray="0.4 1.3"
              strokeLinecap="round"
              opacity="0.55"
            />
            {/* Aros intermedios punteados */}
            <circle
              cx="50"
              cy="50"
              r="37"
              fill="none"
              stroke="url(#pf-ring-outer)"
              strokeWidth="0.3"
              strokeDasharray="0.4 1.4"
              strokeLinecap="round"
              opacity="0.3"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="url(#pf-ring-outer)"
              strokeWidth="0.3"
              strokeDasharray="0.4 1.4"
              strokeLinecap="round"
              opacity="0.35"
            />
            {/* Anillo brillante alrededor de la burbuja central */}
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="none"
              stroke="url(#pf-ring-inner)"
              strokeWidth="0.7"
              strokeDasharray="0.5 1.1"
              strokeLinecap="round"
              opacity="0.95"
            />

            {/* LÍNEA DE FLUJO: recorrido punteado continuo 1→2→…→8 que
                abraza el anillo r≈44. Cada path arranca donde termina el
                anterior; el control point se aleja del centro para que la
                curva siga el radio. */}
            <g
              stroke="url(#pf-flow)"
              strokeWidth="0.5"
              strokeDasharray="0.6 1.1"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            >
              {/* Recorrido en órbita 1→8 en sentido horario: cada arco va
                  de un punto cardinal al siguiente, con control point a r=48
                  para que la curva siga la circunferencia exterior. */}
              <path d="M 50 6  Q 68 6  81 19" />
              <path d="M 81 19 Q 94 32 94 50" />
              <path d="M 94 50 Q 94 68 81 81" />
              <path d="M 81 81 Q 68 94 50 94" />
              <path d="M 50 94 Q 32 94 19 81" />
              <path d="M 19 81 Q 6  68 6  50" />
              <path d="M 6  50 Q 6  32 19 19" />
            </g>

            {/* Acentos magenta repartidos por toda la órbita */}
            <g fill="#d90e8c">
              <circle cx="68" cy="6"  r="0.7" opacity="0.9" />
              <circle cx="94" cy="68" r="0.7" opacity="0.9" />
              <circle cx="32" cy="94" r="0.7" opacity="0.9" />
              <circle cx="6"  cy="32" r="0.7" opacity="0.9" />
            </g>
          </svg>

          <div className={styles.center}>
            <div className={styles.centerRing}>
              <span className={styles.centerLogo}>{f.centerTitle}</span>
              <span className={styles.centerCaption}>{f.centerSubtitle}</span>
            </div>
          </div>

          {f.steps.map((s, i) => (
            <div
              key={i}
              className={styles.step}
              style={STEP_POSITIONS[i]}
            >
              <div className={styles.stepCard}>
                <span className={styles.stepIconWrap}>
                  <span
                    className={`material-symbols-rounded ${styles.stepIcon}`}
                    aria-hidden
                  >
                    {STEP_ICONS[i]}
                  </span>
                </span>
                <div className={styles.stepText}>
                  <span className={styles.stepTitle}>
                    <span className={styles.stepNumber}>{i + 1}.</span> {s.title}
                  </span>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Layout 2: timeline vertical (mobile/tablet <1024px) */}
        <ol className={styles.timeline} aria-label={f.kicker}>
          {f.steps.map((s, i) => (
            <li key={i} className={styles.timelineItem}>
              <span className={styles.timelineDot}>{i + 1}</span>
              <div className={styles.timelineCard}>
                <span
                  className={`material-symbols-rounded ${styles.timelineIcon}`}
                  aria-hidden
                >
                  {STEP_ICONS[i]}
                </span>
                <div>
                  <strong className={styles.timelineTitle}>{s.title}</strong>
                  <p className={styles.timelineBody}>{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessFlowSection;
