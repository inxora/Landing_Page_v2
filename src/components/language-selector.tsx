import {
  FunctionComponent,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGE_OPTIONS } from "../i18n/constants";
import type { Language } from "../types/language";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./language-selector.module.css";

export type LanguageSelectorProps = {
  /** Fondo oscuro (p. ej. header con degradé tipo footer) */
  variant?: "default" | "onDark";
  /** Borde del dropdown que se ancla al trigger. "right" (por defecto) abre hacia la izquierda; "left" abre hacia la derecha. */
  menuAlign?: "left" | "right";
  /**
   * "dropdown" (por defecto) o "modal". En modo modal se abre una ventana
   * centrada y NO se cierra al hacer clic fuera (solo con la X, Escape o al
   * elegir un idioma). Pensado para el menú móvil de la cabecera.
   */
  mode?: "dropdown" | "modal";
  /** Se invoca tras elegir un idioma (p. ej. para cerrar el menú móvil que lo contiene). */
  onSelect?: () => void;
};

const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({
  variant = "default",
  menuAlign = "right",
  mode = "dropdown",
  onSelect,
}) => {
  const { lang, setLang } = useLanguage();
  const t = useLandingTranslations();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  /* Cerrar al hacer clic fuera — SOLO en modo dropdown */
  useEffect(() => {
    if (!open || mode === "modal") return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, close, mode]);

  /* Escape cierra (acción deliberada, en ambos modos) */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const current = LANGUAGE_OPTIONS.find((o) => o.value === lang);

  const select = (value: Language) => {
    setLang(value);
    close();
    onSelect?.();
  };

  return (
    <div
      className={[styles.root, variant === "onDark" ? styles.rootOnDark : ""]
        .filter(Boolean)
        .join(" ")}
      ref={rootRef}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={toggle}
        aria-haspopup={mode === "modal" ? "dialog" : "listbox"}
        aria-expanded={open}
        aria-label={t.header.langAria}
      >
        <span className={styles.globe} aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </span>
        <span className={styles.code}>{current?.code ?? "ES"}</span>
      </button>

      {mode === "dropdown" && open && (
        <ul
          className={[
            styles.menu,
            menuAlign === "left" ? styles.menuAlignLeft : "",
          ]
            .filter(Boolean)
            .join(" ")}
          role="listbox"
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <li key={opt.value} role="none">
              <button
                type="button"
                className={[
                  styles.option,
                  lang === opt.value ? styles.optionActive : "",
                ].join(" ")}
                onClick={() => select(opt.value)}
                role="option"
                aria-selected={lang === opt.value}
              >
                <span className={styles.optionCode}>{opt.code}</span>
                <span className={styles.optionLabel}>{opt.label}</span>
                {lang === opt.value && (
                  <span className={styles.check} aria-hidden>
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {mode === "modal" &&
        open &&
        createPortal(
          /* Backdrop SIN onClick: no se cierra al pulsar fuera */
          <div className={styles.modalBackdrop} role="presentation">
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-label={t.header.langAria}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{t.header.langAria}</h2>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={close}
                  aria-label={t.header.closeMenu}
                >
                  <span className="material-symbols-rounded" aria-hidden>
                    close
                  </span>
                </button>
              </div>
              <ul
                className={styles.modalList}
                role="listbox"
                aria-label={t.header.langAria}
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <li key={opt.value} role="none">
                    <button
                      type="button"
                      className={[
                        styles.modalOption,
                        lang === opt.value ? styles.modalOptionActive : "",
                      ].join(" ")}
                      onClick={() => select(opt.value)}
                      role="option"
                      aria-selected={lang === opt.value}
                    >
                      <span className={styles.modalOptionCode}>{opt.code}</span>
                      <span className={styles.modalOptionLabel}>
                        {opt.label}
                      </span>
                      {lang === opt.value && (
                        <span className={styles.modalCheck} aria-hidden>
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default LanguageSelector;
