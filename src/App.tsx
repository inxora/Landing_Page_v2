import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SiteLayout from "./layouts/site-layout";
import LandingPage from "./pages/landing-page";
import AvisoLegalPage from "./pages/aviso-legal-page";
import PoliticaPrivacidadPage from "./pages/politica-privacidad-page";
import PoliticaCookiesPage from "./pages/politica-cookies-page";
import TerminosCondicionesPage from "./pages/terminos-condiciones-page";
import AcuerdoPilotoPage from "./pages/acuerdo-piloto-page";
import LibroReclamacionesPage from "./pages/libro-reclamaciones-page";
import CrearCuentaPage from "./pages/crear-cuenta-page";
import {
  NosotrosPage,
  ContactoPage,
  FaqPage,
  CotizacionesPage,
  CatalogoPage,
  SuministrosPage,
  SeguridadPage,
  HerramientasPage,
  EnviosPage,
  DevolucionesPage,
} from "./pages/info-static-pages";
import { ROUTES } from "./routes/paths";

const pathSeg = (full: string) => full.replace(/^\//, "");

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  return (
    <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={pathSeg(ROUTES.nosotros)} element={<NosotrosPage />} />
          <Route path={pathSeg(ROUTES.contacto)} element={<ContactoPage />} />
          <Route path={pathSeg(ROUTES.faq)} element={<FaqPage />} />
          <Route path={pathSeg(ROUTES.cotizaciones)} element={<CotizacionesPage />} />
          <Route path={pathSeg(ROUTES.catalogo)} element={<CatalogoPage />} />
          <Route path={pathSeg(ROUTES.suministros)} element={<SuministrosPage />} />
          <Route path={pathSeg(ROUTES.seguridad)} element={<SeguridadPage />} />
          <Route path={pathSeg(ROUTES.herramientas)} element={<HerramientasPage />} />
          <Route path={pathSeg(ROUTES.avisoLegal)} element={<AvisoLegalPage />} />
          <Route
            path={pathSeg(ROUTES.politicaPrivacidad)}
            element={<PoliticaPrivacidadPage />}
          />
          <Route
            path={pathSeg(ROUTES.politicaCookies)}
            element={<PoliticaCookiesPage />}
          />
          <Route path={pathSeg(ROUTES.terminos)} element={<TerminosCondicionesPage />} />
          <Route
            path={pathSeg(ROUTES.acuerdoPiloto)}
            element={<AcuerdoPilotoPage />}
          />
          <Route path={pathSeg(ROUTES.envios)} element={<EnviosPage />} />
          <Route path={pathSeg(ROUTES.devoluciones)} element={<DevolucionesPage />} />
          <Route
            path={pathSeg(ROUTES.libroReclamaciones)}
            element={<LibroReclamacionesPage />}
          />
        </Route>
        <Route
          path={pathSeg(ROUTES.crearCuenta)}
          element={<CrearCuentaPage />}
        />
      </Routes>
  );
}

export default App;
