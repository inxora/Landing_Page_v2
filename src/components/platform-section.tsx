import { type FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./platform-section.module.css";

export type PlatformSectionProps = {
  className?: string;
};

type VisualKind =
  | "suppliers"
  | "orders"
  | "contracts"
  | "payments"
  | "risk"
  | "srm";

const VISUAL_BY_INDEX: VisualKind[] = [
  "suppliers",
  "orders",
  "contracts",
  "payments",
  "risk",
  "srm",
];

/* ── Visual 1: Proveedores (Registro y evaluación) ── */
function SuppliersVisual() {
  const rows = [
    { name: "Acería Andina S.A.", doc: "RUC 20445881023" },
    { name: "Insumos Pacífico", doc: "—" },
    { name: "Tecnoparts S.A.C", doc: "RUC 20338712054" },
    { name: "Metalsur Industrial", doc: "RUC 20567290318" },
  ];
  return (
    <div className={styles.miniTable}>
      <div className={styles.miniTableHead}>
        <span>Nombre</span>
        <span>Documento</span>
        <span className={styles.cellRight}>Estado</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className={styles.miniTableRow}>
          <span className={styles.cellTitle}>{r.name}</span>
          <span className={styles.cellMono}>{r.doc}</span>
          <span className={styles.cellRight}>
            <span className={`${styles.pill} ${styles.pillSuccess}`}>Activo</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Visual 2: Órdenes de compra ── */
function OrdersVisual() {
  const rows = [
    { id: "OC-0042", supplier: "Acería Andina", total: "S/ 70.80", status: "Recibida", tone: "success" as const },
    { id: "OC-0041", supplier: "Tecnoparts", total: "S/ 123.90", status: "Pendiente", tone: "warning" as const },
    { id: "OC-0040", supplier: "Metalsur", total: "S/ 2,714", status: "Pendiente", tone: "warning" as const },
    { id: "OC-0039", supplier: "Insumos P.", total: "S/ 896.80", status: "Recibida", tone: "success" as const },
  ];
  return (
    <div className={styles.miniTable}>
      <div className={`${styles.miniTableHead} ${styles.headFour}`}>
        <span>N° OC</span>
        <span>Proveedor</span>
        <span className={styles.cellRight}>Total</span>
        <span className={styles.cellRight}>Estado</span>
      </div>
      {rows.map((r) => (
        <div key={r.id} className={`${styles.miniTableRow} ${styles.rowFour}`}>
          <span className={styles.cellMono}>{r.id}</span>
          <span className={styles.cellTitle}>{r.supplier}</span>
          <span className={`${styles.cellRight} ${styles.amount}`}>{r.total}</span>
          <span className={styles.cellRight}>
            <span
              className={`${styles.pill} ${
                r.tone === "success" ? styles.pillSuccess : styles.pillWarning
              }`}
            >
              {r.status}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Visual 3: Contratos activos ── */
function ContractsVisual() {
  const contracts = [
    { name: "Acería Andina S.A.", code: "CTR-2104", progress: 72 },
    { name: "Tecnoparts S.A.C", code: "CTR-2098", progress: 45 },
    { name: "Metalsur Industrial", code: "CTR-2071", progress: 90 },
  ];
  return (
    <div className={styles.miniContracts}>
      {contracts.map((c) => (
        <div key={c.code} className={styles.miniContractItem}>
          <div className={styles.miniContractHeader}>
            <span className={styles.cellTitle}>{c.name}</span>
            <span className={styles.cellMono}>{c.code}</span>
          </div>
          <div className={styles.miniProgressTrack}>
            <span className={styles.miniProgressFill} style={{ width: `${c.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Visual 4: Pagos y conciliación ── */
function PaymentsVisual() {
  return (
    <div className={styles.miniMatch}>
      <div className={styles.miniMatchCard}>
        <span className={styles.miniMatchLabel}>OC</span>
        <span className={styles.miniMatchValue}>OC-0042</span>
        <span className={styles.miniMatchSub}>S/ 70.80</span>
      </div>
      <span className={styles.miniMatchLink} aria-hidden>
        <span className="material-symbols-rounded">link</span>
      </span>
      <div className={styles.miniMatchCard}>
        <span className={styles.miniMatchLabel}>Factura</span>
        <span className={styles.miniMatchValue}>F-2418</span>
        <span className={styles.miniMatchSub}>S/ 70.80</span>
      </div>
      <div className={styles.miniMatchOk}>
        <span className={`material-symbols-rounded ${styles.miniMatchOkIcon}`}>
          check_circle
        </span>
        <span>Conciliado</span>
      </div>
    </div>
  );
}

/* ── Visual 5: Riesgo y compliance (donut + legend) ── */
function RiskVisual() {
  // Donut SVG: aprobadas 58%, en proceso 25%, rechazadas 17%
  const r = 32;
  const c = 2 * Math.PI * r;
  const seg1 = c * 0.58;
  const seg2 = c * 0.25;
  const seg3 = c * 0.17;
  return (
    <div className={styles.miniRisk}>
      <svg viewBox="0 0 80 80" className={styles.miniDonut} aria-hidden>
        <circle cx="40" cy="40" r={r} className={styles.donutBg} />
        <circle
          cx="40"
          cy="40"
          r={r}
          className={styles.donutSeg}
          style={{ stroke: "#10b981", strokeDasharray: `${seg1} ${c}` }}
          transform="rotate(-90 40 40)"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          className={styles.donutSeg}
          style={{
            stroke: "#8b5cf6",
            strokeDasharray: `${seg2} ${c}`,
            strokeDashoffset: -seg1,
          }}
          transform="rotate(-90 40 40)"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          className={styles.donutSeg}
          style={{
            stroke: "#ef4444",
            strokeDasharray: `${seg3} ${c}`,
            strokeDashoffset: -(seg1 + seg2),
          }}
          transform="rotate(-90 40 40)"
        />
        <text x="40" y="42" className={styles.donutLabel}>58%</text>
      </svg>
      <ul className={styles.miniLegend}>
        <li>
          <span className={styles.legendDot} style={{ background: "#10b981" }} />
          <span>Aprobadas</span>
          <span className={styles.legendVal}>58%</span>
        </li>
        <li>
          <span className={styles.legendDot} style={{ background: "#8b5cf6" }} />
          <span>En proceso</span>
          <span className={styles.legendVal}>25%</span>
        </li>
        <li>
          <span className={styles.legendDot} style={{ background: "#ef4444" }} />
          <span>Rechazadas</span>
          <span className={styles.legendVal}>17%</span>
        </li>
      </ul>
    </div>
  );
}

/* ── Visual 6: Cuenta proveedor / Proyecto con solicitudes ── */
function SrmVisual() {
  const items = [
    { id: "SQ-0086", supplier: "Tecnoparts", status: "Rechazada", tone: "danger" as const, total: "S/ 100" },
    { id: "SQ-0085", supplier: "Metalsur", status: "Rechazada", tone: "danger" as const, total: "S/ 100" },
    { id: "SQ-0084", supplier: "Acería And.", status: "Completada", tone: "info" as const, total: "S/ 100" },
  ];
  return (
    <div className={styles.miniProject}>
      <div className={styles.miniProjectHead}>
        <div className={styles.miniProjectTitle}>
          <span className={styles.cellTitle}>Proyecto N°3</span>
          <span className={`${styles.pill} ${styles.pillSuccess}`}>activo</span>
        </div>
        <span className={styles.amount}>S/ 300.00</span>
      </div>
      {items.map((it) => (
        <div key={it.id} className={styles.miniProjectRow}>
          <span className={styles.cellMono}>{it.id}</span>
          <span className={styles.cellTitle}>{it.supplier}</span>
          <span
            className={`${styles.pill} ${
              it.tone === "danger" ? styles.pillDanger : styles.pillInfo
            }`}
          >
            {it.status}
          </span>
          <span className={`${styles.cellRight} ${styles.amount}`}>{it.total}</span>
        </div>
      ))}
    </div>
  );
}

function PlatformVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "suppliers":
      return <SuppliersVisual />;
    case "orders":
      return <OrdersVisual />;
    case "contracts":
      return <ContractsVisual />;
    case "payments":
      return <PaymentsVisual />;
    case "risk":
      return <RiskVisual />;
    case "srm":
      return <SrmVisual />;
  }
}

const ACCENT_BY_INDEX = [false, true, false, false, false, true];

const PlatformSection: FunctionComponent<PlatformSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      id="plataforma"
      aria-labelledby="platform-heading"
    >
      <Box className={styles.intro}>
        <Box className={styles.kickerWrapper}>
          <div className={styles.kicker}>{t.platform.kicker}</div>
        </Box>
        <h2 className={styles.title} id="platform-heading">
          {t.platform.titleLead}
          <span className={styles.titleHighlight}>
            {t.platform.titleAccent}
          </span>
          {t.platform.titleSuffix}
        </h2>
        <p className={styles.lede}>{t.platform.lede}</p>
      </Box>

      <ul className={styles.cardsGrid}>
        {t.platform.items.map((item, i) => (
          <li key={item.title} className={styles.card}>
            <h3
              className={[
                styles.cardTitle,
                ACCENT_BY_INDEX[i] ? styles.cardTitleAccent : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.title}
            </h3>
            <p className={styles.cardBody}>{item.body}</p>
            <div className={styles.cardVisual}>
              <PlatformVisual kind={VISUAL_BY_INDEX[i] ?? "suppliers"} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlatformSection;
