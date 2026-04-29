import { FunctionComponent } from "react";
import { WHATSAPP_QUOTE_URL } from "../constants/whatsapp";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import type { PricingFeatureIcon } from "../i18n/pricingPlans";
import styles from "./pricing-section.module.css";

export type PricingSectionProps = {
  className?: string;
};

function FeatureIcon({ icon }: { icon: PricingFeatureIcon }) {
  if (icon === "check") {
    return (
      <span className={`material-symbols-rounded ${styles.check}`} aria-hidden>
        check
      </span>
    );
  }
  if (icon === "dash") {
    return (
      <span className={`material-symbols-rounded ${styles.dash}`} aria-hidden>
        horizontal_rule
      </span>
    );
  }
  return (
    <span className={`material-symbols-rounded ${styles.star}`} aria-hidden>
      auto_awesome
    </span>
  );
}

const PricingSection: FunctionComponent<PricingSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      id="planes"
      aria-labelledby="pricing-heading"
    >
      <div className={styles.inner}>
        <div className={styles.kicker}>{t.pricing.kicker}</div>
        <h2 className={styles.title} id="pricing-heading">
          {t.pricing.title}
        </h2>
        <p className={styles.lede}>{t.pricing.lede}</p>

        <div className={styles.grid}>
          {t.pricing.plans.map((plan) => (
            <article
              key={plan.name}
              className={plan.popularLabel ? styles.cardPopular : styles.card}
            >
              {plan.popularLabel ? (
                <span className={styles.badgePopular}>{plan.popularLabel}</span>
              ) : null}
              {plan.enterpriseBadge ? (
                <span className={styles.badgeEnterprise}>
                  {plan.enterpriseBadge}
                </span>
              ) : null}

              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.priceRow}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              <p className={styles.description}>{plan.description}</p>

              {plan.groups.map((group) => (
                <div key={group.title} className={styles.group}>
                  <div className={styles.groupTitle}>{group.title}</div>
                  <ul className={styles.list}>
                    {group.items.map((item, rowIdx) => (
                      <li
                        key={`${group.title}-${rowIdx}-${item.text.slice(0, 24)}`}
                        className={styles.row}
                      >
                        <span className={styles.iconCell}>
                          <FeatureIcon icon={item.icon} />
                        </span>
                        <span className={styles.rowText}>{item.text}</span>
                        {item.badge ? (
                          <span className={styles.badge}>{item.badge}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <a
                className={styles.cta}
                href={WHATSAPP_QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.cta}
                <span
                  className={["material-symbols-rounded", styles.ctaIcon].join(
                    " ",
                  )}
                  aria-hidden
                >
                  north_east
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
