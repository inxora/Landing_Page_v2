import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import CompanyLogo from "./company-logo";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./trusted-clients-section.module.css";

export type TrustedClientsSectionProps = {
  className?: string;
};

type TrustedLogo = {
  company: string;
  logomark: string;
  visualBoost?: boolean;
};

const TRUSTED_LOGOS: TrustedLogo[] = [
  {
    company: "LimaAirport",
    logomark: "/logo/limaairport.svg",
  },
  {
    company: "Molitalia",
    logomark: "/logo/molitalia.svg",
  },
  {
    company: "PsamPeru",
    logomark: "/logo/logo-psamperu%201.svg",
  },
  {
    company: "ClientImg64",
    logomark: "/logo/image%2064.svg",
  },
  {
    company: "ClientImg65",
    logomark: "/logo/image%2065.svg",
    visualBoost: true,
  },
  {
    company: "ClientImg69",
    logomark: "/logo/image%2069.svg",
    visualBoost: true,
  },
];

function LogoCell({
  logo,
  className,
}: {
  logo: TrustedLogo;
  className?: string;
}) {
  return (
    <div
      className={[
        styles.logoCell,
        logo.visualBoost ? styles.logoCellVisualBoost : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CompanyLogo
        className={styles.logoInRibbon}
        company={logo.company}
        darkMode
        style="Default"
        logotext={false}
        logomark={logo.logomark}
        companyLogoWidth="100%"
      />
    </div>
  );
}

const TrustedClientsSection: FunctionComponent<
  TrustedClientsSectionProps
> = ({ className = "" }) => {
  const t = useLandingTranslations();
  const marqueeLogos = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

  return (
    <section className={[styles.frameParent, className].join(" ")}>
      <Box className={styles.trustedInner}>
        <div className={styles.titleRow}>
          <div className={styles.nuestrosClientesDe}>{t.trusted.title}</div>
        </div>

        {/* Desktop: fila estática */}
        <div className={styles.logosRowDesktop}>
          {TRUSTED_LOGOS.map((logo) => (
            <LogoCell key={logo.company} logo={logo} />
          ))}
        </div>

        {/* Vista no desktop: carrusel automático */}
        <div
          className={styles.logosMarquee}
          role="region"
          aria-label={t.trusted.title}
        >
          <div className={styles.logosMarqueeTrack}>
            {marqueeLogos.map((logo, i) => (
              <LogoCell
                key={`${logo.company}-${i}`}
                logo={logo}
                className={styles.logoCellMarquee}
              />
            ))}
          </div>
        </div>
      </Box>
    </section>
  );
};

export default TrustedClientsSection;
