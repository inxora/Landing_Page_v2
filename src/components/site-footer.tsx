import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import libroReclamacionesImg from "../assets/libro_reclamaciones.png";
import {
  INXORA_GOOGLE_MAPS_EMBED_BASE,
  INXORA_GOOGLE_MAPS_PLACE_URL,
} from "../constants/googleMaps";
import { useLanguage } from "../context/LanguageContext";
import { ROUTES } from "../routes/paths";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./site-footer.module.css";

function IconLocation({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2v-2.5C10 8.57 11.57 7 13.5 7H16v3h-1.5c-.55 0-1 .45-1 1V12h3l-.5 3H14v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69A1.69 1.69 0 0 0 5.2 6.88c0 .93.75 1.68 1.68 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  );
}

const SiteFooter: FunctionComponent = () => {
  const t = useLandingTranslations();
  const { lang } = useLanguage();
  const mapEmbedSrc = `${INXORA_GOOGLE_MAPS_EMBED_BASE}&hl=${lang}`;

  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link to={ROUTES.home} className={styles.logoLink}>
              <img
                className={styles.logo}
                src="/Mask-group@2x.png"
                alt="INXORA"
              />
            </Link>
            <p className={styles.slogan}>{t.footer.slogan}</p>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <IconPhone className={styles.contactIcon} />
                <a className={styles.link} href="tel:+51946885531">
                  +51 946 885 531
                </a>
              </li>
              <li className={styles.contactItem}>
                <IconMail className={styles.contactIcon} />
                <a className={styles.link} href="mailto:contacto@inxora.com">
                  contacto@inxora.com
                </a>
              </li>
              <li className={styles.contactItem}>
                <IconLocation className={styles.contactIcon} />
                <a
                  className={styles.link}
                  href={INXORA_GOOGLE_MAPS_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Av. Óscar R. Benavides 3046, Lima 15081, Perú
                </a>
              </li>
            </ul>
            <div className={styles.mapBlock}>
              <iframe
                title={t.footer.mapIframeTitle}
                className={styles.mapIframe}
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className={styles.mapOpenLink}
                href={INXORA_GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.footer.mapOpenGoogle}
              </a>
            </div>
            <div className={styles.socialRow}>
              <a
                className={styles.socialBtn}
                href="https://www.facebook.com/profile.php?id=61577615567230"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconFacebook />
              </a>
              <a
                className={styles.socialBtn}
                href="https://www.instagram.com/inxora.global/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconInstagram />
              </a>
              <a
                className={styles.socialBtn}
                href="https://www.linkedin.com/company/inxoraglobal/about/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconLinkedIn />
              </a>
              <a
                className={styles.socialBtn}
                href="https://www.youtube.com/@INXORA"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconYouTube />
              </a>
              <a
                className={styles.socialBtn}
                href="https://www.tiktok.com/@inxora5"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconTikTok />
              </a>
            </div>
          </div>

          <nav className={styles.navCol} aria-label={t.footer.navEmpresa}>
            <h2 className={styles.navTitle}>{t.footer.navEmpresa}</h2>
            <ul className={styles.linkList}>
              <li>
                <Link className={styles.link} to={ROUTES.nosotros}>
                  {t.footer.linkNosotros}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.contacto}>
                  {t.footer.linkContacto}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.faq}>
                  {t.footer.linkFaq}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.cotizaciones}>
                  {t.footer.linkCotizaciones}
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.navCol} aria-label={t.footer.navCategorias}>
            <h2 className={styles.navTitle}>{t.footer.navCategorias}</h2>
            <ul className={styles.linkList}>
              <li>
                <Link className={styles.link} to={ROUTES.catalogo}>
                  {t.footer.linkCatalogo}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.suministros}>
                  {t.footer.linkSuministros}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.seguridad}>
                  {t.footer.linkSeguridad}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.herramientas}>
                  {t.footer.linkHerramientas}
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.navCol} aria-label={t.footer.navEnlaces}>
            <h2 className={styles.navTitle}>{t.footer.navEnlaces}</h2>
            <ul className={styles.linkList}>
              <li>
                <Link className={styles.link} to={ROUTES.avisoLegal}>
                  {t.footer.linkAviso}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.politicaPrivacidad}>
                  {t.footer.linkPrivacidad}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.politicaCookies}>
                  {t.footer.linkCookies}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.terminos}>
                  {t.footer.linkTerminos}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.acuerdoPiloto}>
                  {t.footer.linkAcuerdoPiloto}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.envios}>
                  {t.footer.linkEnvios}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={ROUTES.devoluciones}>
                  {t.footer.linkDevoluciones}
                </Link>
              </li>
            </ul>
            <div className={styles.complaints}>
              <Link
                to={ROUTES.libroReclamaciones}
                className={styles.complaintsLink}
              >
                <img
                  className={styles.complaintsBadge}
                  src={libroReclamacionesImg}
                  alt={t.footer.libroAlt}
                  loading="lazy"
                  decoding="async"
                  data-source="bundled-png"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.dataset.fallbackApplied === "1") return;
                    img.dataset.fallbackApplied = "1";
                    img.src = "/libro_reclamaciones.png";
                  }}
                />
              </Link>
            </div>
          </nav>
        </div>

        <hr className={styles.divider} />

        <Box className={styles.bottomBar}>
          <p className={styles.credits}>
            © {new Date().getFullYear()} INXORA. {t.footer.rights}
          </p>
          <p className={styles.credits}>
            {t.footer.developedBy}{" "}
            <span className={styles.creditsAccent}>
              {t.footer.developedAccent}
            </span>
          </p>
        </Box>
      </div>
    </footer>
  );
};

export default SiteFooter;
