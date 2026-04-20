import {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Box, Button } from "@mui/material";
import CompanyLogo from "./company-logo";
import { WHATSAPP_QUOTE_URL } from "../constants/whatsapp";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./suppliers-section.module.css";

export type SuppliersSectionProps = {
  className?: string;
};

const WHATSAPP_SUPPLIER_URL = `${WHATSAPP_QUOTE_URL}&text=${encodeURIComponent(
  "Hola, me interesa ser proveedor en Inxora.",
)}`;

const BRAND_ROWS: { company: string; src: string }[][] = [
  [
    { company: "Abro", src: "/brand/abro.svg" },
    { company: "Bosch", src: "/brand/bosch.svg" },
  ],
  [
    { company: "DeWalt", src: "/brand/deWalt.svg" },
    { company: "Hellermann", src: "/brand/hellermann.svg" },
  ],
  [
    { company: "Karcher", src: "/brand/karcher.svg" },
    { company: "Loctite", src: "/brand/loctite.svg" },
  ],
  [
    { company: "Milwaukee", src: "/brand/milwaukee.svg" },
    { company: "Mitutoyo", src: "/brand/mitutoyo.svg" },
  ],
  [
    { company: "Toscano", src: "/brand/toscano.svg" },
    { company: "Wiha", src: "/brand/wiha.svg" },
  ],
];

const BRAND_ITEMS = BRAND_ROWS.flat();

const SuppliersSection: FunctionComponent<SuppliersSectionProps> = ({
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

  return (
    <section
      ref={sectionRef}
      className={[
        styles.main,
        introOn ? styles.suppliersSectionVisible : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Box className={styles.frameParent}>
        <section className={styles.frameGroup}>
          <Box className={styles.frameContainer}>
            <Box className={styles.nuestrosProveedoresWrapper}>
              <div className={styles.nuestrosProveedores}>{t.suppliers.kicker}</div>
            </Box>
            <div className={styles.trabajandoConProvedores}>
              {t.suppliers.title}
            </div>
            <div className={styles.trabajamosConLos}>{t.suppliers.lede}</div>
          </Box>
          <Button
            className={styles.frameChild}
            component="a"
            href={WHATSAPP_SUPPLIER_URL}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={
              <img width="24px" height="24px" src="/boxicons-chevron-up.png" alt="" />
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
            {t.suppliers.ctaSupplier}
          </Button>
        </section>
        <section className={styles.brandContainerParentDesktop}>
          {BRAND_ROWS.map((pair, rowIdx) => (
            <Box className={styles.brandContainer} key={rowIdx}>
              {pair.map(({ company, src }) => (
                <Box className={styles.companyContainer} key={company}>
                  <Box
                    className={styles.brandLogoSlot}
                    data-brand={company}
                  >
                    <CompanyLogo
                      className={styles.brandLogo}
                      company={company}
                      darkMode
                      style="Default"
                      logotext={false}
                      logomark={src}
                      companyLogoWidth="100%"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </section>
        <div
          className={styles.brandMarquee}
          role="region"
          aria-label={t.suppliers.title}
        >
          <div className={styles.brandMarqueeTrack}>
            <div className={styles.brandMarqueeSet}>
              {BRAND_ITEMS.map(({ company, src }) => (
                <Box className={styles.companyContainer} key={company}>
                  <Box className={styles.brandLogoSlot} data-brand={company}>
                    <CompanyLogo
                      className={styles.brandLogo}
                      company={company}
                      darkMode
                      style="Default"
                      logotext={false}
                      logomark={src}
                      companyLogoWidth="100%"
                    />
                  </Box>
                </Box>
              ))}
            </div>
            <div className={styles.brandMarqueeSet} aria-hidden="true">
              {BRAND_ITEMS.map(({ company, src }) => (
                <Box
                  className={styles.companyContainer}
                  key={`${company}-dup`}
                >
                  <Box className={styles.brandLogoSlot} data-brand={company}>
                    <CompanyLogo
                      className={styles.brandLogo}
                      company={company}
                      darkMode
                      style="Default"
                      logotext={false}
                      logomark={src}
                      companyLogoWidth="100%"
                    />
                  </Box>
                </Box>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </section>
  );
};

export default SuppliersSection;
