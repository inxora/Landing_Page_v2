import { FunctionComponent, useMemo } from "react";
import { Box, Typography, Link } from "@mui/material";
import { WHATSAPP_QUOTE_URL } from "../constants/whatsapp";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./process-steps-section.module.css";

export type ProcessStepsSectionProps = {
  className?: string;
};

const STEP_IMAGES = [
  "/Frame-184@2x.png",
  "/Frame-183@2x.png",
  "/divwhoicon@2x.png",
  "/Frame-21@2x.png",
] as const;

const ProcessStepsSection: FunctionComponent<ProcessStepsSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();

  const steps = useMemo(
    () =>
      t.process.steps.map((step, index) => ({
        ...step,
        image: STEP_IMAGES[index],
        showButton: index === 0,
      })),
    [t.process.steps],
  );

  return (
    <section className={[styles.labelsSeperator, className].join(" ")}>
      <section className={styles.processContainerWrapper}>
        <Box className={styles.processContainer}>
          <Box className={styles.titleContainer}>
            <div className={styles.nuestroPasoA}>{t.process.kicker}</div>
          </Box>
          <div className={styles.comienzaAhoraY}>
            {t.process.headlineLine1}
            <br /> {t.process.headlineLine2}
          </div>
          <div className={styles.tenemosProcesoSimple}>
            {t.process.ledeLine1} <br />
            {t.process.ledeLine2}
          </div>
        </Box>
      </section>
      <Box className={styles.processSteps}>
        <Box className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <Box key={index} className={styles.stepCard}>
              <Box className={styles.stepNumberCell}>
                <Box className={styles.stepNumberInner}>
                  <Box className={styles.wrapper}>
                    <Typography
                      className={styles.h3}
                      variant="inherit"
                      component="span"
                      variantMapping={{ inherit: "span" }}
                      sx={{
                        fontWeight: "700",
                        lineHeight: "120%",
                        letterSpacing: "-0.01em",
                        color: "#fff",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className={styles.stepColumn}>
                <Box className={styles.stepHeadings}>
                  <Typography
                    className={styles.cotizaConSara}
                    variant="inherit"
                    variantMapping={{ inherit: "h3" }}
                    sx={{
                      fontWeight: "400",
                      lineHeight: "120%",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    className={styles.enMinutos}
                    variant="inherit"
                    variantMapping={{ inherit: "h3" }}
                    sx={{
                      fontWeight: "400",
                      fontSize: "var(--fs-20)",
                      lineHeight: "120%",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.subtitle}
                  </Typography>
                </Box>
                <img
                  className={styles.stepImage}
                  alt=""
                  src={step.image}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {step.showButton && (
                  <Link
                    className={styles.quotationActions}
                    href={WHATSAPP_QUOTE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    sx={{
                      textTransform: "none",
                      color: "#fff",
                      fontSize: "16",
                      background: "#139ed4",
                      borderRadius: "8px",
                      "&:hover": { background: "#139ed4" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    {t.process.ctaQuote}
                  </Link>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default ProcessStepsSection;
