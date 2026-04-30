import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import styles from "./results-section.module.css";

const RESULTS = [
  {
    icon: "group",
    value: "-42%",
    title: "Tiempo de ciclo de OC",
    description: "De la solicitud a la OC aprobada al proveedor.",
  },
  {
    icon: "sync",
    value: "+3.2x",
    title: "Proveedores evaluados",
    description: "Más cobertura de evaluación con el mismo equipo.",
    highlightTitle: true,
  },
  {
    icon: "verified",
    value: "100%",
    title: "Trazabilidad auditable",
    description: "Cada paso con autoría y registro de tiempo.",
  },
  {
    icon: "calendar_month",
    value: "30d",
    title: "Go-live promedio",
    description: "Onboarding, datos y formación incluidas.",
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
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <span className={`material-symbols-rounded ${styles.icon}`}>{item.icon}</span>
                  </div>
                  <div className={styles.value}>{item.value}</div>
                </div>
                <h3 className={item.highlightTitle ? styles.cardTitleHighlight : styles.cardTitle}>
                  {item.title}
                </h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
