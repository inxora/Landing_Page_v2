import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./recognitions-section.module.css";

export type RecognitionsSectionProps = {
  className?: string;
};

const RECOGNITION_ROWS: { alt: string; file: string }[][] = [
  [
    { alt: "ProInnóvate Perú", file: "logo-proinnovate 1.svg" },
    { alt: "PRODUCE Perú", file: "PRODUCE-800x400 1.svg" },
  ],
  [
    { alt: "Scale", file: "scale 1.svg" },
    { alt: "SUP", file: "sup 1.svg" },
  ],
];

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
      <Box className={styles.recognitionLogos}>
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
    </section>
  );
};

export default RecognitionsSection;
