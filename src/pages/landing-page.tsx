import { FunctionComponent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import HeroSection from "../components/hero-section";
import TrustedClientsSection from "../components/trusted-clients-section";
import ProblemSection from "../components/problem-section";
import AdvantagesSection from "../components/advantages-section";
import PlatformSection from "../components/platform-section";
import RecognitionsSection from "../components/recognitions-section";
import ExcelCtaSection from "../components/excel-cta-section";
import ResultsSection from "../components/results-section";
import styles from "./landing-page.module.css";

const LandingPage: FunctionComponent = () => {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.hash]);

  return (
    <Box className={styles.landingPage}>
      <section className={styles.main}>
        <img
          className={styles.image6Icon}
          alt=""
          src="/image-6@2x.png"
          fetchPriority="high"
          decoding="async"
        />
        <div className={styles.heroShell}>
          <section className={styles.mainInner}>
            <HeroSection />
          </section>
          <TrustedClientsSection />
        </div>
      </section>
      <div id="problema" className={styles.sectionAnchor}>
        <ProblemSection />
      </div>
      <div id="ventajas" className={styles.sectionAnchor}>
        <AdvantagesSection />
      </div>
      <div id="plataforma" className={styles.sectionAnchor}>
        <PlatformSection />
      </div>
      <div className={styles.brandRibbonDivider} aria-hidden />
      <div id="resultados" className={styles.sectionAnchor}>
        <ResultsSection />
      </div>
      <div id="planes" aria-hidden />
      <div id="respaldados" className={styles.sectionAnchor}>
        <RecognitionsSection />
      </div>
      <div className={styles.brandRibbonDivider} aria-hidden />
      <div id="demo" className={styles.sectionAnchor}>
        <ExcelCtaSection />
      </div>
    </Box>
  );
};

export default LandingPage;
