import {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Button } from "@mui/material";
import IndustryCard from "./industry-card";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./ecommerce-section.module.css";

export type EcommerceSectionProps = {
  className?: string;
};

const INDUSTRY_IMAGES = [
  "/Industry-Dividers@2x.png",
  "/Frame-18@2x.png",
  "/Frame-182@2x.png",
  "/Frame-185@2x.png",
] as const;

const TIENDA_INXORA_URL = "https://tienda.inxora.com/es";

/** Categorías de la tienda (mismo orden que `ecommerce.industries`) */
const TIENDA_CATEGORY_URLS = [
  "https://tienda.inxora.com/es/electricidad-y-componentes-electricos",
  "https://tienda.inxora.com/es/iluminacion-industrial",
  "https://tienda.inxora.com/es/instrumentacion-medicion-y-automatizacion",
  "https://tienda.inxora.com/es/mecanica-industrial",
] as const;

const EcommerceSection: FunctionComponent<EcommerceSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
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

  const introOn = inView || reducedMotion;

  const industryCardsItems = useMemo(
    () =>
      t.ecommerce.industries.map((label, index) => ({
        industryDividers: INDUSTRY_IMAGES[index],
        electricidad: label,
      })),
    [t.ecommerce.industries],
  );

  return (
    <main
      ref={sectionRef}
      className={[
        styles.main,
        introOn ? styles.ecommerceSectionVisible : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <section className={styles.ecommerceLayout}>
        <Box className={styles.ecommerceContainer}>
          <Box className={styles.ecommerceTitle}>
            <div className={styles.noEsperesMas}>{t.ecommerce.kicker}</div>
          </Box>
          <div className={styles.exploraNuestrosMejores}>
            {t.ecommerce.titleLine1}
            <br />
            {t.ecommerce.titleLine2}
          </div>
          <div className={styles.seleccionaTuIndustria}>{t.ecommerce.lede}</div>
        </Box>
        <Box className={styles.ecommerceCtaRow}>
          <Button
            className={styles.ecommerceButton}
            component="a"
            href={TIENDA_INXORA_URL}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={
              <img width="24px" height="24px" src="/boxicons-chevron-up.png" />
            }
            disableElevation
            variant="contained"
            sx={{
              fontFamily: "var(--hero-cta-font-family)",
              textTransform: "none",
              color: "#fff",
              fontSize: "var(--hero-cta-font-size)",
              fontWeight: "var(--hero-cta-font-weight)",
              letterSpacing: "var(--hero-cta-letter-spacing)",
              background: "var(--inx-blue)",
              borderRadius: "8px",
              "&:hover": { background: "var(--inx-sky)" },
              height: 56,
              minHeight: 56,
              boxSizing: "border-box",
            }}
          >
            {t.ecommerce.cta}
          </Button>
        </Box>
      </section>
      <Box className={styles.industryCardsParent}>
        {industryCardsItems.map((item, index) => (
          <IndustryCard
            key={index}
            industryDividers={item.industryDividers}
            electricidad={item.electricidad}
            detailHref={TIENDA_CATEGORY_URLS[index]}
            detailLabel={t.ecommerce.detailLink}
          />
        ))}
      </Box>
    </main>
  );
};

export default EcommerceSection;
