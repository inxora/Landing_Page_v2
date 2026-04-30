import { FunctionComponent } from "react";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import { useDemoModal } from "../context/DemoModalContext";
import styles from "./excel-cta-section.module.css";

export type ExcelCtaSectionProps = {
  className?: string;
};

const ExcelCtaSection: FunctionComponent<ExcelCtaSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const { openModal } = useDemoModal();

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
        <button
          type="button"
          className={styles.cta}
          onClick={openModal}
        >
          {t.excelCta.cta}
          <span
            className={["material-symbols-rounded", styles.ctaIcon].join(" ")}
            aria-hidden
          >
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
};

export default ExcelCtaSection;
