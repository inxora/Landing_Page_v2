import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { Box } from "@mui/material";
import styles from "./company-logo.module.css";

export type CompanyLogoType = {
  className?: string;
  logotext?: boolean;
  logomark?: string;
  logotext1?: string;

  /** Variant props */
  company?: string;
  darkMode?: boolean;
  style?: string;

  /**
   * Convierte el logo a escala de grises (útil con PNG/JPG/SVG a color).
   * Los SVG monocromo vectoriales se ven igual; desactívalo si necesitas color.
   */
  monochrome?: boolean;

  /** Style props */
  companyLogoWidth?: CSSProperties["width"];
};

const CompanyLogo: FunctionComponent<CompanyLogoType> = ({
  className = "",
  company = "3Portals",
  darkMode = false,
  style = "Default",
  logotext = true,
  monochrome = true,
  companyLogoWidth,
  logomark,
  logotext1,
}) => {
  const companyLogoStyle: CSSProperties = useMemo(() => {
    return {
      width: companyLogoWidth,
    };
  }, [companyLogoWidth]);

  return (
    <Box
      className={[styles.root, monochrome && styles.monochrome, className]
        .filter(Boolean)
        .join(" ")}
      data-company={company}
      data-darkMode={darkMode}
      data-style={style}
      style={companyLogoStyle}
    >
      <img
        className={[styles.logomarkIcon, !logotext && styles.singleMark]
          .filter(Boolean)
          .join(" ")}
        alt=""
        src={logomark}
      />
      {!!logotext && (
        <img
          className={styles.logotextIcon}
          loading="lazy"
          alt=""
          src={logotext1}
        />
      )}
    </Box>
  );
};

export default CompanyLogo;
