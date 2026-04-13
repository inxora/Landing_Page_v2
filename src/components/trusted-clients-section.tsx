import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import CompanyLogo from "./company-logo";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./trusted-clients-section.module.css";

export type TrustedClientsSectionProps = {
  className?: string;
};

const TrustedClientsSection: FunctionComponent<
  TrustedClientsSectionProps
> = ({ className = "" }) => {
  const t = useLandingTranslations();

  return (
    <section className={[styles.frameParent, className].join(" ")}>
      <Box className={styles.trustedInner}>
        <div className={styles.titleRow}>
          <div className={styles.nuestrosClientesDe}>{t.trusted.title}</div>
        </div>
        <div className={styles.logosRow}>
          <div className={styles.logoCell}>
            <CompanyLogo
              className={styles.logoInRibbon}
              company="LimaAirport"
              darkMode
              style="Default"
              logotext={false}
              logomark="/logo/limaairport.svg"
              companyLogoWidth="100%"
            />
          </div>
          <div className={styles.logoCell}>
            <CompanyLogo
              className={styles.logoInRibbon}
              company="Molitalia"
              darkMode
              style="Default"
              logotext={false}
              logomark="/logo/molitalia.svg"
              companyLogoWidth="100%"
            />
          </div>
          <div className={styles.logoCell}>
            <CompanyLogo
              className={styles.logoInRibbon}
              company="PsamPeru"
              darkMode
              style="Default"
              logotext={false}
              logomark="/logo/logo-psamperu%201.svg"
              companyLogoWidth="100%"
            />
          </div>
          <div className={styles.logoCell}>
            <CompanyLogo
              className={styles.logoInRibbon}
              company="ClientImg64"
              darkMode
              style="Default"
              logotext={false}
              logomark="/logo/image%2064.svg"
              companyLogoWidth="100%"
            />
          </div>
          <div className={styles.logoCell}>
            <CompanyLogo
              className={styles.logoInRibbon}
              company="ClientImg65"
              darkMode
              style="Default"
              logotext={false}
              logomark="/logo/image%2065.svg"
              companyLogoWidth="100%"
            />
          </div>
          <div className={styles.logoCell}>
            <CompanyLogo
              className={styles.logoInRibbon}
              company="ClientImg69"
              darkMode
              style="Default"
              logotext={false}
              logomark="/logo/image%2069.svg"
              companyLogoWidth="100%"
            />
          </div>
        </div>
      </Box>
    </section>
  );
};

export default TrustedClientsSection;
