import { FunctionComponent } from "react";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./results-section.module.css";

/** Iconos + imágenes por índice (no dependen del idioma). */
const RESULT_ICONS = ["schedule", "groups", "trending_up", "fact_check"] as const;
const RESULT_IMAGES = [
  "/ahorro_tiempo.webp",
  "/Mayor_control.webp",
  "/Mejores_decisiones.webp",
  "/Orden_y_trazabilidad.webp",
] as const;

export const ResultsSection: FunctionComponent = () => {
  const t = useLandingTranslations();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.textColumn}>
          <div className={styles.kicker}>{t.results.kicker}</div>
          <h2 className={styles.title}>
            {t.results.titleLead}{" "}
            <span className={styles.highlight}>{t.results.titleAccent}</span>{" "}
            {t.results.titleSuffix}
          </h2>
          <p className={styles.description}>{t.results.description}</p>
        </div>

        {/* Right Column */}
        <div className={styles.cardsColumn}>
          <div className={styles.cardsBackground}></div>
          <div className={styles.cardsGrid}>
            {t.results.items.map((item, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  <img
                    className={styles.cardImage}
                    src={RESULT_IMAGES[index]}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className={styles.iconWrapper}>
                    <span className={`material-symbols-rounded ${styles.icon}`}>
                      {RESULT_ICONS[index]}
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
