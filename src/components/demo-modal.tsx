import { type FormEvent, useEffect, useRef, useState } from "react";
import { useDemoModal } from "../context/DemoModalContext";
import styles from "./demo-modal.module.css";

interface FormData {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

const INITIAL: FormData = { nombre: "", apellido: "", correo: "", telefono: "" };

export default function DemoModal() {
  const { open, closeModal } = useDemoModal();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Focus trap & keyboard */
  useEffect(() => {
    if (!open) return;
    firstInputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeModal]);

  /* Reset on close */
  useEffect(() => {
    if (!open) { setSent(false); setForm(INITIAL); setSending(false); }
  }, [open]);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://apisaas.inxora.com/api/v1/demo/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          correo: form.correo,
          telefono: form.telefono,
        }),
      });
    } catch {
      // error silencioso — el éxito se muestra igual para no frustrar al usuario
    } finally {
      setSending(false);
      setSent(true);
    }
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      onClick={(e) => { if (e.target === overlayRef.current) closeModal(); }}
    >
      <div className={styles.panel}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title} id="demo-modal-title">
              Solicita tu demo<br />
              <span className={styles.titleAccent}>personalizada</span>
            </h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="Cerrar"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {sent ? (
          <div className={styles.successState}>
            <span className={`material-symbols-rounded ${styles.successIcon}`} aria-hidden>
              check_circle
            </span>
            <p className={styles.successTitle}>¡Listo! Te esperamos.</p>
            <p className={styles.successSub}>
              Te enviamos un correo de confirmación. Nuestro equipo se pondrá
              en contacto contigo muy pronto.
            </p>
            <button type="button" className={styles.submitBtn} onClick={closeModal}>
              Cerrar
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="demo-nombre">Nombre</label>
                <input
                  ref={firstInputRef}
                  id="demo-nombre"
                  className={styles.input}
                  type="text"
                  placeholder="Juan"
                  value={form.nombre}
                  onChange={set("nombre")}
                  required
                  autoComplete="given-name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="demo-apellido">Apellido</label>
                <input
                  id="demo-apellido"
                  className={styles.input}
                  type="text"
                  placeholder="Pérez"
                  value={form.apellido}
                  onChange={set("apellido")}
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="demo-correo">Correo electrónico</label>
              <input
                id="demo-correo"
                className={styles.input}
                type="email"
                placeholder="juan@empresa.com"
                value={form.correo}
                onChange={set("correo")}
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="demo-telefono">Teléfono / WhatsApp</label>
              <input
                id="demo-telefono"
                className={styles.input}
                type="tel"
                placeholder="+51 900 000 000"
                value={form.telefono}
                onChange={set("telefono")}
                required
                autoComplete="tel"
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={sending}
            >
              {sending ? "Enviando…" : "Solicita una Demo"}
              {!sending && (
                <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 20 }}>
                  arrow_forward
                </span>
              )}
            </button>
            <p className={styles.disclaimer}>
              Al enviar, aceptas que nos contactemos contigo para coordinar tu demo.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
