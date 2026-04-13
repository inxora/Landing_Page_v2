import { FunctionComponent } from "react";
import { Typography, Box } from "@mui/material";
import styles from "./process-step-card.module.css";

export type ProcessStepCardProps = {
  className?: string;
  confirmaTuPedido?: string;
  alInstante?: string;
  frame18?: string;
};

const ProcessStepCard: FunctionComponent<ProcessStepCardProps> = ({
  className = "",
  confirmaTuPedido,
  alInstante,
  frame18,
}) => {
  return (
    <section className={[styles.frameParent, className].join(" ")}>
      <Box className={styles.frameWrapper}>
        <Box className={styles.confirmaTuPedidoParent}>
          <Typography
            className={styles.confirmaTuPedido}
            variant="inherit"
            variantMapping={{ inherit: "h3" }}
            sx={{
              fontFamily: "var(--font-hero-display)",
              fontWeight: "400",
              lineHeight: "120%",
              letterSpacing: "-0.01em",
            }}
          >
            {confirmaTuPedido}
          </Typography>
          <Typography
            className={styles.alInstante}
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
            {alInstante}
          </Typography>
        </Box>
      </Box>
      <img className={styles.frameChild} alt="" src={frame18} />
    </section>
  );
};

export default ProcessStepCard;
