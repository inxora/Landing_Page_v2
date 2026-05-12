import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import {
  type Pais,
  type RegistroPayload,
  consultarRuc,
  fetchPaises,
  registrarEmpresa,
} from "../services/gestionApi";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import type { LandingCopy } from "../i18n/landingTranslations";
import styles from "./crear-cuenta-page.module.css";

const SAAS_LOGIN_URL = "https://saas.inxora.com";

type SignupCopy = LandingCopy["signup"];

type FormState = RegistroPayload & {
  admin_password_confirm: string;
};

const INITIAL: FormState = {
  empresa_nombre: "",
  empresa_tipo_documento: "RUC",
  empresa_numero_documento: "",
  empresa_pais: "",
  empresa_email: "",
  empresa_telefono: "",
  empresa_ciudad: "",
  empresa_direccion: "",
  admin_nombre: "",
  admin_apellido_paterno: "",
  admin_apellido_materno: "",
  admin_email: "",
  admin_password: "",
  admin_password_confirm: "",
  admin_cargo: "",
};

function isPeru(pais: Pais | undefined): boolean {
  if (!pais) return false;
  return pais.codigo?.toUpperCase() === "PE";
}

/* Reglas que valida el backend (POST /auth/registro). Las etiquetas legibles
   vienen de las traducciones (t.signup.pwdRules), en este mismo orden. */
type PasswordCheckKey = "length" | "upper" | "lower" | "digit" | "special";
const PASSWORD_RULE_KEYS: PasswordCheckKey[] = [
  "length",
  "upper",
  "lower",
  "digit",
  "special",
];
type PasswordChecks = Record<PasswordCheckKey, boolean>;

function getPasswordChecks(pwd: string): PasswordChecks {
  return {
    length: pwd.length >= 8 && pwd.length <= 64,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    digit: /\d/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };
}

/** Devuelve un código de error de contraseña, o null si es válida. */
function getPasswordErrorCode(pwd: string): "length" | "complexity" | null {
  const checks = getPasswordChecks(pwd);
  if (!checks.length) return "length";
  if (!checks.upper || !checks.lower || !checks.digit || !checks.special) {
    return "complexity";
  }
  return null;
}

/* Extrae un mensaje legible de un error de la API (incl. 422 de FastAPI,
   cuyo body es { detail: [{ msg, loc, ... }] }). */
function extractApiError(err: unknown, fallback: string): string {
  const detail = (err as { detail?: unknown })?.detail;
  const fromList = (list: unknown): string | undefined => {
    if (!Array.isArray(list)) return undefined;
    const msgs = list
      .map((d) => (d as { msg?: string })?.msg)
      .filter((m): m is string => Boolean(m))
      .map((m) => m.replace(/^Value error,\s*/i, ""));
    return msgs.length ? msgs.join(" ") : undefined;
  };
  if (Array.isArray(detail)) return fromList(detail) ?? fallback;
  if (detail && typeof detail === "object") {
    const obj = detail as { detail?: unknown; message?: string };
    return fromList(obj.detail) ?? obj.message ?? fallback;
  }
  if (typeof detail === "string") return detail;
  return fallback;
}

const CrearCuentaPage = () => {
  const t = useLandingTranslations();
  const s = t.signup;

  const [form, setForm] = useState<FormState>(INITIAL);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [paisesLoading, setPaisesLoading] = useState(true);
  const [paisesError, setPaisesError] = useState<string | null>(null);

  const [rucLoading, setRucLoading] = useState(false);
  const [rucError, setRucError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* Cargar países al montar */
  useEffect(() => {
    const ctrl = new AbortController();
    setPaisesLoading(true);
    fetchPaises(ctrl.signal)
      .then((data) => {
        setPaises(Array.isArray(data) ? data : []);
        setPaisesError(null);
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === "AbortError") return;
        setPaisesError(s.countryError);
      })
      .finally(() => setPaisesLoading(false));
    return () => ctrl.abort();
  }, [s.countryError]);

  const selectedPais = useMemo(
    () => paises.find((p) => p.codigo === form.empresa_pais),
    [paises, form.empresa_pais],
  );

  const peruSelected = isPeru(selectedPais);

  const confirmFilled = form.admin_password_confirm.length > 0;
  const passwordsMatch =
    confirmFilled && form.admin_password === form.admin_password_confirm;

  const set =
    <K extends keyof FormState>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleConsultarRuc = useCallback(async () => {
    const ruc = form.empresa_numero_documento.trim();
    if (!/^\d{11}$/.test(ruc)) {
      setRucError(s.rucDigitsError);
      return;
    }
    setRucError(null);
    setRucLoading(true);
    try {
      const data = await consultarRuc(ruc);
      setForm((f) => ({
        ...f,
        empresa_nombre: data.nombre || f.empresa_nombre,
        empresa_direccion: data.direccion || f.empresa_direccion,
        empresa_ciudad:
          data.distrito || data.provincia || data.departamento || f.empresa_ciudad,
      }));
    } catch {
      setRucError(s.rucValidateError);
    } finally {
      setRucLoading(false);
    }
  }, [form.empresa_numero_documento, s.rucDigitsError, s.rucValidateError]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const pwdCode = getPasswordErrorCode(form.admin_password);
    if (pwdCode === "length") {
      setSubmitError(s.pwdLengthError);
      return;
    }
    if (pwdCode === "complexity") {
      setSubmitError(s.pwdComplexityError);
      return;
    }
    if (form.admin_password !== form.admin_password_confirm) {
      setSubmitError(s.pwdNoMatch);
      return;
    }

    const paisCodigo = selectedPais?.codigo || form.empresa_pais;

    const payload: RegistroPayload = {
      empresa_nombre: form.empresa_nombre.trim(),
      empresa_tipo_documento: form.empresa_tipo_documento,
      empresa_numero_documento: form.empresa_numero_documento.trim(),
      empresa_pais: paisCodigo,
      empresa_email: form.empresa_email.trim(),
      empresa_telefono: form.empresa_telefono.trim(),
      empresa_ciudad: form.empresa_ciudad.trim(),
      empresa_direccion: form.empresa_direccion.trim(),
      admin_nombre: form.admin_nombre.trim(),
      admin_apellido_paterno: form.admin_apellido_paterno.trim(),
      admin_apellido_materno: form.admin_apellido_materno.trim(),
      admin_email: form.admin_email.trim(),
      admin_password: form.admin_password,
      admin_cargo: form.admin_cargo.trim(),
    };

    setSubmitting(true);
    try {
      await registrarEmpresa(payload);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(extractApiError(err, s.submitError));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <RouterLink to={ROUTES.home} className={styles.brand}>
            <img src="/LOGO-35.svg" alt="INXORA" />
          </RouterLink>
          <div className={styles.successState}>
            <span
              className={`material-symbols-rounded ${styles.successIcon}`}
              aria-hidden
            >
              check_circle
            </span>
            <h1 className={styles.successTitle}>{s.successTitle}</h1>
            <p className={styles.successSub}>
              {s.successSubPre}
              <strong>{form.admin_email}</strong>
              {s.successSubPost}
            </p>
            <a className={styles.primaryBtn} href={SAAS_LOGIN_URL}>
              {s.successCta}
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <header className={styles.cardHeader}>
          <RouterLink to={ROUTES.home} className={styles.backLink}>
            <span className="material-symbols-rounded" aria-hidden>
              arrow_back
            </span>
            {s.back}
          </RouterLink>
        </header>

        <div className={styles.intro}>
          <RouterLink to={ROUTES.home} className={styles.brand}>
            <img src="/LOGO-35.svg" alt="INXORA" />
          </RouterLink>
          <h1 className={styles.title}>{s.title}</h1>
          <p className={styles.sub}>
            {s.haveAccount}{" "}
            <a className={styles.loginLink} href={SAAS_LOGIN_URL}>
              {s.signIn}
            </a>
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* ── Datos de la empresa ── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{s.companySection}</h2>

            <Field label={s.countryLabel} htmlFor="empresa_pais">
              <select
                id="empresa_pais"
                className={styles.input}
                value={form.empresa_pais}
                onChange={set("empresa_pais")}
                required
                disabled={paisesLoading || !!paisesError}
              >
                <option value="">
                  {paisesLoading ? s.countryLoading : s.countryPlaceholder}
                </option>
                {paises.map((p) => (
                  <option key={p.codigo} value={p.codigo}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              {paisesError && <p className={styles.fieldError}>{paisesError}</p>}
            </Field>

            <Field
              label={s.docLabel}
              htmlFor="empresa_numero_documento"
              wide
            >
              <div className={styles.inlineField}>
                <select
                  id="empresa_tipo_documento"
                  className={styles.input}
                  value={form.empresa_tipo_documento}
                  onChange={set("empresa_tipo_documento")}
                  required
                  aria-label={s.docTypeAria}
                >
                  {peruSelected ? (
                    <>
                      <option value="RUC">{s.docTypeRUC}</option>
                      <option value="DNI">{s.docTypeDNI}</option>
                    </>
                  ) : (
                    <>
                      <option value="ID">{s.docTypeID}</option>
                      <option value="OTRO">{s.docTypeOther}</option>
                    </>
                  )}
                </select>
                <input
                  id="empresa_numero_documento"
                  className={styles.input}
                  type="text"
                  placeholder={
                    peruSelected
                      ? s.docNumberPlaceholderPE
                      : s.docNumberPlaceholderOther
                  }
                  value={form.empresa_numero_documento}
                  onChange={set("empresa_numero_documento")}
                  required
                />
                {peruSelected && form.empresa_tipo_documento === "RUC" && (
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={handleConsultarRuc}
                    disabled={rucLoading}
                  >
                    {rucLoading ? s.consultingRuc : s.consultRuc}
                  </button>
                )}
              </div>
              {rucError && <p className={styles.fieldError}>{rucError}</p>}
              <p className={styles.controlNote}>{s.docHint}</p>
            </Field>

            <Field label={s.companyNameLabel} htmlFor="empresa_nombre">
              <input
                id="empresa_nombre"
                className={styles.input}
                type="text"
                placeholder={s.companyNamePlaceholder}
                value={form.empresa_nombre}
                onChange={set("empresa_nombre")}
                required
              />
            </Field>

            <Field
              label={s.companyEmailLabel}
              htmlFor="empresa_email"
              hint={s.companyEmailHint}
            >
              <input
                id="empresa_email"
                className={styles.input}
                type="email"
                placeholder={s.companyEmailPlaceholder}
                value={form.empresa_email}
                onChange={set("empresa_email")}
                required
                autoComplete="email"
              />
            </Field>

            <Field label={s.phoneLabel} htmlFor="empresa_telefono">
              <input
                id="empresa_telefono"
                className={styles.input}
                type="tel"
                placeholder={s.phonePlaceholder}
                value={form.empresa_telefono}
                onChange={set("empresa_telefono")}
                required
                autoComplete="tel"
              />
            </Field>

            <Field label={s.addressLabel} htmlFor="empresa_direccion">
              <input
                id="empresa_direccion"
                className={styles.input}
                type="text"
                placeholder={s.addressPlaceholder}
                value={form.empresa_direccion}
                onChange={set("empresa_direccion")}
                required
              />
            </Field>

            <Field label={s.cityLabel} htmlFor="empresa_ciudad">
              <input
                id="empresa_ciudad"
                className={styles.input}
                type="text"
                placeholder={s.cityPlaceholder}
                value={form.empresa_ciudad}
                onChange={set("empresa_ciudad")}
                required
              />
            </Field>
          </section>

          {/* ── Usuario administrador ── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{s.adminSection}</h2>

            <Field label={s.fullNameLabel} htmlFor="admin_nombre" wide>
              <div className={styles.inlineField}>
                <input
                  id="admin_nombre"
                  className={styles.input}
                  type="text"
                  placeholder={s.firstNamePlaceholder}
                  value={form.admin_nombre}
                  onChange={set("admin_nombre")}
                  required
                  autoComplete="given-name"
                />
                <input
                  id="admin_apellido_paterno"
                  className={styles.input}
                  type="text"
                  placeholder={s.lastNamePPlaceholder}
                  value={form.admin_apellido_paterno}
                  onChange={set("admin_apellido_paterno")}
                  required
                  autoComplete="family-name"
                />
                <input
                  id="admin_apellido_materno"
                  className={styles.input}
                  type="text"
                  placeholder={s.lastNameMPlaceholder}
                  value={form.admin_apellido_materno}
                  onChange={set("admin_apellido_materno")}
                  required
                  autoComplete="additional-name"
                />
              </div>
            </Field>

            <Field label={s.positionLabel} htmlFor="admin_cargo">
              <input
                id="admin_cargo"
                className={styles.input}
                type="text"
                placeholder={s.positionPlaceholder}
                value={form.admin_cargo}
                onChange={set("admin_cargo")}
                required
                autoComplete="organization-title"
              />
            </Field>

            <Field
              label={s.adminEmailLabel}
              htmlFor="admin_email"
              hint={s.adminEmailHint}
            >
              <input
                id="admin_email"
                className={styles.input}
                type="email"
                placeholder={s.adminEmailPlaceholder}
                value={form.admin_email}
                onChange={set("admin_email")}
                required
                autoComplete="email"
              />
            </Field>

            <Field label={s.passwordLabel} htmlFor="admin_password">
              <div className={styles.inputWrap}>
                <input
                  id="admin_password"
                  className={`${styles.input} ${styles.inputWithAffix}`}
                  type={showPassword ? "text" : "password"}
                  placeholder={s.passwordPlaceholder}
                  value={form.admin_password}
                  onChange={set("admin_password")}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? s.pwdHide : s.pwdShow}
                  aria-pressed={showPassword}
                  title={showPassword ? s.pwdHide : s.pwdShow}
                >
                  <span className="material-symbols-rounded" aria-hidden>
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              <PasswordStrength value={form.admin_password} copy={s} />
            </Field>

            <Field
              label={s.confirmPasswordLabel}
              htmlFor="admin_password_confirm"
              hint={
                confirmFilled ? (
                  <span
                    className={passwordsMatch ? styles.matchOk : styles.matchBad}
                  >
                    {passwordsMatch ? s.pwdMatch : s.pwdNoMatch}
                  </span>
                ) : undefined
              }
            >
              <div className={styles.inputWrap}>
                <input
                  id="admin_password_confirm"
                  className={`${styles.input} ${styles.inputWithAffix}`}
                  type="password"
                  placeholder={s.confirmPasswordPlaceholder}
                  value={form.admin_password_confirm}
                  onChange={set("admin_password_confirm")}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                {confirmFilled && (
                  <span
                    className={`${styles.matchIcon} ${
                      passwordsMatch ? styles.matchOk : styles.matchBad
                    }`}
                    aria-hidden
                  >
                    <span className="material-symbols-rounded">
                      {passwordsMatch ? "check_circle" : "cancel"}
                    </span>
                  </span>
                )}
              </div>
            </Field>
          </section>

          {submitError && (
            <p className={styles.submitError} role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={submitting}
          >
            {submitting ? s.submitting : s.submit}
            {!submitting && (
              <span className="material-symbols-rounded" aria-hidden>
                arrow_forward
              </span>
            )}
          </button>

          <p className={styles.legalNote}>
            {s.legalPre}
            <RouterLink to={ROUTES.terminos}>{s.legalTerms}</RouterLink>
            {s.legalMid}
            <RouterLink to={ROUTES.acuerdoPiloto}>{s.legalPilot}</RouterLink>
            {s.legalAnd}
            <RouterLink to={ROUTES.politicaPrivacidad}>
              {s.legalPrivacy}
            </RouterLink>
            {s.legalEnd}
          </p>
        </form>
      </div>
    </main>
  );
};

type FieldProps = {
  label: string;
  htmlFor?: string;
  /** Texto/contenido de ayuda mostrado a la derecha del campo (estilo Oracle). */
  hint?: React.ReactNode;
  /** Si el control debe ocupar también el ancho de la columna de ayuda. */
  wide?: boolean;
  /** Marca el campo como obligatorio (asterisco). Por defecto true. */
  required?: boolean;
  children: React.ReactNode;
};

const Field = ({
  label,
  htmlFor,
  hint,
  wide = false,
  required = true,
  children,
}: FieldProps) => (
  <div className={styles.field}>
    <label className={styles.label} htmlFor={htmlFor}>
      {label}
      {required && (
        <span className={styles.req} aria-hidden>
          {" "}
          *
        </span>
      )}
    </label>
    <div
      className={[styles.fieldControl, wide ? styles.fieldControlWide : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
    {!wide && <div className={styles.fieldHint}>{hint}</div>}
  </div>
);

/** Indicador de requisitos + barra de progreso de seguridad de la contraseña. */
const PasswordStrength = ({
  value,
  copy,
}: {
  value: string;
  copy: SignupCopy;
}) => {
  const checks = getPasswordChecks(value);
  const score = PASSWORD_RULE_KEYS.reduce(
    (n, key) => n + (checks[key] ? 1 : 0),
    0,
  );
  const pct = Math.round((score / PASSWORD_RULE_KEYS.length) * 100);
  const level = score <= 2 ? "weak" : score <= 4 ? "medium" : "strong";
  const levelLabel =
    level === "weak"
      ? copy.pwdWeak
      : level === "medium"
        ? copy.pwdMedium
        : copy.pwdStrong;
  const fillClass =
    level === "weak"
      ? styles.pwdBarWeak
      : level === "medium"
        ? styles.pwdBarMedium
        : styles.pwdBarStrong;
  const textClass =
    level === "weak"
      ? styles.pwdLevelWeak
      : level === "medium"
        ? styles.pwdLevelMedium
        : styles.pwdLevelStrong;

  return (
    <div className={styles.pwdStrength}>
      <div
        className={styles.pwdBarTrack}
        role="progressbar"
        aria-label={copy.passwordLabel}
        aria-valuemin={0}
        aria-valuemax={PASSWORD_RULE_KEYS.length}
        aria-valuenow={score}
      >
        <span
          className={`${styles.pwdBarFill} ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={styles.pwdHint}>
        {value ? (
          <>
            {copy.pwdStrength}{" "}
            <strong className={textClass}>{levelLabel}</strong>
          </>
        ) : (
          copy.pwdMustMeet
        )}
      </p>
      <ul className={styles.pwdRules}>
        {PASSWORD_RULE_KEYS.map((key, i) => {
          const ok = checks[key];
          return (
            <li
              key={key}
              className={ok ? styles.pwdRuleOk : styles.pwdRulePending}
            >
              <span className="material-symbols-rounded" aria-hidden>
                {ok ? "check_circle" : "radio_button_unchecked"}
              </span>
              <span>{copy.pwdRules[i]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CrearCuentaPage;
