import { type FormEvent, useMemo, useRef, useState, type FunctionComponent } from "react";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./excel-cta-section.module.css";

type FormData = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  empresa: string;
  cargo: string;
  rubro: string;
  mensaje: string;
  // Honeypot: campo invisible que solo bots llenan. Si viene con algo,
  // ni siquiera enviamos al backend.
  website: string;
};

const INITIAL: FormData = {
  nombre: "", apellido: "", correo: "", telefono: "",
  empresa: "", cargo: "", rubro: "", mensaje: "",
  website: "",
};

// Regex teléfono E.164 relajado. Debe tener 7+ dígitos reales.
const RE_TELEFONO = /^\+?[\d\s()\-]{7,25}$/;
// Regex email básico (backend valida mejor con EmailStr).
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errores = Partial<Record<keyof FormData, string>>;

// Cooldown post-submit para evitar spam de clicks.
const COOLDOWN_MS = 3000;

export type ExcelCtaSectionProps = {
  className?: string;
};

const ExcelCtaSection: FunctionComponent<ExcelCtaSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errores, setErrores] = useState<Errores>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const cooldownHasta = useRef<number>(0);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [field]: v }));
      // Al escribir, limpiar el error del campo si venía marcado.
      if (errores[field]) setErrores((prev) => ({ ...prev, [field]: undefined }));
    };

  function validar(): Errores {
    const errs: Errores = {};
    const nombre = form.nombre.trim();
    const apellido = form.apellido.trim();
    const correo = form.correo.trim();
    const telefono = form.telefono.trim();
    const empresa = form.empresa.trim();

    if (nombre.length < 2)   errs.nombre   = "Ingresá tu nombre (mín. 2 caracteres)";
    if (apellido.length < 2) errs.apellido = "Ingresá tu apellido (mín. 2 caracteres)";
    if (!RE_EMAIL.test(correo)) errs.correo = "Correo con formato inválido";
    if (!RE_TELEFONO.test(telefono) || telefono.replace(/\D/g, "").length < 7) {
      errs.telefono = "Teléfono con formato inválido";
    }
    if (empresa.length < 2)  errs.empresa  = "Ingresá el nombre de tu empresa";
    return errs;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Cooldown anti-spam
    const ahora = Date.now();
    if (ahora < cooldownHasta.current) return;

    // Honeypot: bots suelen llenar todos los inputs. Si `website` tiene algo,
    // aparentar éxito y no enviar nada. (El backend también valida esto.)
    if (form.website) {
      setSent(true);
      return;
    }

    const errs = validar();
    if (Object.keys(errs).length > 0) {
      setErrores(errs);
      setErrorMsg(t.excelCta.form.errorValidation);
      return;
    }

    setSending(true);
    try {
      const payload = {
        nombre:   form.nombre.trim(),
        apellido: form.apellido.trim(),
        correo:   form.correo.trim(),
        telefono: form.telefono.trim(),
        empresa:  form.empresa.trim(),
        cargo:    form.cargo.trim() || undefined,
        rubro:    form.rubro || undefined,
        mensaje:  form.mensaje.trim() || undefined,
        website:  "",  // siempre vacío desde el user real
      };
      const res = await fetch(
        "https://apisaas.inxora.com/api/v1/demo/solicitar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
      setForm(INITIAL);
      cooldownHasta.current = Date.now() + COOLDOWN_MS;
    } catch {
      setErrorMsg(t.excelCta.form.errorMessage);
    } finally {
      setSending(false);
    }
  };

  const opcionesRubro = useMemo(() => t.excelCta.form.rubroOptions, [t]);

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      id="demo"
      aria-labelledby="excel-cta-heading"
    >
      <div className={styles.inner}>
        <div className={styles.copyColumn}>
          <div className={styles.badge}>
            <span className={styles.dot} aria-hidden />
            {t.excelCta.badge}
          </div>
          <h2 className={styles.title} id="excel-cta-heading">
            {t.excelCta.titleLine1}
            <br />
            {t.excelCta.titleLine2Before}{" "}
            <span className={styles.titleAccent}>
              {t.excelCta.titleLine2Brand}
            </span>
            {t.excelCta.titleLine2After}
          </h2>
          <p className={styles.sub}>{t.excelCta.sub}</p>
        </div>

        <div className={styles.formColumn}>
          {sent ? (
            <div className={styles.successState}>
              <span
                className={`material-symbols-rounded ${styles.successIcon}`}
                aria-hidden
              >
                check_circle
              </span>
              <p className={styles.successTitle}>
                {t.excelCta.form.successTitle}
              </p>
              <p className={styles.successSub}>{t.excelCta.form.successSub}</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* ─── Honeypot invisible — no debe verse ni por accesibilidad ─── */}
              <div aria-hidden="true" style={{
                position: "absolute",
                left: "-10000px",
                top: "auto",
                width: 1, height: 1,
                overflow: "hidden",
              }}>
                <label htmlFor="excel-demo-website">Website (dejar vacío)</label>
                <input
                  id="excel-demo-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={set("website")}
                />
              </div>

              <div className={styles.row}>
                <Field
                  id="excel-demo-nombre"
                  label={t.excelCta.form.firstNameLabel}
                  placeholder={t.excelCta.form.firstNamePlaceholder}
                  value={form.nombre}
                  onChange={set("nombre")}
                  autoComplete="given-name"
                  error={errores.nombre}
                  className={styles.field}
                  inputClassName={styles.input}
                  labelClassName={styles.label}
                />
                <Field
                  id="excel-demo-apellido"
                  label={t.excelCta.form.lastNameLabel}
                  placeholder={t.excelCta.form.lastNamePlaceholder}
                  value={form.apellido}
                  onChange={set("apellido")}
                  autoComplete="family-name"
                  error={errores.apellido}
                  className={styles.field}
                  inputClassName={styles.input}
                  labelClassName={styles.label}
                />
              </div>

              <Field
                id="excel-demo-correo"
                type="email"
                label={t.excelCta.form.emailLabel}
                placeholder={t.excelCta.form.emailPlaceholder}
                value={form.correo}
                onChange={set("correo")}
                autoComplete="email"
                error={errores.correo}
                className={styles.field}
                inputClassName={styles.input}
                labelClassName={styles.label}
              />

              <div className={styles.row}>
                <Field
                  id="excel-demo-telefono"
                  type="tel"
                  label={t.excelCta.form.phoneLabel}
                  placeholder={t.excelCta.form.phonePlaceholder}
                  value={form.telefono}
                  onChange={set("telefono")}
                  autoComplete="tel"
                  error={errores.telefono}
                  className={styles.field}
                  inputClassName={styles.input}
                  labelClassName={styles.label}
                />
                <Field
                  id="excel-demo-empresa"
                  label={t.excelCta.form.empresaLabel}
                  placeholder={t.excelCta.form.empresaPlaceholder}
                  value={form.empresa}
                  onChange={set("empresa")}
                  autoComplete="organization"
                  error={errores.empresa}
                  className={styles.field}
                  inputClassName={styles.input}
                  labelClassName={styles.label}
                />
              </div>

              <div className={styles.row}>
                <Field
                  id="excel-demo-cargo"
                  label={t.excelCta.form.cargoLabel}
                  placeholder={t.excelCta.form.cargoPlaceholder}
                  value={form.cargo}
                  onChange={set("cargo")}
                  autoComplete="organization-title"
                  className={styles.field}
                  inputClassName={styles.input}
                  labelClassName={styles.label}
                />
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="excel-demo-rubro">
                    {t.excelCta.form.rubroLabel}
                  </label>
                  <select
                    id="excel-demo-rubro"
                    className={styles.input}
                    value={form.rubro}
                    onChange={set("rubro")}
                  >
                    {opcionesRubro.map((r) => (
                      <option key={r.valor} value={r.valor}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="excel-demo-mensaje">
                  {t.excelCta.form.mensajeLabel}
                </label>
                <textarea
                  id="excel-demo-mensaje"
                  className={styles.input}
                  placeholder={t.excelCta.form.mensajePlaceholder}
                  value={form.mensaje}
                  onChange={set("mensaje")}
                  rows={3}
                  maxLength={500}
                />
              </div>

              {errorMsg && (
                <p className={styles.errorMsg} role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className={styles.cta}
                disabled={sending}
              >
                {sending ? t.excelCta.form.sending : t.excelCta.cta}
                {!sending && (
                  <span
                    className={["material-symbols-rounded", styles.ctaIcon].join(" ")}
                    aria-hidden
                  >
                    arrow_forward
                  </span>
                )}
              </button>

              <p className={styles.disclaimer}>
                {t.excelCta.form.disclaimer}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// ─── Field helper — Input con label + error inline ────────────────

type FieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
};

function Field({
  id, label, placeholder, value, onChange, type = "text",
  autoComplete, error, className, inputClassName, labelClassName,
}: FieldProps) {
  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        style={error ? { borderColor: "#ef4444" } : undefined}
      />
      {error && (
        <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default ExcelCtaSection;
