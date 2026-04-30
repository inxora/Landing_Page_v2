import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@mui/material";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import { ROUTES } from "../routes/paths";
import { useDemoModal } from "../context/DemoModalContext";
import DashboardMockup from "./DashboardMockup";
import styles from "./hero-section.module.css";

export type HeroSectionProps = {
  className?: string;
};

/** Misma página + ancla: string evita dudas con MUI+Router. */
const PLANES_HREF = `${ROUTES.home}#planes`;
const demoHashLink = { pathname: ROUTES.home, hash: "demo" };

/** Misma caja para ambos CTAs (evita diferencias MUI Button vs Link). */
const heroCtaLinkBase = {
  fontFamily: "var(--hero-cta-font-family)",
  textTransform: "none" as const,
  color: "#fff",
  fontSize: "var(--hero-cta-font-size)",
  fontWeight: "var(--hero-cta-font-weight)",
  letterSpacing: "var(--hero-cta-letter-spacing)",
  borderRadius: "8px",
  height: 56,
  minHeight: 56,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  boxSizing: "border-box" as const,
};

const heroCtaSxPrimary = {
  ...heroCtaLinkBase,
  background: "var(--inx-blue)",
  "&:hover": { background: "var(--inx-sky)" },
};

const heroCtaSxSecondary = {
  ...heroCtaLinkBase,
  background: "rgba(255, 255, 255, 0.16)",
  cursor: "pointer",
  border: "none",
  WebkitAppearance: "none",
  appearance: "none",
  font: "inherit",
  "&:hover": { background: "rgba(255, 255, 255, 0.22)" },
};

const HeroSection: FunctionComponent<HeroSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const { openModal } = useDemoModal();

  return (
    <Box className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.heroCopyColumn}>
        <Box className={styles.ameContainer}>
          <div
            className={[styles.elNuevoEstndar, styles.headlineFlyIn].join(" ")}
          >
            {t.hero.h1Line1}
            <br />
            <em>{t.hero.h1Em}</em>
          </div>
          <Box
            className={[styles.vendemosContainer, styles.bodyFlyIn].join(" ")}
          >
            <div className={styles.vendemosSuministrosIndustria}>
              {t.hero.sub}
            </div>
          </Box>
        </Box>
        <Box className={styles.instantContainerParent}>
          <Link
            component={RouterLink}
            to={PLANES_HREF}
            className={[styles.instantContainer, styles.btnZoomPrimary].join(
              " ",
            )}
            underline="none"
            sx={heroCtaSxPrimary}
          >
            {t.hero.ctaSubscribe}
            <span
              className="material-symbols-rounded"
              style={{ fontSize: 22 }}
              aria-hidden
            >
              arrow_forward
            </span>
          </Link>
          <Link
            component="button"
            className={[styles.dispatchContainer, styles.btnZoomSecondary].join(" ")}
            underline="none"
            sx={heroCtaSxSecondary}
            onClick={openModal}
          >
            {t.hero.ctaDemo}
          </Link>
        </Box>
      </div>

      <div className={styles.heroMockupColumn}>
        <div className={styles.heroMockupBlock}>
          <div className={styles.heroMockupWrap}>
            <DashboardMockup />
            <RouterLink
              className={styles.heroPlay}
              to={demoHashLink}
              aria-label={t.hero.play}
              title={t.hero.play}
            >
              <span className={styles.heroPlayRing} aria-hidden />
              <span
                className={[
                  "material-symbols-rounded",
                  styles.heroPlayIcon,
                ].join(" ")}
                aria-hidden
              >
                play_arrow
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default HeroSection;
