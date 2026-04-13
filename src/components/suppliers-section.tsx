import { FunctionComponent } from "react";
import { Box, Button } from "@mui/material";
import CompanyLogo from "./company-logo";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./suppliers-section.module.css";

export type SuppliersSectionProps = {
  className?: string;
};

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

  return (
    <section className={[styles.main, className].join(" ")}>
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
            endIcon={
              <img width="24px" height="24px" src="/boxicons-chevron-up.png" />
            }
            disableElevation
            variant="contained"
            sx={{
              fontFamily: "var(--font-hero-display)",
              textTransform: "none",
              color: "#fff",
              fontSize: "18",
              background: "var(--inx-blue)",
              borderRadius: "8px",
              "&:hover": { background: "var(--inx-sky)" },
              height: 56,
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
