import { type FormEvent, useState, type FunctionComponent } from "react";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./excel-cta-section.module.css";

type FormData = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
};

const INITIAL: FormData = {
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
};

export type ExcelCtaSectionProps = {
  className?: string;
};

const ExcelCtaSection: FunctionComponent<ExcelCtaSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSending(true);
    try {
      const res = await fetch(
        "https://apisaas.inxora.com/api/v1/demo/solicitar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
      setForm(INITIAL);
    } catch {
      setErrorMsg(t.excelCta.form.errorMessage);
    } finally {
      setSending(false);
    }
  };

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
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="excel-demo-nombre">
                    {t.excelCta.form.firstNameLabel}
                  </label>
                  <input
                    id="excel-demo-nombre"
                    className={styles.input}
                    type="text"
                    placeholder={t.excelCta.form.firstNamePlaceholder}
                    value={form.nombre}
                    onChange={set("nombre")}
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="excel-demo-apellido">
                    {t.excelCta.form.lastNameLabel}
                  </label>
                  <input
                    id="excel-demo-apellido"
                    className={styles.input}
                    type="text"
                    placeholder={t.excelCta.form.lastNamePlaceholder}
                    value={form.apellido}
                    onChange={set("apellido")}
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="excel-demo-correo">
                  {t.excelCta.form.emailLabel}
                </label>
                <input
                  id="excel-demo-correo"
                  className={styles.input}
                  type="email"
                  placeholder={t.excelCta.form.emailPlaceholder}
                  value={form.correo}
                  onChange={set("correo")}
                  required
                  autoComplete="email"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="excel-demo-telefono">
                  {t.excelCta.form.phoneLabel}
                </label>
                <input
                  id="excel-demo-telefono"
                  className={styles.input}
                  type="tel"
                  placeholder={t.excelCta.form.phonePlaceholder}
                  value={form.telefono}
                  onChange={set("telefono")}
                  required
                  autoComplete="tel"
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
                    className={["material-symbols-rounded", styles.ctaIcon].join(
                      " ",
                    )}
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

export default ExcelCtaSection;
