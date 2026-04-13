import { FunctionComponent } from "react";
import { Box, Button, Link } from "@mui/material";
import { WHATSAPP_QUOTE_URL } from "../constants/whatsapp";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./hero-section.module.css";

export type HeroSectionProps = {
  className?: string;
};

const HeroSection: FunctionComponent<HeroSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();

  return (
    <Box className={[styles.rectangleParent, className].join(" ")}>
      <Box className={styles.ameContainer}>
        <div className={styles.elNuevoEstndar}>
          {t.hero.headlineBefore}{" "}
          <br />
          <span className={styles.headlineHighlight}>
            {t.hero.headlineHighlight}
          </span>
        </div>
        <Box className={styles.vendemosContainer}>
          <div className={styles.vendemosSuministrosIndustria}>
            {t.hero.body}
          </div>
        </Box>
      </Box>
      <Box className={styles.instantContainerParent}>
        <Link
          className={styles.instantContainer}
          href={WHATSAPP_QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "18",
            background: "#139ed4",
            borderRadius: "8px",
            "&:hover": { background: "#139ed4" },
            height: 56,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxSizing: "border-box",
          }}
        >
          {t.hero.ctaQuote}
          <img width="24" height="24" src="/boxicons-chevron-up.png" alt="" />
        </Link>
        <Button
          className={styles.dispatchContainer}
          endIcon={
            <img width="24px" height="24px" src="/boxicons-chevron-up.png" />
          }
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "18",
            background: "rgba(255, 255, 255, 0.16)",
            borderRadius: "8px",
            "&:hover": { background: "rgba(255, 255, 255, 0.16)" },
            height: 56,
          }}
        >
          {t.hero.ctaDispatch}
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
