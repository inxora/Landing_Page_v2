/**
 * Paso 1 del signup — selector de plan tipo Netflix.
 *
 * Muestra toggle Mensual/Anual + 2 cards (Start / Growth) con precio +
 * features top + 2 botones por card:
 *   · "Empezar prueba gratis 7 días" (primario)
 *   · "Suscribirme ahora" (secundario)
 *
 * Al elegir, notifica al padre con `{plan, periodicidad, checkout}` —
 * el padre avanza al Paso 2 (form de registro).
 *
 * Datos: reutiliza `pricingSectionCopy` (i18n) para mantener 1 sola
 * fuente de verdad de precios/copy con la sección de pricing del
 * landing (`pricing-section.tsx`).
 */
import { useState } from "react";
import { useLandingTranslations } from "../../hooks/useLandingTranslations";
import styles from "./Paso1ElegirPlan.module.css";


export type PlanCodigo = "start" | "growth";
export type Periodicidad = "monthly" | "annual";

export type EleccionPlan = {
  plan:         PlanCodigo;
  periodicidad: Periodicidad;
  checkout:     boolean;    // true = "suscribirme ahora"; false = "prueba gratis"
};


interface Props {
  /** Callback cuando el usuario elige un plan + modalidad. */
  onElegir: (eleccion: EleccionPlan) => void;
  /** Valor inicial del toggle (viene del query param si el usuario
   *  aterrizó desde el pricing con `?periodicidad=`). */
  periodicidadInicial?: Periodicidad;
}


export function Paso1ElegirPlan({ onElegir, periodicidadInicial = "monthly" }: Props) {
  const t = useLandingTranslations();
  const plans = t.pricing.plans;
  const billing = t.pricing.billing;

  const [cycle, setCycle] = useState<Periodicidad>(periodicidadInicial);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>Elige tu plan</h2>
        <p className={styles.sub}>
          Puedes empezar con una prueba gratis de 7 días o suscribirte
          directo. Se puede cambiar o cancelar cuando quieras.
        </p>
      </header>

      {/* Toggle Mensual / Anual — misma UX que la sección de pricing. */}
      <div className={styles.billingToggle} role="tablist" aria-label={`${billing.monthly} / ${billing.annual}`}>
        <button
          type="button"
          role="tab"
          aria-selected={cycle === "monthly"}
          className={[styles.billingBtn, cycle === "monthly" ? styles.billingBtnActive : ""].join(" ")}
          onClick={() => setCycle("monthly")}
        >
          {billing.monthly}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={cycle === "annual"}
          className={[styles.billingBtn, cycle === "annual" ? styles.billingBtnActive : ""].join(" ")}
          onClick={() => setCycle("annual")}
        >
          {billing.annual}
          <span className={styles.billingHint}>{billing.annualHint}</span>
        </button>
      </div>

      <div className={styles.grid}>
        {plans.map(p => {
          const codigo = p.name.toLowerCase() as PlanCodigo;
          const priceInfo = cycle === "annual" ? p.annual : p.monthly;
          /* Features top: primer grupo de "Módulos incluidos" o
             "Acceso y usuarios" — 3 items para mantener la card corta.
             Si el plan tiene `popularLabel`, se destaca visualmente. */
          const featuresTop = p.groups
            .flatMap(g => g.items)
            .slice(0, 4);
          return (
            <article
              key={codigo}
              className={p.popularLabel ? styles.cardPopular : styles.card}
            >
              {p.popularLabel && (
                <span className={styles.badgePopular}>{p.popularLabel}</span>
              )}
              <h3 className={styles.planName}>{p.name}</h3>
              <div className={styles.priceRow}>
                <span className={styles.price}>{priceInfo.price}</span>
                <span className={styles.period}>{priceInfo.period}</span>
              </div>
              <p className={styles.description}>{p.description}</p>

              <ul className={styles.features}>
                {featuresTop.map((f, i) => (
                  <li key={i}>
                    <span className={`material-symbols-rounded ${styles.check}`} aria-hidden>
                      check
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <div className={styles.ctaStack}>
                <button
                  type="button"
                  className={`${styles.cta} ${styles.ctaPrimary}`}
                  onClick={() => onElegir({ plan: codigo, periodicidad: cycle, checkout: false })}
                >
                  {p.ctaPrimary}
                  <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 18 }}>
                    north_east
                  </span>
                </button>
                <button
                  type="button"
                  className={`${styles.cta} ${styles.ctaSecondary}`}
                  onClick={() => onElegir({ plan: codigo, periodicidad: cycle, checkout: true })}
                >
                  {p.ctaSecondary}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
