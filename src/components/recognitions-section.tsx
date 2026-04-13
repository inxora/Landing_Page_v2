import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./recognitions-section.module.css";

export type RecognitionsSectionProps = {
  className?: string;
};

/* Archivos en /public/recognitions — grid escritorio 4+4+4; carrusel usa el mismo orden */
const RECOGNITION_ROWS: { alt: string; file: string }[][] = [
  [
    { alt: "ProInnóvate Perú", file: "logo-proinnovate 1.svg" },
    { alt: "PRODUCE Perú", file: "PRODUCE-800x400 1.svg" },
    { alt: "Scale", file: "scale 1.svg" },
    { alt: "Startup Perú", file: "sup 1.svg" },
  ],
  [
    { alt: "PROEXCA", file: "sx_explorer-logo-vector.svg" },
    { alt: "PROEXCA", file: "PROEXCA_REDES-SOCIALES_WEB_1817X264.svg" },
    { alt: "eMerge Americas", file: "eMergeAmericas_CMKY_Horz-768x337-u208D2.tmp_.svg" },
    { alt: "Canarias Latam Tech", file: "Recurso-23logo.svg" },
  ],
  [
    { alt: "South Summit", file: "south_summit-removebg-preview.svg" },
    { alt: "Start UPC", file: "start-upc-logo.png" },
    { alt: "Mentor Day", file: "LogoMentorDay-e1675357486834.svg" },
    { alt: "PROMPERÚ", file: "Logo-PROMPERU.svg" },
  ],
];

const RECOGNITION_ITEMS = RECOGNITION_ROWS.flat();

function recognitionAssetUrl(file: string) {
  return `/recognitions/${encodeURIComponent(file)}`;
}

const RecognitionsSection: FunctionComponent<RecognitionsSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();

  return (
    <section className={[styles.section, className].join(" ")}>
      <section className={styles.recognitionLayout}>
        <Box className={styles.recognitionContainer}>
          <div className={styles.reconocimientos}>{t.recognitions.kicker}</div>
        </Box>
        <div className={styles.respaldadosPorEl}>{t.recognitions.title}</div>
        <div className={styles.inxoraEsImpulsada}>{t.recognitions.lede}</div>
      </section>
      <Box className={styles.recognitionLogosDesktop}>
        {RECOGNITION_ROWS.map((pair, rowIdx) => (
          <Box className={styles.logoRowOne} key={rowIdx}>
            {pair.map(({ alt, file }) => (
              <Box className={styles.logoPairsOne} key={file}>
                <div className={styles.recognitionLogoSlot}>
                  <img
                    className={styles.recognitionLogo}
                    src={recognitionAssetUrl(file)}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <div
        className={styles.recognitionMarquee}
        role="region"
        aria-label={t.recognitions.title}
      >
        <div className={styles.recognitionMarqueeTrack}>
          <div className={styles.recognitionMarqueeSet}>
            {RECOGNITION_ITEMS.map(({ alt, file }) => (
              <Box className={styles.logoPairsOne} key={file}>
                <div className={styles.recognitionLogoSlot}>
                  <img
                    className={styles.recognitionLogo}
                    src={recognitionAssetUrl(file)}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Box>
            ))}
          </div>
          <div className={styles.recognitionMarqueeSet} aria-hidden="true">
            {RECOGNITION_ITEMS.map(({ alt, file }) => (
              <Box className={styles.logoPairsOne} key={`${file}-dup`}>
                <div className={styles.recognitionLogoSlot}>
                  <img
                    className={styles.recognitionLogo}
                    src={recognitionAssetUrl(file)}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Box>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecognitionsSection;
