import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { WHATSAPP_QUOTE_URL } from "../constants/whatsapp";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import type { PricingFeatureIcon } from "../i18n/pricingPlans";
import styles from "./pricing-section.module.css";

export type PricingSectionProps = { className?: string };

function FeatureIcon({ icon }: { icon: PricingFeatureIcon }) {
  if (icon === "check")
    return <span className={`material-symbols-rounded ${styles.check}`} aria-hidden>check</span>;
  if (icon === "dash")
    return <span className={`material-symbols-rounded ${styles.dash}`} aria-hidden>horizontal_rule</span>;
  return <span className={`material-symbols-rounded ${styles.star}`} aria-hidden>auto_awesome</span>;
}

function PlanCard({
  plan,
}: {
  plan: ReturnType<typeof useLandingTranslations>["pricing"]["plans"][number];
}) {
  return (
    <article className={plan.popularLabel ? styles.cardPopular : styles.card}>
      {plan.popularLabel && (
        <span className={styles.badgePopular}>{plan.popularLabel}</span>
      )}
      {plan.enterpriseBadge && (
        <span className={styles.badgeEnterprise}>{plan.enterpriseBadge}</span>
      )}
      <h3 className={styles.planName}>{plan.name}</h3>
      <div className={styles.priceRow}>
        <span className={styles.price}>{plan.price}</span>
        <span className={styles.period}>{plan.period}</span>
      </div>
      <p className={styles.description}>{plan.description}</p>
      {plan.groups.map((group) => (
        <div key={group.title} className={styles.group}>
          <div className={styles.groupTitle}>{group.title}</div>
          <ul className={styles.list}>
            {group.items.map((item, i) => (
              <li key={`${group.title}-${i}`} className={styles.row}>
                <span className={styles.iconCell}><FeatureIcon icon={item.icon} /></span>
                <span className={styles.rowText}>{item.text}</span>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <a className={styles.cta} href={WHATSAPP_QUOTE_URL} target="_blank" rel="noopener noreferrer">
        {plan.cta}
        <span className={["material-symbols-rounded", styles.ctaIcon].join(" ")} aria-hidden>north_east</span>
      </a>
    </article>
  );
}

/* ─── Constantes del slider ─────────────────── */
const AUTOPLAY_MS = 3500;
const RESUME_AFTER_MS = 1000; // reinicia autoplay tras inactividad

const PricingSection: FunctionComponent<PricingSectionProps> = ({ className = "" }) => {
  const t = useLandingTranslations();
  const plans = t.pricing.plans;

  const [isMobile, setIsMobile] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  /* refs de timers */
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef   = useRef<ReturnType<typeof setTimeout>  | null>(null);

  /* refs de drag */
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const dragStartX   = useRef<number | null>(null);
  const isDragging   = useRef(false);

  /* ── Detectar breakpoint ── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ── Autoplay ── */
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIdx((p) => (p + 1) % plans.length);
    }, AUTOPLAY_MS);
  }, [plans.length]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  /* Reinicia tras inactividad */
  const scheduleResume = useCallback(() => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => startAutoplay(), RESUME_AFTER_MS);
  }, [startAutoplay]);

  useEffect(() => {
    if (!isMobile) { stopAutoplay(); return; }
    startAutoplay();
    return () => { stopAutoplay(); if (resumeRef.current) clearTimeout(resumeRef.current); };
  }, [isMobile, startAutoplay, stopAutoplay]);

  /* ── Navegación manual ── */
  const goTo = useCallback((idx: number) => {
    setActiveIdx(idx);
    stopAutoplay();
    scheduleResume();
  }, [stopAutoplay, scheduleResume]);

  const advance = useCallback((delta: number) => {
    setActiveIdx((p) => (p + delta + plans.length) % plans.length);
    stopAutoplay();
    scheduleResume();
  }, [plans.length, stopAutoplay, scheduleResume]);

  /* ── Drag / swipe (mouse + touch) ── */
  const onDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    isDragging.current = false;
  };

  const onDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - clientX;
    if (Math.abs(diff) > 40) advance(diff > 0 ? 1 : -1);
    dragStartX.current = null;
    isDragging.current = false;
  };

  /* Mouse */
  const onMouseDown = (e: React.MouseEvent) => onDragStart(e.clientX);
  const onMouseUp   = (e: React.MouseEvent) => onDragEnd(e.clientX);
  const onMouseLeave = () => { dragStartX.current = null; };

  /* Touch */
  const onTouchStart = (e: React.TouchEvent) => onDragStart(e.touches[0].clientX);
  const onTouchEnd   = (e: React.TouchEvent) => onDragEnd(e.changedTouches[0].clientX);

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      id="planes"
      aria-labelledby="pricing-heading"
    >
      <div className={styles.inner}>
        <div className={styles.kicker}>{t.pricing.kicker}</div>
        <h2 className={styles.title} id="pricing-heading">{t.pricing.title}</h2>
        <p className={styles.lede}>{t.pricing.lede}</p>

        {/* Desktop: grid */}
        {!isMobile && (
          <div className={styles.grid}>
            {plans.map((p) => <PlanCard key={p.name} plan={p} />)}
          </div>
        )}

        {/* Mobile / tablet: slider */}
        {isMobile && (
          <div
            ref={wrapperRef}
            className={styles.sliderWrapper}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Track: cada slide = 100% del wrapper */}
            <div
              className={styles.sliderTrack}
              style={{ transform: `translateX(-${activeIdx * 100}%)` }}
              aria-live="polite"
            >
              {plans.map((p, i) => (
                <div
                  key={p.name}
                  className={styles.sliderSlide}
                  aria-hidden={i !== activeIdx}
                >
                  <PlanCard plan={p} />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className={styles.dots} role="tablist" aria-label={t.pricing.kicker}>
              {plans.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={p.name}
                  className={[styles.dot, i === activeIdx ? styles.dotActive : ""].join(" ")}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
