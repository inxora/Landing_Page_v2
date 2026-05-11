import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@mui/material";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import { ROUTES } from "../routes/paths";
import { useLanguage } from "../context/LanguageContext";
import { buildWhatsAppDemoUrl } from "../constants/whatsapp";
import DashboardMockup from "./DashboardMockup";
import styles from "./hero-section.module.css";

export type HeroSectionProps = {
  className?: string;
};

/** Lleva al usuario a la sección "INXORA en acción" (Short de YouTube). */
const demoHashLink = { pathname: ROUTES.home, hash: "video" };

/** Globos flotantes alrededor del mockup del hero (icono + posición por índice). */
const HERO_BUBBLE_ICONS = [
  "groups",
  "settings_suggest",
  "compare_arrows",
  "assignment_turned_in",
] as const;
const HERO_BUBBLE_POS = [
  styles.heroBubbleTL,
  styles.heroBubbleTR,
  styles.heroBubbleBL,
  styles.heroBubbleBR,
] as const;

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
  const { lang } = useLanguage();
  const whatsappDemoUrl = buildWhatsAppDemoUrl(lang);

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
            className={[styles.instantContainer, styles.btnZoomPrimary].join(
              " ",
            )}
            underline="none"
            sx={heroCtaSxPrimary}
            href="#demo"
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
            className={[styles.dispatchContainer, styles.btnZoomSecondary].join(" ")}
            underline="none"
            sx={heroCtaSxSecondary}
            href={whatsappDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.hero.ctaDemo}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
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

            {t.hero.bubbles.map((text, i) => (
              <div
                key={i}
                className={[styles.heroBubble, HERO_BUBBLE_POS[i]].join(" ")}
                aria-hidden
              >
                <span className={styles.heroBubbleIconWrap}>
                  <span className={`material-symbols-rounded ${styles.heroBubbleIcon}`}>
                    {HERO_BUBBLE_ICONS[i]}
                  </span>
                </span>
                <span className={styles.heroBubbleText}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default HeroSection;
