import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { Typography, Box } from "@mui/material";
import styles from "./benefit-card.module.css";

export type BenefitCardProps = {
  className?: string;
  coinsHand?: string;
  ahorroEconomico?: string;

  /** Style props */
  ahorroEconomicoMinWidth?: CSSProperties["minWidth"];
};

const BenefitCard: FunctionComponent<BenefitCardProps> = ({
  className = "",
  coinsHand,
  ahorroEconomico,
  ahorroEconomicoMinWidth,
}) => {
  const ahorroEconomicoStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: ahorroEconomicoMinWidth,
    };
  }, [ahorroEconomicoMinWidth]);

  return (
    <Box className={[styles.ahorroContainer, className].join(" ")}>
      <img className={styles.coinsHandIcon} alt="" src={coinsHand} />
      <Typography
        className={styles.ahorroEconomico}
        variant="inherit"
        variantMapping={{ inherit: "h3" }}
        sx={{ fontWeight: "400", lineHeight: "120%", letterSpacing: "-0.01em" }}
        style={ahorroEconomicoStyle}
      >
        {ahorroEconomico}
      </Typography>
      <img
        className={styles.ahorroContainerChild}
        alt=""
        src="/Frame-861.svg"
      />
    </Box>
  );
};

export default BenefitCard;
