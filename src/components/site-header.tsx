import {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import LanguageSelector from "./language-selector";
import styles from "./site-header.module.css";

export type SiteHeaderProps = {
  className?: string;
};

/** Orden = orden en la landing; debe coincidir con `id` en `landing-page.tsx` */
const LANDING_SCROLL_SECTION_IDS = [
  "ventajas",
  "respaldados",
  "demo",
] as const;

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SiteHeader: FunctionComponent<SiteHeaderProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(88);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const sectionNav = useMemo(
    () =>
      [
        { id: "ventajas" as const, label: t.header.navVentajas },
        { id: "respaldados" as const, label: t.header.navRespaldados },
        { id: "demo" as const, label: t.header.navDemo },
      ] as const,
    [
      t.header.navVentajas,
      t.header.navRespaldados,
      t.header.navDemo,
    ]
  );

  const updateActiveFromScroll = useCallback(() => {
    if (location.pathname !== "/") {
      setActiveSectionId(null);
      return;
    }
    const headerH = headerRef.current?.offsetHeight ?? 88;
    const triggerY = window.scrollY + headerH + 28;
    let active: string | null = null;
    for (const id of LANDING_SCROLL_SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (triggerY >= top) {
        active = id;
      }
    }
    setActiveSectionId(active);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setHeaderHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [menuOpen]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.hash, closeMenu]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    updateActiveFromScroll();
    const onScroll = () => updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname, updateActiveFromScroll, headerHeight]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1051px)");
    const onChange = () => {
      if (mq.matches) closeMenu();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  const navClass = (id: string, mobile: boolean) =>
    [mobile ? styles.navMobileLink : styles.ventajas, activeSectionId === id ? styles.navLinkActive : ""]
      .filter(Boolean)
      .join(" ");

  return (
    <header
      ref={headerRef}
      className={[styles.footerContainer, className].join(" ")}
    >
      <Box className={styles.footerNavigation}>
        <Link to="/" className={styles.companyFooter}>
          <img
            className={styles.maskGroupIcon}
            loading="eager"
            decoding="async"
            alt="INXORA"
            src="/LOGO-35.svg"
          />
        </Link>
        <nav className={styles.navigationLinks} aria-label="Principal">
          {sectionNav.map(({ id, label }) => (
            <Link
              key={id}
              className={navClass(id, false)}
              to={`/#${id}`}
              aria-current={activeSectionId === id ? "location" : undefined}
            >
              {label}
            </Link>
          ))}
          <a
            className={styles.ventajas}
            href="https://tienda.inxora.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.header.navTienda}
          </a>
        </nav>
        <Box className={styles.headerActionsDesktop}>
          <LanguageSelector variant="onDark" />
          <a
            className={styles.contactLanguage2}
            href="https://saas.inxora.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.solicitarCotizacion}>
              {t.header.signIn}
            </div>
          </a>
        </Box>
        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="primary-mobile-menu"
          aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Box>

      {menuOpen ? (
        <>
          <button
            type="button"
            className={styles.menuBackdrop}
            aria-label={t.header.closeMenu}
            style={{ top: headerHeight }}
            onClick={closeMenu}
          />
          <div
            id="primary-mobile-menu"
            className={styles.menuPanel}
            role="dialog"
            aria-modal="true"
            style={{ top: headerHeight }}
          >
            <nav className={styles.menuNav} aria-label="Principal">
              {sectionNav.map(({ id, label }) => (
                <Link
                  key={id}
                  className={navClass(id, true)}
                  to={`/#${id}`}
                  aria-current={activeSectionId === id ? "location" : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              ))}
              <a
                className={styles.navMobileLink}
                href="https://tienda.inxora.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                {t.header.navTienda}
              </a>
            </nav>
            <Box className={styles.menuPanelFooter}>
              <LanguageSelector menuAlign="left" />
              <a
                className={styles.contactLanguage2}
                href="https://saas.inxora.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                <div className={styles.solicitarCotizacion}>
                  {t.header.signIn}
                </div>
              </a>
            </Box>
          </div>
        </>
      ) : null}
    </header>
  );
};

export default SiteHeader;
