import { FunctionComponent } from "react";
import styles from "./results-section.module.css";

const RESULTS = [
  {
    icon: "schedule",
    image: "/ahorro_tiempo.webp",
    title: "Ahorro de tiempo",
    description: "Reduce procesos de días a minutos.",
    pill: "Hasta 80% menos tiempo",
  },
  {
    icon: "groups",
    image: "/Mayor_control.webp",
    title: "Mayor control",
    description: "Gestiona proveedores y compras en un solo lugar.",
    pill: "Todo en un solo sistema",
  },
  {
    icon: "trending_up",
    image: "/Mejores_decisiones.webp",
    title: "Mejores decisiones",
    description: "Compara precios, tiempos y opciones fácilmente.",
    pill: "Decisiones más inteligentes",
  },
  {
    icon: "fact_check",
    image: "/Orden_y_trazabilidad.webp",
    title: "Orden y trazabilidad",
    description: "Historial completo de cada compra.",
    pill: "100% trazabilidad",
  },
];

export const ResultsSection: FunctionComponent = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.textColumn}>
          <div className={styles.kicker}>Sobre resultados con INXORA</div>
          <h2 className={styles.title}>
            Plataforma con datos, <span className={styles.highlight}>diseñada para acelerar</span> la compra industrial
          </h2>
          <p className={styles.description}>
            Todo en un solo panel: reducción de ciclos, más proveedores evaluados, trazabilidad total y puesta en marcha en semanas, no en trimestres.
          </p>
        </div>

        {/* Right Column */}
        <div className={styles.cardsColumn}>
          <div className={styles.cardsBackground}></div>
          <div className={styles.cardsGrid}>
            {RESULTS.map((item, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  <img
                    className={styles.cardImage}
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className={styles.iconWrapper}>
                    <span className={`material-symbols-rounded ${styles.icon}`}>
                      {item.icon}
                    </span>
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
                <span className={styles.cardPill}>{item.pill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
