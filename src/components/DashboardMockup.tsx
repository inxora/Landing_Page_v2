import React, { useLayoutEffect, useRef, useState } from "react";

/** Ancho de referencia del mockup. Más bajo = mayor escala (mockup se ve más grande) en el mismo ancho de columna. */
const DASH_DESIGN_WIDTH_PX = 880;

function DashSideIcon({ name }: { name: string }) {
  return (
    <span className="material-symbols-rounded dash-side-ic" aria-hidden>
      {name}
    </span>
  );
}

/** WhatsApp reconocible; hereda `currentColor` del ítem del menú */
function DashWhatsAppIcon() {
  return (
    <svg className="dash-side-svg" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

const DashboardMockup: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [viewportHeightPx, setViewportHeightPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return;

    const update = () => {
      const w = viewport.clientWidth;
      const nextScale = Math.min(1, w / DASH_DESIGN_WIDTH_PX);
      setScale(nextScale);

      const inner = innerRef.current;
      if (inner) {
        const h = inner.offsetHeight;
        setViewportHeightPx(Math.ceil(h * nextScale));
      }
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(viewport);
    const inner = innerRef.current;
    if (inner) ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="dash-mock-container dash-wrap">
      <div
        ref={viewportRef}
        className="dash-scale-viewport"
        style={viewportHeightPx != null ? { height: viewportHeightPx } : undefined}
      >
        <div
          ref={innerRef}
          className="dash-scale-inner"
          style={{
            width: DASH_DESIGN_WIDTH_PX,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <div className="dash-frame dash-frame--scaled">
            <div className="dash-bar">
              <div className="circles">
                <i />
                <i />
                <i />
              </div>
              <div className="dash-url">app.inxora.com/proveedores</div>
              <div style={{ width: "54px" }} />
            </div>
            <div className="dash-body">
              <aside className="side">
                <div className="side-label">Operación</div>
                <div className="side-item">
                  <DashSideIcon name="space_dashboard" />
                  Dashboard
                </div>
                <div className="side-item active">
                  <DashSideIcon name="handshake" />
                  Proveedores <span className="count">248</span>
                </div>
                <div className="side-item">
                  <DashSideIcon name="inventory_2" />
                  Productos <span className="count">1.2k</span>
                </div>
                <div className="side-item">
                  <DashSideIcon name="request_quote" />
                  Cotizaciones <span className="count">32</span>
                </div>
                <div className="side-item">
                  <DashWhatsAppIcon />
                  WhatsApp
                </div>
                <div style={{ height: "18px" }} />
                <div className="side-label">Inteligencia</div>
                <div className="side-item">
                  <DashSideIcon name="auto_awesome" />
                  Sourcing IA
                </div>
                <div className="side-item">
                  <DashSideIcon name="compare_arrows" />
                  Comparador
                </div>
                <div className="side-item">
                  <DashSideIcon name="notifications_active" />
                  Alertas <span className="count">4</span>
                </div>
              </aside>
              <div className="dash-main">
                <div className="dash-main-head">
                  <div>
                    <h3>Proveedores activos</h3>
                    <p>248 registros · Actualizado hace 4 min</p>
                  </div>
                  <div className="search-bar">
                    <input type="text" placeholder="Buscar proveedor, RUC, categoría…" readOnly />
                    <button type="button" className="btn-mini">
                      + Nuevo
                    </button>
                  </div>
                </div>

                <div className="kpis">
                  <div className="kpi">
                    <div className="kpi-label">Gasto YTD</div>
                    <div className="kpi-val">
                      $4.82
                      <span style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 400 }}>
                        {" "}
                        M
                      </span>
                    </div>
                    <div className="kpi-delta up">↑ 12.4% vs. Q3</div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-label">OC abiertas</div>
                    <div className="kpi-val">32</div>
                    <div className="kpi-delta flat">↔ sin cambio</div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-label">Score prom.</div>
                    <div className="kpi-val">
                      8.6
                      <span style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 400 }}>
                        {" "}
                        /10
                      </span>
                    </div>
                    <div className="kpi-delta up">↑ 0.3 pts</div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-label">Riesgos altos</div>
                    <div className="kpi-val">4</div>
                    <div className="kpi-delta down">↑ 1 semanal</div>
                  </div>
                </div>

                <div className="tbl-wrap">
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Proveedor</th>
                        <th>Categoría</th>
                        <th>Score</th>
                        <th>OC activa</th>
                        <th>Riesgo</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="sup">
                            <div className="sup-logo">AC</div>
                            <div>
                              <div className="sup-name">Aceros del Centro</div>
                              <div className="sup-sub">RUC 20·5548·12</div>
                            </div>
                          </div>
                        </td>
                        <td>Metales / Placas</td>
                        <td>
                          <div className="score">
                            <span className="num">9.2</span>
                            <div className="score-bar">
                              <i style={{ width: "92%" }} />
                            </div>
                          </div>
                        </td>
                        <td className="num">OC-2041</td>
                        <td>
                          <span className="pill ok">Bajo</span>
                        </td>
                        <td>
                          <span className="pill ok">● Activo</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="sup">
                            <div className="sup-logo">TP</div>
                            <div>
                              <div className="sup-name">Tecnopartes S.A.</div>
                              <div className="sup-sub">RUC 30·1102·88</div>
                            </div>
                          </div>
                        </td>
                        <td>Electrónica industrial</td>
                        <td>
                          <div className="score">
                            <span className="num">8.7</span>
                            <div className="score-bar">
                              <i style={{ width: "87%" }} />
                            </div>
                          </div>
                        </td>
                        <td className="num">OC-2038</td>
                        <td>
                          <span className="pill ok">Bajo</span>
                        </td>
                        <td>
                          <span className="pill ok">● Activo</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="sup">
                            <div className="sup-logo">LM</div>
                            <div>
                              <div className="sup-name">Lubricantes Monterrey</div>
                              <div className="sup-sub">RFC LMO·930412</div>
                            </div>
                          </div>
                        </td>
                        <td>Químicos / Lubricantes</td>
                        <td>
                          <div className="score">
                            <span className="num">7.4</span>
                            <div className="score-bar">
                              <i style={{ width: "74%" }} />
                            </div>
                          </div>
                        </td>
                        <td className="num">OC-2035</td>
                        <td>
                          <span className="pill warn">Medio</span>
                        </td>
                        <td>
                          <span className="pill warn">● Pendiente</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="sup">
                            <div className="sup-logo">FN</div>
                            <div>
                              <div className="sup-name">Fundición Norte</div>
                              <div className="sup-sub">RUT 76·884·441</div>
                            </div>
                          </div>
                        </td>
                        <td>Hierro / Fundición</td>
                        <td>
                          <div className="score">
                            <span className="num">6.1</span>
                            <div className="score-bar">
                              <i style={{ width: "61%" }} />
                            </div>
                          </div>
                        </td>
                        <td className="num">OC-2029</td>
                        <td>
                          <span className="pill risk">Alto</span>
                        </td>
                        <td>
                          <span className="pill risk">● Auditoría</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="sup">
                            <div className="sup-logo">EM</div>
                            <div>
                              <div className="sup-name">Electro Maquinaria</div>
                              <div className="sup-sub">NIT 900·541·22</div>
                            </div>
                          </div>
                        </td>
                        <td>Maquinaria pesada</td>
                        <td>
                          <div className="score">
                            <span className="num">8.9</span>
                            <div className="score-bar">
                              <i style={{ width: "89%" }} />
                            </div>
                          </div>
                        </td>
                        <td className="num">OC-2024</td>
                        <td>
                          <span className="pill ok">Bajo</span>
                        </td>
                        <td>
                          <span className="pill muted">● En revisión</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
