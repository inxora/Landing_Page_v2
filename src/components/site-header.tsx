import {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { WHATSAPP_QUOTE_URL } from "../constants/whatsapp";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import LanguageSelector from "./language-selector";
import styles from "./site-header.module.css";

export type SiteHeaderProps = {
  className?: string;
};

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
  const [headerHeight, setHeaderHeight] = useState(72);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

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

  const navLinks = (
    <>
      <Link
        className={styles.navMobileLink}
        to="/#ventajas"
        onClick={closeMenu}
      >
        {t.header.navVentajas}
      </Link>
      <Link className={styles.navMobileLink} to="/#pasos" onClick={closeMenu}>
        {t.header.navPasos}
      </Link>
      <Link
        className={styles.navMobileLink}
        to="/#proveedores"
        onClick={closeMenu}
      >
        {t.header.navProveedores}
      </Link>
      <Link className={styles.navMobileLink} to="/#tienda" onClick={closeMenu}>
        {t.header.navTienda}
      </Link>
    </>
  );

  return (
    <header
      ref={headerRef}
      className={[styles.footerContainer, className].join(" ")}
    >
      <Box className={styles.footerNavigation}>
        <Link to="/" className={styles.companyFooter}>
          <img
            className={styles.maskGroupIcon}
            loading="lazy"
            alt="INXORA"
            src="/Mask-group@2x.png"
          />
        </Link>
        <nav className={styles.navigationLinks} aria-label="Principal">
          <Link className={styles.ventajas} to="/#ventajas">
            {t.header.navVentajas}
          </Link>
          <Link className={styles.ventajas} to="/#pasos">
            {t.header.navPasos}
          </Link>
          <Link className={styles.ventajas} to="/#proveedores">
            {t.header.navProveedores}
          </Link>
          <Link className={styles.ventajas} to="/#tienda">
            {t.header.navTienda}
          </Link>
        </nav>
        <Box className={styles.headerActionsDesktop}>
          <LanguageSelector />
          <a
            className={styles.contactLanguage2}
            href={WHATSAPP_QUOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.solicitarCotizacion}>
              {t.header.requestQuote}
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
              {navLinks}
            </nav>
            <Box className={styles.menuPanelFooter}>
              <LanguageSelector />
              <a
                className={styles.contactLanguage2}
                href={WHATSAPP_QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                <div className={styles.solicitarCotizacion}>
                  {t.header.requestQuote}
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
