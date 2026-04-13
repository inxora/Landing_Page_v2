import { FunctionComponent, useMemo } from "react";
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

const EcommerceSection: FunctionComponent<EcommerceSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();

  const industryCardsItems = useMemo(
    () =>
      t.ecommerce.industries.map((label, index) => ({
        industryDividers: INDUSTRY_IMAGES[index],
        electricidad: label,
      })),
    [t.ecommerce.industries],
  );

  return (
    <main className={[styles.main, className].join(" ")}>
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
              textTransform: "none",
              color: "#fff",
              fontSize: "18",
              background: "#139ed4",
              borderRadius: "8px",
              "&:hover": { background: "#139ed4" },
              height: 56,
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
          />
        ))}
      </Box>
    </main>
  );
};

export default EcommerceSection;
