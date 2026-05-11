import { useState, type FunctionComponent } from "react";
import styles from "./youtube-facade.module.css";

export type YouTubeFacadeProps = {
  /** ID del video (p. ej. el de un Short: youtube.com/shorts/<id>). */
  videoId: string;
  /** Texto accesible / título del iframe. */
  title?: string;
  className?: string;
};

/**
 * "Facade" de YouTube: muestra solo la miniatura + botón de play (~0 JS de
 * terceros). Al hacer clic carga el iframe real de youtube-nocookie.
 * Pensado para vídeo vertical (9:16, Shorts) — el contenedor fuerza ese ratio.
 */
const YouTubeFacade: FunctionComponent<YouTubeFacadeProps> = ({
  videoId,
  title = "Vídeo",
  className = "",
}) => {
  const [activated, setActivated] = useState(false);
  const poster = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const posterFallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      {activated ? (
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.poster}
          onClick={() => setActivated(true)}
          aria-label={`Reproducir: ${title}`}
        >
          <img
            className={styles.posterImg}
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== posterFallback) img.src = posterFallback;
            }}
          />
          <span className={styles.playBtn} aria-hidden>
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path
                className={styles.playBg}
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
              />
              <path d="M 45,24 27,14 27,34" fill="#fff" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default YouTubeFacade;
