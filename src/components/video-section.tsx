import { type FunctionComponent } from "react";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import YouTubeFacade from "./youtube-facade";
import styles from "./video-section.module.css";

/** Short de YouTube (youtube.com/shorts/<id>). */
const VIDEO_ID = "LoV-CpmVp20";

export type VideoSectionProps = {
  className?: string;
};

const VideoSection: FunctionComponent<VideoSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      aria-labelledby="video-heading"
    >
      <div className={styles.container}>
        {/* Columna izquierda: copy */}
        <div className={styles.textColumn}>
          <div className={styles.kicker}>{t.video.kicker}</div>
          <h2 className={styles.title} id="video-heading">
            {t.video.titleLead}{" "}
            <span className={styles.highlight}>{t.video.titleAccent}</span>{" "}
            {t.video.titleSuffix}
          </h2>
          <p className={styles.description}>{t.video.description}</p>
          <ul className={styles.pointsList}>
            {t.video.points.map((point) => (
              <li key={point} className={styles.point}>
                <span
                  className={`material-symbols-rounded ${styles.pointIcon}`}
                  aria-hidden
                >
                  check_circle
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <a className={styles.cta} href="#demo">
            {t.video.cta}
            <span
              className="material-symbols-rounded"
              style={{ fontSize: 20 }}
              aria-hidden
            >
              arrow_forward
            </span>
          </a>
        </div>

        {/* Columna derecha: Short vertical (facade lazy) */}
        <div className={styles.videoColumn}>
          <YouTubeFacade videoId={VIDEO_ID} title={t.video.videoTitle} />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
