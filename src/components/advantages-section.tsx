import {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./advantages-section.module.css";

export type AdvantagesSectionProps = {
  className?: string;
};

const PILLAR_ICONS = [
  "/heart-hand.svg",
  "/coins-hand.svg",
  "/clock-plus.svg",
] as const;

const AdvantagesSection: FunctionComponent<AdvantagesSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    if (rect.bottom > 32 && rect.top < vh - 32) {
      setInView(true);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  const items = useMemo(
    () =>
      t.advantages.pillars.map((pillar, i) => ({
        title: pillar.title,
        bullets: pillar.bullets,
        icon: PILLAR_ICONS[i] ?? PILLAR_ICONS[0],
      })),
    [t.advantages.pillars],
  );

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const animOn = inView || reducedMotion;

  return (
    <section
      ref={sectionRef}
      className={[
        styles.section,
        animOn ? styles.advantagesInView : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.contentRow}>
        <div className={styles.advantagesColumn}>
          <Box className={styles.frameParent}>
            <Box
              className={[styles.ventajasDeInxoraWrapper, styles.advAnimKicker].join(
                " ",
              )}
            >
              <div className={styles.ventajasDeInxora}>
                {t.advantages.kicker}
              </div>
            </Box>
            <div
              className={[styles.somosLaSolucin, styles.advAnimTitle].join(" ")}
            >
              {t.advantages.titleBefore}
              <span className={styles.titleHighlight}>
                {t.advantages.titleHighlight}
              </span>
              {t.advantages.titleAfter}
            </div>
            <div
              className={[styles.inxoraTransformaEl, styles.advAnimLede].join(
                " ",
              )}
            >
              {t.advantages.lede}
            </div>
          </Box>
          <Box className={styles.accordionList} role="list">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.title}
                  className={[styles.accordionItem, styles.advAnimRow].join(" ")}
                  role="listitem"
                >
                  <button
                    type="button"
                    className={styles.accordionTrigger}
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`adv-panel-${index}`}
                  >
                    <div className={styles.accordionTitleRow}>
                      <span
                        className={[
                          styles.accordionLeadIcon,
                          isOpen
                            ? styles.leadIconExpanded
                            : styles.leadIconCollapsed,
                        ].join(" ")}
                        style={{
                          WebkitMaskImage: `url(${item.icon})`,
                          maskImage: `url(${item.icon})`,
                        }}
                        aria-hidden
                      />
                      <span
                        className={[
                          styles.accordionTitle,
                          isOpen ? styles.titleExpanded : styles.titleCollapsed,
                        ].join(" ")}
                      >
                        {item.title}
                      </span>
                    </div>
                    <img
                      className={styles.accordionToggleIcon}
                      src={
                        isOpen
                          ? "/advantages-toggle-open.svg"
                          : "/Frame-861.svg"
                      }
                      alt=""
                      width={40}
                      height={40}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className={styles.accordionPanel}
                      id={`adv-panel-${index}`}
                    >
                      <ul className={styles.accordionBulletList}>
                        {item.bullets.map((b, bi) => (
                          <li key={`${item.title}-b${bi}`}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </Box>
        </div>
        <img
          className={[styles.frameChild, styles.advAnimImage].join(" ")}
          loading="lazy"
          alt=""
          src="/Frame-181@2x.png"
        />
      </div>
    </section>
  );
};

export default AdvantagesSection;
