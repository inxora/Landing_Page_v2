import { FunctionComponent } from "react";
import { Typography, Box } from "@mui/material";
import styles from "./industry-card.module.css";

export type IndustryCardProps = {
  className?: string;
  industryDividers?: string;
  electricidad?: string;
  detailHref: string;
  detailLabel: string;
};

const IndustryCard: FunctionComponent<IndustryCardProps> = ({
  className = "",
  industryDividers,
  electricidad,
  detailHref,
  detailLabel,
}) => {
  return (
    <section className={[styles.industryCards, className].join(" ")}>
      <img
        className={styles.industryDividersIcon}
        alt=""
        src={industryDividers}
      />
      <Box className={styles.industryContainer}>
        <Box className={styles.industryDetails}>
          <Typography
            className={styles.electricidad}
            variant="inherit"
            variantMapping={{ inherit: "h3" }}
            sx={{
              fontFamily: "var(--font-hero-display)",
              fontWeight: "400",
              lineHeight: "120%",
              letterSpacing: "-0.01em",
            }}
          >
            {electricidad}
          </Typography>
          <Typography
            className={styles.masDe160}
            variant="inherit"
            variantMapping={{ inherit: "h3" }}
            sx={{
              fontFamily: "var(--font-hero-display)",
              fontWeight: "400",
              lineHeight: "120%",
              letterSpacing: "-0.01em",
            }}
          >
            Mas de 160 Productos
          </Typography>
          <div className={styles.disponibleParaDelivery}>
            Disponible para Delivery
          </div>
        </Box>
        <a
          className={styles.detailLink}
          href={detailHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {detailLabel}
        </a>
      </Box>
    </section>
  );
};

export default IndustryCard;
