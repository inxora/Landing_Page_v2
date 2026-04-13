import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { libroReclamacionesTranslation } from "../content/libroReclamaciones";
import { ApiError } from "../lib/api/client";
import { LibroReclamacionesService } from "../lib/services/libro-reclamaciones.service";
import "./libro-reclamaciones-page.css";

export default function LibroReclamacionesPage() {
  const t = libroReclamacionesTranslation.es;

  const [form, setForm] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    tipoDoc: "DNI",
    numDoc: "",
    celular: "",
    departamento: "",
    provincia: "",
    distrito: "",
    direccion: "",
    referencia: "",
    email: "",
    menorEdad: "no",
    tutorNombre: "",
    tutorEmail: "",
    tutorTipoDoc: "DNI",
    tutorNumDoc: "",
    tipoReclamo: "Reclamación",
    tipoConsumo: "Producto",
    numPedido: "",
    fechaReclamo: "",
    proveedor: "INXORA S.A.C. (RUC: 20614841681)",
    monto: "",
    descripcion: "",
    fechaCompra: "",
    fechaConsumo: "",
    fechaCaducidad: "",
    detalle: "",
    pedidoCliente: "",
    acepta: false
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validación básica
    if (!form.nombre || !form.apellido1 || !form.tipoDoc || !form.numDoc || !form.celular || !form.departamento || !form.direccion || !form.email || !form.descripcion || !form.detalle || !form.pedidoCliente || !form.acepta) {
      setError(t.validaciones.camposObligatorios);
      return;
    }
    
    // Validación de teléfono
    if (!form.celular.match(/^[0-9]{9}$/)) {
      setError(t.validaciones.telefonoFormato);
      return;
    }
    
    // Validación de email
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError(t.validaciones.emailInvalido);
      return;
    }
    
    setError("");
    setSubmitting(true);
    try {
      const res = await LibroReclamacionesService.crearReclamo({
        nombre: form.nombre,
        apellido1: form.apellido1,
        apellido2: form.apellido2 || undefined,
        tipoDoc: form.tipoDoc,
        numDoc: form.numDoc,
        celular: form.celular,
        email: form.email,
        departamento: form.departamento || undefined,
        provincia: form.provincia || undefined,
        distrito: form.distrito || undefined,
        direccion: form.direccion || undefined,
        referencia: form.referencia || undefined,
        menorEdad: form.menorEdad === "si",
        tutorNombre: form.tutorNombre || undefined,
        tutorEmail: form.tutorEmail || undefined,
        tutorTipoDoc: form.tutorTipoDoc || undefined,
        tutorNumDoc: form.tutorNumDoc || undefined,
        tipoReclamo: form.tipoReclamo,
        tipoConsumo: form.tipoConsumo,
        numPedido: form.numPedido || undefined,
        pedidoCliente: form.pedidoCliente || undefined,
        fechaReclamo: form.fechaReclamo || undefined,
        idEmpresaEmisora: 1,
        monto: form.monto ? Number(form.monto) : undefined,
        descripcion: form.descripcion,
        fechaCompra: form.fechaCompra || undefined,
        fechaConsumo: form.fechaConsumo || undefined,
        fechaCaducidad: form.fechaCaducidad || undefined,
        detalle: form.detalle,
        acepta: form.acepta,
      });

      if (res.success) {
        setEnviado(true);
      } else {
        setError(res.message || res.error || "No se pudo registrar el reclamo.");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Error al enviar el reclamo.");
      } else {
        setError(
          err instanceof Error ? err.message : "Error al enviar el reclamo."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="lrPage">
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        sx={{
          mb: 2,
          textTransform: "none",
          background: "#171d4c",
          "&:hover": { background: "#252b5c" },
        }}
      >
        {t.atras}
      </Button>
      <h1 className="lrTitle">{t.title}</h1>
      <p className="lrSubtitle">{t.subtitle}</p>
      {enviado ? (
        <div className="lrSuccess">
          {t.exito}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="lrForm">
          <fieldset className="lrFieldset">
            <legend className="lrLegend">{t.datosConsumidor}</legend>
            <div className="lrGrid">
              <div>
                <label className="lrLabel">{t.nombre}</label>
                <input 
                  name="nombre" 
                  value={form.nombre} 
                  onChange={handleChange} 
                  className="lrInput" 
                  required 
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label className="lrLabel">{t.primerApellido}</label>
                <input 
                  name="apellido1" 
                  value={form.apellido1} 
                  onChange={handleChange} 
                  className="lrInput" 
                  required 
                  autoComplete="family-name"
                />
              </div>
              <div>
                <label className="lrLabel">{t.segundoApellido}</label>
                <input 
                  name="apellido2" 
                  value={form.apellido2} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="family-name"
                />
              </div>
              <div>
                <label className="lrLabel">{t.tipoDocumento}</label>
                <select name="tipoDoc" value={form.tipoDoc} onChange={handleChange} className="lrInput" autoComplete="off">
                  <option>{t.dni}</option>
                  <option>{t.ce}</option>
                  <option>{t.pasaporte}</option>
                  <option>{t.ruc}</option>
                </select>
              </div>
              <div>
                <label className="lrLabel">{t.numeroDocumento}</label>
                <input 
                  name="numDoc" 
                  value={form.numDoc} 
                  onChange={handleChange} 
                  className="lrInput" 
                  required 
                  autoComplete="off"
                  maxLength={11}
                  pattern="[0-9]{8,11}"
                />
              </div>
              <div>
                <label className="lrLabel">{t.celular}</label>
                <input 
                  name="celular" 
                  value={form.celular} 
                  onChange={handleChange} 
                  className="lrInput" 
                  required 
                  autoComplete="tel"
                  maxLength={9}
                  pattern="[0-9]{9}"
                />
              </div>
              <div>
                <label className="lrLabel">{t.departamento}</label>
                <select name="departamento" value={form.departamento} onChange={handleChange} className="lrInput" required autoComplete="off">
                  <option value="">{t.selecciona}</option>
                  {t.departamentos.map((dep: string) => <option key={dep}>{dep}</option>)}
                </select>
              </div>
              <div>
                <label className="lrLabel">{t.provincia}</label>
                <input 
                  name="provincia" 
                  value={form.provincia} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="address-level1"
                />
              </div>
              <div>
                <label className="lrLabel">{t.distrito}</label>
                <input 
                  name="distrito" 
                  value={form.distrito} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="address-level2"
                />
              </div>
              <div>
                <label className="lrLabel">{t.direccion}</label>
                <input 
                  name="direccion" 
                  value={form.direccion} 
                  onChange={handleChange} 
                  className="lrInput" 
                  required 
                  autoComplete="street-address"
                />
              </div>
              <div>
                <label className="lrLabel">{t.referencia}</label>
                <input 
                  name="referencia" 
                  value={form.referencia} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="off"
                />
              </div>
              <div className="lrSpan2">
                <label className="lrLabel">{t.correoElectronico}</label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  className="lrInput" 
                  required 
                  autoComplete="email"
                />
              </div>
              <div className="lrSpan2">
                <label className="lrLabel">{t.menorEdad}</label>
                <select name="menorEdad" value={form.menorEdad} onChange={handleChange} className="lrInput" autoComplete="off">
                  <option value="no">{t.no}</option>
                  <option value="si">{t.si}</option>
                </select>
              </div>
              {form.menorEdad === "si" && (
                <>
                  <div>
                    <label className="lrLabel">{t.nombreTutor}</label>
                    <input 
                      name="tutorNombre" 
                      value={form.tutorNombre} 
                      onChange={handleChange} 
                      className="lrInput" 
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="lrLabel">{t.correoTutor}</label>
                    <input 
                      name="tutorEmail" 
                      type="email" 
                      value={form.tutorEmail} 
                      onChange={handleChange} 
                      className="lrInput" 
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className="lrLabel">{t.tipoDocumentoTutor}</label>
                    <select name="tutorTipoDoc" value={form.tutorTipoDoc} onChange={handleChange} className="lrInput" autoComplete="off">
                      <option>{t.dni}</option>
                      <option>{t.ce}</option>
                      <option>{t.pasaporte}</option>
                      <option>{t.ruc}</option>
                    </select>
                  </div>
                  <div>
                    <label className="lrLabel">{t.numeroDocumentoTutor}</label>
                    <input 
                      name="tutorNumDoc" 
                      value={form.tutorNumDoc} 
                      onChange={handleChange} 
                      className="lrInput" 
                      autoComplete="off"
                      maxLength={11}
                      pattern="[0-9]{8,11}"
                    />
                  </div>
                </>
              )}
            </div>
          </fieldset>
          <fieldset className="lrFieldset">
            <legend className="lrLegend">{t.detalleReclamo}</legend>
            <div className="lrGrid">
              <div>
                <label className="lrLabel">{t.tipoReclamo}</label>
                <select name="tipoReclamo" value={form.tipoReclamo} onChange={handleChange} className="lrInput" autoComplete="off">
                  <option>{t.reclamacion}</option>
                  <option>{t.queja}</option>
                </select>
              </div>
              <div>
                <label className="lrLabel">{t.tipoConsumo}</label>
                <select name="tipoConsumo" value={form.tipoConsumo} onChange={handleChange} className="lrInput" autoComplete="off">
                  <option>{t.producto}</option>
                  <option>{t.servicio}</option>
                </select>
              </div>
              <div>
                <label className="lrLabel">{t.numeroPedido}</label>
                <input 
                  name="numPedido" 
                  value={form.numPedido} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="lrLabel">{t.fechaReclamo}</label>
                <input 
                  name="fechaReclamo" 
                  type="date" 
                  value={form.fechaReclamo} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="off"
                />
              </div>
              <div className="lrSpan2">
                <label className="lrLabel">{t.proveedor}</label>
                <input 
                  name="proveedor" 
                  value={form.proveedor} 
                  onChange={handleChange} 
                  className="lrInput" 
                  readOnly 
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="lrLabel">{t.montoReclamado}</label>
                <input 
                  name="monto" 
                  value={form.monto} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="off"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="lrSpan2">
                <label className="lrLabel">{t.descripcionProducto}</label>
                <textarea 
                  name="descripcion" 
                  value={form.descripcion} 
                  onChange={handleChange} 
                  className="lrInput" 
                  required 
                  rows={2} 
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="lrLabel">{t.fechaCompra}</label>
                <input 
                  name="fechaCompra" 
                  type="date" 
                  value={form.fechaCompra} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="lrLabel">{t.fechaConsumo}</label>
                <input 
                  name="fechaConsumo" 
                  type="date" 
                  value={form.fechaConsumo} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="lrLabel">{t.fechaCaducidad}</label>
                <input 
                  name="fechaCaducidad" 
                  type="date" 
                  value={form.fechaCaducidad} 
                  onChange={handleChange} 
                  className="lrInput" 
                  autoComplete="off"
                />
              </div>
              <div className="lrSpan2">
                <label className="lrLabel">{t.detalleReclamacion}</label>
                <textarea 
                  name="detalle" 
                  value={form.detalle} 
                  onChange={handleChange} 
                  className="lrInput" 
                  required 
                  rows={2} 
                  autoComplete="off"
                />
              </div>
              <div className="lrSpan2">
                <label className="lrLabel">{t.pedidoCliente}</label>
                <textarea 
                  name="pedidoCliente" 
                  value={form.pedidoCliente} 
                  onChange={handleChange} 
                  className="lrInput" 
                  required 
                  rows={2} 
                  autoComplete="off"
                />
              </div>
            </div>
          </fieldset>
          <div className="lrLegalNotes">
            <p>{t.avisosLegales.linea1}</p>
            <p>{t.avisosLegales.linea2}</p>
            <p>{t.avisosLegales.linea3}</p>
          </div>
          <div className="lrCheckboxRow">
            <input type="checkbox" name="acepta" checked={form.acepta} onChange={handleChange} required />
            <span>{t.politicaPrivacidad}</span>
          </div>
          {error && <div className="lrError">{error}</div>}
          <button type="submit" className="lrSubmit" disabled={submitting}>
            {submitting ? (
              <>
                <svg className="lrSpin" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle className="lrSpinCircle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {t.enviando}
              </>
            ) : (
              t.enviarReclamo
            )}
          </button>
        </form>
      )}
    </section>
  );
} 