import { FunctionComponent } from "react";
import { WHATSAPP_QUOTE_URL } from "../constants/whatsapp";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./excel-cta-section.module.css";

export type ExcelCtaSectionProps = {
  className?: string;
};

const ExcelCtaSection: FunctionComponent<ExcelCtaSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      id="demo"
      aria-labelledby="excel-cta-heading"
    >
      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.dot} aria-hidden />
          {t.excelCta.badge}
        </div>
        <h2 className={styles.title} id="excel-cta-heading">
          {t.excelCta.titleLine1}
          <br />
          {t.excelCta.titleLine2Before}{" "}
          <span className={styles.titleAccent}>{t.excelCta.titleLine2Brand}</span>
          {t.excelCta.titleLine2After}
        </h2>
        <p className={styles.sub}>{t.excelCta.sub}</p>
        <a
          className={styles.cta}
          href={WHATSAPP_QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.excelCta.cta}
          <span
            className={["material-symbols-rounded", styles.ctaIcon].join(" ")}
            aria-hidden
          >
            arrow_forward
          </span>
        </a>
      </div>
    </section>
  );
};

export default ExcelCtaSection;
