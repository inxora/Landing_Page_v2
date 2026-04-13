import { FunctionComponent, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./advantages-section.module.css";

export type AdvantagesSectionProps = {
  className?: string;
};

const ADVANTAGE_ICONS = [
  "/heart-hand.svg",
  "/coins-hand.svg",
  "/clock-plus.svg",
  "/life-buoy-02.svg",
] as const;

const AdvantagesSection: FunctionComponent<AdvantagesSectionProps> = ({
  className = "",
}) => {
  const t = useLandingTranslations();
  const [openIndex, setOpenIndex] = useState(0);

  const items = useMemo(
    () =>
      t.advantages.items.map((item, i) => ({
        ...item,
        icon: ADVANTAGE_ICONS[i],
      })),
    [t.advantages.items],
  );

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={[styles.section, className].join(" ")}>
      <Box className={styles.fewerFlaresMoreGoodDaysParent}>
        <section className={styles.fewerFlaresMoreGoodDays}>
          <Box className={styles.frameParent}>
            <Box className={styles.ventajasDeInxoraWrapper}>
              <div className={styles.ventajasDeInxora}>
                {t.advantages.kicker}
              </div>
            </Box>
            <div className={styles.somosLaSolucin}>
              {t.advantages.titleBefore}
              <span className={styles.titleHighlight}>
                {t.advantages.titleHighlight}
              </span>
              {t.advantages.titleAfter}
            </div>
            <div className={styles.inxoraTransformaEl}>{t.advantages.lede}</div>
          </Box>
          <Box className={styles.accordionList} role="list">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={styles.accordionItem}
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
                      <p className={styles.accordionDescription}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </Box>
        </section>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/Frame-181@2x.png"
        />
      </Box>
    </section>
  );
};

export default AdvantagesSection;
