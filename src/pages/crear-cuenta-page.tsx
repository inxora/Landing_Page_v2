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

    if (form.admin_password !== form.admin_password_confirm) {
      setSubmitError("Las contraseñas no coinciden.");
      return;
    }
    if (form.admin_password.length < 8) {
      setSubmitError("La contraseña debe tener al menos 8 caracteres.");
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
          <RouterLink to={ROUTES.home} className={styles.brand}>
            <img src="/LOGO-35.svg" alt="INXORA" />
          </RouterLink>
          <RouterLink to={ROUTES.home} className={styles.backLink}>
            <span className="material-symbols-rounded" aria-hidden>
              arrow_back
            </span>
            Volver al inicio
          </RouterLink>
        </header>

        <div className={styles.intro}>
          <h1 className={styles.title}>Crea tu cuenta de INXORA</h1>
          <p className={styles.sub}>
            Registra tu empresa y al usuario administrador. Toma menos de 2
            minutos.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* ── Empresa ── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Datos de la empresa</h2>

            <div className={styles.grid2}>
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
                {paisesError && (
                  <p className={styles.fieldError}>{paisesError}</p>
                )}
              </Field>

              <Field label="Tipo de documento" htmlFor="empresa_tipo_documento">
                <select
                  id="empresa_tipo_documento"
                  className={styles.input}
                  value={form.empresa_tipo_documento}
                  onChange={set("empresa_tipo_documento")}
                  required
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
              </Field>
            </div>

            <Field label="Número de documento" htmlFor="empresa_numero_documento">
              <div className={styles.inlineField}>
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
            </Field>

            <Field label="Razón social / Nombre de la empresa" htmlFor="empresa_nombre">
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

            <div className={styles.grid2}>
              <Field label="Email corporativo" htmlFor="empresa_email">
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
            </div>

            <div className={styles.grid2}>
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
            </div>
          </section>

          {/* ── Administrador ── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Usuario administrador</h2>

            <div className={styles.grid3}>
              <Field label="Nombre" htmlFor="admin_nombre">
                <input
                  id="admin_nombre"
                  className={styles.input}
                  type="text"
                  placeholder="Jefferson"
                  value={form.admin_nombre}
                  onChange={set("admin_nombre")}
                  required
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Apellido paterno" htmlFor="admin_apellido_paterno">
                <input
                  id="admin_apellido_paterno"
                  className={styles.input}
                  type="text"
                  placeholder="Gutiérrez"
                  value={form.admin_apellido_paterno}
                  onChange={set("admin_apellido_paterno")}
                  required
                  autoComplete="family-name"
                />
              </Field>
              <Field label="Apellido materno" htmlFor="admin_apellido_materno">
                <input
                  id="admin_apellido_materno"
                  className={styles.input}
                  type="text"
                  placeholder="Urbizagastegui"
                  value={form.admin_apellido_materno}
                  onChange={set("admin_apellido_materno")}
                  required
                  autoComplete="additional-name"
                />
              </Field>
            </div>

            <div className={styles.grid2}>
              <Field label="Email del administrador" htmlFor="admin_email">
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
            </div>

            <div className={styles.grid2}>
              <Field label="Contraseña" htmlFor="admin_password">
                <input
                  id="admin_password"
                  className={styles.input}
                  type="password"
                  placeholder="Mín. 8 caracteres"
                  value={form.admin_password}
                  onChange={set("admin_password")}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </Field>
              <Field label="Confirmar contraseña" htmlFor="admin_password_confirm">
                <input
                  id="admin_password_confirm"
                  className={styles.input}
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={form.admin_password_confirm}
                  onChange={set("admin_password_confirm")}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </Field>
            </div>
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
            <RouterLink to={ROUTES.terminos}>Términos y Condiciones</RouterLink>{" "}
            y la{" "}
            <RouterLink to={ROUTES.politicaPrivacidad}>
              Política de Privacidad
            </RouterLink>
            .
          </p>

          <p className={styles.bottomLogin}>
            ¿Ya tienes cuenta?{" "}
            <a href="https://saas.inxora.com">Iniciar sesión</a>
          </p>
        </form>
      </div>
    </main>
  );
};

type FieldProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
};

const Field = ({ label, htmlFor, children }: FieldProps) => (
  <div className={styles.field}>
    <label className={styles.label} htmlFor={htmlFor}>
      {label}
    </label>
    {children}
  </div>
);

export default CrearCuentaPage;
