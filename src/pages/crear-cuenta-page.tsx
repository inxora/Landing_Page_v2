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
import styles from "./crear-cuenta-page.module.css";

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

/* Mismas reglas que valida el backend (POST /auth/registro). */
type PasswordChecks = {
  length: boolean;
  upper: boolean;
  lower: boolean;
  digit: boolean;
  special: boolean;
};

const PASSWORD_RULES: { key: keyof PasswordChecks; label: string }[] = [
  { key: "length", label: "Entre 8 y 64 caracteres" },
  { key: "upper", label: "Al menos una letra mayúscula (A-Z)" },
  { key: "lower", label: "Al menos una letra minúscula (a-z)" },
  { key: "digit", label: "Al menos un número (0-9)" },
  { key: "special", label: "Al menos un carácter especial (!@#$%…)" },
];

function getPasswordChecks(pwd: string): PasswordChecks {
  return {
    length: pwd.length >= 8 && pwd.length <= 64,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    digit: /\d/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };
}

function getPasswordError(pwd: string): string | null {
  const checks = getPasswordChecks(pwd);
  if (!checks.length) return "La contraseña debe tener entre 8 y 64 caracteres.";
  if (!checks.upper || !checks.lower || !checks.digit || !checks.special) {
    return "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial.";
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
        setPaisesError(
          "No pudimos cargar la lista de países. Intenta refrescar la página.",
        );
      })
      .finally(() => setPaisesLoading(false));
    return () => ctrl.abort();
  }, []);

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
      setRucError("El RUC debe tener 11 dígitos.");
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
      setRucError(
        "No pudimos validar el RUC. Verifica el número o intenta de nuevo.",
      );
    } finally {
      setRucLoading(false);
    }
  }, [form.empresa_numero_documento]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const pwdError = getPasswordError(form.admin_password);
    if (pwdError) {
      setSubmitError(pwdError);
      return;
    }
    if (form.admin_password !== form.admin_password_confirm) {
      setSubmitError("Las contraseñas no coinciden.");
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
      const detail = (err as { detail?: { message?: string } })?.detail;
      setSubmitError(
        detail?.message ||
          "No pudimos crear tu cuenta. Revisa los datos o intenta de nuevo en unos minutos.",
      );
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
            <h1 className={styles.successTitle}>¡Cuenta creada!</h1>
            <p className={styles.successSub}>
              Te enviamos un correo de confirmación a{" "}
              <strong>{form.admin_email}</strong>. Sigue las instrucciones para
              activar tu cuenta y empezar a usar INXORA.
            </p>
            <a className={styles.primaryBtn} href="https://saas.inxora.com">
              Ir a Iniciar Sesión
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
            Volver al inicio
          </RouterLink>
        </header>

        <div className={styles.intro}>
          <RouterLink to={ROUTES.home} className={styles.brand}>
            <img src="/LOGO-35.svg" alt="INXORA" />
          </RouterLink>
          <h1 className={styles.title}>Crea tu cuenta de INXORA</h1>
          <p className={styles.sub}>
            ¿Ya tienes una cuenta?{" "}
            <a className={styles.loginLink} href="https://saas.inxora.com">
              Iniciar sesión
            </a>
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* ── Datos de la empresa ── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Datos de la empresa</h2>

            <Field label="País" htmlFor="empresa_pais">
              <select
                id="empresa_pais"
                className={styles.input}
                value={form.empresa_pais}
                onChange={set("empresa_pais")}
                required
                disabled={paisesLoading || !!paisesError}
              >
                <option value="">
                  {paisesLoading ? "Cargando países…" : "Selecciona un país"}
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
              label="Documento de la empresa"
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
                  aria-label="Tipo de documento"
                >
                  {peruSelected ? (
                    <>
                      <option value="RUC">RUC</option>
                      <option value="DNI">DNI</option>
                    </>
                  ) : (
                    <>
                      <option value="ID">ID Fiscal</option>
                      <option value="OTRO">Otro</option>
                    </>
                  )}
                </select>
                <input
                  id="empresa_numero_documento"
                  className={styles.input}
                  type="text"
                  placeholder={peruSelected ? "10724670038" : "Tu ID fiscal"}
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
                    {rucLoading ? "Consultando…" : "Consultar RUC"}
                  </button>
                )}
              </div>
              {rucError && <p className={styles.fieldError}>{rucError}</p>}
              <p className={styles.controlNote}>
                Con el RUC podemos autocompletar los datos de tu empresa.
              </p>
            </Field>

            <Field label="Razón social / Nombre" htmlFor="empresa_nombre">
              <input
                id="empresa_nombre"
                className={styles.input}
                type="text"
                placeholder="TEST S.A.C"
                value={form.empresa_nombre}
                onChange={set("empresa_nombre")}
                required
              />
            </Field>

            <Field
              label="Email corporativo"
              htmlFor="empresa_email"
              hint="Para comunicaciones generales de tu organización."
            >
              <input
                id="empresa_email"
                className={styles.input}
                type="email"
                placeholder="contacto@empresa.com"
                value={form.empresa_email}
                onChange={set("empresa_email")}
                required
                autoComplete="email"
              />
            </Field>

            <Field label="Teléfono" htmlFor="empresa_telefono">
              <input
                id="empresa_telefono"
                className={styles.input}
                type="tel"
                placeholder="994210178"
                value={form.empresa_telefono}
                onChange={set("empresa_telefono")}
                required
                autoComplete="tel"
              />
            </Field>

            <Field label="Dirección" htmlFor="empresa_direccion">
              <input
                id="empresa_direccion"
                className={styles.input}
                type="text"
                placeholder="Avenida Colonial 123"
                value={form.empresa_direccion}
                onChange={set("empresa_direccion")}
                required
              />
            </Field>

            <Field label="Ciudad" htmlFor="empresa_ciudad">
              <input
                id="empresa_ciudad"
                className={styles.input}
                type="text"
                placeholder="Lima"
                value={form.empresa_ciudad}
                onChange={set("empresa_ciudad")}
                required
              />
            </Field>
          </section>

          {/* ── Usuario administrador ── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Usuario administrador</h2>

            <Field label="Nombre completo" htmlFor="admin_nombre" wide>
              <div className={styles.inlineField}>
                <input
                  id="admin_nombre"
                  className={styles.input}
                  type="text"
                  placeholder="Nombre"
                  value={form.admin_nombre}
                  onChange={set("admin_nombre")}
                  required
                  autoComplete="given-name"
                />
                <input
                  id="admin_apellido_paterno"
                  className={styles.input}
                  type="text"
                  placeholder="Apellido paterno"
                  value={form.admin_apellido_paterno}
                  onChange={set("admin_apellido_paterno")}
                  required
                  autoComplete="family-name"
                />
                <input
                  id="admin_apellido_materno"
                  className={styles.input}
                  type="text"
                  placeholder="Apellido materno"
                  value={form.admin_apellido_materno}
                  onChange={set("admin_apellido_materno")}
                  required
                  autoComplete="additional-name"
                />
              </div>
            </Field>

            <Field label="Cargo" htmlFor="admin_cargo">
              <input
                id="admin_cargo"
                className={styles.input}
                type="text"
                placeholder="Super Admin"
                value={form.admin_cargo}
                onChange={set("admin_cargo")}
                required
                autoComplete="organization-title"
              />
            </Field>

            <Field
              label="Email del administrador"
              htmlFor="admin_email"
              hint="Será el usuario para iniciar sesión en INXORA."
            >
              <input
                id="admin_email"
                className={styles.input}
                type="email"
                placeholder="admin@empresa.com"
                value={form.admin_email}
                onChange={set("admin_email")}
                required
                autoComplete="email"
              />
            </Field>

            <Field label="Contraseña" htmlFor="admin_password">
              <div className={styles.inputWrap}>
                <input
                  id="admin_password"
                  className={`${styles.input} ${styles.inputWithAffix}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Crea una contraseña segura"
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
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  aria-pressed={showPassword}
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <span className="material-symbols-rounded" aria-hidden>
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              <PasswordStrength value={form.admin_password} />
            </Field>

            <Field
              label="Repite la contraseña"
              htmlFor="admin_password_confirm"
              hint={
                confirmFilled ? (
                  <span
                    className={passwordsMatch ? styles.matchOk : styles.matchBad}
                  >
                    {passwordsMatch
                      ? "Las contraseñas coinciden."
                      : "Las contraseñas no coinciden."}
                  </span>
                ) : (
                  "Debe coincidir con la contraseña anterior."
                )
              }
            >
              <div className={styles.inputWrap}>
                <input
                  id="admin_password_confirm"
                  className={`${styles.input} ${styles.inputWithAffix}`}
                  type="password"
                  placeholder="Vuelve a escribir la contraseña"
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
            {submitting ? "Creando cuenta…" : "Crear cuenta"}
            {!submitting && (
              <span className="material-symbols-rounded" aria-hidden>
                arrow_forward
              </span>
            )}
          </button>

          <p className={styles.legalNote}>
            Al crear tu cuenta aceptas nuestros{" "}
            <RouterLink to={ROUTES.terminos}>
              Términos y Condiciones de Uso
            </RouterLink>
            , el{" "}
            <RouterLink to={ROUTES.acuerdoPiloto}>
              Acuerdo de Usuario Piloto
            </RouterLink>{" "}
            y la{" "}
            <RouterLink to={ROUTES.politicaPrivacidad}>
              Política de Privacidad y Confidencialidad
            </RouterLink>
            .
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
const PasswordStrength = ({ value }: { value: string }) => {
  const checks = getPasswordChecks(value);
  const score = PASSWORD_RULES.reduce(
    (n, rule) => n + (checks[rule.key] ? 1 : 0),
    0,
  );
  const pct = Math.round((score / PASSWORD_RULES.length) * 100);
  const level = score <= 2 ? "weak" : score <= 4 ? "medium" : "strong";
  const levelLabel =
    level === "weak" ? "Débil" : level === "medium" ? "Media" : "Fuerte";
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
        aria-label="Seguridad de la contraseña"
        aria-valuemin={0}
        aria-valuemax={PASSWORD_RULES.length}
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
            Seguridad:{" "}
            <strong className={textClass}>{levelLabel}</strong>
          </>
        ) : (
          "Tu contraseña debe cumplir:"
        )}
      </p>
      <ul className={styles.pwdRules}>
        {PASSWORD_RULES.map((rule) => {
          const ok = checks[rule.key];
          return (
            <li
              key={rule.key}
              className={ok ? styles.pwdRuleOk : styles.pwdRulePending}
            >
              <span className="material-symbols-rounded" aria-hidden>
                {ok ? "check_circle" : "radio_button_unchecked"}
              </span>
              <span>{rule.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CrearCuentaPage;
