import {
  type FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import { ROUTES } from "../routes/paths";
import styles from "./account-menu.module.css";

const SAAS_LOGIN_URL = "https://saas.inxora.com";

export type AccountMenuProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
  className?: string;
};

const AccountMenu: FunctionComponent<AccountMenuProps> = ({
  variant = "desktop",
  onNavigate,
  className = "",
}) => {
  const t = useLandingTranslations();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  /* Cerrar con click fuera o tecla Escape */
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  /* Bloquear scroll del body cuando el bottom sheet está abierto */
  useEffect(() => {
    if (variant !== "mobile" || !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [variant, open]);

  const handleNavigate = () => {
    close();
    onNavigate?.();
  };

  const popoverContent = (
    <>
      <a
        className={styles.signInBtn}
        href={SAAS_LOGIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleNavigate}
      >
        {t.header.signIn}
        <span
          className={["material-symbols-rounded", styles.signInIcon].join(" ")}
          aria-hidden
        >
          arrow_forward
        </span>
      </a>
      <div className={styles.divider} aria-hidden />
      <p className={styles.noAccount}>{t.header.noAccount}</p>
      <RouterLink
        className={styles.createLink}
        to={ROUTES.crearCuenta}
        onClick={handleNavigate}
      >
        {t.header.createAccount}
      </RouterLink>
    </>
  );

  return (
    <div
      className={[
        styles.root,
        variant === "mobile" ? styles.rootMobile : styles.rootDesktop,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.header.accountAria}
        onClick={toggle}
      >
        <span
          className={["material-symbols-rounded", styles.triggerIcon].join(" ")}
          aria-hidden
        >
          person
        </span>
        {t.header.account}
        <span
          className={["material-symbols-rounded", styles.chevron].join(" ")}
          aria-hidden
        >
          expand_more
        </span>
      </button>

      {variant === "desktop" ? (
        open && (
          <div
            ref={popoverRef}
            className={styles.popover}
            role="menu"
            aria-label={t.header.account}
          >
            {popoverContent}
          </div>
        )
      ) : (
        <>
          {open && (
            <button
              type="button"
              className={styles.sheetBackdrop}
              aria-label={t.header.closeMenu}
              onClick={close}
            />
          )}
          <div
            ref={popoverRef}
            className={[
              styles.sheet,
              open ? styles.sheetOpen : "",
            ]
              .filter(Boolean)
              .join(" ")}
            role="dialog"
            aria-modal="true"
            aria-label={t.header.account}
            aria-hidden={!open}
          >
            <div className={styles.sheetHandle} aria-hidden />
            {popoverContent}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountMenu;
