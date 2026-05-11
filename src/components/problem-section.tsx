import { type FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./problem-section.module.css";

export type ProblemSectionProps = {
  className?: string;
};

const POINT_ICONS = [
  "visibility_off",
  "receipt_long",
  "sync_disabled",
  "crisis_alert",
] as const;

const ProblemSection: FunctionComponent<ProblemSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      id="problema"
      aria-labelledby="problem-heading"
    >
      <Box className={styles.intro}>
        <Box className={styles.kickerWrapper}>
          <div className={styles.kicker}>{t.problem.kicker}</div>
        </Box>
        <h2 className={styles.title} id="problem-heading">
          {t.problem.titleLine1}
          <br />
          <span className={styles.titleHighlight}>
            {t.problem.titleAccent}
          </span>
        </h2>
        <p className={styles.lede}>{t.problem.lede}</p>
      </Box>

      <div className={styles.showcase}>
        <ul className={styles.pointsList}>
          {t.problem.points.map((point, idx) => (
            <li
              key={point.title}
              className={[styles.pointCard, styles[`slot${idx}`]]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.pointIconWrap} aria-hidden>
                <span
                  className={`material-symbols-rounded ${styles.pointIcon}`}
                >
                  {POINT_ICONS[idx] ?? POINT_ICONS[0]}
                </span>
              </div>
              <strong className={styles.pointTitle}>{point.title}</strong>
              <p className={styles.pointText}>{point.body}</p>
            </li>
          ))}
        </ul>

        <div className={styles.imageSlot}>
          <img
            className={styles.problemImage}
            src="/señor_preocupao.jpeg"
            alt={t.problem.imageAlt}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
