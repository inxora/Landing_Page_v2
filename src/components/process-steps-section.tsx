import {
  Fragment,
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Typography, Link } from "@mui/material";
import { WHATSAPP_QUOTE_URL } from "../constants/whatsapp";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./process-steps-section.module.css";

/** Etapa secuencial: 1–4 = columnas; líneas entre i e i+1 en etapas pares 2,4,6 */
const MAX_STAGE = 7;

export type ProcessStepsSectionProps = {
  className?: string;
};

const STEP_IMAGES = [
  "/Frame-184@2x.png",
  "/Frame-183@2x.png",
  "/divwhoicon@2x.png",
  "/Frame-21@2x.png",
] as const;

function columnStageIndex(col: number): number {
  return 1 + col * 2;
}

function lineStageIndex(line: number): number {
  return 2 + line * 2;
}

/** Progreso 0–1 del trazo vertical (etapas 2, 4, 6 = un tercio cada una) */
function mobileLineProgress(stage: number): number {
  if (stage >= 6) return 1;
  if (stage >= 4) return 2 / 3;
  if (stage >= 2) return 1 / 3;
  return 0;
}

const ProcessStepsSection: FunctionComponent<ProcessStepsSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [stage, setStage] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) {
      setInView(true);
      setStage(MAX_STAGE);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    if (rect.bottom > 32 && rect.top < vh - 32) {
      setInView(true);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let delay = 480;
    const gap = 580;
    const timers: number[] = [];
    for (let s = 1; s <= MAX_STAGE; s += 1) {
      timers.push(
        window.setTimeout(() => {
          setStage(s);
        }, delay),
      );
      delay += gap;
    }
    return () => timers.forEach((id) => clearTimeout(id));
  }, [inView, reducedMotion]);

  const steps = useMemo(
    () =>
      t.process.steps.map((step, index) => ({
        ...step,
        image: STEP_IMAGES[index],
        showButton: index === 0,
      })),
    [t.process.steps],
  );

  const introOn = inView || reducedMotion;
  const mobileLineScale = reducedMotion ? 1 : mobileLineProgress(stage);

  const circleNode = (index: number) => (
    <Box className={styles.stepNumberInner}>
      <Box className={styles.wrapper}>
        <Typography
          className={styles.h3}
          variant="inherit"
          component="span"
          variantMapping={{ inherit: "span" }}
          sx={{
            fontFamily: "var(--font-hero-display)",
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
  );

  const stepBody = (step: (typeof steps)[number], index: number) => (
    <>
      <Box className={styles.stepHeadings}>
        <Typography
          className={styles.cotizaConSara}
          variant="inherit"
          variantMapping={{ inherit: "h3" }}
          sx={{
            fontFamily: "var(--font-hero-display)",
            fontWeight: "600",
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
            fontFamily: "var(--font-hero-display)",
            fontWeight: "400",
            fontSize: "var(--fs-20)",
            lineHeight: "120%",
            letterSpacing: "-0.01em",
          }}
        >
          {step.subtitle}
        </Typography>
      </Box>
      <Box className={styles.stepMediaBlock}>
        <img
          className={styles.stepImage}
          alt=""
          src={step.image}
          loading={index === 0 ? "eager" : "lazy"}
        />
        {step.showButton ? (
          <Link
            className={styles.quotationActions}
            href={WHATSAPP_QUOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
          >
            {t.process.ctaQuote}
          </Link>
        ) : null}
      </Box>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className={[
        styles.labelsSeperator,
        introOn ? styles.processSectionVisible : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
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
        {/* Escritorio: un solo grid — línea, círculos y columnas comparten ejes */}
        <div className={styles.stepsGridDesktop}>
          <div className={styles.desktopTrackOverlay} aria-hidden>
            <div className={styles.desktopTrackFlex}>
              <div className={styles.desktopTrackCircleGap} />
              {[0, 1, 2].map((i) => (
                <Fragment key={`desk-seg-${i}`}>
                  <div
                    className={[
                      styles.connectorSegment,
                      stage >= lineStageIndex(i) ? styles.connectorLineVisible : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                  <div className={styles.desktopTrackCircleGap} />
                </Fragment>
              ))}
            </div>
          </div>
          {steps.map((_, index) => (
            <div
              key={`desk-circle-${index}`}
              className={styles.stepCircleCellDesktop}
              style={{ gridColumn: index + 1 }}
            >
              <div
                className={[
                  styles.connectorCircleWrap,
                  stage >= columnStageIndex(index)
                    ? styles.connectorPieceVisible
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {circleNode(index)}
              </div>
            </div>
          ))}
          {steps.map((step, index) => (
            <div
              key={`desk-col-${index}`}
              className={[
                styles.stepCardDesktop,
                stage >= columnStageIndex(index) ? styles.stepCardVisible : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ gridColumn: index + 1 }}
            >
              <Box className={styles.stepColumn}>{stepBody(step, index)}</Box>
            </div>
          ))}
        </div>

        <Box className={styles.stepsGrid}>
          <div
            className={styles.mobileTimelineLine}
            aria-hidden
            style={{ transform: `scaleY(${mobileLineScale})` }}
          />
          {steps.map((step, index) => (
            <Box
              key={index}
              className={[
                styles.stepCard,
                stage >= columnStageIndex(index) ? styles.stepCardVisible : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Box
                className={[styles.stepNumberCell, styles.stepNumberMobileOnly].join(
                  " ",
                )}
              >
                {index > 0 ? (
                  <div
                    className={[
                      styles.railVSegment,
                      styles.railVSegmentTop,
                      stage >= lineStageIndex(index - 1)
                        ? styles.connectorLineVisible
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden
                  />
                ) : null}
                {circleNode(index)}
                {index < steps.length - 1 ? (
                  <div
                    className={[
                      styles.railVSegment,
                      styles.railVSegmentBottom,
                      stage >= lineStageIndex(index)
                        ? styles.connectorLineVisible
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden
                  />
                ) : null}
              </Box>
              <Box className={styles.stepColumn}>{stepBody(step, index)}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default ProcessStepsSection;
